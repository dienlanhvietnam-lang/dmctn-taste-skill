# Checklist QA runtime — DMCTN Taste Skill
# Runtime QA checklist — DMCTN Taste Skill

Smoke test thủ công trong cửa sổ VS Code / Cursor thật (Extension Development Host).  
Manual smoke test inside a real VS Code / Cursor window (Extension Development Host).

Smoke tự động (`src/test/activation.test.ts`) đã bao phủ activate, lệnh, HTML dashboard, cài minimal.  
Automated smoke (`src/test/activation.test.ts`) covers activation, commands, dashboard HTML, and minimal install.

Checklist này bổ sung phần **trực quan/UX** mà test headless không kiểm được.  
This checklist covers **visual/UX** parts a headless test cannot verify.

---

## Chuẩn bị
## Setup

1. Mở thư mục extension trong VS Code / Cursor.  
   Open this extension folder in VS Code / Cursor.

2. Chạy `npm install` rồi **F5** (Extension Development Host).  
   Run `npm install` then press **F5**.

3. Trong cửa sổ mới, mở **thư mục tạm trống** làm workspace.  
   In the new window, open an **empty temp folder** as the workspace.

---

## Các bước
## Steps

| # | Hành động / Action | Kỳ vọng / Expected | Pass? |
|---|-------------------|-------------------|-------|
| 1 | Mở dự án tạm / Open temp project | Popup: "Project này chưa có DMCTN Taste Skill..." — Cài / Mở Dashboard / Không hỏi lại | ☐ |
| 2 | Bấm **Cài đặt** / Click **Install** | Quick pick: Minimal / Full / Custom | ☐ |
| 3 | Chọn **Minimal** / Pick **Minimal** | Tạo `.cursor/rules/dmctn-taste-gate.mdc`, 3 skill lõi, `AGENTS.md`, `examples/prompt-cursor.md` | ☐ |
| 3b | (Tùy chọn) folder mới → **Full** / (Optional) fresh folder → **Full** | **13** skill + `docs/` gate | ☐ |
| 4 | Xem status bar / Check status bar | "Taste Skill: Installed" (xanh) | ☐ |
| 5 | **DMCTN Taste: Open Dashboard** | Dashboard 7 tab | ☐ |
| 6 | Cài đặt → đổi ngôn ngữ Auto/VI/EN → Lưu / Settings → language → Save | Nhãn đổi ngay / Labels switch immediately | ☐ |
| 7 | Tab Bộ skill / Skills tab | 13 skill + trạng thái included/missing/modified | ☐ |
| 8 | Bộ skill → chọn vài skill → Cài đã chọn / Tick skills → Install Selected | Chỉ skill đã chọn trong `skills/` | ☐ |
| 9 | Prompt mẫu → preset + tên → Tạo / Prompts → preset + Generate | Prompt có Design Read, anti-slop, a11y, security, VERDICT | ☐ |
| 10 | Prompt mẫu → Sao chép / Prompts → Copy | Clipboard có prompt (dán kiểm tra) | ☐ |
| 11 | Sửa `AGENTS.md` → tab Cài → Cập nhật skill / Edit AGENTS → Update Skills | Hỏi ghi đè; backup trong `.dmctn/taste-skill-backups/` | ☐ |
| 12 | Tab Thông tin → Gỡ khỏi dự án / About → Remove | Modal xác nhận; chỉ xóa file quản lý; status → Missing | ☐ |
| 13 | Mở lại với `dmctnTaste.neverAskInstall = true` | Không popup startup | ☐ |
| 14 | Lặp 1–5 trên **Cursor** / Repeat 1–5 in **Cursor** | Giống VS Code / Same as VS Code | ☐ |

---

## Kiểm tra an toàn
## Safety verifications

- ☐ Không ghi file trước khi bạn xác nhận / bấm.  
- ☐ No file written before explicit confirmation/click.

- ☐ Không có request mạng (không traffic ra ngoài).  
- ☐ No network request made.

- ☐ Không đọc / log secret hay token.  
- ☐ No secret/token read or logged.

- ☐ Cập nhật không ghi đè file đã sửa khi chưa hỏi.  
- ☐ Update never overwrote a modified file without asking.

---

## Ghi kết quả
## Record outcome

Ghi vào **`docs/RUNTIME_QA_REPORT.md`** (PASS hoặc FAIL; không để `PENDING_MANUAL` sau khi chạy thật).  
Record in **`docs/RUNTIME_QA_REPORT.md`** (PASS or FAIL; do not leave `PENDING_MANUAL` after a real run).

Mẫu dự phòng / Template backup: `docs/RUNTIME_QA_REPORT_TEMPLATE.md`.
