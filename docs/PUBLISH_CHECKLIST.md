# Publish Checklist — DMCTN Taste Skill

Use this checklist before publishing to **Visual Studio Marketplace** or **Open VSX**.
Do **not** commit tokens, PATs, or `.env` files with secrets.

## Repository (manual — before first publish)

Metadata in `package.json` points to:

**https://github.com/dienlanhvietnam-lang/dmctn-taste-skill**

Official remote: `https://github.com/dienlanhvietnam-lang/dmctn-taste-skill.git`

Before Marketplace publish, confirm:

1. Repo is **public** and `main` branch is up to date.
2. No tokens, `.env`, or secrets in the repository.
3. `store-assets/*.png` uploaded when screenshots are ready.

---

## Prerequisites (both stores)

- [ ] `npm run compile` — PASS
- [ ] `npm test` — PASS
- [ ] `npm run package` — produces `dmctn-taste-skill-<version>.vsix` without icon size warnings
- [ ] `media/icon.png` is **128×128**, **&lt; 80 KB**
- [ ] Runtime QA completed — see `docs/RUNTIME_QA_REPORT.md` (not `PENDING_MANUAL`)
- [ ] Screenshots ready — see `store-assets/` and `docs/SCREENSHOT_GUIDE.md`
- [ ] `repository` in `package.json` → `https://github.com/dienlanhvietnam-lang/dmctn-taste-skill` — repo **public** on GitHub (pushed in 0.2.4)
- [ ] README updated with repository link and screenshot references
- [ ] Upstream credit present: Leonxlnx/taste-skill (MIT)

## Security

- [ ] No `PAT`, `token`, `api_key`, `secret`, or `.env` in the repo or VSIX
- [ ] If a token was ever pasted into chat/logs, **revoke and rotate** it immediately
- [ ] Publish commands run only on a trusted machine; never paste tokens into source files

## Visual Studio Marketplace

1. Create publisher at https://marketplace.visualstudio.com/manage  
   - Publisher ID must match `package.json` → `"publisher": "buivantinh"`
2. Create a **Personal Access Token** in Azure DevOps:
   - Scope: **Marketplace** → **Manage**
   - Store the PAT in a password manager only — **never** in git
3. Install tooling (once): `npm install -g @vscode/vsce`
4. Package locally:
   ```bash
   npm run package
   ```
5. Publish (replace `<PAT>` at runtime — do not save in files):
   ```bash
   vsce publish -p <PAT>
   ```
   Or upload the `.vsix` manually in the publisher portal.
6. Fill listing from `docs/STORE_LISTING.md`:
   - Short/long description EN (+ VI if desired)
   - Category, keywords, privacy statement
   - Icon (128×128) and screenshots (1280×720 or similar)
7. Verify extension page after publish (install from Marketplace in a clean profile)

## Open VSX

1. Create account / namespace at https://open-vsx.org/
2. Create an **Eclipse Open VSX** access token (store securely, never commit)
3. Install: `npm install -g ovsx`
4. Package:
   ```bash
   npm run package
   ```
5. Publish (placeholder — substitute token at runtime only):
   ```bash
   ovsx publish dmctn-taste-skill-<version>.vsix -p <OPEN_VSX_TOKEN>
   ```
6. Same listing copy and screenshots as Marketplace where applicable

## Post-publish

- [ ] Tag release in git: `v0.2.x`
- [ ] Attach `.vsix` to GitHub Release (optional)
- [ ] Update `CHANGELOG.md` with publish date
- [ ] Smoke-install from store in VS Code **and** Cursor

## Token rotation (if exposed)

1. Revoke the leaked PAT/token in the provider UI immediately.
2. Generate a new token with minimum scope.
3. Do not commit; update only your local secret store / CI vault.
