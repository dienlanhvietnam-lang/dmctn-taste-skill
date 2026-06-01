# Runtime QA Report — DMCTN Taste Skill

| Field | Value |
|-------|--------|
| **Version** | 0.2.3 (Store + Repo Ready) |
| **Overall** | **FULL_PASS** |
| **Automated smoke** | PASS — `npm test` 49/49, `activation.test.ts` |

---

## Runtime in Cursor

**Status: FULL_PASS**

### Evidence

| Check | Result |
|-------|--------|
| Dashboard Webview opens in Cursor | PASS |
| Full install — 13/13 skills | PASS |
| Status shows **Đã cài đủ (Full)** / Full installed | PASS |
| Tab **Prompt mẫu** — output auto-generates on open / preset change | PASS |
| Sidebar label **Prompt mẫu** (not “Promt mẫu”) | PASS |
| Settings VI / EN visible | PASS |
| Skills tab — 13 skills with state badges | PASS |

### Remaining manual checks (optional — not blocking runtime PASS)

These were **not re-run** in the latest session; code paths are covered by automated tests:

| Check | Status | Notes |
|-------|--------|-------|
| Copy toast (“Đã copy” / “Copied”) after **Sao chép prompt** | **Unconfirmed** | Host uses `vscode.env.clipboard`; smoke test verifies toast message |
| Update skills + backup on modified file | **Unconfirmed** | Covered by `updater.test.ts` |
| Remove from project — only managed files | **Unconfirmed** | Covered by `removeFromProject` tests |
| Never Ask — no startup popup | **Unconfirmed** | Setting `dmctnTaste.neverAskInstall` |

---

## Coding Application QA

**Status: FULL_PASS**

### Evidence

| Check | Result |
|-------|--------|
| Agent reads Taste Skill / Taste Gate before coding UI | PASS |
| Agent produced **Design Read** | PASS |
| Agent produced **Anti-AI-slop checklist** | PASS |
| Agent produced implementation **plan** with PASS/FAIL criteria | PASS |
| Demo `index.html` redesigned — away from generic AI-slop patterns (purple gradient hero, 3-card SaaS template, etc.) | PASS |

### Context

Validated on a real project workspace with Full pack installed (`.cursor/rules/dmctn-taste-gate.mdc`, `skills/*`, `AGENTS.md`).

---

## Automated coverage (headless)

| Area | Result |
|------|--------|
| Extension activate + 7 commands | PASS |
| Dashboard HTML + CSP | PASS |
| Minimal / Full install + detector status | PASS |
| `generatePrompt` → webview output | PASS |
| Copy → host clipboard + toast | PASS |
| i18n + icon 128×128 | PASS |

---

## Safety

| Check | Result |
|-------|--------|
| No silent file writes | PASS (by design; user confirms install) |
| No network / telemetry | PASS |
| No secret/token reads | PASS |
| No overwrite without confirmation | PASS (by design) |

---

## Sign-off

| | |
|---|---|
| **Tester** | Bùi Văn Tĩnh (Cursor runtime + coding QA) |
| **Date** | 2026-06-01 |
| **Editor** | Cursor |
| **Extension version tested** | 0.2.2 → packaged as 0.2.3 Store Ready |
| **Verdict** | **FULL_PASS** (runtime + coding application) |
