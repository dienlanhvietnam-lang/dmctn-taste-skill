# Nội dung listing cửa hàng — DMCTN Taste Skill
# Store listing copy — DMCTN Taste Skill

Dùng văn bản này khi điền form **Visual Studio Marketplace**.  
Use this text when filling the **Visual Studio Marketplace** form.

**Kho mã:** https://github.com/dienlanhvietnam-lang/dmctn-taste-skill — repo public trên GitHub.  
**Repository:** https://github.com/dienlanhvietnam-lang/dmctn-taste-skill — public GitHub source.

---

## Trạng thái gói Marketplace
## Marketplace package status

| Hạng mục / Item | Trạng thái / Status |
|-----------------|---------------------|
| Gói Marketplace / Marketplace package | **PUBLISHED** — v0.2.9 |
| Xác minh / Verification | **COMPLETE** |
| Listing công khai / Public listing | **LIVE** — [Marketplace](https://marketplace.visualstudio.com/items?itemName=buivantinh.dmctn-taste-skill) |
| Ảnh minh họa / Screenshots | **READY** — `store-assets/*.png` |
| Nội dung listing / Listing copy | **READY** — văn bản dưới đây / text below |

QA cài từ store: **PENDING** — xem [`PUBLISH_CHECKLIST.md`](PUBLISH_CHECKLIST.md#post-publish-qa).  
Store install QA: **PENDING** — see [`PUBLISH_CHECKLIST.md`](PUBLISH_CHECKLIST.md#post-publish-qa).

Chi tiết: [`MARKETPLACE_POST_UPLOAD_STATUS.md`](MARKETPLACE_POST_UPLOAD_STATUS.md)  
Details: [`MARKETPLACE_POST_UPLOAD_STATUS.md`](MARKETPLACE_POST_UPLOAD_STATUS.md)

---

## Tên extension (package)
## Extension name (package)

`dmctn-taste-skill`

## Tên hiển thị
## Display name

**DMCTN Taste Skill**

## Publisher

`buivantinh` — DMCTN Studio / Bùi Văn Tĩnh

*(Publisher Marketplace có thể khác owner GitHub `dienlanhvietnam-lang`.)*  
*(Marketplace publisher may differ from GitHub org `dienlanhvietnam-lang`.)*

---

## Mô tả ngắn
## Short description

Cài bộ skill chống UI AI rập khuôn vào dự án cho Cursor / VS Code / Claude Code / Codex. Dashboard song ngữ. Chạy cục bộ, không telemetry.

Install anti-slop UI taste skills into your project for Cursor, VS Code agents, Claude Code, and Codex. Bilingual dashboard. Local-only, no telemetry.

*(Tối đa ~200 ký tự cho trường EN trên Marketplace.)*  
*(~200 chars max for the EN field on Marketplace.)*

---

## Mô tả dài
## Long description

**DMCTN Taste Skill** giúp cài bộ skill “taste” về UI vào dự án để agent AI không tạo giao diện chung chung, giống template hàng loạt.

**DMCTN Taste Skill** helps you install a curated pack of UI “taste” skills into any workspace so AI agents stop shipping generic, look-alike interfaces.

### Tính năng / What you get

- **13 skill** — cài Minimal / Full / Custom: taste-skill, redesign-skill, brandkit, GPT/Codex, image-to-code, preset phong cách, output enforcement, …  
- **13 skills** — Minimal / Full / Custom install: taste-skill, redesign-skill, brandkit, GPT/Codex variants, image-to-code, style presets, output enforcement, and more.

- **Dashboard song ngữ** — Tổng quan, Cài đặt, Bộ skill, Prompt mẫu, Hướng dẫn, Cài đặt extension, Thông tin  
- **Bilingual dashboard (VI / EN)** — Overview, Install, Skills, Prompts, Guide, Settings, About.

- **Taste Gate** — `.cursor/rules/dmctn-taste-gate.mdc`; agent phải Design Read trước khi code UI  
- **Taste Gate** — `.cursor/rules/dmctn-taste-gate.mdc`; agents must produce a Design Read before UI code.

- **6 prompt mẫu** — anti-slop, mobile-first, accessibility, performance, security, PASS/FAIL  
- **6 prompt templates** — anti-slop checklist, mobile-first, a11y, performance, security, PASS/FAIL reporting.

- **Cập nhật an toàn** — backup `.dmctn/taste-skill-backups/`; không ghi đè file đã sửa nếu chưa hỏi  
- **Safe updates** — backups in `.dmctn/taste-skill-backups/`; never overwrites your edits without asking.

### Quyền riêng tư / Privacy

- Chạy **hoàn toàn cục bộ**  
- Runs **fully on your machine**

- **Không telemetry**, không analytics, không gọi mạng  
- **No telemetry**, no analytics, no network calls

- **Không** đọc secret, token, API key  
- **Never** reads secrets, tokens, or API keys

- **Không** ghi file khi chưa xác nhận  
- **Never** writes files without your explicit confirmation

### Nguồn upstream / Upstream credit

Dựa trên ý tưởng **Leonxlnx/taste-skill** (MIT). Xem `assets/credits/LICENSE_UPSTREAM.md` trong gói extension.

Practical Vietnamese localization inspired by **Leonxlnx/taste-skill** (MIT). See `assets/credits/LICENSE_UPSTREAM.md` in the extension package.

---

## Từ khóa
## Keywords

`ai`, `cursor`, `ui`, `design`, `frontend`, `agent`, `prompt`, `taste`, `anti-slop`

## Danh mục
## Categories

- Other  
- Snippets (phụ / optional secondary)

---

## Tuyên bố quyền riêng tư
## Privacy / legal statement

Extension không thu thập, không gửi và không lưu dữ liệu người dùng. Hoạt động hoàn toàn cục bộ trong VS Code / Cursor. Không telemetry. Không đọc secret hay token xác thực.

This extension does not collect, transmit, or store user data. It operates entirely locally within VS Code / Cursor. No telemetry. No access to secrets or authentication tokens.

---

## Trạng thái ảnh minh họa
## Screenshot status

**READY** — 4 PNG trong `store-assets/` (1600×900, đóng dấu logo, ghi chú song ngữ).  
**READY** — four PNGs in `store-assets/` (1600×900, branded, bilingual captions).

---

## Danh sách ảnh (upload từ `store-assets/`)
## Screenshot list (upload from `store-assets/`)

| # | File | Chú thích / Caption | Dùng cho / Use for |
|---|------|---------------------|-------------------|
| 1 | `dashboard-overview.png` | Tổng quan dashboard / Dashboard overview | Gallery chính / primary |
| 2 | `install-skills.png` | Gói cài & skill / Install packs & skills | Install / skills |
| 3 | `prompt-output.png` | Prompt generator / Prompt generator | Prompt output |
| 4 | `coding-result.png` | Kết quả coding thật / Real coding result | Coding result |

Upload từ `store-assets/` lên publisher portal — **không** dùng ảnh mockup.  
Upload from `store-assets/` to the publisher portal — **do not** use placeholder mockups.
