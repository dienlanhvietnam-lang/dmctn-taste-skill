# Checklist phát hành — DMCTN Taste Skill
# Publish checklist — DMCTN Taste Skill

Dùng checklist này trước khi đăng lên **Visual Studio Marketplace** hoặc **Open VSX**.  
Use this checklist before publishing to **Visual Studio Marketplace** or **Open VSX**.

**Không** commit token, PAT, hoặc file `.env` chứa secret.  
**Do not** commit tokens, PATs, or `.env` files with secrets.

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

- [ ] 4 file PNG trong `store-assets/` (không placeholder giả)  
- [ ] Four PNG files in `store-assets/` (no fake placeholders)

- [ ] `store-assets/README.md` — bảng trạng thái = **Present**  
- [ ] `store-assets/README.md` status table = **Present**

- [ ] README root tham chiếu đúng đường dẫn ảnh  
- [ ] Root README references correct image paths

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

## Điều kiện chung (cả hai store)
## Prerequisites (both stores)

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

## Open VSX
## Open VSX

1. Tạo tài khoản / namespace tại https://open-vsx.org/  
   Create account / namespace at https://open-vsx.org/

2. Tạo token **Eclipse Open VSX** (lưu an toàn, không commit)  
   Create an **Eclipse Open VSX** access token (store securely, never commit)

3. Cài: `npm install -g ovsx`  
   Install: `npm install -g ovsx`

4. Đóng gói: `npm run package`  
   Package: `npm run package`

5. Publish (chỉ thay token lúc chạy):  
   Publish (substitute token at runtime only):

   ```bash
   ovsx publish dmctn-taste-skill-<version>.vsix -p <OPEN_VSX_TOKEN>
   ```

6. Dùng cùng nội dung listing và ảnh như Marketplace khi áp dụng được.  
   Use the same listing copy and screenshots as Marketplace where applicable.

---

## Sau khi publish
## Post-publish

- [ ] Tag git: `v0.2.x`  
- [ ] Tag release in git: `v0.2.x`

- [ ] (Tùy chọn) Đính `.vsix` vào GitHub Release  
- [ ] (Optional) Attach `.vsix` to GitHub Release

- [ ] Cập nhật `CHANGELOG.md` với ngày publish  
- [ ] Update `CHANGELOG.md` with publish date

- [ ] Smoke-install từ store trên VS Code **và** Cursor  
- [ ] Smoke-install from store in VS Code **and** Cursor

---

## Xoay token (nếu bị lộ)
## Token rotation (if exposed)

1. Thu hồi PAT/token bị lộ trên UI nhà cung cấp ngay lập tức.  
   Revoke the leaked PAT/token in the provider UI immediately.

2. Tạo token mới với scope tối thiểu.  
   Generate a new token with minimum scope.

3. Không commit; chỉ cập nhật kho secret cục bộ / CI vault.  
   Do not commit; update only your local secret store / CI vault.
