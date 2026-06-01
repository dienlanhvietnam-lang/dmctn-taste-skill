# Hướng dẫn chụp ảnh — DMCTN Taste Skill
# Screenshot guide — DMCTN Taste Skill

Chỉ dùng **UI thật** — không dùng mockup AI gắn nhãn sản phẩm.  
**Real UI only** — no AI mockups labeled as product shots.

---

## Bốn ảnh cần tạo (`store-assets/`)
## Four files to create (`store-assets/`)

| File | Tab / chủ đề / Tab / subject |
|------|------------------------------|
| `dashboard-overview.png` | Tab **Tổng quan** — trạng thái Full, nút cài / **Overview** — Full status, install buttons |
| `install-skills.png` | Tab **Cài đặt** **hoặc** **Bộ skill** (13 skill) / **Install** **or** **Skills** (13 skills) |
| `prompt-output.png` | Tab **Prompt mẫu** — ô Output có nội dung / **Prompt mẫu** — filled Output textarea |
| `coding-result.png` | Kết quả agent — Design Read / trang redesign (vd. `index.html`) / Agent Design Read / redesigned page |

---

## Crop đúng / Crop sai
## Correct crop / Incorrect crop

### Crop đúng / Correct

- Cắt khung **webview dashboard** hoặc **kết quả trình duyệt** — không lấy toàn bộ khung IDE.  
  Crop to the **dashboard webview** or **browser result** — not the full IDE chrome.

- Tỷ lệ mục tiêu ~**1280×720** (16:9), PNG, **&lt; 500 KB** mỗi ảnh nếu có thể.  
  Target ~**1280×720** (16:9), PNG, **&lt; 500 KB** each when possible.

- Không lộ secret, token, đường dẫn riêng tư trong khung hình.  
  No secrets, tokens, or private paths visible in frame.

- Chữ rõ, tab đúng tên (vd. **Prompt mẫu**, không typo).  
  Text readable; correct tab labels (e.g. **Prompt mẫu**, not typos).

### Crop sai / Incorrect

- Chụp full màn hình Cursor/VS Code — sidebar, terminal, chat chiếm hết ảnh.  
  Full-screen IDE capture — sidebar, terminal, chat dominate the image.

- Ảnh mờ, quá nhỏ, hoặc mockup không phải sản phẩm thật.  
  Blurry, too small, or non-product mockups.

- Placeholder PNG commit vào repo với nhãn “ảnh thật”.  
  Placeholder PNGs committed as “real” product shots.

---

## Các bước chụp
## Steps

1. Mở thư mục extension → `npm install` → **F5** (Extension Development Host).  
   Open extension root → `npm install` → **F5**.

2. Workspace tạm → **Cài Full** → trạng thái **13/13**.  
   Temp workspace → **Install Full** → status **13/13**.

3. **DMCTN Taste: Open Dashboard** → chụp Tổng quan, Cài đặt/Bộ skill, Prompt mẫu.  
   **DMCTN Taste: Open Dashboard** → capture Overview, Install/Skills, Prompt mẫu.

4. Chạy agent trên task UI → chụp riêng `coding-result.png`.  
   Run agent on a UI task → capture `coding-result.png` separately.

---

## Sau khi chụp
## After capture

- Cập nhật `store-assets/README.md` — trạng thái **Present**.  
  Update `store-assets/README.md` status table to **Present**.

- Tham chiếu ảnh trong README gốc (đường dẫn hoạt động trên GitHub khi push).  
  Reference images in root `README.md` (paths work on GitHub when pushed).

- Upload lên UI listing Marketplace / Open VSX.  
  Upload to Marketplace / Open VSX listing UI.
