# Changelog
# Nhật ký thay đổi

Mọi thay đổi đáng chú ý của **DMCTN Taste Skill** được ghi tại đây.  
All notable changes to **DMCTN Taste Skill** are documented here.

Dự án tuân [Semantic Versioning](https://semver.org/).  
This project adheres to [Semantic Versioning](https://semver.org/).

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
