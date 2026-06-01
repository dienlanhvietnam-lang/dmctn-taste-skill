# Checklist phát hành — DMCTN Taste Skill
# Publish checklist — DMCTN Taste Skill

Dùng checklist này trước khi đăng lên **Visual Studio Marketplace**.  
Use this checklist before publishing to **Visual Studio Marketplace**.

**Không** commit token, PAT, hoặc file `.env` chứa secret.  
**Do not** commit tokens, PATs, or `.env` files with secrets.

---

## Trạng thái phát hành v0.2.9
## Release status v0.2.9

| Bước / Step | Trạng thái / Status |
|-------------|---------------------|
| GitHub repo public | ✅ **DONE** |
| GitHub Release v0.2.9 | ✅ **DONE** |
| VSIX attached to Release | ✅ **DONE** — `dmctn-taste-skill-0.2.9.vsix` |
| Marketplace upload | ✅ **DONE** |
| Marketplace verification | ✅ **DONE** |
| Marketplace published (public search) | ✅ **DONE** — v0.2.9 |
| Public listing QA (install from store) | ⏳ **PENDING** |

Chi tiết sau upload: [`MARKETPLACE_POST_UPLOAD_STATUS.md`](MARKETPLACE_POST_UPLOAD_STATUS.md)  
Post-upload details: [`MARKETPLACE_POST_UPLOAD_STATUS.md`](MARKETPLACE_POST_UPLOAD_STATUS.md)

---

## GitHub — Kho mã nguồn
## GitHub — Repository

Metadata trong `package.json` trỏ tới:  
Metadata in `package.json` points to:

**https://github.com/dienlanhvietnam-lang/dmctn-taste-skill**

Remote chính thức / Official remote:  
`https://github.com/dienlanhvietnam-lang/dmctn-taste-skill.git`

Trước khi publish Marketplace, xác nhận:  
Before Marketplace publish, confirm:

1. Repo **public** và nhánh `main` đã đồng bộ.  
   Repo is **public** and `main` is up to date.

2. Không token, `.env`, hay secret trong repo.  
   No tokens, `.env`, or secrets in the repository.

3. Đã upload `store-assets/*.png` khi ảnh sẵn sàng.  
   `store-assets/*.png` uploaded when screenshots are ready.

---

## Ảnh minh họa — Screenshot
## Screenshot

- [ ] Đã đọc `docs/SCREENSHOT_GUIDE.md`  
- [ ] Read `docs/SCREENSHOT_GUIDE.md`

- [x] 4 file PNG trong `store-assets/` (1600×900, branded)  
- [x] Four PNG files in `store-assets/` (1600×900, branded)

- [x] `store-assets/README.md` — bảng trạng thái = **Present**  
- [x] `store-assets/README.md` status table = **Present**

- [x] README root nhúng ảnh `./store-assets/*.png`  
- [x] Root README embeds `./store-assets/*.png` images

---

## VSIX — Đóng gói
## VSIX — Package

- [ ] `npm run compile` — PASS  
- [ ] `npm run compile` — PASS

- [ ] `npm test` — PASS  
- [ ] `npm test` — PASS

- [ ] `npm run package` → `dmctn-taste-skill-<version>.vsix` (không cảnh báo icon)  
- [ ] `npm run package` → `dmctn-taste-skill-<version>.vsix` (no icon size warnings)

- [ ] `media/icon.png` — **128×128**, **&lt; 80 KB**  
- [ ] `media/icon.png` is **128×128**, **&lt; 80 KB**

- [ ] Runtime QA — xem `docs/RUNTIME_QA_REPORT.md` (không `PENDING_MANUAL`)  
- [ ] Runtime QA — see `docs/RUNTIME_QA_REPORT.md` (not `PENDING_MANUAL`)

- [ ] Ghi công upstream: Leonxlnx/taste-skill (MIT)  
- [ ] Upstream credit: Leonxlnx/taste-skill (MIT)

---

## Điều kiện chung
## Prerequisites

- [ ] `repository` trong `package.json` → repo **public** trên GitHub  
- [ ] `repository` in `package.json` → repo **public** on GitHub

- [ ] README có link repo và mục ảnh minh họa  
- [ ] README has repository link and screenshot section

---

## Bảo mật
## Security

- [ ] Không `PAT`, `token`, `api_key`, `secret`, `.env` trong repo hoặc VSIX  
- [ ] No `PAT`, `token`, `api_key`, `secret`, or `.env` in repo or VSIX

- [ ] Nếu token từng lộ — **thu hồi và tạo mới** ngay  
- [ ] If a token was exposed — **revoke and rotate** immediately

