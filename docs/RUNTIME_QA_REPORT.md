# Báo cáo QA runtime — DMCTN Taste Skill v0.3.0 RC
# Runtime QA report — DMCTN Taste Skill v0.3.0 RC

| Trường / Field | Giá trị / Value |
|----------------|-----------------|
| **Phiên bản / Version** | **0.3.0** — Design Director Core (RC Polish, chưa upload Marketplace) |
| **Tổng thể / Overall** | **AUTOMATED_PASS — MANUAL_PENDING** |
| **Smoke tự động / Automated smoke** | PASS — `npm run compile`, `npm test` (55/55), `npm run package`, `npx vsce ls` |

---

## Checklist v0.3.0 — thực hiện thủ công trước upload Marketplace
## v0.3.0 checklist — manual before Marketplace upload

| # | Kiểm tra / Check | Trạng thái / Status | Ghi chú / Notes |
|---|------------------|---------------------|-----------------|
| 1 | **Install VSIX** — `Extensions: Install from VSIX…` → `dmctn-taste-skill-0.3.0.vsix` | ☐ PENDING | Reload window sau cài |
| 2 | **Open dashboard** — `DMCTN Taste: Open Dashboard` | ☐ PENDING | Webview mở, không lỗi CSP |
| 3 | **Confirm 15 skills** — tab Bộ skill / Skills | ☐ PENDING | Full pack = 15 skill (gồm `ui-review-skill`, `component-taste`) |
| 4 | **Install Minimal** — workspace sạch → Minimal | ☐ PENDING | 3 skill lõi + gate files |
| 5 | **Install Full** — workspace sạch → Full | ☐ PENDING | 15/15 skill |
| 6 | **Generate prompt** — tab Prompt mẫu, đổi preset | ☐ PENDING | Output tự điền |
| 7 | **Taste Gate R2 appears** — prompt có Gate R2, `dmctn-taste-gate.mdc`, Pre-Flight Lite | ☐ PENDING | Sau cài Full, mở `.cursor/rules/dmctn-taste-gate.mdc` |
| 8 | **UI Review Skill available** — `skills/ui-review-skill/SKILL.md` | ☐ PENDING | Badge trong tab Bộ skill |
| 9 | **Component Taste Skill available** — `skills/component-taste/SKILL.md` | ☐ PENDING | Badge trong tab Bộ skill |
| 10 | **Preset marketplace** — dropdown có **Marketplace Listing Page** / **Trang giới thiệu Marketplace** (không còn Local Business) | ☐ PENDING | Legacy `localbiz` alias vẫn sinh prompt marketplace |

---

## Automated coverage (headless) — v0.3.0 RC
## Phạm vi tự động (headless)

| Khu vực / Area | Kết quả / Result |
|----------------|------------------|
| `npm run compile` | PASS |
| `npm test` | PASS — 55/55 |
| `npm run package` | PASS — `dmctn-taste-skill-0.3.0.vsix` |
| `npx vsce ls` | PASS — README, CHANGELOG, LICENSE, icon, 15 skills, store-assets; no node_modules, no .env, no _upstream |
| Preset `marketplace` + legacy alias `localbiz` | PASS — unit tests |
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

## Marketplace upload (thủ công — KHÔNG chạy trong agent)
## Manual Marketplace upload (NOT executed by agent)

1. Mở [Visual Studio Marketplace Publisher](https://marketplace.visualstudio.com/manage).
2. Chọn extension **DMCTN Taste Skill** (`buivantinh.dmctn-taste-skill`).
3. **Upload extension** → chọn `dmctn-taste-skill-0.3.0.vsix`.
4. Xác nhận version **0.3.0**, README/CHANGELOG hiển thị Design Director Core.
5. Publish release notes (copy từ CHANGELOG `[0.3.0]`).
6. Sau publish: cài từ Marketplace public → chạy lại checklist trên → đổi verdict **FULL_PASS**.

**Không dùng:** `vsce publish`, PAT trong repo, hoặc publish CLI tự động.

---

## Ký duyệt / Sign-off

| | |
|---|---|
| **Người test / Tester** | _(điền sau manual QA)_ |
| **Ngày / Date** | _(điền)_ |
| **VSIX tested** | `dmctn-taste-skill-0.3.0.vsix` |
| **Kết luận / Verdict** | **AUTOMATED_PASS — MANUAL_PENDING** |

---

## Lịch sử phiên bản trước
## Previous version history

Báo cáo QA v0.2.11 (Marketplace live FULL_PASS) vẫn có giá trị tham chiếu cho dashboard cơ bản; v0.3.0 bổ sung Gate R2, 15 skill, preset marketplace.  
See git history for `docs/RUNTIME_QA_REPORT.md` at v0.2.11.
