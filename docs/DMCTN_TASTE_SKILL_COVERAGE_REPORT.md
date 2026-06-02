# Báo cáo coverage — DMCTN vs upstream Taste Skill
# Coverage report — DMCTN vs upstream Taste Skill

**Extension:** DMCTN Taste Skill v**0.2.11**  
**Upstream ref:** `Leonxlnx/taste-skill` @ `3c7017d` (local `_upstream/taste-skill/`)  
**Ngày audit:** 2026-06-01

---

## Baseline extension (Phase 0)

| Hạng mục | Giá trị |
|----------|---------|
| Version | **0.2.11** |
| Publisher | `buivantinh` / DMCTN Studio |
| Skills trong `assets/skills/` | **13** |
| Skill IDs | `taste-skill`, `redesign-skill`, `brandkit`, `taste-skill-v1`, `gpt-tasteskill`, `image-to-code-skill`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `soft-skill`, `minimalist-skill`, `brutalist-skill`, `stitch-skill`, `output-skill` |
| Minimal pack | 3 skill + core (`taste-skill`, `redesign-skill`, `brandkit`) |
| Dashboard tabs | 7 — Overview, Install, Skills, Prompts, Guide, Settings, About |
| Install modes | Minimal / Full / Custom |
| Prompt presets | 6 — `dashboard`, `landing`, `redesign`, `audit`, `mobile`, `marketplace` (alias `localbiz` → `marketplace`) |
| Tests | **52/52** PASS (`npm test`) |
| Marketplace (docs) | **PUBLISHED / PUBLIC** — live ~v0.2.10; sync package v0.2.11 pending upload |
| Runtime QA | FULL_PASS (VSIX/Cursor) + Marketplace public install PASS (dashboard) |

**Evidence paths:** `package.json`, `src/core/skills.ts`, `src/core/promptGenerator.ts`, `README.md`, `docs/RUNTIME_QA_REPORT.md`, `docs/MARKETPLACE_POST_UPLOAD_STATUS.md`

---

## So sánh độ sâu nội dung skill (byte)
## Skill content depth (bytes)

| Skill | Upstream `SKILL.md` | DMCTN `assets/skills/*/SKILL.md` | Depth ratio (approx.) |
|-------|--------------------:|---------------------------------:|----------------------:|
| taste-skill | 86.4 KB | 4.1 KB | **~5%** |
| taste-skill-v1 | 20.9 KB | 1.9 KB | ~9% |
| redesign-skill | 14.9 KB | 1.8 KB | ~12% |
| image-to-code-skill | 36.8 KB | 1.9 KB | ~5% |
| imagegen-frontend-web | 37.0 KB | 1.9 KB | ~5% |
| imagegen-frontend-mobile | 40.8 KB | 1.7 KB | ~4% |
| brandkit | 16.4 KB | 1.8 KB | ~11% |
| gpt-tasteskill | 7.7 KB | 2.0 KB | ~26% |
| soft-skill | 10.4 KB | 1.7 KB | ~16% |
| minimalist-skill | 7.8 KB | 1.6 KB | ~21% |
| brutalist-skill | 8.3 KB | 1.7 KB | ~20% |
| stitch-skill | 11.8 KB | 1.6 KB | ~14% |
| output-skill | 2.6 KB | 1.7 KB | ~65% |

**Kết luận:** Inventory **100%** (đủ 13 folder); độ sâu nội dung trung bình **~15%** so với upstream (ước lượng theo kích thước file).

---

## Bảng chấm coverage (100 điểm)
## Scoring table (100 points)

