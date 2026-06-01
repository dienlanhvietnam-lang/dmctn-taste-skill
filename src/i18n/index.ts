/**
 * i18n module - thuần TypeScript, KHÔNG import "vscode" để có thể unit-test.
 * Hỗ trợ: vi, en. Fallback: lang -> en -> chính key.
 */

export type Lang = 'vi' | 'en';
export type LangSetting = 'auto' | 'vi' | 'en';

export const SUPPORTED_LANGS: Lang[] = ['vi', 'en'];
export const DEFAULT_LANG: Lang = 'en';

type Dict = Record<string, string>;

const en: Dict = {
  'app.title': 'DMCTN Taste Skill',
  'app.subtitle': 'Anti-slop UI skills for Cursor / VS Code / Claude Code / Codex',

  'nav.overview': 'Overview',
  'nav.install': 'Install',
  'nav.skills': 'Skills',
  'nav.prompts': 'Prompts',
  'nav.guide': 'Guide',
  'nav.settings': 'Settings',
  'nav.about': 'About',

  'status.installed': 'Taste Skill: Installed',
  'status.minimal': 'Taste Skill: Minimal installed',
  'status.missing': 'Taste Skill: Missing',
  'status.partial': 'Taste Skill: Partial setup',
  'status.partial.hint': 'Some core files or skills are missing.',

  'overview.heading': 'Overview',
  'overview.intro': 'Install a curated set of UI "taste" skills into your project so AI agents stop producing generic, look-alike interfaces and build usable, on-brand UI instead.',
  'overview.statusLabel': 'Current project',
  'overview.checkBtn': 'Check Setup',
  'overview.installMinimal': 'Install Minimal',
  'overview.installFull': 'Install Full',
  'overview.openPrompt': 'Open Prompts',

  'install.heading': 'Install to Project',
  'install.desc': 'Choose a pack. Nothing is written to disk until you confirm. Existing files you have edited are never overwritten without asking.',
  'install.overwriteWarn': 'Safe by default: files you already modified are not overwritten.',
  'install.modeMinimal': 'Minimal',
  'install.modeFull': 'Full',
  'install.modeCustom': 'Custom',
  'install.modeMinimal.desc': 'taste-skill + redesign-skill + brandkit, plus the .cursor rule and AGENTS.md.',
  'install.modeFull.desc': 'All skills, the .cursor rule, AGENTS.md, examples and docs.',
  'install.modeCustom.desc': 'Pick exactly the skills you want from the Skills tab.',
  'install.planFor': 'Files that will be created',
  'install.btnMinimal': 'Install Minimal',
  'install.btnFull': 'Install Full',
  'install.btnCustom': 'Install Selected',
  'install.btnUpdate': 'Update Skills',
  'install.done': 'Installed successfully.',
  'install.noWorkspace': 'No open workspace folder. Open a project first.',

  'skills.heading': 'Skill Pack',
  'skills.intro': 'Every skill below ships with the extension. Tick the ones you want, then install them as a Custom pack.',
  'skills.state.included': 'included',
  'skills.state.missing': 'missing',
  'skills.state.modified': 'modified',
  'skills.installSelected': 'Install Selected Skills',
  'skills.selectAll': 'Select all',
  'skills.minimalTag': 'minimal',

  'presets.heading': 'Prompt Templates',
  'presets.dashboard': 'Dashboard UI',
  'presets.landing': 'Landing Page',
  'presets.redesign': 'Redesign Existing UI',
  'presets.audit': 'Full UI Audit',
  'presets.mobile': 'Mobile-first App',
  'presets.localbiz': 'Local Business Website',
  'presets.dashboard.desc': 'Data-dense admin / dashboard with clear hierarchy.',
  'presets.landing.desc': 'Marketing landing page focused on conversion.',
  'presets.redesign.desc': 'Improve an existing UI while keeping behavior intact.',
  'presets.audit.desc': 'Audit current UI and report issues before any change.',
  'presets.mobile.desc': 'Mobile-first app screens, thumb-friendly and usable.',
  'presets.localbiz.desc': 'Website for a local business with SEO and trust.',

  'prompts.heading': 'Prompt Templates',
  'prompts.choosePreset': 'Choose preset',
  'prompts.generate': 'Generate prompt',
  'prompts.copy': 'Copy prompt',
  'prompts.copied': 'Copied to clipboard.',
  'prompts.copiedShort': 'Copied',
  'prompts.projectName': 'Project / feature name',
  'prompts.output': 'Output',
  'prompts.tabHint': 'Pick a preset and project name — the prompt updates automatically. Use Copy prompt to paste into your agent.',

  'guide.heading': 'Guide',
  'guide.cursor.title': 'With Cursor',
  'guide.cursor.body': 'Install the pack, then the .cursor/rules/dmctn-taste-gate.mdc rule activates the Taste Gate. Ask the agent for a Design Read before it writes any UI code.',
  'guide.vscode.title': 'With VS Code Agent',
  'guide.vscode.body': 'Open AGENTS.md and the skills/ folder so the agent reads the rules. Paste a generated prompt from the Prompts tab.',
  'guide.claude.title': 'With Claude Code / Codex',
  'guide.claude.body': 'Point the tool at the skills/ folder and AGENTS.md. Use the gpt-tasteskill / output-skill rules to force planning and complete output.',

  'settings.heading': 'Settings',
  'settings.language': 'Language',
  'settings.language.auto': 'Auto (follow editor)',
  'settings.language.vi': 'Tiếng Việt',
  'settings.language.en': 'English',
  'settings.neverAsk': 'Never ask to install on startup',
  'settings.defaultPack': 'Default pack',
  'settings.pack.minimal': 'Minimal',
  'settings.pack.full': 'Full',
  'settings.backup': 'Backup before update',
  'settings.on': 'On',
  'settings.off': 'Off',
  'settings.save': 'Save Settings',
  'settings.saved': 'Settings saved.',

  'about.heading': 'About',
  'about.body': 'DMCTN Taste Skill runs fully local. No data leaves your machine. No telemetry. It never reads secrets or tokens and never writes files without your confirmation.',
  'about.version': 'Version',
  'about.author': 'Author',
  'about.license': 'License',
  'about.credits': 'Upstream inspiration/source: Leonxlnx/taste-skill (MIT License). This is a Vietnamese practical localization.',
  'about.removeBtn': 'Remove from Project',

  'msg.installPrompt': 'This project does not have DMCTN Taste Skill yet. Do you want to install it?',
  'msg.install': 'Install',
  'msg.openDashboard': 'Open Dashboard',
  'msg.neverAsk': 'Never Ask',
  'msg.pickMode': 'Choose an install pack',
  'msg.updateBackup': 'Existing files were backed up to .dmctn/taste-skill-backups/.',
  'msg.removeConfirm': 'Remove DMCTN Taste Skill files from this project?',
  'msg.removeDone': 'Removed DMCTN Taste Skill from project.',
  'msg.overwriteConfirm': 'Some files were modified by you. Overwrite them?',
  'msg.langSwitched': 'Language switched.'
};

