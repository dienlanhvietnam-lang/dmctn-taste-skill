# Audit upstream — Leonxlnx/taste-skill
# Upstream audit — Leonxlnx/taste-skill

Báo cáo phân tích repo gốc **không** copy nội dung vào extension.  
Analysis of the upstream repo only — no content copied into the extension.

**Upstream:** https://github.com/Leonxlnx/taste-skill  
**License:** MIT ([`LICENSE`](https://github.com/Leonxlnx/taste-skill/blob/main/LICENSE))  
**Credit:** Leonxlnx/taste-skill — DMCTN extension ghi công tại `assets/credits/`.

---

## Metadata clone (local)

| Trường / Field | Giá trị / Value |
|----------------|-----------------|
| Clone path (local) | `_upstream/taste-skill/` |
| Commit | `3c7017d636c3a4aad378433ea6d0cfa6c921da4a` |
| Branch | `main` |
| Latest message | `feat(skill): round-5 hardening from test-13/14/15 + test-16/17/18 (all Opus 4.7)` |
| Clone date | 2026-06-01 |

Thư mục `_upstream/` nằm trong `.gitignore` — **không** commit clone vào repo DMCTN.  
The `_upstream/` folder is gitignored — **not** committed to the DMCTN repo.

---

## File tree chính
## Main file tree

```
_upstream/taste-skill/
├── LICENSE
├── README.md
├── CHANGELOG.md
├── skill.sh                 # local skill name → path registry
├── assets/                  # readme-banner, logo
├── examples/                # floria reference images
├── research/
│   ├── README.md
│   └── laziness/            # root causes, remediation, empirical findings
├── skills/
│   ├── llms.txt             # skill index for agents
│   ├── taste-skill/SKILL.md       # v2 core (~86 KB)
│   ├── taste-skill-v1/SKILL.md
│   ├── gpt-tasteskill/SKILL.md
│   ├── redesign-skill/SKILL.md
│   ├── image-to-code-skill/SKILL.md
│   ├── imagegen-frontend-web/SKILL.md
│   ├── imagegen-frontend-mobile/SKILL.md
│   ├── brandkit/SKILL.md
│   ├── soft-skill/, minimalist-skill/, brutalist-skill/
│   ├── output-skill/, stitch-skill/ (+ DESIGN.md)
└── .github/copilot-instructions.md
```

**13 skill folders** — khớp inventory DMCTN `assets/skills/`.  
**13 skill folders** — matches DMCTN `assets/skills/` inventory.

---

## Phân tích 9 tầng upstream
## Nine-layer upstream analysis

### 1. Strategy Layer

| Khía cạnh | Nội dung upstream |
|-----------|-------------------|
| Mục tiêu | Anti-slop frontend framework cho AI agents; landing/portfolio/redesign, không dashboard dày |
| Triết lý | Đọc brief trước; không template SaaS; contextual rules |
| Đối tượng | Codex, Cursor, Claude Code, ChatGPT; `npx skills add` |
| Tương thích agent | Install name trong frontmatter (`design-taste-frontend`, …) |
| Nghiên cứu | `research/laziness/` — bias, remediation, prompt engineering |

**Evidence:** `README.md`, `research/laziness/README.md`, `skills/llms.txt`

---

### 2. Brief / Design Read Layer

**Section 0** trong `skills/taste-skill/SKILL.md`:

- 6 tín hiệu: page kind, vibe words, references, audience, brand assets, quiet constraints
- Bắt buộc **Design Read** một dòng (0.B)
- Chỉ hỏi **một** câu khi brief mơ hồ (0.C)
- Anti-Default Discipline — liệt kê mẫu AI mặc định phải tránh (0.D)

**Evidence:** `_upstream/taste-skill/skills/taste-skill/SKILL.md` §0

---

### 3. Dial / Control Layer

**Section 1** — ba biến:

- `DESIGN_VARIANCE` (1–10)
- `MOTION_INTENSITY` (1–10)
- `VISUAL_DENSITY` (1–10)

Baseline mặc định **8 / 6 / 4**. Bảng suy luận từ design read (1.A), preset theo use case (1.B), quy tắc dùng biến xuyên suốt tài liệu (1.C).

**Evidence:** `skills/taste-skill/SKILL.md` §1

---

### 4. Design System Layer

**Section 2.A** — map brief → **package chính thức**:

Fluent UI, Material 3, Carbon, Polaris, Atlaskit, Primer, GOV.UK, USWDS, Bootstrap, Radix Themes, shadcn/ui, Tailwind v4.

**Section 2.B** — aesthetic không có package (glass, bento, brutalism, editorial, …) — yêu cầu ghi rõ “approximation”.

Quy tắc: **một hệ thống mỗi project**, không trộn Fluent + Carbon.

**Evidence:** `skills/taste-skill/SKILL.md` §2

---

### 5. Anti-pattern Layer

Rất chi tiết trong core skill + redesign skill:

- Purple/blue AI gradient, 3 equal cards, centered hero, glassmorphism mặc định
- **Em-dash ban** hoàn toàn (§9.G)
- **Section-Layout-Repetition Ban**, **Split-Header Ban**
- Inter làm font mặc định (tránh)
- Lucide “discouraged”
- Theme flip giữa section
- `window.addEventListener('scroll')` banned

**Evidence:** `skills/taste-skill/SKILL.md` §4, §9; `skills/redesign-skill/SKILL.md`

---

### 6. Implementation Layer

**Section 3** — stack mặc định:

- React/Next, RSC, client isolation cho motion
- Tailwind v4, Motion (`motion/react`), không Framer cũ
- `next/font`, icon families (Phosphor, Hugeicons, …)
- **Section 5** — GSAP ScrollTrigger skeletons (sticky-stack, horizontal-pan)
- State: `useMotionValue`, không `useState` cho scroll/pointer

**Evidence:** `skills/taste-skill/SKILL.md` §3, §5

---

### 7. Specialized Skill Layer

| Skill folder | Install name (upstream) | Vai trò |
|--------------|-------------------------|---------|
| taste-skill | design-taste-frontend | Core v2 |
| taste-skill-v1 | design-taste-frontend-v1 | Legacy |
| gpt-tasteskill | gpt-taste | GPT/Codex strict |
| redesign-skill | redesign-existing-projects | Audit-first redesign |
| image-to-code-skill | image-to-code | Image → code |
| imagegen-frontend-web/mobile | imagegen-* | Reference images only |
| brandkit | brandkit | Brand boards |
| soft/minimalist/brutalist | style variants | Direction |
| output-skill | full-output-enforcement | No lazy output |
| stitch-skill | stitch-design-taste | Google Stitch + DESIGN.md |

Kích thước `SKILL.md` core v2: **~86 KB** (bản đầy đủ nhất).

**Evidence:** `README.md` Skills table, `skills/*/SKILL.md`

---

### 8. Output / Review Layer

- **Section 11** — redesign protocol (preserve vs overhaul)
- **Section 14** — Pre-Flight Check (checklist dài: brief, dials, system, redesign, typography, motion, anti-slop, …)
- **output-skill** — chống output cắt cụt, placeholder
- PASS/FAIL và audit trước code

**Evidence:** `skills/taste-skill/SKILL.md` §11, §14; `skills/output-skill/SKILL.md`

---

### 9. Distribution Layer

- `npx skills add https://github.com/Leonxlnx/taste-skill`
- `--skill "<install-name>"` per skill
- `skill.sh` registry
- `skills/llms.txt` agent index
- Copy `SKILL.md` thủ công vào project

**Không có** VS Code extension, dashboard, installer GUI, backup tự động.

**Evidence:** `README.md` Installing; `skill.sh`; `skills/llms.txt`

---

## Tóm tắt upstream
## Upstream summary

Upstream là **bộ Agent Skill markdown sâu**, tập trung **chất lượng prompt/rule**, cài qua CLI hoặc copy file. Core `taste-skill` v2 là tài liệu quy mô lớn (~1200+ dòng logic), không phải tool IDE.

DMCTN extension **đóng gói** 13 skill đã **rút gọn** và thêm lớp phân phối IDE — xem báo cáo coverage/gap kèm theo.
