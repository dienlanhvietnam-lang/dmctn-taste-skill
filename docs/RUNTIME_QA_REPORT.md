# Báo cáo QA runtime — DMCTN Taste Skill
# Runtime QA report — DMCTN Taste Skill

| Trường / Field | Giá trị / Value |
|----------------|-----------------|
| **Phiên bản / Version** | 0.2.11 (Marketplace Overview Polish) |
| **Tổng thể / Overall** | **FULL_PASS** |
| **Smoke tự động / Automated smoke** | PASS — `npm test` 49/49, `activation.test.ts` |

---

## Runtime trên Cursor
## Runtime in Cursor

**Trạng thái / Status: FULL_PASS**

### Bằng chứng / Evidence

| Kiểm tra / Check | Kết quả / Result |
|------------------|------------------|
| Dashboard Webview mở trong Cursor | PASS |
| Dashboard Webview opens in Cursor | PASS |
| Cài Full — 13/13 skill | PASS |
| Full install — 13/13 skills | PASS |
| Trạng thái **Đã cài đủ (Full)** | PASS |
| Status **Đã cài đủ (Full)** / Full installed | PASS |
| Tab **Prompt mẫu** — output tự sinh khi mở / đổi preset | PASS |
| Tab **Prompt mẫu** — auto-generates on open / preset change | PASS |
| Nhãn sidebar **Prompt mẫu** (không “Promt”) | PASS |
| Sidebar label **Prompt mẫu** (not “Promt mẫu”) | PASS |
| Cài đặt VI / EN hiển thị | PASS |
| Settings VI / EN visible | PASS |
| Tab Bộ skill — 13 skill + badge trạng thái | PASS |
| Skills tab — 13 skills with state badges | PASS |

### Kiểm tra thủ công còn lại (tùy chọn — không chặn FULL_PASS)
### Remaining manual checks (optional — not blocking FULL_PASS)

Chưa chạy lại trong phiên gần nhất; logic được test tự động bao phủ:  
**Not re-run** in the latest session; code paths covered by automated tests:

| Kiểm tra / Check | Trạng thái / Status | Ghi chú / Notes |
|------------------|---------------------|-----------------|
| Toast copy (“Đã copy” / “Copied”) sau **Sao chép prompt** | **Chưa xác nhận / Unconfirmed** | `vscode.env.clipboard`; smoke test toast |
| Cập nhật skill + backup file đã sửa | **Chưa xác nhận / Unconfirmed** | `updater.test.ts` |
| Gỡ khỏi dự án — chỉ file được quản lý | **Chưa xác nhận / Unconfirmed** | `removeFromProject` tests |
| Never Ask — không popup khi mở dự án | **Chưa xác nhận / Unconfirmed** | `dmctnTaste.neverAskInstall` |

---

## QA ứng dụng coding
## Coding application QA

**Trạng thái / Status: FULL_PASS**

### Bằng chứng / Evidence

| Kiểm tra / Check | Kết quả / Result |
|------------------|------------------|
| Agent đọc Taste Skill / Taste Gate trước khi code UI | PASS |
| Agent reads Taste Skill / Taste Gate before UI code | PASS |
| Agent xuất **Design Read** | PASS |
| Agent produced **Design Read** | PASS |
| Agent xuất **Anti-AI-slop checklist** | PASS |
| Agent produced **Anti-AI-slop checklist** | PASS |
| Kế hoạch triển khai + tiêu chí PASS/FAIL | PASS |
| Implementation **plan** with PASS/FAIL criteria | PASS |
| Demo `index.html` redesign — bỏ pattern AI-slop (gradient tím, 3-card SaaS, …) | PASS |
| Demo `index.html` redesigned — away from generic AI-slop patterns | PASS |

### Ngữ cảnh / Context

Xác minh trên workspace thật với bộ Full (`.cursor/rules/dmctn-taste-gate.mdc`, `skills/*`, `AGENTS.md`).  
Validated on a real project workspace with Full pack installed.

---

## Phạm vi tự động (headless)
## Automated coverage (headless)

| Khu vực / Area | Kết quả / Result |
|----------------|------------------|
| Activate extension + 7 lệnh | PASS |
| Extension activate + 7 commands | PASS |
| Dashboard HTML + CSP | PASS |
| Cài Minimal / Full + detector | PASS |
| Minimal / Full install + detector status | PASS |
| `generatePrompt` → webview output | PASS |
| Copy → clipboard host + toast | PASS |
| i18n + icon 128×128 | PASS |

---

## An toàn
## Safety

| Kiểm tra / Check | Kết quả / Result |
|------------------|------------------|
| Không ghi file im lặng | PASS (thiết kế; user xác nhận cài) |
| No silent file writes | PASS (by design; user confirms install) |
| Không mạng / telemetry | PASS |
| No network / telemetry | PASS |
| Không đọc secret/token | PASS |
| No secret/token reads | PASS |
| Không ghi đè khi chưa hỏi | PASS (thiết kế) |
| No overwrite without confirmation | PASS (by design) |

---

## Marketplace Public Install QA
## Marketplace Public Install QA

**Trạng thái / Status: FULL_PASS**

| Kiểm tra / Check | Kết quả / Result |
|------------------|------------------|
| Installed from VS Code Marketplace | PASS |
| Extension visible in VS Code | PASS |
| Dashboard opens after install | PASS |
| Current project status visible | PASS |
| **Publisher** | `buivantinh` / DMCTN Studio |
| **Version tested** | 0.2.10 (Marketplace live) |
| **Date** | 2026-06-01 |

**Ghi chú / Notes**
- Full install 13/13: **PENDING_MANUAL** (chưa chạy cài Full 13/13 từ phiên bản Marketplace trên profile sạch).
- Full install 13/13: **PENDING_MANUAL** (Full 13/13 install from Marketplace on a clean profile not yet verified).

---

## Ký duyệt
## Sign-off

| | |
|---|---|
| **Người test / Tester** | Bùi Văn Tĩnh (Cursor runtime + coding QA + Marketplace public install) |
| **Ngày / Date** | 2026-06-01 |
| **Editor** | Cursor |
| **Phiên bản extension test / Extension version tested** | 0.2.2 → 0.2.10 (runtime); 0.2.10 (Marketplace public install) |
| **Kết luận / Verdict** | **FULL_PASS** (runtime + coding application + Marketplace public install) |
