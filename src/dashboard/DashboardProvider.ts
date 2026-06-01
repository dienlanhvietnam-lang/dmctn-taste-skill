/**
 * DashboardProvider.ts - Webview dashboard song ngữ, 7 tab.
 * Phụ thuộc "vscode". Logic nghiệp vụ ủy thác cho core/*.
 */

import * as vscode from 'vscode';
import { getMessages, Lang, LangSetting } from '../i18n';
import { detect } from '../core/detector';
import { installToProject, getCoreFiles, InstallMode } from '../core/installer';
import { updateSkills, removeFromProject, findModifiedFiles, skillStatus } from '../core/updater';
import { generatePrompt, PRESETS, PresetId } from '../core/promptGenerator';
import { SKILLS } from '../core/skills';
import {
  getWorkspaceRoot,
  getActiveLang,
  getLanguageSetting,
  getNeverAsk,
  getDefaultPack,
  getBackupBeforeUpdate,
  setLanguageSetting,
  setNeverAsk,
  setDefaultPack,
  setBackupBeforeUpdate,
  getAssetsDir
} from '../util';
import { buildDashboardHtml } from './dashboardTemplate';

function nonce(): string {
  let text = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

function authorName(pkg: any): string {
  const a = pkg?.author;
  if (!a) {
    return 'DMCTN Studio';
  }
  return typeof a === 'string' ? a : a.name || 'DMCTN Studio';
}

export class DashboardProvider {
  public static current: DashboardProvider | undefined;
  private static readonly viewType = 'dmctnTaste.dashboard';

  private readonly panel: vscode.WebviewPanel;
  private readonly context: vscode.ExtensionContext;
  private disposables: vscode.Disposable[] = [];

  public static show(context: vscode.ExtensionContext): void {
    const column = vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One;
    if (DashboardProvider.current) {
      DashboardProvider.current.panel.reveal(column);
      DashboardProvider.current.postState();
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      DashboardProvider.viewType,
      'DMCTN Taste Skill',
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
      }
    );
    DashboardProvider.current = new DashboardProvider(panel, context);
  }

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    this.panel = panel;
    this.context = context;
    this.panel.webview.html = this.html();
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    this.panel.webview.onDidReceiveMessage((m) => this.onMessage(m), null, this.disposables);
  }

  public postState(): void {
    const lang = getActiveLang();
    const root = getWorkspaceRoot();
    const assets = getAssetsDir(this.context);
    const det = root ? detect(root) : undefined;
    const status = det?.status ?? 'missing';
    const states = root ? skillStatus(root, assets) : [];
    const stateMap: Record<string, string> = {};
    for (const s of states) {
      stateMap[s.id] = s.state;
    }
    const pkg = this.context.extension.packageJSON;

    this.panel.webview.postMessage({
      type: 'state',
      lang,
      messages: getMessages(lang),
      status,
      skillsInstalled: det?.skillsInstalled ?? 0,
      skillsTotal: det?.skillsTotal ?? 0,
      hasWorkspace: !!root,
      version: pkg.version,
      author: authorName(pkg),
      license: pkg.license || 'MIT',
      languageSetting: getLanguageSetting(),
      neverAsk: getNeverAsk(),
      defaultPack: getDefaultPack(),
      backup: getBackupBeforeUpdate(),
      coreFiles: getCoreFiles(),
      presets: PRESETS,
      skills: SKILLS.map((s) => ({
        id: s.id,
        name: s.name[lang],
        desc: s.desc[lang],
        minimal: s.minimal,
        state: root ? stateMap[s.id] || 'missing' : 'missing'
      }))
    });
  }

  private toast(text: string): void {
    this.panel.webview.postMessage({ type: 'toast', text });
  }

  private async onMessage(msg: any): Promise<void> {
    const lang: Lang = getActiveLang();
    const m = getMessages(lang);
    const root = getWorkspaceRoot();

    switch (msg?.type) {
      case 'ready':
        this.postState();
        break;

      case 'check': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        this.postState();
        const r = detect(root);
        const label =
          r.status === 'installed'
            ? m['status.installed']
            : r.status === 'minimal'
              ? m['status.minimal']
              : r.status === 'partial'
                ? m['status.partial']
                : m['status.missing'];
        this.toast(label);
        break;
      }

      case 'install': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        const mode = (msg.mode as InstallMode) || 'minimal';
        const result = installToProject(root, getAssetsDir(this.context), {
          mode,
          skills: Array.isArray(msg.skills) ? msg.skills : undefined
        });
        this.toast(
          m['install.done'] + (result.skipped.length > 0 ? ` (skip ${result.skipped.length})` : '')
        );
        this.postState();
        break;
      }

      case 'update': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        await this.doUpdate(root, m);
        this.postState();
        break;
      }

      case 'remove': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        const yes = lang === 'vi' ? 'Xoá' : 'Remove';
        const ok = await vscode.window.showWarningMessage(m['msg.removeConfirm'], { modal: true }, yes);
        if (ok === yes) {
          removeFromProject(root);
          this.toast(m['msg.removeDone']);
          this.postState();
        }
        break;
      }

      case 'generatePrompt': {
        const text = generatePrompt({
          preset: msg.preset as PresetId,
          projectName: msg.projectName,
          lang
        });
        this.panel.webview.postMessage({ type: 'prompt', text });
        break;
      }

      case 'copy': {
        const text = String(msg.text ?? '');
        if (!text.trim()) {
          this.toast(m['prompts.choosePreset']);
          break;
        }
        await vscode.env.clipboard.writeText(text);
        this.toast(m['prompts.copiedShort']);
        break;
      }

      case 'saveSettings': {
        await setLanguageSetting(msg.language as LangSetting);
        await setNeverAsk(!!msg.neverAsk);
        if (msg.defaultPack === 'minimal' || msg.defaultPack === 'full') {
          await setDefaultPack(msg.defaultPack);
        }
        await setBackupBeforeUpdate(!!msg.backup);
        this.toast(m['settings.saved']);
        this.postState();
        break;
      }
    }
  }

  private async doUpdate(root: string, m: Record<string, string>): Promise<void> {
    const assets = getAssetsDir(this.context);
    const modified = findModifiedFiles(root, assets);
    let overwrite = false;
    if (modified.length > 0) {
      const choice = await vscode.window.showWarningMessage(
        m['msg.overwriteConfirm'] + '\n' + modified.join(', '),
        { modal: true },
        m['msg.install']
      );
      overwrite = choice === m['msg.install'];
    }
    const result = updateSkills(root, assets, {
      overwriteModified: overwrite,
      backup: getBackupBeforeUpdate()
    });
    this.toast(result.backedUp.length > 0 ? m['msg.updateBackup'] : m['install.done']);
  }

  private dispose(): void {
    DashboardProvider.current = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      this.disposables.pop()?.dispose();
    }
  }

  private html(): string {
    const webview = this.panel.webview;
    const media = vscode.Uri.joinPath(this.context.extensionUri, 'media');
    const logoDashboardUri = webview
      .asWebviewUri(vscode.Uri.joinPath(media, 'dmctn-taste-logo-dashboard.png'))
      .toString();
    return buildDashboardHtml(nonce(), webview.cspSource, logoDashboardUri);
  }
}