- [ ] Lệnh publish chỉ chạy trên máy tin cậy; không dán token vào source  
- [ ] Publish commands on a trusted machine only; never paste tokens into source files

---

## Visual Studio Marketplace
## Visual Studio Marketplace

1. Tạo publisher tại https://marketplace.visualstudio.com/manage  
   Create publisher at https://marketplace.visualstudio.com/manage

   - Publisher ID khớp `package.json` → `"publisher": "buivantinh"`  
   - Publisher ID must match `package.json` → `"publisher": "buivantinh"`

2. Tạo **Personal Access Token** trên Azure DevOps:  
   Create a **Personal Access Token** in Azure DevOps:

   - Scope: **Marketplace** → **Manage**  
   - Scope: **Marketplace** → **Manage**

   - Lưu PAT trong password manager — **không** trong git  
   - Store the PAT in a password manager only — **never** in git

3. Cài công cụ (một lần): `npm install -g @vscode/vsce`  
   Install tooling (once): `npm install -g @vscode/vsce`

4. Đóng gói cục bộ:  
   Package locally:

   ```bash
   npm run package
   ```

5. Publish (thay `<PAT>` lúc chạy — không lưu vào file):  
   Publish (replace `<PAT>` at runtime — do not save in files):

   ```bash
   vsce publish -p <PAT>
   ```

   Hoặc upload `.vsix` thủ công trên portal publisher.  
   Or upload the `.vsix` manually in the publisher portal.

6. Điền listing từ `docs/STORE_LISTING.md`:  
   Fill listing from `docs/STORE_LISTING.md`:

   - Mô tả ngắn / dài (EN + VI nếu muốn)  
   - Short/long description (EN + VI if desired)

   - Category, keywords, privacy  
   - Category, keywords, privacy statement

   - Icon 128×128 và ảnh (~1280×720)  
   - Icon (128×128) and screenshots (~1280×720)

7. Kiểm tra trang extension sau publish (cài từ Marketplace profile sạch).  
   Verify the extension page after publish (install from Marketplace in a clean profile).

---

## Sau khi publish
## Post-publish

- [x] Tag / GitHub Release: `v0.2.9` + VSIX  
- [x] Tag / GitHub Release: `v0.2.9` + VSIX attached

- [x] Marketplace upload submitted (v0.2.9)  
- [x] Marketplace upload submitted (v0.2.9)

- [x] Docs cập nhật trạng thái **Published** / **PUBLIC**  
- [x] Docs updated to **Published** / **PUBLIC**

- [ ] Smoke-install từ Marketplace public trên VS Code **và** Cursor  
- [ ] Smoke-install from public Marketplace in VS Code **and** Cursor

---

## Post-publish QA
## Post-publish QA

Chạy **sau khi** listing **Published** và tìm kiếm công khai được.  
Run **after** the listing is **Published** and publicly searchable.

1. [x] Marketplace verification hoàn tất — listing public.  
   [x] Marketplace verification complete — listing is public.

2. Mở trang extension public trên Marketplace.  
   Open the public extension page on Marketplace.

3. Cài extension từ Marketplace vào VS Code hoặc Cursor (profile sạch nếu có thể).  
   Install from Marketplace in VS Code or Cursor (clean profile if possible).

4. Mở dashboard — lệnh **DMCTN Taste: Open Dashboard**.  
   Open the dashboard via **DMCTN Taste: Open Dashboard**.

5. Cài **Full** (13/13 skill) vào project test.  
   Run **Full** install (13/13 skills) in a test project.

6. Tạo prompt mẫu — tab Prompt / generator.  
   Generate a sample prompt from the Prompt tab.

7. Kiểm tra README và ảnh trên listing hiển thị đúng.  
   Verify README and listing screenshots render correctly.

8. Ghi kết quả vào `docs/RUNTIME_QA_REPORT.md`: **FULL_PASS** hoặc **FAIL**.  
   Record outcome in `docs/RUNTIME_QA_REPORT.md`: **FULL_PASS** or **FAIL**.

---

## Xoay token (nếu bị lộ)
## Token rotation (if exposed)

1. Thu hồi PAT/token bị lộ trên UI nhà cung cấp ngay lập tức.  
   Revoke the leaked PAT/token in the provider UI immediately.

2. Tạo token mới với scope tối thiểu.  
   Generate a new token with minimum scope.

3. Không commit; chỉ cập nhật kho secret cục bộ / CI vault.  
   Do not commit; update only your local secret store / CI vault.
