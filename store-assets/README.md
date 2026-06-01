# Tài nguyên cửa hàng — Marketplace / Open VSX
# Store assets — Marketplace / Open VSX

Ảnh dùng **chỉ để upload listing** — thư mục này **không** đóng gói trong `.vsix` (xem `.vscodeignore`).  
Screenshots for **store listing upload only**. This folder is **excluded from the `.vsix`** (see `.vscodeignore`).

---

## Bốn file bắt buộc
## Required files

| File | Dùng trong listing / Use in listing | Nội dung cần thể hiện / What to show |
|------|-------------------------------------|--------------------------------------|
| `dashboard-overview.png` | Ảnh chính / gallery #1 | Tab **Tổng quan** — **Đã cài đủ (Full)**, nút Minimal/Full, UI song ngữ |
| `install-skills.png` | Gallery #2 | Tab **Cài đặt** (3 gói) **hoặc** **Bộ skill** — 13 skill + badge |
| `prompt-output.png` | Gallery #3 | Tab **Prompt mẫu** — preset, **Output không trống**, Tạo + Sao chép prompt |
| `coding-result.png` | Gallery #4 / README | Kết quả agent hoặc UI redesign (vd. `index.html`) — Design Read / anti-slop — **không** mockup giả |

---

## Trạng thái hiện tại
## Current status

| File | Trạng thái / Status |
|------|---------------------|
| `dashboard-overview.png` | **Thiếu / Missing** — chụp theo `docs/SCREENSHOT_GUIDE.md` |
| `install-skills.png` | **Thiếu / Missing** |
| `prompt-output.png` | **Thiếu / Missing** |
| `coding-result.png` | **Thiếu / Missing** |

**Không** commit placeholder PNG gắn nhãn ảnh sản phẩm thật.  
**Do not** commit placeholder PNGs labeled as real product screenshots.

---

## Cách chụp
## Capture

1. **F5** Extension Development Host trong Cursor/VS Code.  
   **F5** Extension Development Host in Cursor/VS Code.

2. Cài Full → mở Dashboard.  
   Full install → open Dashboard.

3. Crop chỉ webview (~1280×720), lưu tại đây.  
   Crop to webview only (~1280×720), save here.

4. Upload cùng file trên [portal publisher Marketplace](https://marketplace.visualstudio.com/manage) hoặc Open VSX.  
   Upload the same files in the [Marketplace publisher portal](https://marketplace.visualstudio.com/manage) or Open VSX.

---

## Đi kèm khi publish
## Also ship

- Icon extension: `media/icon.png` (128×128, trong VSIX)  
- Extension icon: `media/icon.png` (128×128, inside VSIX)

- Nội dung listing: `docs/STORE_LISTING.md`  
- Listing copy: `docs/STORE_LISTING.md`
