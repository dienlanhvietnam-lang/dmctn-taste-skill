/**
 * extension.ts - điểm vào của extension. Đăng ký command, status bar,
 * và kiểm tra khi mở project (có popup hỏi, KHÔNG tự ghi file).
 */

import * as vscode from 'vscode';
import { detect } from './core/detector';
import { installToProject, InstallMode } from './core/installer';
import { updateSkills, removeFromProject, findModifiedFiles } from './core/updater';
import { generatePrompt, PRESETS, PresetId } from './core/promptGenerator';
import { DashboardProvider } from './dashboard/DashboardProvider';
import { getMessages, LangSetting } from './i18n';
import {
  getWorkspaceRoot,
  getActiveLang,
  getAssetsDir,
  getNeverAsk,
  setNeverAsk,
  setLanguageSetting,
  getLanguageSetting,
  getDefaultPack,
  getBackupBeforeUpdate
} from './util';

let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext): void {
  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBar.command = 'dmctnTaste.openDashboard';
  context.subscriptions.push(statusBar);
  refreshStatusBar();

  // Cập nhật status bar khi đổi workspace
  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(() => refreshStatusBar())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('dmctnTaste.openDashboard', () => {
      DashboardProvider.show(context);
    }),
    vscode.commands.registerCommand('dmctnTaste.installToProject', () => cmdInstall(context, undefined, true)),
    vscode.commands.registerCommand('dmctnTaste.updateSkills', () => cmdUpdate(context)),
    vscode.commands.registerCommand('dmctnTaste.generatePrompt', () => cmdGeneratePrompt()),
    vscode.commands.registerCommand('dmctnTaste.checkSetup', () => cmdCheck()),
    vscode.commands.registerCommand('dmctnTaste.removeFromProject', () => cmdRemove(context)),
    vscode.commands.registerCommand('dmctnTaste.switchLanguage', () => cmdSwitchLanguage())
  );

  // Kiểm tra khi khởi động - CHỈ hỏi, không tự ghi.
  void maybePromptInstall(context);
}

export function deactivate(): void {
  statusBar?.dispose();
}

function refreshStatusBar(): void {
  const lang = getActiveLang();
  const m = getMessages(lang);
  const root = getWorkspaceRoot();
  if (!root) {
    statusBar.hide();
    return;
  }
  const r = detect(root);
  if (r.status === 'installed') {
    statusBar.text = '$(check) ' + m['status.installed'];
    statusBar.backgroundColor = undefined;
  } else if (r.status === 'minimal') {
    statusBar.text = '$(check) ' + m['status.minimal'];
    statusBar.backgroundColor = undefined;
  } else if (r.status === 'partial') {
    statusBar.text = '$(warning) ' + m['status.partial'];
    statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
  } else {
    statusBar.text = '$(circle-slash) ' + m['status.missing'];
    statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
  }
  statusBar.tooltip = 'DMCTN Taste Skill';
  statusBar.show();
}

async function maybePromptInstall(context: vscode.ExtensionContext): Promise<void> {
  const root = getWorkspaceRoot();
  if (!root || getNeverAsk()) {
    return;
  }
  const r = detect(root);
  if (r.installed || r.status === 'minimal') {
    return;
  }
  const lang = getActiveLang();
  const m = getMessages(lang);
  const choice = await vscode.window.showInformationMessage(
    m['msg.installPrompt'],
    m['msg.install'],
    m['msg.openDashboard'],
    m['msg.neverAsk']
  );
  if (choice === m['msg.install']) {
    // Popup khởi động: cài theo gói mặc định người dùng đã chọn.
    await cmdInstall(context, getDefaultPack(), false);
  } else if (choice === m['msg.openDashboard']) {
    DashboardProvider.show(context);
  } else if (choice === m['msg.neverAsk']) {
    await setNeverAsk(true);
  }
}

async function cmdInstall(
  context: vscode.ExtensionContext,
  mode?: InstallMode,
  ask = false
): Promise<void> {
  const lang = getActiveLang();
  const m = getMessages(lang);
  const root = getWorkspaceRoot();
  if (!root) {
    void vscode.window.showWarningMessage(m['install.noWorkspace']);
    return;
  }

  let chosen: InstallMode | undefined = mode;
  if (!chosen && ask) {
    const picked = await vscode.window.showQuickPick(
      [
        { label: m['install.modeMinimal'], detail: m['install.modeMinimal.desc'], value: 'minimal' as InstallMode },
        { label: m['install.modeFull'], detail: m['install.modeFull.desc'], value: 'full' as InstallMode },
        { label: m['install.modeCustom'], detail: m['install.modeCustom.desc'], value: 'custom' as InstallMode }
      ],
      { placeHolder: m['msg.pickMode'] }
    );
    if (!picked) {
      return;
    }
    chosen = picked.value;
  }

  if (chosen === 'custom') {
    // Custom cần chọn skill: mở dashboard để chọn trực quan.
    DashboardProvider.show(context);
    return;
  }

  const result = installToProject(root, getAssetsDir(context), { mode: chosen ?? getDefaultPack() });
  refreshStatusBar();
  void vscode.window.showInformationMessage(
    m['install.done'] + (result.skipped.length > 0 ? ` (skip ${result.skipped.length})` : '')
  );
  DashboardProvider.current?.postState();
}

