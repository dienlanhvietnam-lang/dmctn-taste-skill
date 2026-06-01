# Runtime QA Checklist — DMCTN Taste Skill

Manual smoke test inside a real VS Code / Cursor window (Extension Development Host).
Automated runtime smoke (`src/test/activation.test.ts`) already covers activation, command
registration, dashboard HTML and minimal install. This checklist covers the visual/UX parts a
headless test cannot verify.

## Setup
1. Open this extension folder in VS Code / Cursor.
2. Run `npm install` then press `F5` to launch the Extension Development Host.
3. In the new window, open an **empty temp folder** as the workspace.

## Steps

| # | Action | Expected | Pass? |
|---|--------|----------|-------|
| 1 | Open temp project | Startup popup: "Project này chưa có DMCTN Taste Skill..." with Install / Open Dashboard / Never Ask | ☐ |
| 2 | Click **Install** | Quick pick appears (Minimal / Full / Custom) | ☐ |
| 3 | Pick **Minimal** | `.cursor/rules/dmctn-taste-gate.mdc`, `skills/{taste-skill,redesign-skill,brandkit}`, `AGENTS.md`, `examples/prompt-cursor.md` created | ☐ |
| 3b | (Optional fresh temp folder) Install **Full** | All **13** skills under `skills/`, plus `docs/` gate files | ☐ |
| 4 | Check status bar | Shows "Taste Skill: Installed" (green) | ☐ |
| 5 | Run command **DMCTN Taste: Open Dashboard** | Dashboard opens with 7 tabs | ☐ |
| 6 | Settings → switch language Auto/VI/EN → Save | All labels switch language immediately | ☐ |
| 7 | Skills tab | Lists 13 skills with state (included/missing/modified) | ☐ |
| 8 | Skills tab → tick a few → Install Selected | Only selected skills appear under `skills/` | ☐ |
| 9 | Prompts tab → choose preset + name → Generate | Prompt with Design Read / Anti-slop / Mobile / A11y / Security / VERDICT shown | ☐ |
| 10 | Prompts tab → Copy | Clipboard contains the prompt (paste to verify) | ☐ |
| 11 | Edit `AGENTS.md` manually, then Install tab → Update Skills | Prompt to overwrite modified files; on confirm, backup created in `.dmctn/taste-skill-backups/` | ☐ |
| 12 | About tab → Remove from Project | Confirm modal; managed files removed, your own files kept; status bar → Missing | ☐ |
| 13 | Re-open project with `dmctnTaste.neverAskInstall = true` | No startup popup | ☐ |
| 14 | Repeat steps 1–5 in **Cursor** | Same behavior as VS Code | ☐ |

## Safety verifications
- ☐ No file written before an explicit confirmation/click.
- ☐ No network request made (check no outbound traffic).
- ☐ No secret/token read or logged.
- ☐ Update never overwrote a modified file without asking.

Record the outcome in **`docs/RUNTIME_QA_REPORT.md`** (set status to PASS or FAIL; do not leave PENDING_MANUAL after a real run).
Template backup: `docs/RUNTIME_QA_REPORT_TEMPLATE.md`.
