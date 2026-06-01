import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  installToProject,
  getInstallPlan,
  resolveSkillSelection,
  getCoreFiles
} from '../core/installer';
import { detect } from '../core/detector';
import { allSkillIds, minimalSkillIds } from '../core/skills';

const ASSETS_DIR = path.resolve(__dirname, '..', '..', 'assets');

function tmpRoot(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dmctn-install-'));
}

test('resolveSkillSelection: minimal/full/custom', () => {
  assert.deepStrictEqual(resolveSkillSelection({ mode: 'minimal' }).sort(), minimalSkillIds().sort());
  assert.deepStrictEqual(resolveSkillSelection({ mode: 'full' }).sort(), allSkillIds().sort());
  assert.deepStrictEqual(
    resolveSkillSelection({ mode: 'custom', skills: ['brutalist-skill', 'nope'] }),
    ['brutalist-skill']
  );
  // custom rỗng -> fallback minimal
  assert.deepStrictEqual(resolveSkillSelection({ mode: 'custom', skills: [] }).sort(), minimalSkillIds().sort());
});

test('getInstallPlan: minimal lists core + 3 skills', () => {
  const plan = getInstallPlan({ mode: 'minimal' });
  for (const c of getCoreFiles()) {
    assert.ok(plan.includes(c), 'missing core ' + c);
  }
  assert.ok(plan.includes(path.join('skills', 'taste-skill', 'SKILL.md')));
  assert.strictEqual(plan.length, 3 + minimalSkillIds().length);
});

test('installToProject: minimal creates core + 3 skills, detect installed', () => {
  const root = tmpRoot();
  const r = installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  assert.ok(fs.existsSync(path.join(root, '.cursor', 'rules', 'dmctn-taste-gate.mdc')));
  assert.ok(fs.existsSync(path.join(root, 'skills', 'taste-skill', 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(root, 'AGENTS.md')));
  assert.ok(fs.existsSync(path.join(root, 'examples', 'prompt-cursor.md')));
  assert.strictEqual(r.skills.length, minimalSkillIds().length);
  assert.strictEqual(r.skipped.length, 0);
  assert.strictEqual(detect(root).status, 'minimal');
});

test('installToProject: full installs all skills + docs', () => {
  const root = tmpRoot();
  const r = installToProject(root, ASSETS_DIR, { mode: 'full' });
  for (const id of allSkillIds()) {
    assert.ok(fs.existsSync(path.join(root, 'skills', id, 'SKILL.md')), 'missing skill ' + id);
  }
  assert.ok(fs.existsSync(path.join(root, 'docs', 'DMCTN_UI_TASTE_GATE.md')));
  assert.strictEqual(r.skills.length, allSkillIds().length);
  assert.strictEqual(detect(root).status, 'installed');
  assert.strictEqual(detect(root).skillsInstalled, allSkillIds().length);
});

test('installToProject: custom installs only chosen skills', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'custom', skills: ['taste-skill', 'brutalist-skill'] });
  assert.ok(fs.existsSync(path.join(root, 'skills', 'brutalist-skill', 'SKILL.md')));
  assert.ok(!fs.existsSync(path.join(root, 'skills', 'soft-skill', 'SKILL.md')));
});

test('installToProject: does NOT overwrite existing files by default', () => {
  const root = tmpRoot();
  const agents = path.join(root, 'AGENTS.md');
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(agents, 'USER CONTENT');
  const r = installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  assert.strictEqual(fs.readFileSync(agents, 'utf8'), 'USER CONTENT');
  assert.ok(r.skipped.includes('AGENTS.md'));
});

test('installToProject: overwrite via opts replaces files', () => {
  const root = tmpRoot();
  fs.writeFileSync(path.join(root, 'AGENTS.md'), 'OLD');
  installToProject(root, ASSETS_DIR, { mode: 'minimal', overwrite: true });
  assert.notStrictEqual(fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8'), 'OLD');
});

test('installToProject: legacy boolean overwrite still works', () => {
  const root = tmpRoot();
  fs.writeFileSync(path.join(root, 'AGENTS.md'), 'OLD');
  installToProject(root, ASSETS_DIR, true);
  assert.notStrictEqual(fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8'), 'OLD');
});
