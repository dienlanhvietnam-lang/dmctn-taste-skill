# Store assets — Marketplace / Open VSX

Screenshots for **store listing upload only**. This folder is **excluded from the `.vsix`** (see `.vscodeignore`).

## Required files

| File | Use in listing | What to show |
|------|----------------|--------------|
| `dashboard-overview.png` | Primary / gallery #1 | **Overview** tab — status **Đã cài đủ (Full)**, Install Minimal/Full, bilingual UI |
| `install-skills.png` | Gallery #2 | **Install** (3 packs) **or** **Skills** tab with 13 skills + included/missing badges |
| `prompt-output.png` | Gallery #3 | **Prompt mẫu** tab — preset dropdown, **non-empty Output**, Tạo prompt + Sao chép prompt |
| `coding-result.png` | Gallery #4 / README | Agent output or redesigned UI (e.g. `index.html`) showing Design Read / anti-slop — **not** a fake mockup |

## Current status

| File | Status |
|------|--------|
| `dashboard-overview.png` | **Missing** — capture per `docs/SCREENSHOT_GUIDE.md` |
| `install-skills.png` | **Missing** |
| `prompt-output.png` | **Missing** |
| `coding-result.png` | **Missing** |

Do **not** commit placeholder PNGs labeled as real product screenshots.

## Capture

1. F5 Extension Development Host in Cursor/VS Code.
2. Full install → open Dashboard.
3. Crop to webview only (~1280×720), save here.
4. Upload same files in [Marketplace publisher portal](https://marketplace.visualstudio.com/manage) or Open VSX.

## Also ship

- Extension icon: `media/icon.png` (128×128, inside VSIX)
- Listing copy: `docs/STORE_LISTING.md`
