# Changelog
# Nhật ký thay đổi

Mọi thay đổi đáng chú ý của **DMCTN Taste Skill** được ghi tại đây.  
All notable changes to **DMCTN Taste Skill** are documented here.

Dự án tuân [Semantic Versioning](https://semver.org/).  
This project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.3.1] — Marketplace/GitHub Metadata Sync

### Thay đổi / Changed
- Sync GitHub README và Marketplace Overview metadata để thống nhất với **v0.3.0 public (runtime)**.
  Sync GitHub README and Marketplace Overview metadata to match **v0.3.0 public (runtime)**.

- Mark **Marketplace public runtime QA PASS** cho **v0.3.0** trong các docs hiện hành.
  Mark **Marketplace public runtime QA PASS** for **v0.3.0** in the current docs.

- Loại bỏ các trạng thái release cũ (0.2.9/0.2.10, RC/pending) khỏi trang release status hiện hành; giữ lịch sử đúng theo version.
  Remove stale release status (0.2.9/0.2.10, RC/pending) from the current release status pages; keep proper version history.

- Không đổi hành vi runtime. Chỉ metadata/docs/package version.
  No runtime behavior change. Only metadata/docs/package version.

- Đóng gói VSIX **0.3.1** để upload thủ công nhằm đồng bộ Marketplace Overview metadata.
  Package VSIX **0.3.1** for manual upload to sync Marketplace Overview metadata.

## [0.3.0] — Design Director Core (Core R1)
## [0.3.0] — Design Director Core (Core R1)

### Thay đổi / Changed
- **Taste Gate R2** — `dmctn-taste-gate.mdc`: Design Read, Taste Direction, UI Plan, Pre-Flight Lite, Anti-Slop, Self Review.  
  **Taste Gate R2** — expanded gate rule with full design-director flow.

- **taste-skill** — Developer Preset Pack (10 preset dev), Pre-Flight, component/system map; không preset ngành cá nhân trong core.  
  **taste-skill** — 10 developer presets, pre-flight, deeper anti-slop (no personal-industry presets in core).

- **redesign-skill** — 4 mode: Refresh / Refactor / Rebrand / Rebuild + output inventory bắt buộc.  
  **redesign-skill** — four redesign modes and mandatory audit output.

- **Skill mới** — `ui-review-skill` (Design QA Score 100), `component-taste` (14 component rule sets).  
  **New skills** — UI review scoring and component taste rules.

- **Prompt generator** — Gate R2 sections (UI Plan, Pre-Flight, ui-review); 6 preset dev-oriented (preset `localbiz` đổi thành `marketplace`).  
  **Prompt generator** — R2 gate sections; six developer-oriented presets (`localbiz` renamed to `marketplace`).

### RC Polish (pre-Marketplace upload)
- Preset **`marketplace`** thay legacy **`localbiz`** — Trang giới thiệu Marketplace / Marketplace Listing Page (developer-oriented).  
  **`marketplace`** preset replaces legacy **`localbiz`** — developer marketplace listing, not personal-industry local business.
- Alias `localbiz` → `marketplace` vẫn hoạt động cho state cũ.  
  Legacy `localbiz` id maps to `marketplace` for saved dashboard state.
- Loại `_upstream/` khỏi VSIX; cập nhật README/QA cho v0.3.0.  
  Exclude `_upstream/` from VSIX; README/QA aligned for v0.3.0 RC.

- **AGENTS.md** template đồng bộ Gate R2.  
  **AGENTS.md** template aligned with Gate R2.

### Ghi chú / Notes
- Không đổi hành vi installer/dashboard lớn; Full install = **15** skill.  
  No major dashboard redesign; Full install = **15** skills.

- Marketplace release/public runtime QA: **PASS** (v0.3.0 live).  
  Marketplace public runtime QA: **PASS** (v0.3.0 live).

---

## [0.2.11] — Chuẩn hóa Overview Marketplace
## [0.2.11] — Marketplace Overview Polish

### Thay đổi / Changed
- Polished the README overview for GitHub and Marketplace.  
  Chuẩn hóa phần Overview README cho GitHub và Marketplace.

- Marked Marketplace public install and dashboard-open QA as PASS.  
  Ghi nhận QA cài từ Marketplace và mở dashboard là PASS.

