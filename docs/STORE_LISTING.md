# Store Listing Copy — DMCTN Taste Skill

Use this text when filling Marketplace / Open VSX forms.

**Repository:** https://github.com/dienlanhvietnam-lang/dmctn-taste-skill — public GitHub repo (extension source).

---

## Extension name (package)

`dmctn-taste-skill`

## Display name

**DMCTN Taste Skill**

## Publisher

`buivantinh` — DMCTN Studio / Bùi Văn Tĩnh

## Short description (EN) — max ~200 chars

Install anti-slop UI taste skills into your project for Cursor, VS Code agents, Claude Code, and Codex. Bilingual dashboard. Local-only, no telemetry.

## Short description (VI)

Cài bộ skill chống UI AI rập khuôn vào dự án cho Cursor / VS Code / Claude Code / Codex. Dashboard song ngữ. Chạy cục bộ, không telemetry.

## Long description (EN)

**DMCTN Taste Skill** helps you install a curated pack of UI “taste” skills into any workspace so AI agents stop shipping generic, look-alike interfaces.

### What you get

- **13 skills** (Minimal, Full, or Custom install): taste-skill, redesign-skill, brandkit, and style/tooling skills for GPT/Codex, image-to-code, mobile/web reference prompts, and more.
- **Bilingual dashboard (Vietnamese / English)** with Overview, Install, Skills, Prompts, Guide, Settings, and About.
- **Taste Gate** via `.cursor/rules/dmctn-taste-gate.mdc` — agents must produce a Design Read before coding UI.
- **6 prompt templates** with anti-AI-slop checklist, mobile-first, accessibility, performance, security, and PASS/FAIL reporting.
- **Safe updates** with backups in `.dmctn/taste-skill-backups/`; never overwrites your edited files without asking.

### Privacy

- Runs **fully on your machine**
- **No telemetry**, no analytics, no network calls
- **Never** reads secrets, tokens, or API keys from your project
- **Never** writes files without your explicit confirmation

### Upstream credit

Practical Vietnamese localization inspired by **Leonxlnx/taste-skill** (MIT License). See `assets/credits/LICENSE_UPSTREAM.md` in the extension package.

## Long description (VI)

**DMCTN Taste Skill** giúp cài bộ skill “taste” về UI vào dự án để agent AI không tạo giao diện chung chung, giống template hàng loạt.

### Tính năng

- **13 skill** — cài Minimal / Full / Custom
- **Dashboard song ngữ** Việt/Anh
- **Taste Gate** — bắt agent trả Design Read trước khi code UI
- **6 prompt mẫu** kèm checklist anti-slop, mobile-first, a11y, hiệu năng, bảo mật
- **Update an toàn** — backup, không ghi đè file bạn đã sửa nếu chưa hỏi

### Quyền riêng tư

- Chạy **hoàn toàn cục bộ**
- **Không telemetry**
- **Không** đọc secret/token
- **Không** ghi file khi chưa xác nhận

### Nguồn upstream

Dựa trên ý tưởng **Leonxlnx/taste-skill** (MIT).

## Keywords

`ai`, `cursor`, `ui`, `design`, `frontend`, `agent`, `prompt`, `taste`, `anti-slop`

## Categories

- Other  
- Snippets (optional secondary)

## Privacy / legal statement (EN)

This extension does not collect, transmit, or store user data. It operates entirely locally within VS Code / Cursor. No telemetry. No access to secrets or authentication tokens.

## Privacy statement (VI)

Extension không thu thập, không gửi và không lưu dữ liệu người dùng. Hoạt động hoàn toàn cục bộ. Không telemetry. Không đọc secret hay token xác thực.

## Screenshots (upload from `store-assets/`)

Upload these four PNGs in the publisher portal (crop per `docs/SCREENSHOT_GUIDE.md`):

| File | Caption (EN) |
|------|----------------|
| `store-assets/dashboard-overview.png` | Bilingual dashboard — Overview, Full install status |
| `store-assets/install-skills.png` | Install packs or Skills list (13 skills) |
| `store-assets/prompt-output.png` | Prompt templates with auto-generated output |
| `store-assets/coding-result.png` | Agent applying Taste Skill — Design Read & anti-slop UI result |

Until files exist on GitHub, Marketplace upload uses local copies from `store-assets/` only — do not fake images.
