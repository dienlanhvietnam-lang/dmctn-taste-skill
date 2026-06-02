import { test } from 'node:test';
import assert from 'node:assert';
import { generatePrompt, PRESETS } from '../core/promptGenerator';

test('PRESETS: has at least 6 presets', () => {
  assert.ok(PRESETS.length >= 6);
});

test('generatePrompt: all presets non-empty and reference taste-skill', () => {
  for (const preset of PRESETS) {
    for (const lang of ['vi', 'en'] as const) {
      const out = generatePrompt({ preset, lang });
      assert.ok(out.length > 0);
      assert.ok(out.includes('skills/taste-skill'));
    }
  }
});

test('generatePrompt: contains required sections (en)', () => {
  const out = generatePrompt({ preset: 'dashboard', lang: 'en' });
  for (const token of [
    'DESIGN READ',
    'TASTE DIRECTION',
    'TARGET USERS',
    'UI PLAN',
    'PRE-FLIGHT CHECK LITE',
    'ANTI-AI-SLOP',
    'MOBILE-FIRST',
    'ACCESSIBILITY',
    'PERFORMANCE',
    'SECURITY',
    'ui-review-skill',
    'Design QA Score',
    'VERDICT: PASS / FAIL'
  ]) {
    assert.ok(out.includes(token), 'missing section: ' + token);
  }
});

test('generatePrompt: contains required sections (vi)', () => {
  const out = generatePrompt({ preset: 'audit', lang: 'vi' });
  for (const token of [
    'DESIGN READ',
    'TASTE DIRECTION',
    'NGƯỜI DÙNG MỤC TIÊU',
    'UI PLAN',
    'PRE-FLIGHT CHECK LITE',
    'ANTI-AI-SLOP',
    'MOBILE-FIRST',
    'ACCESSIBILITY',
    'PERFORMANCE',
    'SECURITY',
    'ui-review-skill',
    'Design QA Score',
    'VERDICT: PASS / FAIL'
  ]) {
    assert.ok(out.includes(token), 'missing section: ' + token);
  }
});

test('generatePrompt: injects project name', () => {
  const out = generatePrompt({ preset: 'landing', projectName: 'AcmeApp', lang: 'en' });
  assert.ok(out.includes('AcmeApp'));
});

test('generatePrompt: vi vs en differ', () => {
  assert.notStrictEqual(generatePrompt({ preset: 'mobile', lang: 'vi' }), generatePrompt({ preset: 'mobile', lang: 'en' }));
});

test('generatePrompt: unknown preset falls back to dashboard', () => {
  const out = generatePrompt({ preset: 'nope' as any, lang: 'en' });
  assert.ok(out.includes('Dashboard UI'));
});

test('generatePrompt: empty name uses default placeholder', () => {
  assert.ok(generatePrompt({ preset: 'dashboard', projectName: '   ', lang: 'vi' }).includes('dự án này'));
});