### Ghi chú / Notes
- No runtime behavior changes.  
  Không thay đổi hành vi runtime.

---

## [0.2.10] — Đồng bộ README Marketplace
## [0.2.10] — Marketplace README Sync

### Thay đổi / Changed
- Đồng bộ README trong gói Marketplace với tài liệu GitHub đã public.  
  Synced Marketplace package README with the published GitHub documentation.

- Cập nhật trạng thái phát hành thành **PUBLISHED / PUBLIC**.  
  Updated release status to **PUBLISHED / PUBLIC**.

- Bốn ảnh `store-assets/*.png` được đóng gói trong VSIX để README Marketplace hiển thị ảnh tương đối.  
  Four `store-assets/*.png` screenshots bundled in the VSIX for relative README image paths.

### Ghi chú / Notes
- **Không** thay đổi hành vi runtime.  
  **No** runtime behavior changes.

- Upload thủ công `dmctn-taste-skill-0.2.10.vsix` lên Marketplace (không publish CLI).  
  Manual upload of `dmctn-taste-skill-0.2.10.vsix` to Marketplace (no CLI publish).

---

## [0.2.9] — Ảnh Marketplace sẵn sàng
## [0.2.9] — Marketplace screenshots ready

### Thêm / Added
- 4 ảnh có đóng dấu thương hiệu trong `store-assets/` (1600×900) cho README và listing.  
  Four branded screenshots in `store-assets/` (1600×900) for README and Marketplace listing.

- README nhúng ảnh thật; `docs/STORE_LISTING.md` trạng thái **READY**.  
  README embeds real images; `docs/STORE_LISTING.md` screenshot status **READY**.

### Phát hành / Release
- Đã tạo GitHub Release và đính kèm VSIX.  
  GitHub Release created and VSIX attached.

- Đã upload Marketplace; đang chờ xác minh.  
  Marketplace upload submitted; verification pending.

- Marketplace **Published / Public** — v0.2.9, tìm kiếm công khai.  
  Marketplace **Published / Public** — v0.2.9, publicly searchable.

### Ghi chú / Notes
- **Không** thay đổi hành vi runtime.  
  **No** runtime behavior changes.

- Thư mục nguồn `dmctn_taste_skill_store_assets_branded/` không commit (chỉ bản copy trong `store-assets/`).  
  Source folder `dmctn_taste_skill_store_assets_branded/` is gitignored.

---

## [0.2.8] — Dashboard visual polish
## [0.2.8] — Dashboard visual polish

### Thay đổi / Changed
- Tinh chỉnh layout, spacing, hierarchy và mật độ nội dung dashboard (Overview, Install, Skills, Prompt, Guide, Settings, About).  
  Refined dashboard layout, spacing, hierarchy, and visual density for Marketplace screenshots.

- Design tokens sâu hơn (`--dm-bg-elevated`, shadow nhẹ, button hierarchy rõ).  
  Deeper design tokens and clearer button hierarchy.

### Ghi chú / Notes
- **Không** đổi logic install/update/remove/prompt.  
  **No** install/update/remove/prompt behavior changes.

---

## [0.2.7] — Logo + dashboard Việt Nam hiện đại
## [0.2.7] — Logo mapping + modern Vietnamese dashboard

### Thêm / Added
- Asset logo chính thức: `media/icon.png` (128×128), `media/dmctn-taste-logo.png`, `media/dmctn-taste-logo-dashboard.png`.  
  Final logo assets mapped into `media/` for VSIX and dashboard.

### Thay đổi / Changed
- Dashboard dùng logo qua `webview.asWebviewUri`; phong cách developer tool Việt Nam hiện đại (xanh tre, vàng kim, đỏ trầm).  
  Dashboard loads logo via webview URI; modern Vietnamese visual language.

- Tab Install: badge **Khuyên dùng** / **Recommended** cho gói Full.  
  Install tab: **Recommended** badge on Full pack.

### Ghi chú / Notes
- **Không** đổi logic install/update/remove/prompt.  
  **No** install/update/remove/prompt behavior changes.

- `incoming-assets/` excluded from VSIX (source copies only).  
  `incoming-assets/` excluded from VSIX.

---

## [0.2.6] — Dashboard UX redesign
## [0.2.6] — Dashboard UX redesign

