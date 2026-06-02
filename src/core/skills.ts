/**
 * skills.ts - registry bộ skill (dữ liệu lấy từ taste-skill-vi-dmctn).
 * Thuần TypeScript, KHÔNG import "vscode".
 *
 * id = tên thư mục trong assets/skills (và sẽ là skills/<id> trong dự án người dùng).
 * Mô tả vi lấy sát từ frontmatter SKILL.md gốc; en là bản dịch ngắn.
 */

export interface SkillMeta {
  id: string;
  /** Tên hiển thị 2 ngôn ngữ. */
  name: { vi: string; en: string };
  /** Mô tả ngắn 2 ngôn ngữ. */
  desc: { vi: string; en: string };
  /** Có thuộc gói Minimal không. */
  minimal: boolean;
}

export const SKILLS: SkillMeta[] = [
  {
    id: 'taste-skill',
    name: { vi: 'Taste Skill', en: 'Taste Skill' },
    desc: {
      vi: 'Design Director Core: Design Read, preset dev, Pre-Flight, anti-slop; đọc brief rồi mới code.',
      en: 'Design Director Core: design read, dev presets, pre-flight, anti-slop; read the brief before coding.'
    },
    minimal: true
  },
  {
    id: 'redesign-skill',
    name: { vi: 'Redesign Skill', en: 'Redesign Skill' },
    desc: {
      vi: 'Redesign 4 mode (Refresh/Refactor/Rebrand/Rebuild); audit, keep/remove/improve, không phá flow.',
      en: 'Redesign in 4 modes (Refresh/Refactor/Rebrand/Rebuild); audit without breaking flows.'
    },
    minimal: true
  },
  {
    id: 'brandkit',
    name: { vi: 'Brandkit', en: 'Brandkit' },
    desc: {
      vi: 'Tạo/định hướng brand kit: màu, chữ, logo vibe, mockup.',
      en: 'Create/define a brand kit: color, type, logo vibe, mockup.'
    },
    minimal: true
  },
  {
    id: 'taste-skill-v1',
    name: { vi: 'Taste Skill v1 (Legacy)', en: 'Taste Skill v1 (Legacy)' },
    desc: {
      vi: 'Bản legacy ổn định, ít phá cách; dùng khi v2 quá mạnh.',
      en: 'Stable legacy variant, more conservative; use when v2 is too strong.'
    },
    minimal: false
  },
  {
    id: 'gpt-tasteskill',
    name: { vi: 'GPT Taste Skill', en: 'GPT Taste Skill' },
    desc: {
      vi: 'Biến thể chặt cho GPT/Codex: ép lập kế hoạch thiết kế trước khi code.',
      en: 'Stricter variant for GPT/Codex: force design planning before code.'
    },
    minimal: false
  },
  {
    id: 'image-to-code-skill',
    name: { vi: 'Image to Code', en: 'Image to Code' },
    desc: {
      vi: 'Biến ảnh/wireframe/mockup thành code sát ý, không đoán bừa.',
      en: 'Turn image/wireframe/mockup into faithful code, no guessing.'
    },
    minimal: false
  },
  {
    id: 'imagegen-frontend-web',
    name: { vi: 'ImageGen Web', en: 'ImageGen Web' },
    desc: {
      vi: 'Tạo prompt ảnh tham chiếu web cao cấp trước khi code.',
      en: 'Generate high-end web reference-image prompts before coding.'
    },
    minimal: false
  },
  {
    id: 'imagegen-frontend-mobile',
    name: { vi: 'ImageGen Mobile', en: 'ImageGen Mobile' },
    desc: {
      vi: 'Tạo prompt ảnh tham chiếu mobile/app có hierarchy rõ, dùng được.',
      en: 'Generate usable mobile/app reference-image prompts with clear hierarchy.'
    },
    minimal: false
  },
  {
    id: 'soft-skill',
    name: { vi: 'Soft / High-end', en: 'Soft / High-end' },
    desc: {
      vi: 'Phong cách mềm, cao cấp, nhiều khoảng trắng, ít ồn.',
      en: 'Soft, premium style: lots of whitespace, low noise.'
    },
    minimal: false
  },
  {
    id: 'minimalist-skill',
    name: { vi: 'Minimalist', en: 'Minimalist' },
    desc: {
      vi: 'Tối giản nhưng không nhạt: hierarchy rõ, chữ mạnh, spacing chính xác.',
      en: 'Minimal but not bland: clear hierarchy, strong type, precise spacing.'
    },
    minimal: false
  },
  {
    id: 'brutalist-skill',
    name: { vi: 'Brutalist', en: 'Brutalist' },
    desc: {
      vi: 'Phong cách brutalist/cơ khí: mạnh, thô, rõ cấu trúc, dùng có kiểm soát.',
      en: 'Brutalist/industrial: strong, raw, structural; use with control.'
    },
    minimal: false
  },
  {
    id: 'stitch-skill',
    name: { vi: 'Stitch Design', en: 'Stitch Design' },
    desc: {
      vi: 'Xuất quy tắc thiết kế dạng DESIGN.md để agent khác / Google Stitch tái dùng.',
      en: 'Export design rules as DESIGN.md for other agents / Google Stitch.'
    },
    minimal: false
  },
  {
    id: 'output-skill',
    name: { vi: 'Output Enforcement', en: 'Output Enforcement' },
    desc: {
      vi: 'Ép agent xuất kết quả đầy đủ, không placeholder, có test và verdict.',
      en: 'Force complete output, no placeholders, with tests and a verdict.'
    },
    minimal: false
  },
  {
    id: 'ui-review-skill',
    name: { vi: 'UI Review', en: 'UI Review' },
    desc: {
      vi: 'Review UI sau build: Design QA Score 100 điểm, verdict READY/POLISH/REDESIGN/FAIL.',
      en: 'Post-build UI review: 100-point Design QA score and READY/POLISH/REDESIGN/FAIL verdict.'
    },
    minimal: false
  },
  {
    id: 'component-taste',
    name: { vi: 'Component Taste', en: 'Component Taste' },
    desc: {
      vi: 'Quy tắc must/avoid/a11y/mobile cho button, card, nav, form, table, modal, …',
      en: 'Must/avoid/a11y/mobile rules for buttons, cards, nav, forms, tables, modals, and more.'
    },
    minimal: false
  }
];

/** Toàn bộ id skill. */
export function allSkillIds(): string[] {
  return SKILLS.map((s) => s.id);
}

/** Id skill thuộc gói Minimal. */
export function minimalSkillIds(): string[] {
  return SKILLS.filter((s) => s.minimal).map((s) => s.id);
}

export function getSkill(id: string): SkillMeta | undefined {
  return SKILLS.find((s) => s.id === id);
}
