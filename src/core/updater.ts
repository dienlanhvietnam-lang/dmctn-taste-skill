/**
 * updater.ts - update (có backup), remove, và trạng thái skill.
 * Thuần Node (fs/path), KHÔNG import "vscode" để unit-test được.
 *
 * An toàn:
 * - Backup file cũ vào .dmctn/taste-skill-backups/<timestamp>/ trước khi ghi đè.
 * - KHÔNG ghi đè file người dùng đã sửa khi chưa có cờ overwriteModified.
 * - Update CHỈ đồng bộ skill đã thực sự cài trong dự án (không tự thêm skill mới).
 */

import * as fs from 'fs';
import * as path from 'path';
import { allSkillIds } from './skills';
import { getCoreFiles } from './installer';

export const BACKUP_ROOT = path.join('.dmctn', 'taste-skill-backups');

/** File docs do extension quản lý (để remove an toàn, không đụng docs khác). */
const MANAGED_DOC_FILES = ['DMCTN_UI_TASTE_GATE.md', 'QUY_TRINH_CURSOR.md'];

export interface ManagedFile {
  src: string;
  relTarget: string;
}

function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function readSafe(p: string): string | null {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Liệt kê toàn bộ file extension CÓ THỂ quản lý (mọi skill + core + docs trong assets).
 */
export function listManagedFiles(assetsDir: string): ManagedFile[] {
  const files: ManagedFile[] = [
    {
      src: path.join(assetsDir, 'cursor-rules', 'dmctn-taste-gate.mdc'),
      relTarget: path.join('.cursor', 'rules', 'dmctn-taste-gate.mdc')
    },
    { src: path.join(assetsDir, 'templates', 'AGENTS.md'), relTarget: 'AGENTS.md' },
    {
      src: path.join(assetsDir, 'templates', 'prompt-cursor.md'),
      relTarget: path.join('examples', 'prompt-cursor.md')
    }
  ];

  for (const id of allSkillIds()) {
    const base = path.join(assetsDir, 'skills', id);
    for (const f of walk(base)) {
      files.push({ src: f, relTarget: path.join('skills', id, path.relative(base, f)) });
    }
  }

  for (const f of MANAGED_DOC_FILES) {
    files.push({
      src: path.join(assetsDir, 'docs', f),
      relTarget: path.join('docs', f)
    });
  }
  return files;
}

/** Skill id hiện đã cài trong dự án (tồn tại skills/<id>/SKILL.md). */
export function installedSkillIds(root: string): string[] {
  return allSkillIds().filter((id) => fs.existsSync(path.join(root, 'skills', id, 'SKILL.md')));
}

export type SkillState = 'included' | 'missing' | 'modified';

export interface SkillStatus {
  id: string;
  state: SkillState;
}

/** Trạng thái từng skill so với assets: included / missing / modified. */
export function skillStatus(root: string, assetsDir: string): SkillStatus[] {
  return allSkillIds().map((id) => {
    const dest = path.join(root, 'skills', id, 'SKILL.md');
    if (!fs.existsSync(dest)) {
      return { id, state: 'missing' as SkillState };
    }
    const cur = readSafe(dest);
    const asset = readSafe(path.join(assetsDir, 'skills', id, 'SKILL.md'));
    if (cur !== null && asset !== null && cur !== asset) {
      return { id, state: 'modified' as SkillState };
    }
    return { id, state: 'included' as SkillState };
  });
}

/** Các file đã tồn tại nhưng KHÁC asset (coi như người dùng đã sửa). */
export function findModifiedFiles(root: string, assetsDir: string): string[] {
  const modified: string[] = [];
  for (const m of listManagedFiles(assetsDir)) {
    const dest = path.join(root, m.relTarget);
    if (!fs.existsSync(dest)) {
      continue;
    }
    const cur = readSafe(dest);
    const asset = readSafe(m.src);
    if (cur !== null && asset !== null && cur !== asset) {
      modified.push(m.relTarget);
    }
  }
  return modified;
}

export interface UpdateResult {
  updated: string[];
  created: string[];
  skippedModified: string[];
  backedUp: string[];
  backupDir: string | null;
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function isSkillFile(relTarget: string): boolean {
  return relTarget.split(path.sep)[0] === 'skills';
}

function skillIdOf(relTarget: string): string | null {
  const parts = relTarget.split(path.sep);
  return parts[0] === 'skills' ? parts[1] : null;
}

export interface UpdateOptions {
  /** Ghi đè file người dùng đã sửa. Mặc định false. */
  overwriteModified?: boolean;
  /** Backup file trước khi ghi đè. Mặc định true. */
  backup?: boolean;
}

/**
 * Update bộ skill từ assets.
 * - Phạm vi: file core (rule/AGENTS/examples) + skill ĐÃ cài + docs đã cài.
 * - File trùng nội dung: bỏ qua.
 * - File đã sửa: backup rồi ghi đè NẾU overwriteModified=true, ngược lại bỏ qua.
 * - File core còn thiếu: tạo mới (re-sync). KHÔNG tự thêm skill chưa cài.
 * @param options boolean (tương thích cũ: overwriteModified) hoặc UpdateOptions.
 */
export function updateSkills(
  root: string,
  assetsDir: string,
  options: UpdateOptions | boolean = false
): UpdateResult {
  const opts: UpdateOptions = typeof options === 'boolean' ? { overwriteModified: options } : options;
  const overwriteModified = !!opts.overwriteModified;
  const doBackup = opts.backup ?? true;
  const updated: string[] = [];
  const created: string[] = [];
  const skippedModified: string[] = [];
  const backedUp: string[] = [];
  const backupDir = path.join(root, BACKUP_ROOT, timestamp());

  const installed = new Set(installedSkillIds(root));
  const docsInstalled = fs.existsSync(path.join(root, 'docs'));
  const coreSet = new Set(getCoreFiles());

  for (const m of listManagedFiles(assetsDir)) {
    const asset = readSafe(m.src);
    if (asset === null) {
      continue;
    }
    const dest = path.join(root, m.relTarget);
    const exists = fs.existsSync(dest);

    // Quyết định phạm vi
    if (isSkillFile(m.relTarget)) {
      const id = skillIdOf(m.relTarget);
      if (!id || !installed.has(id)) {
        continue; // không tự thêm skill chưa cài
      }
    } else if (m.relTarget.split(path.sep)[0] === 'docs') {
      if (!docsInstalled) {
        continue;
      }
    } else if (!coreSet.has(m.relTarget) && !exists) {
      continue;
    }

    if (!exists) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, asset);
      created.push(m.relTarget);
      continue;
    }

    const cur = readSafe(dest);
    if (cur === asset) {
      continue;
    }

    if (!overwriteModified) {
      skippedModified.push(m.relTarget);
      continue;
    }

    if (doBackup) {
      const backupPath = path.join(backupDir, m.relTarget);
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(dest, backupPath);
      backedUp.push(m.relTarget);
    }
    fs.writeFileSync(dest, asset);
    updated.push(m.relTarget);
  }

  return {
    updated,
    created,
    skippedModified,
    backedUp,
    backupDir: backedUp.length > 0 ? backupDir : null
  };
}

function removeIfEmpty(dir: string): void {
  try {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  } catch {
    /* ignore */
  }
}

export interface RemoveResult {
  removed: string[];
}

/**
 * Xoá đúng file/thư mục do extension cài. Không đụng file khác của người dùng.
 */
export function removeFromProject(root: string): RemoveResult {
  const removed: string[] = [];

  const fileTargets = [
    ...getCoreFiles(),
    ...MANAGED_DOC_FILES.map((f) => path.join('docs', f))
  ];
  for (const rel of fileTargets) {
    const full = path.join(root, rel);
    if (fs.existsSync(full)) {
      fs.rmSync(full, { force: true });
      removed.push(rel);
    }
  }

  for (const id of allSkillIds()) {
    const full = path.join(root, 'skills', id);
    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true });
      removed.push(path.join('skills', id));
    }
  }

  removeIfEmpty(path.join(root, 'skills'));
  removeIfEmpty(path.join(root, 'examples'));
  removeIfEmpty(path.join(root, 'docs'));
  removeIfEmpty(path.join(root, '.cursor', 'rules'));
  removeIfEmpty(path.join(root, '.cursor'));

  return { removed };
}
