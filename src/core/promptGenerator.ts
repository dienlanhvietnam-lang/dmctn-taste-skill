/**
 * promptGenerator.ts - sinh prompt cho các preset (>= 6).
 * Thuần TypeScript, KHÔNG import "vscode" để unit-test được.
 *
 * Mỗi prompt gồm: Design Read, người dùng mục tiêu, anti-AI-slop checklist,
 * mobile-first, accessibility, performance, security (nếu có code),
 * test/build, và Final PASS/FAIL report.
 */

export type PresetId = 'dashboard' | 'landing' | 'redesign' | 'audit' | 'mobile' | 'marketplace';

export const PRESETS: PresetId[] = ['dashboard', 'landing', 'redesign', 'audit', 'mobile', 'marketplace'];

/** Legacy preset ids kept for backward-compatible dashboard state / saved prompts. */
const LEGACY_PRESET_ALIASES: Record<string, PresetId> = {
  localbiz: 'marketplace'
};

export function normalizePresetId(raw: string | undefined): PresetId {
  const key = String(raw || '').trim();
  if (LEGACY_PRESET_ALIASES[key]) {
    return LEGACY_PRESET_ALIASES[key];
  }
  return PRESETS.includes(key as PresetId) ? (key as PresetId) : 'dashboard';
}

export interface PromptOptions {
  preset: PresetId;
  projectName?: string;
  lang?: 'vi' | 'en';
}

interface Brief {
  title: { vi: string; en: string };
  goal: { vi: string; en: string };
  audience: { vi: string; en: string };
  extra: { vi: string[]; en: string[] };
}

