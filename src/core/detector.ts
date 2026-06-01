/**
 * detector.ts - kiểm tra dự án đã cài DMCTN Taste Skill chưa.
 * Thuần Node (fs/path), KHÔNG import "vscode" để unit-test được.
 */

import * as fs from 'fs';
import * as path from 'path';
import { allSkillIds, minimalSkillIds } from './skills';
import { getCoreFiles } from './installer';

/** Ba dấu hiệu tối thiểu (legacy / quick check). */
export const REQUIRED_PATHS = {
  rules: path.join('.cursor', 'rules', 'dmctn-taste-gate.mdc'),
  skill: path.join('skills', 'taste-skill', 'SKILL.md'),
  agents: 'AGENTS.md'
} as const;

export type SetupStatus = 'missing' | 'minimal' | 'installed' | 'partial';

export interface DetectResult {
  status: SetupStatus;
  /** True khi full pack (core + 13 skill) hoàn chỉnh. */
  installed: boolean;
  /** True khi core + 3 skill minimal đủ, không thiếu skill minimal. */
  minimalReady: boolean;
  present: string[];
  missing: string[];
  /** Số skill đã cài / tổng số skill trong registry. */
  skillsInstalled: number;
  skillsTotal: number;
}

function exists(p: string): boolean {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function skillPath(id: string): string {
  return path.join('skills', id, 'SKILL.md');
}

/**
 * Kiểm tra trạng thái cài đặt trong thư mục `root`.
 * - missing: không có gì đáng kể
 * - minimal: đủ core + đúng 3 skill minimal (không thừa skill full)
 * - installed: đủ core + 13 skill
 * - partial: có một phần (thiếu core/skill hoặc custom gói lẻ)
 */
export function detect(root: string): DetectResult {
  const coreFiles = getCoreFiles();
  const minimalIds = minimalSkillIds();
  const allIds = allSkillIds();

  const present: string[] = [];
  const missing: string[] = [];

  for (const rel of coreFiles) {
    if (exists(path.join(root, rel))) {
      present.push(rel);
    } else {
      missing.push(rel);
    }
  }

  const skillsInstalled: string[] = [];
  for (const id of allIds) {
    const rel = skillPath(id);
    if (exists(path.join(root, rel))) {
      skillsInstalled.push(rel);
      present.push(rel);
    } else {
      missing.push(rel);
    }
  }

  const hasAny = present.length > 0;
  if (!hasAny) {
    return {
      status: 'missing',
      installed: false,
      minimalReady: false,
      present: [],
      missing: [...coreFiles, ...allIds.map(skillPath)],
      skillsInstalled: 0,
      skillsTotal: allIds.length
    };
  }

  const hasAllCore = coreFiles.every((rel) => exists(path.join(root, rel)));
  const hasAllSkills = allIds.every((id) => exists(path.join(root, skillPath(id))));
  const hasAllMinimal = minimalIds.every((id) => exists(path.join(root, skillPath(id))));
  const onlyMinimalSkillSet =
    skillsInstalled.length === minimalIds.length &&
    minimalIds.every((id) => skillsInstalled.includes(skillPath(id)));

  let status: SetupStatus;

  if (hasAllCore && hasAllSkills) {
    status = 'installed';
  } else if (hasAllCore && hasAllMinimal && onlyMinimalSkillSet) {
    status = 'minimal';
  } else {
    status = 'partial';
  }

  return {
    status,
    installed: status === 'installed',
    minimalReady: status === 'minimal' || status === 'installed',
    present,
    missing,
    skillsInstalled: skillsInstalled.length,
    skillsTotal: allIds.length
  };
}
