# Báo cáo QA runtime — DMCTN Taste Skill v0.3.0
# Runtime QA report — DMCTN Taste Skill v0.3.0

| Trường / Field | Giá trị / Value |
|----------------|-----------------|
| **Phiên bản / Version** | **0.3.0** — Design Director Core (**Marketplace Public**) |
| **Tổng thể / Overall** | **PUBLIC_RUNTIME_PASS** |
| **Smoke tự động / Automated smoke** | PASS — `npm run compile`, `npm test` |

---

## Checklist v0.3.0 — runtime sau upload Marketplace
## v0.3.0 checklist — runtime after Marketplace upload

| # | Kiểm tra / Check | Trạng thái / Status | Ghi chú / Notes |
|---|------------------|---------------------|-----------------|
| 1 | **Install from Marketplace (Public)** | ✅ PASS | Marketplace Manage hiển thị live `0.3.0` |
| 2 | **Open dashboard** — `DMCTN Taste: Open Dashboard` | ✅ PASS | Dashboard mở ổn, không lỗi runtime |
| 3 | **Confirm 15 skills** — tab Bộ skill / Skills | ✅ PASS | Full pack = 15 skill |
| 4 | **Generate prompt** — tab Prompt mẫu, đổi preset | ✅ PASS | Output tự điền ổn |
| 5 | **Taste Gate R2 agent response** — Pre-Flight / Anti-slop / Self Review | ✅ PASS | Agent phản hồi đúng Gate R2 flow |

---

## Automated coverage (headless) — v0.3.0
## Phạm vi tự động (headless)

| Khu vực / Area | Kết quả / Result |
|----------------|------------------|
| `npm run compile` | PASS |
| `npm test` | PASS |
| No Marketplace publish / no vsce publish | PASS — by policy |

---

## An toàn / Safety

| Kiểm tra / Check | Kết quả / Result |
|------------------|------------------|
| Không telemetry / cloud / login | PASS (thiết kế) |
| Không đọc secret/token | PASS (thiết kế) |
| Không preset ngành cá nhân trong core | PASS — `localbiz` → `marketplace` (dev-oriented) |
| `_upstream/` không trong VSIX | PASS — `.vscodeignore` |

---

## Marketplace runtime evidence (manual)
## Bằng chứng runtime Marketplace (thủ công)

1. Marketplace Manage hiển thị **DMCTN Taste Skill 0.3.0 — Public**.
2. Cài từ Marketplace trên VS Code/Cursor: **PASS**.
3. Extension page hiển thị version **0.3.0**.
4. Dashboard mở được, hiển thị **15 skill**.
5. Prompt mẫu hoạt động và agent phản hồi Gate R2 đúng flow.

---

## Ký duyệt / Sign-off

| | |
|---|---|
| **Người test / Tester** | **Bùi Văn Tĩnh** |
| **Ngày / Date** | **2026-06-02** |
| **Marketplace version tested** | `0.3.0` (Public) |
| **Kết luận / Verdict** | **PUBLIC_RUNTIME_PASS** |

---

## Lịch sử phiên bản trước
## Previous version history

Báo cáo QA v0.2.11 (Marketplace live FULL_PASS) vẫn có giá trị tham chiếu cho dashboard cơ bản; v0.3.0 bổ sung Gate R2, 15 skill, preset marketplace.  
See git history for `docs/RUNTIME_QA_REPORT.md` at v0.2.11.