const BRIEFS: Record<PresetId, Brief> = {
  dashboard: {
    title: { vi: 'Dashboard UI', en: 'Dashboard UI' },
    goal: {
      vi: 'Thiết kế giao diện dashboard/quản trị nhiều dữ liệu, phân cấp rõ, không màu mè quá mức.',
      en: 'Design a data-dense admin/dashboard UI with clear hierarchy and no excess decoration.'
    },
    audience: {
      vi: 'người dùng nội bộ/vận hành cần đọc số liệu và thao tác nhanh',
      en: 'internal/ops users who need to read metrics and act quickly'
    },
    extra: {
      vi: ['Ưu tiên mật độ dữ liệu hợp lý, bảng/biểu rõ.', 'Có trạng thái loading/empty/error cho mọi widget.'],
      en: ['Prioritize sensible data density, clear tables/charts.', 'Loading/empty/error states for every widget.']
    }
  },
  landing: {
    title: { vi: 'Landing Page', en: 'Landing Page' },
    goal: {
      vi: 'Thiết kế landing marketing tập trung chuyển đổi, có bản sắc, không giống template SaaS rập khuôn.',
      en: 'Design a conversion-focused marketing landing page with identity, not a generic SaaS template.'
    },
    audience: {
      vi: 'khách truy cập lần đầu cần hiểu nhanh giá trị và tin tưởng',
      en: 'first-time visitors who must quickly grasp the value and trust it'
    },
    extra: {
      vi: ['Hero có lý do tồn tại, không căn giữa vô hồn.', 'CTA rõ ràng, lặp lại hợp lý; social proof thật.'],
      en: ['Hero with a reason to exist, not a soulless centered block.', 'Clear, well-repeated CTA; real social proof.']
    }
  },
  redesign: {
    title: { vi: 'Thiết kế lại UI có sẵn', en: 'Redesign Existing UI' },
    goal: {
      vi: 'Audit rồi redesign UI hiện có, cải thiện thẩm mỹ/UX mà KHÔNG đổi hành vi, route, field.',
      en: 'Audit then redesign the existing UI, improving look/UX WITHOUT changing behavior, routes or fields.'
    },
    audience: {
      vi: 'người dùng hiện tại đã quen luồng cũ',
      en: 'existing users already familiar with the current flow'
    },
    extra: {
      vi: ['Audit trước: liệt kê màn hình, lỗi thị giác/UX/mobile.', 'Sửa tăng dần theo component; so sánh trước/sau.'],
      en: ['Audit first: list screens and visual/UX/mobile issues.', 'Improve incrementally per component; compare before/after.']
    }
  },
  audit: {
    title: { vi: 'Audit UI toàn diện', en: 'Full UI Audit' },
    goal: {
      vi: 'Đánh giá toàn diện UI hiện tại và xuất báo cáo vấn đề. KHÔNG sửa code ở bước này.',
      en: 'Comprehensively assess the current UI and produce an issue report. Do NOT change code in this step.'
    },
    audience: {
      vi: 'team sản phẩm/kỹ thuật cần biết nên ưu tiên sửa gì',
      en: 'product/eng team that needs a prioritized list of what to fix'
    },
    extra: {
      vi: [
        'Liệt kê màn hình/route chính và vấn đề từng cái.',
        'Chấm theo: phân cấp, spacing, typography, màu, trạng thái, mobile, a11y, hiệu năng.',
        'Xếp hạng vấn đề theo mức độ và đề xuất thứ tự xử lý.'
      ],
      en: [
        'List key screens/routes and the issues of each.',
        'Score by: hierarchy, spacing, typography, color, states, mobile, a11y, performance.',
        'Rank issues by severity and propose a fix order.'
      ]
    }
  },
  mobile: {
    title: { vi: 'App ưu tiên mobile', en: 'Mobile-first App' },
    goal: {
      vi: 'Thiết kế màn hình app ưu tiên mobile: thao tác một tay, vùng chạm đủ lớn, hierarchy rõ.',
      en: 'Design mobile-first app screens: one-hand use, large touch targets, clear hierarchy.'
    },
    audience: {
      vi: 'người dùng di động, dùng nhanh trong ngữ cảnh thực tế',
      en: 'mobile users acting quickly in real-world contexts'
    },
    extra: {
      vi: ['Bottom nav/primary action hợp ngữ cảnh.', 'Text ngắn, rõ; tránh thao tác cần 2 tay.'],
      en: ['Context-appropriate bottom nav/primary action.', 'Short, clear text; avoid two-hand interactions.']
    }
  },
  marketplace: {
    title: { vi: 'Trang giới thiệu Marketplace', en: 'Marketplace Listing Page' },
    goal: {
      vi: 'Thiết kế trang listing extension/app trên Marketplace: value prop rõ, screenshot thật, CTA cài đặt, tín hiệu tin cậy cho developer.',
      en: 'Design an extension/app marketplace listing page: clear value props, real screenshots, install CTA, trust signals for developers.'
    },
    audience: {
      vi: 'developer đang so sánh extension/tool trước khi cài hoặc mua',
      en: 'developers evaluating extensions/tools before install or purchase'
    },
    extra: {
      vi: [
        'Hero + feature bullets + changelog highlights; badge publisher/version.',
        'Screenshot gallery 1600×900; pricing/license rõ; link repo/docs.'
      ],
      en: [
        'Hero + feature bullets + changelog highlights; publisher/version badges.',
        '1600×900 screenshot gallery; clear pricing/license; repo/docs links.'
      ]
    }
  }
};

