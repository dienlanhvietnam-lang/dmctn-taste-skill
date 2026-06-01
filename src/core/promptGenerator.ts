/**
 * promptGenerator.ts - sinh prompt cho các preset (>= 6).
 * Thuần TypeScript, KHÔNG import "vscode" để unit-test được.
 *
 * Mỗi prompt gồm: Design Read, người dùng mục tiêu, anti-AI-slop checklist,
 * mobile-first, accessibility, performance, security (nếu có code),
 * test/build, và Final PASS/FAIL report.
 */

export type PresetId = 'dashboard' | 'landing' | 'redesign' | 'audit' | 'mobile' | 'localbiz';

export const PRESETS: PresetId[] = ['dashboard', 'landing', 'redesign', 'audit', 'mobile', 'localbiz'];

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
  localbiz: {
    title: { vi: 'Web doanh nghiệp địa phương', en: 'Local Business Website' },
    goal: {
      vi: 'Thiết kế web cho doanh nghiệp địa phương: tạo niềm tin, dễ liên hệ, SEO local tốt.',
      en: 'Design a local business website: build trust, easy contact, strong local SEO.'
    },
    audience: {
      vi: 'khách địa phương muốn tìm dịch vụ, giờ mở cửa, địa chỉ, cách liên hệ',
      en: 'local customers looking for services, hours, address and contact'
    },
    extra: {
      vi: ['Thông tin liên hệ/địa chỉ/giờ mở cửa nổi bật.', 'SEO local: title/description, schema, bản đồ, đánh giá thật.'],
      en: ['Prominent contact/address/opening hours.', 'Local SEO: title/description, schema, map, real reviews.']
    }
  }
};

const GATE = {
  vi: (b: Brief, name: string): string => `Áp dụng skills/taste-skill và .cursor/rules/dmctn-taste-gate.mdc. Không code ngay.

Bối cảnh: ${b.title.vi} cho ${name}.
Mục tiêu: ${b.goal.vi}

1) DESIGN READ — trả về 1 dòng: đây là loại sản phẩm gì, cho ai, cảm giác thương hiệu, hệ/phong cách thiết kế phù hợp.
2) NGƯỜI DÙNG MỤC TIÊU: ${b.audience.vi}.
3) DIALS: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY (1-10).
4) ANTI-AI-SLOP CHECKLIST — tránh: gradient tím/xanh mặc định, Inter+slate+card bo góc giống nhau, 3 feature card ngang mặc định, hero căn giữa vô hồn, glassmorphism lạm dụng, CTA glow vô nghĩa, animation thừa, ảnh stock generic.
5) MOBILE-FIRST: thiết kế mobile trước, kiểm tra 360 / 768 / 1280; không vỡ layout.
6) ACCESSIBILITY: tương phản WCAG AA, semantic heading, focus/keyboard, alt text, không phụ thuộc hiệu ứng để hiểu chức năng.
7) PERFORMANCE: tải nhẹ, tránh layout shift lớn, ảnh tối ưu, không dependency nặng chỉ để làm đẹp.
8) SECURITY (nếu có code auth/dữ liệu): input validation, session/CSRF, rate limit endpoint nhạy cảm, KHÔNG log secret/token, không lộ key ở frontend.
${b.extra.vi.map((e, i) => `${9 + i}) ${e}`).join('\n')}

Sau khi Taste Gate PASS mới code. Khi xong: chạy test/build/verify phù hợp.

FINAL REPORT (bắt buộc):
- Summary
- Files changed
- Tests/Build result
- Mobile check
- Remaining issues
- VERDICT: PASS / FAIL`,

  en: (b: Brief, name: string): string => `Apply skills/taste-skill and .cursor/rules/dmctn-taste-gate.mdc. Do not code yet.

Context: ${b.title.en} for ${name}.
Goal: ${b.goal.en}

1) DESIGN READ — one line: what product this is, for whom, brand feeling, and the fitting design system/style.
2) TARGET USERS: ${b.audience.en}.
3) DIALS: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY (1-10).
4) ANTI-AI-SLOP CHECKLIST — avoid: default purple/blue gradients, Inter+slate+rounded-card sameness, default 3 horizontal feature cards, soulless centered hero, glassmorphism overuse, meaningless CTA glow, useless animation, generic stock images.
5) MOBILE-FIRST: design mobile first, verify 360 / 768 / 1280; no broken layout.
6) ACCESSIBILITY: WCAG AA contrast, semantic headings, focus/keyboard, alt text, no effect-dependent comprehension.
7) PERFORMANCE: light payload, avoid large layout shift, optimized images, no heavy deps just for looks.
8) SECURITY (if auth/data code): input validation, session/CSRF, rate limit sensitive endpoints, do NOT log secrets/tokens, no keys exposed in frontend.
${b.extra.en.map((e, i) => `${9 + i}) ${e}`).join('\n')}

Only code after the Taste Gate PASSES. When done: run the appropriate test/build/verify.

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
  const preset: PresetId = PRESETS.includes(opts.preset) ? opts.preset : 'dashboard';
  const name =
    (opts.projectName && opts.projectName.trim()) || (lang === 'vi' ? 'dự án này' : 'this project');
  const brief = BRIEFS[preset];
  return GATE[lang](brief, name);
}
