# Phân tích gap — DMCTN Taste Skill vs upstream
# Gap analysis — DMCTN Taste Skill vs upstream

**Upstream:** Leonxlnx/taste-skill @ `3c7017d`  
**DMCTN:** v0.2.11  
**Coverage tổng:** ~**59/100** — xem `DMCTN_TASTE_SKILL_COVERAGE_REPORT.md`

---

## A. Critical gap (thiếu bản chất upstream)

| # | Gap | Upstream evidence | DMCTN hiện tại | Hậu quả |
|---|-----|-------------------|----------------|--------|
| A1 | **Core taste-skill v2 depth** | `skills/taste-skill/SKILL.md` ~1200+ lines, §0–14 | `assets/skills/taste-skill/SKILL.md` ~117 lines | Agent thiếu rule chi tiết → UI vẫn dễ slop |
| A2 | **Pre-Flight Check** | §14 checklist (brief, system, typography, motion, bans…) | Chỉ VERDICT trong gate/prompt | Không có self-review bắt buộc trước ship |
| A3 | **Official design system map** | §2.A Fluent/M3/Carbon/shadcn/GOV.UK… + “install official package” | Bảng 8 tên ngắn, không enforce | Agent tự bịa CSS thay vì dùng DS đúng |
| A4 | **Implementation stack rules** | §3 RSC, Tailwind v4, Motion, GSAP; §5 skeletons | Gần như không có trong skills | Code output không nhất quán stack |
| A5 | **Redesign audit protocol** | `redesign-skill` ~179 lines (typography, color, layout, states…) | `redesign-skill` ~66 lines VI | Redesign nông, dễ “sơn màu” |

---

## B. Important gap (có nhưng cần nâng)

| # | Gap | Ghi chú |
|---|-----|---------|
| B1 | **Em-dash ban** | Upstream §9.G binary ban; DMCTN không nêu |
| B2 | **Layout bans** | Section-repetition, split-header, theme-flip — upstream có, DMCTN không |
| B3 | **Dial baseline 8/6/4** + inference table | DMCTN có preset table ngắn, thiếu baseline và cross-ref |
| B4 | **Icon / font policy** | Phosphor/Hugeicons, no hand-roll SVG, avoid Inter default |
| B5 | **Motion discipline** | “Motion must be motivated”, no `window scroll` listener |
| B6 | **image-to-code / imagegen** | Upstream 37–41 KB/skill; DMCTN ~1.7–1.9 KB |
| B7 | **stitch-skill DESIGN.md** | Upstream có `DESIGN.md`; DMCTN chỉ `SKILL.md` rút gọn |
| B8 | **Research / laziness docs** | Upstream `research/laziness/` — DMCTN không có tương đương |
| B9 | **Block library / pattern vocabulary** | Upstream §10–12 — DMCTN không có |
| B10 | **Full 13/13 QA từ Marketplace** | Docs: `PENDING_MANUAL` — chưa xác nhận end-to-end từ store install |

---

## C. Nice-to-have gap (làm sau)

| # | Gap |
|---|-----|
| C1 | Đồng bộ `skills/llms.txt` style index trong project sau install |
| C2 | `skill.sh` tương đương cho power users (CLI path song song extension) |
| C3 | Examples `floria-*.webp` trong docs hướng dẫn |
| C4 | GitHub Release v0.2.11 + VSIX attach (release hygiene) |
| C5 | Tích hợp excerpt ngắn từ `research/laziness` vào Guide tab |

---

## D. DMCTN advantage (extension hơn upstream)

| # | Advantage | Evidence |
|---|-----------|----------|
| D1 | **VS Code / Cursor extension** | `package.json`, activate, 7 commands |
| D2 | **Dashboard song ngữ 7 tab** | `src/dashboard/`, `src/i18n/` |
| D3 | **Installer Minimal / Full / Custom** | `src/core/installer.ts`, `skills.ts` |
| D4 | **Detector** Missing / Minimal / Full / Partial | `src/core/detector.ts` |
| D5 | **Update + backup** `.dmctn/taste-skill-backups/` | `src/core/updater.ts` |
| D6 | **Prompt generator 6 preset** | `src/core/promptGenerator.ts` — không có trong upstream repo |
| D7 | **Taste Gate `.mdc`** | `assets/cursor-rules/dmctn-taste-gate.mdc` — cài vào `.cursor/rules/` |
| D8 | **Marketplace packaging** | README trong VSIX, screenshots, publish docs |
| D9 | **Local-only / no telemetry** | Privacy by design + settings |
| D10 | **Việt hóa thực dụng** | Skills + UI + prompts VI/EN |
| D11 | **Automated tests 52** | `src/test/*` — upstream không có test harness extension |
| D12 | **Controlled remove** | Chỉ xóa file extension quản lý |

---

## Ma trận: Thiếu / Đơn giản / Tốt / Vượt upstream
## Matrix summary

| Tầng | Trạng thái DMCTN |
|------|------------------|
| Strategy | Có, đơn giản hơn (thiếu research) |
| Brief / Design Read | Có, **tốt** ở gate; thiếu chi tiết §0 upstream |
| Dial / Control | Có, **đơn giản** |
| Design System | Có tên, **đơn giản quá mức** |
| Anti-pattern | Có danh sách, **đơn giản** (thiếu ban chuyên sâu) |
| Implementation | **Thiếu** trong skills |
| Specialized skills | **Inventory đủ**, nội dung **đơn giản** |
| Output / Review | Có PASS/FAIL, **đơn giản** (thiếu pre-flight) |
| Distribution | **Vượt** upstream (IDE installer) |

---

## Khuyến nghị ưu tiên (không đổi skill trong vòng audit này)
## Priority recommendations (no skill changes in this audit round)

1. **v0.3.0** — Nâng `taste-skill` + gate + prompt theo §0–2–9–14 upstream (rút gọn có cấu trúc, không copy 86 KB nguyên khối).
2. Giữ **installer/dashboard** — đây là moat của DMCTN.
3. **Không** nhét preset ngành riêng (điện máy, sửa chữa, …) vào core — giữ developer-generic như upstream.

Xem roadmap chi tiết: `DMCTN_TASTE_SKILL_NEXT_UPGRADE_PLAN.md`.
