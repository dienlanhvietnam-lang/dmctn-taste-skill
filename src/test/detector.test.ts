import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { detect } from '../core/detector';
import { installToProject } from '../core/installer';
import { allSkillIds, minimalSkillIds } from '../core/skills';

const ASSETS_DIR = path.resolve(__dirname, '..', '..', 'assets');

function tmpRoot(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dmctn-detect-'));
}

function touch(root: string, rel: string): void {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, 'x');
}

test('detect: empty project => missing', () => {
  const root = tmpRoot();
  const r = detect(root);
  assert.strictEqual(r.status, 'missing');
  assert.strictEqual(r.installed, false);
  assert.strictEqual(r.minimalReady, false);
  assert.strictEqual(r.skillsInstalled, 0);
});

test('detect: minimal install => minimal (not partial)', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  const r = detect(root);
  assert.strictEqual(r.status, 'minimal');
  assert.strictEqual(r.installed, false);
  assert.strictEqual(r.minimalReady, true);
  assert.strictEqual(r.skillsInstalled, minimalSkillIds().length);
});

test('detect: full install => installed', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'full' });
  const r = detect(root);
  assert.strictEqual(r.status, 'installed');
  assert.strictEqual(r.installed, true);
  assert.strictEqual(r.skillsInstalled, allSkillIds().length);
});

test('detect: core only no skills => partial', () => {
  const root = tmpRoot();
  touch(root, '.cursor/rules/dmctn-taste-gate.mdc');
  touch(root, 'AGENTS.md');
  touch(root, 'examples/prompt-cursor.md');
  const r = detect(root);
  assert.strictEqual(r.status, 'partial');
  assert.strictEqual(r.installed, false);
});

test('detect: 3 minimal skills but missing core => partial', () => {
  const root = tmpRoot();
  for (const id of minimalSkillIds()) {
    touch(root, path.join('skills', id, 'SKILL.md'));
  }
  const r = detect(root);
  assert.strictEqual(r.status, 'partial');
});

test('detect: minimal + extra skill => partial', () => {
  const root = tmpRoot();
  installToProject(root, ASSETS_DIR, { mode: 'minimal' });
  touch(root, path.join('skills', 'soft-skill', 'SKILL.md'));
  const r = detect(root);
  assert.strictEqual(r.status, 'partial');
});
