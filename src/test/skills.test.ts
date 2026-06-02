import { test } from 'node:test';
import assert from 'node:assert';
import { allSkillIds, minimalSkillIds, SKILLS } from '../core/skills';

test('SKILLS: registry has 15 skills including ui-review and component-taste', () => {
  assert.strictEqual(SKILLS.length, 15);
  assert.ok(allSkillIds().includes('ui-review-skill'));
  assert.ok(allSkillIds().includes('component-taste'));
});

test('minimalSkillIds: unchanged core trio', () => {
  assert.deepStrictEqual(minimalSkillIds().sort(), ['brandkit', 'redesign-skill', 'taste-skill'].sort());
});
