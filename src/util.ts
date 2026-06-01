/**
 * util.ts - helper phụ thuộc "vscode" dùng chung cho extension & dashboard.
 */

import * as vscode from 'vscode';
import { resolveLang, Lang, LangSetting } from './i18n';

export const CONFIG_NS = 'dmctnTaste';

/** Lấy thư mục gốc của workspace đang mở (nếu có). */
export function getWorkspaceRoot(): string | undefined {
  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders.length > 0) {
    return folders[0].uri.fsPath;
  }
  return undefined;
}

/** Đọc setting ngôn ngữ và quy đổi ra 'vi' | 'en' theo locale editor. */
export function getActiveLang(): Lang {
  const setting = vscode.workspace
    .getConfiguration(CONFIG_NS)
    .get<LangSetting>('language', 'auto');
  return resolveLang(setting, vscode.env.language);
}

export function getLanguageSetting(): LangSetting {
  return vscode.workspace.getConfiguration(CONFIG_NS).get<LangSetting>('language', 'auto');
}

export function getNeverAsk(): boolean {
  return vscode.workspace.getConfiguration(CONFIG_NS).get<boolean>('neverAskInstall', false);
}

export function getDefaultPack(): 'minimal' | 'full' {
  return vscode.workspace.getConfiguration(CONFIG_NS).get<'minimal' | 'full'>('defaultPack', 'minimal');
}

export function getBackupBeforeUpdate(): boolean {
  return vscode.workspace.getConfiguration(CONFIG_NS).get<boolean>('backupBeforeUpdate', true);
}

export async function setDefaultPack(value: 'minimal' | 'full'): Promise<void> {
  await vscode.workspace
    .getConfiguration(CONFIG_NS)
    .update('defaultPack', value, vscode.ConfigurationTarget.Global);
}

export async function setBackupBeforeUpdate(value: boolean): Promise<void> {
  await vscode.workspace
    .getConfiguration(CONFIG_NS)
    .update('backupBeforeUpdate', value, vscode.ConfigurationTarget.Global);
}

export async function setLanguageSetting(value: LangSetting): Promise<void> {
  await vscode.workspace
    .getConfiguration(CONFIG_NS)
    .update('language', value, vscode.ConfigurationTarget.Global);
}

export async function setNeverAsk(value: boolean): Promise<void> {
  await vscode.workspace
    .getConfiguration(CONFIG_NS)
    .update('neverAskInstall', value, vscode.ConfigurationTarget.Global);
}

/** Đường dẫn thư mục assets đóng gói cùng extension. */
export function getAssetsDir(context: vscode.ExtensionContext): string {
  return vscode.Uri.joinPath(context.extensionUri, 'assets').fsPath;
}
