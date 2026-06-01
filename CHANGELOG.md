# Changelog

All notable changes to **DMCTN Taste Skill** are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.4] — Repository Ready

### Fixed
- Repository metadata points to the official public repo:  
  **https://github.com/dienlanhvietnam-lang/dmctn-taste-skill**
- Regenerated VSIX after metadata update (`dmctn-taste-skill-0.2.4.vsix`).

### Notes
- No runtime or extension feature changes from 0.2.3.
- Marketplace `publisher` remains `buivantinh` (can differ from GitHub org owner).

## [0.2.3] — Store + Repo Ready

### Added
- `package.json` **repository** / homepage / bugs → `https://github.com/dienlanhvietnam-lang/dmctn-taste-skill` (updated in 0.2.4)
- Store asset guide for 4 screenshots: `dashboard-overview`, `install-skills`, `prompt-output`, `coding-result`
- README restructured for new users (What / Why / Quick Start / Screenshots / FAQ)

### Changed
- `docs/RUNTIME_QA_REPORT.md` → **FULL_PASS** (Cursor runtime + coding application QA evidence)
- `docs/STORE_LISTING.md`, `store-assets/README.md`, `docs/SCREENSHOT_GUIDE.md` aligned to 4-image set
- `docs/PUBLISH_CHECKLIST.md` — repo must be **public on GitHub** before Marketplace publish

### Fixed
- `.vscodeignore` excludes `TEST-TASTE-CODING/` and demo paths from VSIX (package hygiene).

### Notes
- No new extension features; documentation and publish metadata only.
- Screenshots still **missing** in `store-assets/` until captured — see guide.
- **Do not publish** until repo is **public on GitHub** and PNGs are uploaded.


## [0.2.2] — Runtime Polish

### Fixed
- Sidebar/tab label **Prompt mẫu** (i18n verified; no “Promt” typo).
- **Prompt tab** auto-generates output when opened, when preset changes, and when project name changes (debounced).
- **Copy prompt** via extension host clipboard + short toast (“Đã copy” / “Copied”).
- **Detector** distinguishes **Minimal installed**, **Full installed**, and **Partial** (core + 13 skills for Full).

### Changed
- Status labels: “Đã cài đủ (Full)”, “Đã cài Minimal”, clearer partial hint + skill count in dashboard.
- Prompt output textarea taller, monospace; shared `promptGenerator` for dashboard and command palette.
- Runtime QA report updated to **PARTIAL_PASS** with Cursor dashboard evidence.

## [0.2.1] — Publish Gate

### Changed
- Replaced `media/icon.png` with a **128×128** PNG (&lt; 80 KB), DMCTN palette (bamboo green / royal gold / deep red).
- `.vscodeignore` excludes `store-assets/` from VSIX (listing-only assets).

### Added
- `docs/PUBLISH_CHECKLIST.md` — Marketplace + Open VSX steps (no real tokens in repo).
- `docs/STORE_LISTING.md` — EN/VI listing copy, privacy, upstream credit.
- `docs/SCREENSHOT_GUIDE.md` — how to capture real dashboard screenshots.
- `docs/RUNTIME_QA_REPORT.md` — honest **PENDING_MANUAL** until real F5 QA by owner.
- `store-assets/README.md` — screenshot filenames for store upload.
- `src/test/icon.test.ts` — asserts icon dimensions and size.

### Notes
- No feature changes to installer/dashboard logic from 0.2.0.
- Still no fake `repository` URL; add a real repo before publish.

## [0.2.0] — Release Candidate

### Added
- Full skill pack sourced from `taste-skill-vi-dmctn`: **13 skills** in an internal registry
  (`taste-skill`, `taste-skill-v1`, `gpt-tasteskill`, `image-to-code-skill`,
  `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit`, `redesign-skill`, `soft-skill`,
  `output-skill`, `minimalist-skill`, `brutalist-skill`, `stitch-skill`).
- Three install modes: **Minimal**, **Full**, **Custom** (pick skills from the dashboard).
- New **Skills** dashboard tab showing per-skill state: included / missing / modified.
- Prompt generator expanded to **6 presets** (Dashboard UI, Landing Page, Redesign Existing UI,
  Full UI Audit, Mobile-first App, Local Business Website), each enforcing Design Read,
  anti-AI-slop checklist, mobile-first, accessibility, performance, security and a PASS/FAIL report.
- New settings: `dmctnTaste.defaultPack`, `dmctnTaste.backupBeforeUpdate`.
- Runtime smoke test (`activation.test.ts`) running the real `activate()` against a `vscode` mock.
- Runtime QA checklist and report template in `docs/`.
- Marketplace metadata, bilingual README, CHANGELOG, placeholder icon and upstream credits.

### Changed
- Dashboard redesigned for newcomers; calmer DMCTN palette (bamboo green / deep red / royal gold),
  no purple gradients or glassmorphism.
- Updater now syncs only installed skills and supports the backup toggle.

### Safety
- Still fully local: no telemetry, no network, no secret/token reads, no silent file writes.

## [0.1.0] — MVP

### Added
- Initial extension: bilingual dashboard, detector, installer, updater with backup, remove,
  prompt generator (3 presets), status bar and 7 commands. 3 bundled skills.