const vi: Dict = {
  'app.title': 'DMCTN Taste Skill',
  'app.subtitle': 'Bộ skill chống UI AI rập khuôn cho Cursor / VS Code / Claude Code / Codex',

  'nav.overview': 'Tổng quan',
  'nav.install': 'Cài đặt',
  'nav.skills': 'Bộ skill',
  'nav.prompts': 'Prompt mẫu',
  'nav.guide': 'Hướng dẫn',
  'nav.settings': 'Cài đặt',
  'nav.about': 'Thông tin',

  'status.installed': 'Taste Skill: Đã cài đủ (Full)',
  'status.minimal': 'Taste Skill: Đã cài Minimal',
  'status.missing': 'Taste Skill: Chưa cài',
  'status.partial': 'Taste Skill: Cài một phần',
  'status.partial.hint': 'Thiếu file core hoặc skill so với gói đã chọn.',

  'overview.heading': 'Tổng quan',
  'overview.intro': 'Cài bộ skill "taste" về UI vào dự án để agent AI không tạo giao diện chung chung, giống nhau, mà làm UI dùng được và đúng bản sắc.',
  'overview.statusLabel': 'Dự án hiện tại',
  'overview.checkBtn': 'Kiểm tra',
  'overview.installMinimal': 'Cài Minimal',
  'overview.installFull': 'Cài Full',
  'overview.openPrompt': 'Mở Prompt',

  'install.heading': 'Cài vào dự án',
  'install.desc': 'Chọn một gói. Không ghi gì xuống đĩa cho tới khi bạn xác nhận. File bạn đã sửa sẽ không bị ghi đè nếu chưa hỏi.',
  'install.overwriteWarn': 'An toàn mặc định: file bạn đã sửa sẽ không bị ghi đè.',
  'install.modeMinimal': 'Minimal',
  'install.modeFull': 'Full',
  'install.modeCustom': 'Custom',
  'install.modeMinimal.desc': 'taste-skill + redesign-skill + brandkit, kèm rule .cursor và AGENTS.md.',
  'install.modeFull.desc': 'Toàn bộ skill, rule .cursor, AGENTS.md, examples và docs.',
  'install.modeCustom.desc': 'Tự chọn đúng những skill bạn cần ở tab Bộ skill.',
  'install.planFor': 'Các file sẽ được tạo',
  'install.btnMinimal': 'Cài Minimal',
  'install.btnFull': 'Cài Full',
  'install.btnCustom': 'Cài skill đã chọn',
  'install.btnUpdate': 'Cập nhật skill',
  'install.done': 'Cài đặt thành công.',
  'install.noWorkspace': 'Chưa mở thư mục dự án nào. Hãy mở một dự án trước.',

  'skills.heading': 'Bộ skill',
  'skills.intro': 'Mọi skill dưới đây đều đi kèm extension. Tích chọn skill bạn muốn rồi cài theo gói Custom.',
  'skills.state.included': 'đã có',
  'skills.state.missing': 'chưa có',
  'skills.state.modified': 'đã sửa',
  'skills.installSelected': 'Cài skill đã chọn',
  'skills.selectAll': 'Chọn tất cả',
  'skills.minimalTag': 'minimal',

  'presets.heading': 'Prompt mẫu',
  'presets.dashboard': 'Dashboard UI',
  'presets.landing': 'Landing Page',
  'presets.redesign': 'Thiết kế lại UI có sẵn',
  'presets.audit': 'Audit UI toàn diện',
  'presets.mobile': 'App ưu tiên mobile',
  'presets.localbiz': 'Web doanh nghiệp địa phương',
  'presets.dashboard.desc': 'Dashboard/quản trị nhiều dữ liệu, phân cấp rõ.',
  'presets.landing.desc': 'Landing marketing tập trung chuyển đổi.',
  'presets.redesign.desc': 'Cải thiện UI có sẵn mà vẫn giữ nguyên hành vi.',
  'presets.audit.desc': 'Audit UI hiện tại và báo lỗi trước khi sửa.',
  'presets.mobile.desc': 'Màn hình app ưu tiên mobile, thao tác một tay.',
  'presets.localbiz.desc': 'Web cho doanh nghiệp địa phương, có SEO và độ tin cậy.',

  'prompts.heading': 'Prompt mẫu',
  'prompts.choosePreset': 'Chọn preset',
  'prompts.generate': 'Tạo prompt',
  'prompts.copy': 'Sao chép prompt',
  'prompts.copied': 'Đã sao chép vào clipboard.',
  'prompts.copiedShort': 'Đã copy',
  'prompts.projectName': 'Tên dự án / tính năng',
  'prompts.output': 'Kết quả',
  'prompts.tabHint': 'Chọn preset và tên dự án — prompt tự cập nhật. Bấm Sao chép prompt để dán vào agent.',

  'guide.heading': 'Hướng dẫn',
  'guide.cursor.title': 'Dùng với Cursor',
  'guide.cursor.body': 'Cài gói skill, rule .cursor/rules/dmctn-taste-gate.mdc sẽ bật Taste Gate. Yêu cầu agent trả Design Read trước khi viết code UI.',
  'guide.vscode.title': 'Dùng với VS Code Agent',
  'guide.vscode.body': 'Mở AGENTS.md và thư mục skills/ để agent đọc luật. Dán prompt sinh ra từ tab Prompt mẫu.',
  'guide.claude.title': 'Dùng với Claude Code / Codex',
  'guide.claude.body': 'Trỏ công cụ vào thư mục skills/ và AGENTS.md. Dùng gpt-tasteskill / output-skill để ép lập kế hoạch và xuất đầy đủ.',

  'settings.heading': 'Cài đặt',
  'settings.language': 'Ngôn ngữ',
  'settings.language.auto': 'Tự động (theo editor)',
  'settings.language.vi': 'Tiếng Việt',
  'settings.language.en': 'English',
  'settings.neverAsk': 'Không hỏi cài đặt khi khởi động',
  'settings.defaultPack': 'Gói mặc định',
  'settings.pack.minimal': 'Minimal',
  'settings.pack.full': 'Full',
  'settings.backup': 'Backup trước khi update',
  'settings.on': 'Bật',
  'settings.off': 'Tắt',
  'settings.save': 'Lưu cài đặt',
  'settings.saved': 'Đã lưu cài đặt.',

  'about.heading': 'Thông tin',
  'about.body': 'DMCTN Taste Skill chạy hoàn toàn cục bộ. Không gửi dữ liệu ra ngoài. Không telemetry. Không đọc secret/token và không ghi file khi bạn chưa xác nhận.',
  'about.version': 'Phiên bản',
  'about.author': 'Tác giả',
  'about.license': 'Giấy phép',
  'about.credits': 'Nguồn cảm hứng/upstream: Leonxlnx/taste-skill (giấy phép MIT). Đây là bản Việt hoá thực dụng.',
  'about.removeBtn': 'Gỡ khỏi dự án',

  'msg.installPrompt': 'Project này chưa có DMCTN Taste Skill. Bạn muốn cài không?',
  'msg.install': 'Cài đặt',
  'msg.openDashboard': 'Mở Dashboard',
  'msg.neverAsk': 'Đừng hỏi nữa',
  'msg.pickMode': 'Chọn gói cài đặt',
  'msg.updateBackup': 'Đã backup file cũ vào .dmctn/taste-skill-backups/.',
  'msg.removeConfirm': 'Xoá các file DMCTN Taste Skill khỏi dự án này?',
  'msg.removeDone': 'Đã xoá DMCTN Taste Skill khỏi dự án.',
  'msg.overwriteConfirm': 'Một số file đã bị bạn sửa. Ghi đè chúng?',
  'msg.langSwitched': 'Đã đổi ngôn ngữ.'
};