async function cmdUpdate(context: vscode.ExtensionContext): Promise<void> {
  const lang = getActiveLang();
  const m = getMessages(lang);
  const root = getWorkspaceRoot();
  if (!root) {
    void vscode.window.showWarningMessage(m['install.noWorkspace']);
    return;
  }
  const assets = getAssetsDir(context);
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
  refreshStatusBar();
  if (result.backedUp.length > 0) {
    void vscode.window.showInformationMessage(m['msg.updateBackup']);
  } else {
    void vscode.window.showInformationMessage(m['install.done']);
  }
  DashboardProvider.current?.postState();
}

async function cmdRemove(context: vscode.ExtensionContext): Promise<void> {
  const lang = getActiveLang();
  const m = getMessages(lang);
  const root = getWorkspaceRoot();
  if (!root) {
    void vscode.window.showWarningMessage(m['install.noWorkspace']);
    return;
  }
  const yes = lang === 'vi' ? 'Xoá' : 'Remove';
  const choice = await vscode.window.showWarningMessage(
    m['msg.removeConfirm'],
    { modal: true },
    yes
  );
  if (choice === yes) {
    removeFromProject(root);
    refreshStatusBar();
    void vscode.window.showInformationMessage(m['msg.removeDone']);
    DashboardProvider.current?.postState();
  }
}

async function cmdCheck(): Promise<void> {
  const lang = getActiveLang();
  const m = getMessages(lang);
  const root = getWorkspaceRoot();
  if (!root) {
    void vscode.window.showWarningMessage(m['install.noWorkspace']);
    return;
  }
  refreshStatusBar();
  const r = detect(root);
  const label =
    r.status === 'installed'
      ? m['status.installed']
      : r.status === 'minimal'
        ? m['status.minimal']
        : r.status === 'partial'
          ? m['status.partial']
          : m['status.missing'];
  const detail = `${r.skillsInstalled}/${r.skillsTotal} skills`;
  if (r.status === 'missing' || r.status === 'partial') {
    void vscode.window.showWarningMessage(`${label} (${detail})`);
  } else {
    void vscode.window.showInformationMessage(`${label} (${detail})`);
  }
}

async function cmdGeneratePrompt(): Promise<void> {
  const lang = getActiveLang();
  const m = getMessages(lang);
  const picked = await vscode.window.showQuickPick(
    PRESETS.map((p) => ({
      label: m['presets.' + p] || p,
      description: m['presets.' + p + '.desc'] || '',
      id: p as PresetId
    })),
    { placeHolder: m['prompts.choosePreset'] }
  );
  if (!picked) {
    return;
  }
  const name = await vscode.window.showInputBox({
    prompt: m['prompts.projectName'],
    placeHolder: 'MyApp'
  });
  const text = generatePrompt({ preset: picked.id, projectName: name, lang });
  const doc = await vscode.workspace.openTextDocument({ content: text, language: 'markdown' });
  await vscode.window.showTextDocument(doc);
  await vscode.env.clipboard.writeText(text);
  void vscode.window.showInformationMessage(m['prompts.copied']);
}

async function cmdSwitchLanguage(): Promise<void> {
  const current = getLanguageSetting();
  const lang = getActiveLang();
  const m = getMessages(lang);
  const items: { label: string; value: LangSetting }[] = [
    { label: m['settings.language.auto'], value: 'auto' },
    { label: m['settings.language.vi'], value: 'vi' },
    { label: m['settings.language.en'], value: 'en' }
  ];
  const picked = await vscode.window.showQuickPick(
    items.map((i) => ({ label: (i.value === current ? '$(check) ' : '') + i.label, value: i.value })),
    { placeHolder: m['settings.language'] }
  );
  if (!picked) {
    return;
  }
  await setLanguageSetting(picked.value as LangSetting);
  refreshStatusBar();
  const newM = getMessages(getActiveLang());
  void vscode.window.showInformationMessage(newM['msg.langSwitched']);
  DashboardProvider.current?.postState();
}