const GATE = {
  vi: (b: Brief, name: string): string => `Áp dụng skills/taste-skill, skills/component-taste, .cursor/rules/dmctn-taste-gate.mdc (Gate R2). Không code ngay.

Bối cảnh: ${b.title.vi} cho ${name}.
Mục tiêu: ${b.goal.vi}

1) DESIGN READ — block: product type, target user, intent, primary action, hierarchy, constraints + 1 dòng tóm tắt.
2) TASTE DIRECTION — chọn 1 Developer Preset từ taste-skill (dev/SaaS/dashboard/devtool/docs/agent UI); color/typography/component direction.
3) NGƯỜI DÙNG MỤC TIÊU: ${b.audience.vi}.
4) DIALS: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY (1-10).
5) UI PLAN — layout, component list, responsive 360/768/1280, a11y, states, edge cases.
6) PRE-FLIGHT CHECK LITE — 10 mục YES/NO; verdict PASS_TO_CODE hoặc NEEDS_MORE_BRIEF (chỉ PASS_TO_CODE mới code).
7) ANTI-AI-SLOP CHECKLIST — tránh: gradient tím/cyan AI, glass vô nghĩa, 3 card ngang, CTA glow, generic SaaS hero, emoji/icon lộn xộn, loop animation, stock copy, Inter+slate mặc định.
8) MOBILE-FIRST: thiết kế mobile trước; không vỡ layout.
9) ACCESSIBILITY: WCAG AA, heading semantic, focus/keyboard, alt, reduced-motion.
10) PERFORMANCE: tải nhẹ, tránh CLS lớn, ảnh tối ưu.
11) SECURITY (nếu auth/dữ liệu): validation, session/CSRF, rate limit; KHÔNG log secret/token.
${b.extra.vi.map((e, i) => `${12 + i}) ${e}`).join('\n')}

Sau khi Taste Gate + Pre-Flight PASS mới code. Khi có UI: skills/ui-review-skill — Design QA Score (100) + verdict.

FINAL REPORT (bắt buộc):
- Summary
- Files changed
- Tests/Build result
- Mobile check
- Remaining issues
- VERDICT: PASS / FAIL`,

  en: (b: Brief, name: string): string => `Apply skills/taste-skill, skills/component-taste, .cursor/rules/dmctn-taste-gate.mdc (Gate R2). Do not code yet.

Context: ${b.title.en} for ${name}.
Goal: ${b.goal.en}

1) DESIGN READ — block: product type, target user, intent, primary action, hierarchy, constraints + one summary line.
2) TASTE DIRECTION — pick one Developer Preset from taste-skill (dev/SaaS/dashboard/devtool/docs/agent UI); color/typography/component direction.
3) TARGET USERS: ${b.audience.en}.
4) DIALS: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY (1-10).
5) UI PLAN — layout, components, responsive 360/768/1280, a11y, states, edge cases.
6) PRE-FLIGHT CHECK LITE — 10 YES/NO items; verdict PASS_TO_CODE or NEEDS_MORE_BRIEF (code only after PASS_TO_CODE).
7) ANTI-AI-SLOP CHECKLIST — avoid: default AI purple/cyan gradients, meaningless glass, 3-card rows, CTA glow, generic SaaS hero, emoji/icon noise, motion loops, stock copy, default Inter+slate.
8) MOBILE-FIRST: design mobile first; no broken layout.
9) ACCESSIBILITY: WCAG AA, semantic headings, focus/keyboard, alt, reduced-motion.
10) PERFORMANCE: light payload, avoid large CLS, optimized images.
11) SECURITY (if auth/data): validation, session/CSRF, rate limit; do NOT log secrets/tokens.
${b.extra.en.map((e, i) => `${12 + i}) ${e}`).join('\n')}

Only code after Taste Gate + Pre-Flight PASS. When UI exists: skills/ui-review-skill — Design QA Score (100) + verdict.

FINAL REPORT (required):
- Summary
- Files changed
- Tests/Build result
- Mobile check
- Remaining issues
- VERDICT: PASS / FAIL`
};

/** Sinh prompt theo preset. Luôn trả về chuỗi không rỗng (fallback dashboard). */
export function generatePrompt(opts: PromptOptions): string {
  const lang: 'vi' | 'en' = opts.lang === 'vi' ? 'vi' : 'en';
  const preset: PresetId = normalizePresetId(opts.preset);
  const name =
    (opts.projectName && opts.projectName.trim()) || (lang === 'vi' ? 'dự án này' : 'this project');
  const brief = BRIEFS[preset];
  return GATE[lang](brief, name);
}