const dicts: Record<Lang, Dict> = { vi, en };

/**
 * Resolve ngôn ngữ thực tế từ setting + locale của editor.
 * - 'vi' | 'en' => dùng trực tiếp
 * - 'auto'      => dựa vào editorLocale (vd "vi", "vi-VN" => vi), còn lại => en
 */
export function resolveLang(setting: LangSetting | string | undefined, editorLocale?: string): Lang {
  if (setting === 'vi' || setting === 'en') {
    return setting;
  }
  const locale = (editorLocale || '').toLowerCase();
  if (locale.startsWith('vi')) {
    return 'vi';
  }
  return DEFAULT_LANG;
}

/**
 * Lấy chuỗi dịch theo key.
 * Fallback: lang -> en -> chính key.
 * Hỗ trợ thay thế biến dạng {name}.
 */
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const dict = dicts[lang] || dicts[DEFAULT_LANG];
  let value = dict[key];
  if (value === undefined) {
    value = dicts[DEFAULT_LANG][key];
  }
  if (value === undefined) {
    value = key;
  }
  if (vars) {
    value = value.replace(/\{(\w+)\}/g, (_m, name: string) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : `{${name}}`
    );
  }
  return value;
}

/** Trả về toàn bộ dictionary của 1 ngôn ngữ (đã merge fallback en) - dùng cho webview. */
export function getMessages(lang: Lang): Dict {
  return { ...dicts[DEFAULT_LANG], ...dicts[lang] };
}