### Thay đổi / Changed
- Thiết kế lại shell dashboard, design tokens (`--dm-*`), sidebar, status banner, progress skill.  
  Redesigned dashboard shell, design tokens, sidebar, status banner, skill progress bar.

- Icon slots CSS (placeholder) cho phase map icon sau — `.dm-icon--overview` … `--about`.  
  CSS icon slots prepared for next icon mapping phase.

- Cải thiện UX tab: Overview, Install, Skills (nhóm + lọc), Prompt, Guide (3 card), Settings, About (privacy grid).  
  Improved Overview, Install, Skills (groups + filter), Prompt, Guide, Settings, About tabs.

### Ghi chú / Notes
- **Không** thay đổi hành vi install/update/remove/prompt.  
  **No** runtime behavior changes for install/update/remove/prompt.

---

## [0.2.5] — Tài liệu song ngữ
## [0.2.5] — Bilingual documentation

### Thay đổi / Changed
- Chuẩn hóa README và toàn bộ docs hỗ trợ theo format **Việt dòng trên, Anh dòng dưới**.  
  README and support docs standardized as **Vietnamese line above, English line below**.

- Cập nhật: `docs/PUBLISH_CHECKLIST.md`, `docs/STORE_LISTING.md`, `docs/SCREENSHOT_GUIDE.md`, `docs/RUNTIME_QA_REPORT.md`, `docs/RUNTIME_QA_CHECKLIST.md`, `store-assets/README.md`.  
  Updated publish checklist, store listing, screenshot guide, runtime QA docs, and store-assets README.

### Ghi chú / Notes
- **Không** thay đổi logic extension so với 0.2.4.  
  **No** extension behavior changes from 0.2.4.

- Publisher Marketplace vẫn là `buivantinh`.  
  Marketplace `publisher` remains `buivantinh`.

---

## [0.2.4] — Sẵn sàng kho mã
## [0.2.4] — Repository ready

### Sửa / Fixed
- Metadata trỏ repo chính thức: **https://github.com/dienlanhvietnam-lang/dmctn-taste-skill**  
  Repository metadata points to the official public repo.

- VSIX sau cập nhật metadata (`dmctn-taste-skill-0.2.4.vsix`).  
  Regenerated VSIX after metadata update.

### Ghi chú / Notes
- Không đổi runtime so với 0.2.3.  
  No runtime changes from 0.2.3.

---

## [0.2.3] — Store + repo
## [0.2.3] — Store + repo ready

### Thêm / Added
- `package.json` repository / homepage / bugs → repo chính thức (cập nhật đầy đủ ở 0.2.4).  
  Repository URLs in `package.json`.

- Hướng dẫn 4 ảnh: `dashboard-overview`, `install-skills`, `prompt-output`, `coding-result`.  
  Store asset guide for 4 screenshots.

### Đổi / Changed
- `docs/RUNTIME_QA_REPORT.md` → **FULL_PASS**.  
  Runtime QA report → **FULL_PASS**.

- README cấu trúc cho người dùng mới.  
  README restructured for new users.

### Ghi chú / Notes
- Chỉ metadata và docs; ảnh `store-assets/` vẫn thiếu.  
  Documentation only; `store-assets/` PNGs still missing.

---

## [0.2.2] — Runtime polish
## [0.2.2] — Runtime polish

### Sửa / Fixed
- Tab **Prompt mẫu**; output tự sinh; copy + toast; detector Minimal / Full / Partial.  
  Prompt tab auto-output, copy toast, clearer detector states.

---

## [0.2.1] — Cổng publish
## [0.2.1] — Publish gate

### Thêm / Added
- Icon 128×128; checklist publish; store listing; screenshot guide; QA report template.  
  Marketplace icon, publish docs, store listing, screenshot guide.

---

## [0.2.0] — Release candidate
## [0.2.0] — Release candidate

### Thêm / Added
- 13 skill; 3 chế độ cài; dashboard 7 tab; 6 preset prompt; settings mới.  
  Full pack, install modes, dashboard, prompt presets, new settings.

---

## [0.1.0] — MVP
## [0.1.0] — MVP

### Thêm / Added
- Extension ban đầu: dashboard, detector, installer, updater, 3 skill.  
  Initial extension with bilingual dashboard and core tooling.
