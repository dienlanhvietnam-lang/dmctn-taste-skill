# DMCTN Taste Skill

[![Version](https://img.shields.io/badge/version-0.2.4-blue)](https://github.com/dienlanhvietnam-lang/dmctn-taste-skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Anti-slop UI skills for Cursor, VS Code agents, Claude Code, and Codex.**  
Install a curated taste-skill pack into your project so AI agents stop shipping generic, look-alike interfaces.

Repository: **https://github.com/dienlanhvietnam-lang/dmctn-taste-skill**

---

## What is DMCTN Taste Skill?

A **local-only** VS Code / Cursor extension with a bilingual dashboard (Vietnamese / English). It installs:

- **Cursor rules** — `dmctn-taste-gate.mdc` (Taste Gate: Design Read before UI code)
- **13 agent skills** — taste, redesign, brandkit, GPT/Codex variants, image-to-code, style presets, output enforcement, and more
- **`AGENTS.md`** and **prompt templates** for copy-paste into your agent

No cloud. No telemetry. Nothing is written to your project until you confirm.

---

## Why use it?

| Problem | How Taste Skill helps |
|---------|------------------------|
| Purple-gradient SaaS heroes, 3-card templates | Anti-AI-slop checklist in every generated prompt |
| Agents code UI without reading the brief | Taste Gate requires **Design Read** first |
| Inconsistent skill files across projects | One-click **Minimal** or **Full** install into the workspace |
| Mixed Vietnamese/English tooling | Dashboard + prompts in **VI/EN** |

---

## Quick Start

1. **Install the extension** — VSIX (`dmctn-taste-skill-0.2.4.vsix`) or Marketplace when published.
2. **Open your project** in VS Code or Cursor.
3. If prompted, choose **Install** → pick **Minimal** (3 core skills) or **Full** (all 13 skills).
4. Open **DMCTN Taste: Open Dashboard** → tab **Prompt mẫu** / **Prompts**.
5. Pick a preset (e.g. Dashboard UI) — output fills automatically.
6. Click **Sao chép prompt** / **Copy prompt** and paste into **Cursor Agent** (or your agent chat).
7. Agent should follow `.cursor/rules/dmctn-taste-gate.mdc` and `skills/taste-skill` when building UI.

---

## Features

- **Dashboard** — 7 tabs: Overview, Install, Skills, Prompts, Guide, Settings, About
- **Full skill pack** — 13 skills (`taste-skill`, `redesign-skill`, `brandkit`, `gpt-tasteskill`, `image-to-code-skill`, …)
- **Cursor rules** — `.cursor/rules/dmctn-taste-gate.mdc`
- **`AGENTS.md`** — agent instructions for the workspace
- **Prompt generator** — 6 presets (Dashboard, Landing, Redesign, UI Audit, Mobile-first, Local business)
- **VI / EN** — language: Auto, Tiếng Việt, English
- **Status detection** — Missing / Minimal installed / Full installed (13/13) / Partial
- **Safe updates** — backup to `.dmctn/taste-skill-backups/`; no silent overwrites
- **No telemetry** — fully offline

---

## Screenshots

> Images live in [`store-assets/`](store-assets/) on GitHub (not inside the VSIX). Upload the same files to the Marketplace listing.

| | |
|---|---|
| Overview | `store-assets/dashboard-overview.png` *(add before publish)* |
| Install / Skills | `store-assets/install-skills.png` *(add before publish)* |
| Prompt output | `store-assets/prompt-output.png` *(add before publish)* |
| Coding result | `store-assets/coding-result.png` *(add before publish)* |

See [`docs/SCREENSHOT_GUIDE.md`](docs/SCREENSHOT_GUIDE.md) for capture steps.

---

## Safety / Privacy

- **Local-only** — no data sent to DMCTN or third parties
- **No telemetry** — no analytics, no phone-home
- **No secret reading** — does not read tokens, API keys, or `.env`
- **Ask before writing** — install/update never runs without your action
- **Managed remove** — uninstall only removes extension-managed paths

---

## Upstream credit

Practical Vietnamese localization inspired by **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)** (MIT License).  
Upstream license: [`assets/credits/LICENSE_UPSTREAM.md`](assets/credits/LICENSE_UPSTREAM.md).

---

## Commands

| Command | Description |
| --- | --- |
| `DMCTN Taste: Open Dashboard` | Open the dashboard |
| `DMCTN Taste: Install to Current Project` | Install Minimal / Full / Custom |
| `DMCTN Taste: Update Skills` | Update with backup |
| `DMCTN Taste: Generate Cursor Prompt` | Generate prompt (command palette) |
| `DMCTN Taste: Check Project Setup` | Show install status |
| `DMCTN Taste: Remove from Project` | Remove managed files |
| `DMCTN Taste: Switch Language` | VI / EN / Auto |

---

## Settings

| Setting | Values | Default |
| --- | --- | --- |
| `dmctnTaste.language` | `auto`, `vi`, `en` | `auto` |
| `dmctnTaste.neverAskInstall` | boolean | `false` |
| `dmctnTaste.defaultPack` | `minimal`, `full` | `minimal` |
| `dmctnTaste.backupBeforeUpdate` | boolean | `true` |

---

## FAQ

**Does it work in Cursor?**  
Yes. Cursor reads `.cursor/rules/` and project `skills/` like VS Code.

**Minimal vs Full?**  
- **Minimal** — `taste-skill`, `redesign-skill`, `brandkit` + core files  
- **Full** — all 13 skills + `docs/` gate files  

**Will it overwrite my edits?**  
Install skips existing files. Update asks before overwriting; optional backup.

**Does it need the internet?**  
No, except you installing the extension from a store.

---

## Development

```bash
npm install
npm run compile
npm test
npm run package   # → dmctn-taste-skill-0.2.4.vsix
```

Docs: [`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md) · [`docs/RUNTIME_QA_REPORT.md`](docs/RUNTIME_QA_REPORT.md)

---

## License

MIT — see [LICENSE](LICENSE).

---

## Tiếng Việt (tóm tắt)

**DMCTN Taste Skill** cài bộ skill chống UI AI rập khuôn vào dự án cho Cursor / VS Code / Claude Code / Codex.

1. Cài extension → mở dự án → **Cài Full** hoặc **Cài Minimal**  
2. Mở Dashboard → **Prompt mẫu** → sao chép prompt vào Agent  
3. Agent tuân **Taste Gate** — Design Read trước khi code UI  

Chạy cục bộ, không telemetry, không đọc secret.  
Repo: https://github.com/dienlanhvietnam-lang/dmctn-taste-skill