| Layer | Weight | Coverage % | Score | Evidence (DMCTN) | Gap chính |
|-------|-------:|-----------:|------:|------------------|-----------|
| 1. Strategy Layer | 10 | 78% | **7.8** | `README.md`, `assets/skills/taste-skill/SKILL.md`, `docs/*` | Thiếu `research/laziness` và site changelog upstream |
| 2. Brief / Design Read | 15 | 68% | **10.2** | `assets/cursor-rules/dmctn-taste-gate.mdc`, `assets/skills/taste-skill/SKILL.md` §0–1, `src/core/promptGenerator.ts` | Thiếu 6-signal inference đầy đủ, rule “một câu hỏi”, reference URL parsing |
| 3. Dial / Control | 10 | 72% | **7.2** | `taste-skill/SKILL.md` §2, gate DIALS, prompt §3 | Thiếu baseline 8/6/4 và bảng dial→output cross-ref |
| 4. Design System Layer | 15 | 36% | **5.4** | `taste-skill/SKILL.md` §3 (8 hệ ngắn) | Thiếu map package chính thức §2.A upstream, one-system rule, shadcn/Material paths |
| 5. Anti-pattern Layer | 15 | 58% | **8.7** | Gate + `taste-skill` anti-slop list | Thiếu em-dash ban, layout-repetition ban, split-header ban, Inter/Lucide policy |
| 6. Implementation Layer | 10 | 38% | **3.8** | Prompt: mobile/a11y/perf; skills ít stack detail | Thiếu RSC/Motion/GSAP skeletons, icon policy, scroll listener ban |
| 7. Specialized Skill Layer | 10 | 58% | **5.8** | `src/core/skills.ts`, 13× `assets/skills/` | Có đủ skill; nội dung rút gọn mạnh (đặc biệt image/*, taste-skill v2) |
| 8. Output / Review Layer | 10 | 52% | **5.2** | Gate VERDICT, prompt FINAL REPORT, `output-skill` | Thiếu Pre-Flight §14 (~30+ hạng mục), redesign audit chi tiết |
| 9. Distribution Layer | 5 | 90% | **4.5** | `src/core/installer.ts`, dashboard, Marketplace | Không thay `npx skills add`; **vượt** upstream cho VS Code/Cursor |

---

## Tổng điểm
## Total score

| Metric | Value |
|--------|------:|
| **Tổng điểm / Total score** | **58.6 / 100** |
| **Phần trăm áp dụng / Applied upstream capability** | **~59%** |

### Cách đọc con số

- **~59%** = DMCTN đã **bao phủ ý tưởng và inventory** upstream khá đầy đủ, nhưng **độ sâu rule** (đặc biệt core `taste-skill` v2, design system map, implementation, pre-flight) còn thấp hơn nhiều so với bản gốc.
- Extension **bù** bằng lớp Distribution + UX (installer, dashboard, song ngữ, QA docs) — không nằm trong 100 điểm upstream thuần skill markdown.

---

## Tầng chuyển hóa tốt
## Well-translated layers

| Tầng | Ghi chú |
|------|---------|
| Distribution | Installer Minimal/Full/Custom, detector, backup — **tốt hơn** upstream cho dev dùng VS Code/Cursor |
| Brief (cơ bản) | Taste Gate + Design Read template + 6 prompt presets |
| Anti-pattern (cơ bản) | Danh sách gradient/3-card/glass/hero trong gate |
| Specialized (inventory) | Đủ 13 skill ID khớp upstream |
| Việt hóa | Toàn bộ skill/gate/dashboard/prompt **VI/EN** — upstream chủ yếu EN |

---

## Tầng đơn giản hóa quá mức
## Over-simplified layers

| Tầng | Rủi ro |
|------|--------|
| taste-skill core | ~86 KB → ~4 KB — mất GSAP, pre-flight, block library, typography depth |
| Design System | Chỉ bảng tên hệ — không enforce package |
| Implementation | Agent có thể vẫn code “slop” vì thiếu stack/motion rules |
| imagegen / image-to-code | Mất pipeline chi tiết upstream |
| redesign-skill | Audit checklist ngắn vs upstream typography/color/layout sections |

---

## Kết luận
## Conclusion

**DMCTN Taste Skill hiện áp dụng được khoảng 59/100 (~59%)** khả năng upstream Taste Skill, measured by depth-weighted nine-layer rubric.

Đủ để **phân phối và khởi động** anti-slop trong project; **chưa đủ** để coi là bản tương đương đầy đủ **taste-skill v2 experimental** trên GitHub upstream.

Chi tiết gap và roadmap: `DMCTN_TASTE_SKILL_GAP_ANALYSIS.md`, `DMCTN_TASTE_SKILL_NEXT_UPGRADE_PLAN.md`.
