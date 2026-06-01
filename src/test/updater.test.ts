import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { installToProject } from '../core/installer';
import {
  updateSkills,
  removeFromProject,
  findModifiedFiles,
  listManagedFiles,
  installedSkillIds,
  skillStatus,
  BACKUP_ROOT
} from '../core/updater';
import { detect } from '../core/detector';
import { allSkillIds, minimalSkillIds } from '../core/skills';

const ASSETS_DIR = path.resolve(__dirname, '..', '..', 'assets');

function tmpRoot(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dmctn-update-'));
}

test('listManagedFiles: covers all skills + core + docs', () => {
  const files = listManagedFiles(ASSETS_DIR).map((m) => m.relTarget);
  assert.ok(files.includes('AGENTS.md'));
  assert.ok(files.includes(path.join('.cursor', 'rules', 'dmctn-taste-gate.mdc')));
  for (const id of allSkillIds()) {
    assert.ok(files.some((f) => f.startsWith(path.join('skills', id))), 'missing ' + id);
  }
  assert.ok(files.includes(path.join('docs', 'DMCTN_UI_TASTE_GATE.md')));
});

test('installedSkillIds: reflects minimal install', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  assert.deepStrictEqual(installedSkillIds(root).sort(), minimalSkillIds().sort());
});

test('skillStatus: included / missing / modified', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  fs.writeFileSync(path.join(root, 'skills', 'taste-skill', 'SKILL.md'), 'EDITED');
  const status = skillStatus(root, ASSETS_DIR);
  const byId = Object.fromEntries(status.map((s) => [s.id, s.state]));
  assert.strictEqual(byId['taste-skill'], 'modified');
  assert.strictEqual(byId['brandkit'], 'included');
  assert.strictEqual(byId['soft-skill'], 'missing');
});

test('updateSkills: only syncs installed skills, does not add new', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  // làm "cũ" 1 skill đã cài để update tạo lại
  fs.writeFileSync(path.join(root, 'skills', 'brandkit', 'SKILL.md'), 'OLD');
  const r = updateSkills(root, ASSETS_DIR, true);
  // skill chưa cài không được thêm
  assert.ok(!fs.existsSync(path.join(root, 'skills', 'soft-skill', 'SKILL.md')));
  // brandkit được đồng bộ lại
  assert.notStrictEqual(fs.readFileSync(path.join(root, 'skills', 'brandkit', 'SKILL.md'), 'utf8'), 'OLD');
  assert.ok(r.updated.includes(path.join('skills', 'brandkit', 'SKILL.md')));
});

test('findModifiedFiles: detects user edits', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  fs.writeFileSync(path.join(root, 'AGENTS.md'), 'EDITED BY USER');
  assert.ok(findModifiedFiles(root, ASSETS_DIR).includes('AGENTS.md'));
});

test('updateSkills: does NOT overwrite modified files without flag', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  fs.writeFileSync(path.join(root, 'AGENTS.md'), 'EDITED');
  const r = updateSkills(root, ASSETS_DIR, false);
  assert.ok(r.skippedModified.includes('AGENTS.md'));
  assert.strictEqual(fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8'), 'EDITED');
});

test('updateSkills: overwriteModified backs up then overwrites', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  fs.writeFileSync(path.join(root, 'AGENTS.md'), 'EDITED');
  const r = updateSkills(root, ASSETS_DIR, true);
  assert.ok(r.backedUp.includes('AGENTS.md'));
  assert.ok(r.backupDir && fs.existsSync(r.backupDir));
  assert.strictEqual(fs.readFileSync(path.join(r.backupDir!, 'AGENTS.md'), 'utf8'), 'EDITED');
  assert.notStrictEqual(fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8'), 'EDITED');
  assert.ok(r.backupDir!.includes(path.join('.dmctn', 'taste-skill-backups')));
  assert.ok(BACKUP_ROOT.length > 0);
});

test('removeFromProject: removes managed files only', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'full' });
  fs.writeFileSync(path.join(root, 'keep.txt'), 'keep');
  const r = removeFromProject(root);
  assert.ok(r.removed.length > 0);
  assert.strictEqual(detect(root).status, 'missing');
  assert.ok(fs.existsSync(path.join(root, 'keep.txt')));
  assert.ok(!fs.existsSync(path.join(root, 'skills', 'taste-skill')));
  assert.ok(!fs.existsSync(path.join(root, 'skills', 'soft-skill')));
});
