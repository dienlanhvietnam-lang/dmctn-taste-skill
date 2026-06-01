/**
 * activation.test.ts - Runtime smoke test (Hướng A-lite).
 * Chạy thật extension.activate() với một "vscode" mock nạp qua require-hook,
 * nên KHÔNG cần @vscode/test-electron mà vẫn kiểm tra được:
 * - extension activate không crash
 * - đăng ký đủ command
 * - mở dashboard không crash, có HTML
 * - install vào workspace tạm tạo file đúng
 */
import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Module = require('module');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

// ---- vscode mock ----
const registered = new Map<string, (...a: any[]) => any>();
let lastPanel: any = null;
const configStore: Record<string, any> = {
  language: 'vi',
  neverAskInstall: false,
  defaultPack: 'minimal',
  backupBeforeUpdate: true
};

function makeDisposable() {
  return { dispose() {} };
}

const vscodeMock: any = {
  StatusBarAlignment: { Left: 1, Right: 2 },
  ViewColumn: { One: 1 },
  ConfigurationTarget: { Global: 1 },
  ThemeColor: class {
    constructor(public id: string) {}
  },
  Uri: {
    joinPath(base: any, ...segs: string[]) {
      return { fsPath: path.join(base.fsPath, ...segs) };
    }
  },
  env: {
    language: 'vi',
    clipboard: { writeText: async () => undefined }
  },
  window: {
    activeTextEditor: undefined,
    createStatusBarItem() {
      return {
        text: '',
        command: '',
        tooltip: '',
        backgroundColor: undefined,
        show() {},
        hide() {},
        dispose() {}
      };
    },
    createWebviewPanel() {
      let messageHandler: (m: any) => any = () => undefined;
      lastPanel = {
        _html: '',
        _posted: [] as any[],
        webview: {
          set html(v: string) {
            lastPanel._html = v;
          },
          get html() {
            return lastPanel._html;
          },
          postMessage: async (msg: any) => {
            lastPanel._posted.push(msg);
            return true;
          },
          onDidReceiveMessage(cb: any) {
            messageHandler = cb;
            lastPanel._emit = (m: any) => messageHandler(m);
            return makeDisposable();
          }
        },
        reveal() {},
        onDidDispose() {
          return makeDisposable();
        },
        dispose() {}
      };
      return lastPanel;
    },
    showInformationMessage: async () => undefined,
    showWarningMessage: async () => undefined,
    showQuickPick: async (items: any[]) => items[0],
    showInputBox: async () => 'SmokeApp',
    showTextDocument: async () => undefined
  },
  workspace: {
    workspaceFolders: undefined as any,
    onDidChangeWorkspaceFolders() {
      return makeDisposable();
    },
    getConfiguration() {
      return {
        get: (key: string, def: any) => (key in configStore ? configStore[key] : def),
        update: async (key: string, val: any) => {
          configStore[key] = val;
        }
      };
    },
    openTextDocument: async () => ({})
  },
  commands: {
    registerCommand(id: string, cb: any) {
      registered.set(id, cb);
      return makeDisposable();
    }
  }
};

// Cài require-hook để mọi require('vscode') trả về mock.
const originalLoad = (Module as any)._load;
(Module as any)._load = function (request: string, parent: any, isMain: boolean) {
  if (request === 'vscode') {
    return vscodeMock;
  }
  return originalLoad.call(this, request, parent, isMain);
};

// Nạp extension SAU khi hook đã cài.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ext = require('../extension');

function makeContext(rootFs: string) {
  return {
    subscriptions: [] as any[],
    extensionUri: { fsPath: REPO_ROOT },
    extension: { packageJSON: { version: '0.2.0', author: 'DMCTN Studio', license: 'MIT' } }
  };
}

test('activate: registers all 7 commands without throwing', () => {
  const ctx = makeContext(REPO_ROOT);
  vscodeMock.workspace.workspaceFolders = undefined;
  ext.activate(ctx);
  const ids = [
    'dmctnTaste.openDashboard',
    'dmctnTaste.installToProject',
    'dmctnTaste.updateSkills',
    'dmctnTaste.generatePrompt',
    'dmctnTaste.checkSetup',
    'dmctnTaste.removeFromProject',
    'dmctnTaste.switchLanguage'
  ];
  for (const id of ids) {
    assert.ok(registered.has(id), 'command not registered: ' + id);
  }
});

test('openDashboard: creates a webview with HTML', async () => {
  await registered.get('dmctnTaste.openDashboard')!();
  assert.ok(lastPanel, 'no webview panel created');
  assert.ok(lastPanel._html.includes('DMCTN Taste'), 'html missing title');
  assert.ok(lastPanel._html.includes('Content-Security-Policy'), 'CSP missing');
  assert.ok(
    lastPanel._html.includes('Icon slots prepared for next icon mapping phase'),
    'icon slot comment missing'
  );
  assert.ok(lastPanel._html.includes('dm-icon--overview'), 'overview icon slot missing');
  assert.ok(lastPanel._html.includes('--dm-green'), 'design tokens missing');
});

test('install via dashboard message creates files in temp workspace', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dmctn-smoke-'));
  vscodeMock.workspace.workspaceFolders = [{ uri: { fsPath: root } }];

  // mở lại dashboard để postState theo workspace mới, lấy message handler
  await registered.get('dmctnTaste.openDashboard')!();
  assert.ok(lastPanel._emit, 'no message handler');
  await lastPanel._emit({ type: 'install', mode: 'minimal' });

  assert.ok(fs.existsSync(path.join(root, '.cursor', 'rules', 'dmctn-taste-gate.mdc')));
  assert.ok(fs.existsSync(path.join(root, 'skills', 'taste-skill', 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(root, 'AGENTS.md')));
});

test('generatePrompt via dashboard posts prompt to webview', async () => {
  await registered.get('dmctnTaste.openDashboard')!();
  assert.ok(lastPanel._emit);
  lastPanel._posted = [];
  await lastPanel._emit({ type: 'generatePrompt', preset: 'dashboard', projectName: 'QA' });
  await new Promise((r) => setTimeout(r, 30));
  const promptMsg = lastPanel._posted.find((m: any) => m.type === 'prompt');
  assert.ok(promptMsg, 'expected prompt message');
  assert.ok(String(promptMsg.text).includes('skills/taste-skill'));
  assert.ok(String(promptMsg.text).includes('QA'));
});

test('copy via dashboard uses host clipboard path', async () => {
  await registered.get('dmctnTaste.openDashboard')!();
  lastPanel._posted = [];
  await lastPanel._emit({ type: 'copy', text: 'PROMPT_TEXT' });
  await new Promise((r) => setTimeout(r, 30));
  assert.ok(lastPanel._posted.some((m: any) => m.type === 'toast'));
});

test('checkSetup command runs without throwing', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dmctn-smoke2-'));
  vscodeMock.workspace.workspaceFolders = [{ uri: { fsPath: root } }];
  await registered.get('dmctnTaste.checkSetup')!();
  assert.ok(true);
});

test('generatePrompt command runs without throwing', async () => {
  await registered.get('dmctnTaste.generatePrompt')!();
  assert.ok(true);
});

test('deactivate does not throw', () => {
  assert.doesNotThrow(() => ext.deactivate());
});
