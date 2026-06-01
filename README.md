# DMCTN Taste Skill

[![Version](https://img.shields.io/badge/version-0.2.5-blue)](https://github.com/dienlanhvietnam-lang/dmctn-taste-skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Bộ skill UI chống “AI rập khuôn” cho Cursor, VS Code Agent, Claude Code và Codex.**  
**Anti-slop UI skills for Cursor, VS Code agents, Claude Code, and Codex.**

**Cài bộ Taste Skill vào dự án để agent không còn tạo giao diện chung chung, giống template.**  
**Install a curated taste-skill pack so agents stop shipping generic, look-alike interfaces.**

**Kho mã nguồn:** https://github.com/dienlanhvietnam-lang/dmctn-taste-skill  
**Repository:** https://github.com/dienlanhvietnam-lang/dmctn-taste-skill

---

## Tổng quan
## Overview

**DMCTN Taste Skill** là extension VS Code / Cursor chạy **hoàn toàn cục bộ**, có dashboard song ngữ (Việt / Anh).  
**DMCTN Taste Skill** is a **local-only** VS Code / Cursor extension with a bilingual dashboard (Vietnamese / English).

Extension giúp bạn cài vào workspace:  
The extension installs into your workspace:

- **Rule Cursor** — `.cursor/rules/dmctn-taste-gate.mdc` (Taste Gate: bắt buộc Design Read trước khi code UI)  
- **Cursor rules** — `.cursor/rules/dmctn-taste-gate.mdc` (Taste Gate: Design Read before UI code)

- **13 skill cho agent** — taste, redesign, brandkit, GPT/Codex, image-to-code, preset phong cách, output enforcement, …  
- **13 agent skills** — taste, redesign, brandkit, GPT/Codex variants, image-to-code, style presets, output enforcement, and more

- **`AGENTS.md`** và **prompt mẫu** để dán thẳng vào agent  
- **`AGENTS.md`** and **prompt templates** ready to paste into your agent

**Không cloud. Không telemetry. Không ghi file vào dự án khi bạn chưa xác nhận.**  
**No cloud. No telemetry. Nothing is written to your project until you confirm.**

---

## Tính năng chính
## Key features

- **Dashboard** — 7 tab: Tổng quan, Cài đặt, Bộ skill, Prompt mẫu, Hướng dẫn, Cài đặt extension, Thông tin  
- **Dashboard** — 7 tabs: Overview, Install, Skills, Prompts, Guide, Settings, About

- **Bộ skill đầy đủ** — 13 skill; cài **Minimal** / **Full** / **Custom**  
- **Full skill pack** — 13 skills; install as **Minimal**, **Full**, or **Custom**

- **Phát hiện trạng thái** — Chưa cài / Đã cài Minimal / Đã cài đủ Full (13/13) / Cài một phần  
- **Status detection** — Missing / Minimal installed / Full installed (13/13) / Partial

- **Tạo prompt** — 6 preset (Dashboard, Landing, Redesign, Audit UI, Mobile-first, Web doanh nghiệp địa phương)  
- **Prompt generator** — 6 presets with Design Read, anti-slop checklist, a11y, security, PASS/FAIL report

- **Cập nhật an toàn** — backup vào `.dmctn/taste-skill-backups/`; không ghi đè file bạn đã sửa nếu chưa hỏi  
- **Safe updates** — backups under `.dmctn/taste-skill-backups/`; never overwrites your edits without asking

---

## Vì sao nên dùng
## Why use it

- **Hero gradient tím + 3 card ngang** — checklist anti-slop trong mọi prompt mẫu  
- **Purple-gradient heroes and 3-card rows** — anti-AI-slop checklist in every generated prompt

- **Agent code UI không đọc brief** — Taste Gate bắt **Design Read** trước  
- **Agents skip the brief** — Taste Gate requires a **Design Read** first

- **Skill rời rạc giữa các dự án** — cài **Minimal** hoặc **Full** một lần trong workspace  
- **Inconsistent skills across projects** — one-click **Minimal** or **Full** install

- **Công cụ song ngữ** — dashboard + prompt **Việt / Anh**  
- **Bilingual tooling** — dashboard and prompts in **VI / EN**

---

## Cài đặt nhanh
## Quick start

1. **Cài extension** — file VSIX (`dmctn-taste-skill-0.2.5.vsix`) hoặc Marketplace khi phát hành.  
   **Install the extension** — VSIX (`dmctn-taste-skill-0.2.5.vsix`) or Marketplace when published.

2. **Mở dự án** trong VS Code hoặc Cursor.  
   **Open your project** in VS Code or Cursor.

3. Khi được hỏi, chọn **Cài đặt** → **Minimal** (3 skill lõi) hoặc **Full** (13 skill).  
   When prompted, choose **Install** → **Minimal** (3 core skills) or **Full** (all 13).

4. Chạy lệnh **DMCTN Taste: Open Dashboard** → tab **Prompt mẫu**.  
   Run **DMCTN Taste: Open Dashboard** → **Prompts** tab.

5. Chọn preset — nội dung Output **tự điền**.  
   Pick a preset — the Output area **fills automatically**.

6. Bấm **Sao chép prompt** / **Copy prompt** → dán vào Agent.  
   Click **Copy prompt** → paste into your agent chat.

7. Agent tuân `.cursor/rules/dmctn-taste-gate.mdc` và `skills/taste-skill` khi làm UI.  
   The agent should follow `.cursor/rules/dmctn-taste-gate.mdc` and `skills/taste-skill` when building UI.

---

## Cách dùng với Cursor
## How to use with Cursor

1. Sau khi **Cài Full**, mở thư mục dự án — Cursor đọc `.cursor/rules/` và `skills/`.  
   After **Full install**, open the project folder — Cursor reads `.cursor/rules/` and `skills/`.

2. Mở Dashboard → **Prompt mẫu** → chọn preset (vd. Dashboard UI) → **Sao chép prompt**.  
   Open Dashboard → **Prompts** → choose a preset (e.g. Dashboard UI) → **Copy prompt**.

3. Dán prompt vào **Cursor Agent**; yêu cầu agent trả **Design Read** trước khi sửa file UI.  
   Paste into **Cursor Agent**; require a **Design Read** before any UI file changes.

4. Nếu agent nhảy vào code ngay, nhắc: *“Chạy Taste Gate trước — đọc skills/taste-skill.”*  
   If the agent codes immediately, say: *“Run Taste Gate first — read skills/taste-skill.”*

---

## Cách dùng với VS Code Agent
## How to use with VS Code Agent

1. Cài extension và **Cài Full** (hoặc Minimal) vào workspace.  
   Install the extension and **Full** (or Minimal) into the workspace.

2. Mở `AGENTS.md` và thư mục `skills/` để agent đọc luật dự án.  
   Open `AGENTS.md` and the `skills/` folder so the agent reads project rules.

3. Dùng **DMCTN Taste: Generate Cursor Prompt** từ Command Palette hoặc tab Prompt trong Dashboard.  
   Use **DMCTN Taste: Generate Cursor Prompt** from the Command Palette or the Dashboard Prompts tab.

4. Kiểm tra trạng thái: **DMCTN Taste: Check Project Setup** (status bar cũng hiển thị).  
   Check status: **DMCTN Taste: Check Project Setup** (status bar also reflects state).

---

## Prompt mẫu
## Prompt templates

Sáu preset có sẵn trong Dashboard và Command Palette:  
Six presets are available in the Dashboard and Command Palette:

| Preset | Mục đích / Purpose |
|--------|-------------------|
| Dashboard UI | UI quản trị, KPI, phân cấch rõ / Admin UI, clear hierarchy |
| Landing Page | Chuyển đổi, marketing / Conversion-focused landing |
| Redesign Existing UI | Làm đẹp UI cũ, giữ hành vi / Improve UI, keep behavior |
| Full UI Audit | Audit trước khi sửa / Audit before changes |
| Mobile-first App | App ưu tiên mobile / Mobile-first screens |
| Local Business Website | Web địa phương + SEO / Local business + SEO |

Mỗi prompt gồm: Design Read, anti-slop, mobile-first, accessibility, performance, security (nếu có code), PASS/FAIL.  
Each prompt includes: Design Read, anti-slop, mobile-first, accessibility, performance, security (when relevant), PASS/FAIL.

---

## Ảnh minh họa
## Screenshots

> Ảnh nằm trong [`store-assets/`](store-assets/) trên GitHub (không đóng gói trong VSIX). Sẽ bổ sung / **to be added**.  
> Images live in [`store-assets/`](store-assets/) on GitHub (not inside the VSIX). **To be added.**

| File | Nội dung / Content |
|------|-------------------|
| `store-assets/dashboard-overview.png` | Tab Tổng quan, trạng thái Full / Overview, Full status |
| `store-assets/install-skills.png` | Tab Cài đặt hoặc Bộ skill / Install or Skills tab |
| `store-assets/prompt-output.png` | Tab Prompt mẫu, Output có nội dung / Prompts with filled output |
| `store-assets/coding-result.png` | Kết quả agent / Agent or redesign result |

Hướng dẫn chụp: [`docs/SCREENSHOT_GUIDE.md`](docs/SCREENSHOT_GUIDE.md)  
Capture guide: [`docs/SCREENSHOT_GUIDE.md`](docs/SCREENSHOT_GUIDE.md)

---

## Quyền riêng tư và an toàn
## Privacy and safety

- **Chỉ chạy cục bộ** — không gửi dữ liệu ra ngoài  
- **Local-only** — no data sent to third parties

- **Không telemetry** — không analytics, không phone-home  
- **No telemetry** — no analytics, no phone-home

- **Không đọc secret** — không đọc token, API key, `.env`  
- **No secret reading** — does not read tokens, API keys, or `.env`

- **Hỏi trước khi ghi** — cài / cập nhật chỉ khi bạn thao tác  
- **Ask before writing** — install/update only on your action

- **Gỡ có kiểm soát** — chỉ xóa file do extension quản lý  
- **Controlled remove** — removes only extension-managed paths

---

## Trạng thái phát hành
## Release status

| Hạng mục / Item | Trạng thái / Status |
|-----------------|---------------------|
| Mã nguồn GitHub / Source on GitHub | ✅ Public — `main` |
| Runtime QA (Cursor) | ✅ FULL_PASS — xem [`docs/RUNTIME_QA_REPORT.md`](docs/RUNTIME_QA_REPORT.md) |
| VSIX build | ✅ `npm run package` |
| Ảnh Marketplace / Store screenshots | ⏳ Thiếu — xem `store-assets/` |
| Visual Studio Marketplace | ⏳ **BLOCKED** — cần ảnh + publisher PAT (không lưu trong repo) |
| Open VSX | ⏳ **BLOCKED** — tương tự Marketplace |

**Publisher Marketplace:** `buivantinh` (có thể khác owner GitHub `dienlanhvietnam-lang`).  
**Marketplace publisher:** `buivantinh` (may differ from GitHub org `dienlanhvietnam-lang`).

---

## Lộ trình và bước tiếp theo
## Roadmap and next steps

1. Bổ sung 4 ảnh `store-assets/*.png` (crop dashboard, không chụp full IDE).  
   Add 4 `store-assets/*.png` screenshots (crop the dashboard, not the full IDE).

2. Publish lên Visual Studio Marketplace / Open VSX (theo [`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md)).  
   Publish to Visual Studio Marketplace / Open VSX (see [`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md)).

3. (Tùy chọn) GitHub Release kèm file `.vsix`.  
   (Optional) GitHub Release with `.vsix` attached.

---

## Lệnh
## Commands

| Lệnh / Command | Mô tả / Description |
|----------------|---------------------|
| `DMCTN Taste: Open Dashboard` | Mở dashboard / Open dashboard |
| `DMCTN Taste: Install to Current Project` | Cài Minimal / Full / Custom / Install pack |
| `DMCTN Taste: Update Skills` | Cập nhật skill (có backup) / Update with backup |
| `DMCTN Taste: Generate Cursor Prompt` | Tạo prompt / Generate prompt |
| `DMCTN Taste: Check Project Setup` | Kiểm tra cài đặt / Check install status |
| `DMCTN Taste: Remove from Project` | Gỡ file extension quản lý / Remove managed files |
| `DMCTN Taste: Switch Language` | Đổi ngôn ngữ VI / EN / Auto / Switch language |

---

## Cài đặt extension
## Extension settings

| Cài đặt / Setting | Giá trị / Values | Mặc định / Default |
|-------------------|------------------|---------------------|
| `dmctnTaste.language` | `auto`, `vi`, `en` | `auto` |
| `dmctnTaste.neverAskInstall` | boolean | `false` |
| `dmctnTaste.defaultPack` | `minimal`, `full` | `minimal` |
| `dmctnTaste.backupBeforeUpdate` | boolean | `true` |

---

## Câu hỏi thường gặp
## FAQ

**Có chạy trên Cursor không?**  
**Does it work in Cursor?**

Có — Cursor đọc `.cursor/rules/` và `skills/` như VS Code.  
Yes — Cursor reads `.cursor/rules/` and `skills/` like VS Code.

**Minimal và Full khác gì?**  
**What is the difference between Minimal and Full?**

- **Minimal** — `taste-skill`, `redesign-skill`, `brandkit` + file core  
- **Minimal** — `taste-skill`, `redesign-skill`, `brandkit` + core files

- **Full** — 13 skill + `docs/` gate  
- **Full** — all 13 skills + `docs/` gate files

**Có ghi đè file tôi đã sửa không?**  
**Will it overwrite my edits?**

Cài đặt bỏ qua file đã có; cập nhật hỏi trước khi ghi đè và có thể backup.  
Install skips existing files; update asks before overwrite and can backup.

**Có cần internet không?**  
**Does it need the internet?**

Không, trừ khi bạn tải extension từ store.  
No, except when installing the extension from a store.

---

## Phát triển
## Development

```bash
npm install
npm run compile
npm test
npm run package   # → dmctn-taste-skill-0.2.5.vsix
```

Tài liệu / Docs: [`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md) · [`docs/RUNTIME_QA_REPORT.md`](docs/RUNTIME_QA_REPORT.md)

---

## Ghi công upstream
## Upstream credit

Bản Việt hoá thực dụng, cảm hứng từ **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)** (MIT).  
Practical Vietnamese localization inspired by **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)** (MIT).

Giấy phép gốc / Upstream license: [`assets/credits/LICENSE_UPSTREAM.md`](assets/credits/LICENSE_UPSTREAM.md)

---

## Giấy phép
## License

MIT — xem [LICENSE](LICENSE).  
MIT — see [LICENSE](LICENSE).
