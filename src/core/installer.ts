/**
 * installer.ts - tạo file/skill vào dự án theo 3 chế độ: minimal / full / custom.
 * Thuần Node (fs/path), KHÔNG import "vscode" để unit-test được.
 *
 * An toàn:
 * - KHÔNG ghi gì khi chưa được gọi (extension chỉ gọi sau khi người dùng đồng ý).
 * - Mặc định KHÔNG ghi đè file đã tồn tại (skip); updater xử lý backup/overwrite.
 */

import * as fs from 'fs';
import * as path from 'path';
import { allSkillIds, minimalSkillIds } from './skills';

export type InstallMode = 'minimal' | 'full' | 'custom';

export interface InstallOptions {
  /** 'minimal' | 'full' | 'custom'. Mặc định 'minimal'. */
  mode?: InstallMode;
  /** Danh sách id skill khi mode='custom'. */
  skills?: string[];
  /** Ghi đè file đã tồn tại (dùng cho update). Mặc định false. */
  overwrite?: boolean;
  /** Cài kèm thư mục docs/. Mặc định: true khi mode='full'. */
  includeDocs?: boolean;
}

export interface InstallResult {
  created: string[];
  skipped: string[];
  /** Danh sách skill id đã chọn cài. */
  skills: string[];
}

/** Quy đổi options -> danh sách skill id sẽ cài. */
export function resolveSkillSelection(opts: InstallOptions = {}): string[] {
  const mode = opts.mode ?? 'minimal';
  if (mode === 'full') {
    return allSkillIds();
  }
  if (mode === 'custom') {
    const valid = new Set(allSkillIds());
    const picked = (opts.skills ?? []).filter((s) => valid.has(s));
    return picked.length > 0 ? picked : minimalSkillIds();
  }
  return minimalSkillIds();
}

/** Danh sách (tương đối) file core luôn được tạo (không gồm skill). */
export function getCoreFiles(): string[] {
  return [
    path.join('.cursor', 'rules', 'dmctn-taste-gate.mdc'),
    'AGENTS.md',
    path.join('examples', 'prompt-cursor.md')
  ];
}

/** Trả về danh sách file dự kiến tạo cho 1 lựa chọn - dùng hiển thị plan. */
export function getInstallPlan(opts: InstallOptions = {}): string[] {
  const plan = [...getCoreFiles()];
  for (const id of resolveSkillSelection(opts)) {
    plan.push(path.join('skills', id, 'SKILL.md'));
  }
  return plan;
}

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileSafe(src: string, dest: string, overwrite: boolean): boolean {
  if (fs.existsSync(dest) && !overwrite) {
    return false;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return true;
}

function copyDirSafe(
  srcDir: string,
  destDir: string,
  overwrite: boolean,
  created: string[],
  skipped: string[],
  rootForRel: string
): void {
  if (!fs.existsSync(srcDir)) {
    return;
  }
  ensureDir(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirSafe(src, dest, overwrite, created, skipped, rootForRel);
    } else {
      const rel = path.relative(rootForRel, dest);
      if (copyFileSafe(src, dest, overwrite)) {
        created.push(rel);
      } else {
        skipped.push(rel);
      }
    }
  }
}

function copyOne(
  src: string,
  dest: string,
  overwrite: boolean,
  created: string[],
  skipped: string[],
  root: string
): void {
  const rel = path.relative(root, dest);
  if (copyFileSafe(src, dest, overwrite)) {
    created.push(rel);
  } else {
    skipped.push(rel);
  }
}

/**
 * Cài bộ Taste Skill vào `root`, nguồn từ `assetsDir`.
 * Chấp nhận options object, hoặc boolean (tương thích cũ: overwrite, mode minimal).
 */
export function installToProject(
  root: string,
  assetsDir: string,
  options: InstallOptions | boolean = {}
): InstallResult {
  const opts: InstallOptions = typeof options === 'boolean' ? { overwrite: options } : options;
  const overwrite = !!opts.overwrite;
  const mode = opts.mode ?? 'minimal';
  const includeDocs = opts.includeDocs ?? mode === 'full';

  const created: string[] = [];
  const skipped: string[] = [];

  // 1. Rule
  copyOne(
    path.join(assetsDir, 'cursor-rules', 'dmctn-taste-gate.mdc'),
    path.join(root, '.cursor', 'rules', 'dmctn-taste-gate.mdc'),
    overwrite,
    created,
    skipped,
    root
  );

  // 2. AGENTS.md
  copyOne(
    path.join(assetsDir, 'templates', 'AGENTS.md'),
    path.join(root, 'AGENTS.md'),
    overwrite,
    created,
    skipped,
    root
  );

  // 3. examples/prompt-cursor.md
  copyOne(
    path.join(assetsDir, 'templates', 'prompt-cursor.md'),
    path.join(root, 'examples', 'prompt-cursor.md'),
    overwrite,
    created,
    skipped,
    root
  );

  // 4. Skills theo lựa chọn
  const selected = resolveSkillSelection(opts);
  for (const id of selected) {
    copyDirSafe(
      path.join(assetsDir, 'skills', id),
      path.join(root, 'skills', id),
      overwrite,
      created,
      skipped,
      root
    );
  }

  // 5. docs (chỉ khi full / includeDocs)
  if (includeDocs) {
    copyDirSafe(
      path.join(assetsDir, 'docs'),
      path.join(root, 'docs'),
      overwrite,
      created,
      skipped,
      root
    );
  }

  return { created, skipped, skills: selected };
}
