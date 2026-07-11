# Part 1 · Phase 1.01 · Code — Scaffold

**Why this matters** — this turns a folder of documents into a real project: a private GitHub repo with the app skeleton, the automatic PR reviewer, and preview deployments — everything every later phase stands on.

## Before starting (for the human handing this over)
Run this phase on the machine that can log into the `petarjakimov11012011-cell` GitHub account in a browser (Petar's MacBook is the natural choice — only that account can create repos under its own name). One machine runs this whole phase start to finish.

## Context
- Nothing exists yet. There is no repo, no code, no prior completion report. This is the first phase of the project.
- The operator (Lazar or Petar) has a local folder containing 9 project documents produced at kickoff (listed in Task 2). These are the project's canonical docs — place them, do not rewrite them.
- Read first, in this order: `CLAUDE.md` and `file-map.md` from that local folder (they define the repo rules and the target structure you are about to create). After placement, they live in the repo and govern everything.
- The humans do not code. Every action they must perform (browser clicks, logins, approving a device code) gets exact numbered steps, one action per step, zero assumed knowledge. You run all terminal commands yourself; never ask them to type commands.

## Scope
In scope: local environment check · project folder + git init · GitHub repo (private) · placing the 9 docs into the repo structure · Next.js skeleton with Tailwind, shadcn/ui init, lucide-react · first commit + push · installing the Claude Code GitHub Action · connecting the repo to the existing Vercel Pro account · opening the phase PR and confirming the Action posts a review · completion report + state sync.

Out of scope: any page, component, or styling beyond the untouched create-next-app output (design tokens don't exist until Phase 1.02) · installing `motion` or `resend` (pinned at first use in later phases) · buying a domain · writing or editing any content · touching `brand.md` or `facts.md` beyond placing them.

## Tasks

### 1. Environment check
1. Verify tools: `node --version` (need an active LTS, v20+), `npm --version`, `git --version`. If Node is missing/old, walk the operator through installing the LTS from nodejs.org (exact clicks), then re-verify.
2. Check git identity: `git config user.name` and `git config user.email`. If unset, ask the operator what name/email to use (their real name and email is fine) and set them globally.
3. Check for GitHub CLI: `gh --version`. If absent, install it (`brew install gh`; if Homebrew is missing, walk through installing it first). Then `gh auth status`; if not authenticated, run `gh auth login` (GitHub.com → HTTPS → login with web browser) and guide the operator through the browser steps, logging in as petarjakimov11012011-cell.

### 2. Locate the kickoff docs
The 9 files: `CLAUDE.md`, `facts.md`, `brand.md`, `current-state.md`, `file-map.md`, `00_stack-and-config.md`, `decisions.md`, `_TEMPLATE-Completion.md`, and this brief (`Part-1-Phase-1.01-Code.md`).
1. Ask the operator where they saved the downloaded kickoff files; if they're unsure, search `~/Downloads`, `~/Desktop`, and `~/Documents` by filename and confirm the found folder with them before touching anything.
2. If any of the 9 is missing, stop and tell the operator exactly which one — do not recreate it from imagination.
3. Files named `Trajanov-Project-Instructions.md`, `Trajanov-Plan.md`, or `Trajanov-Phase-Plan.md` may sit in the same folder: they do not go into the repo (they live in the Claude Project knowledge base). Leave them where they are.

### 3. Create the project and place the docs
1. `mkdir -p ~/Projects/trajanov && cd ~/Projects/trajanov`, then `git init -b main`.
2. Create a minimal `README.md` (3 lines: project name Trajanov, "online store — see CLAUDE.md for repo rules", private client project). Commit it on `main` as `chore: initial commit`.
3. Create the private repo and push: `gh repo create petarjakimov11012011-cell/trajanov --private --source=. --remote=origin --push`. Verify with `gh repo view` that it exists and is private.
4. Create branch `phase-1.01-scaffold`. All remaining work happens on this branch.
5. Scaffold Next.js into the existing folder (create-next-app supports running in-place; if the version balks at existing files, scaffold into a temp dir and move the output in — never delete the docs): TypeScript yes, ESLint yes, Tailwind yes, `src/` directory yes, App Router yes, Turbopack default, import alias default (`@/*`).
6. Initialize shadcn/ui (`npx shadcn@latest init`, defaults; add no components yet) and install `lucide-react` with an exact pinned version.
7. Create the reserved structure and place the docs:
   - Repo root: `CLAUDE.md`, `facts.md`, `brand.md`
   - `src/_project-state/`: `current-state.md`, `file-map.md`, `00_stack-and-config.md`, `decisions.md`
   - `src/_project-state/completions/_TEMPLATE-Completion.md`
   - `briefs/Part-1-Phase-1.01-Code.md` (this file)
   - Empty-but-committed dirs (add `.gitkeep`): `docs/design-handovers/`, `data/products/`, `public/images/`
8. Confirm `.gitignore` covers `.env*`, `node_modules/`, `.next/`. Strip the placement-note line ("Destination in repo: …") from the top of each placed state file — they've arrived home.
9. Append to `src/_project-state/decisions.md` (verbatim, after the last entry):

```
### D-0.00-11 · 2026-07-11 · Vercel connection included in Phase 1.01
- **Status:** Accepted (orchestrator call)
- **Context:** The Plan's 1.01 scope didn't name connecting the repo to Vercel, but Part 1 relies on per-PR preview links from 1.03 onward.
- **Decision:** Connect repo → existing Vercel Pro account during scaffold.
- **Alternatives considered:** Defer to a later phase — rejected: five minutes now vs. a stall when the first UI phase needs a preview.
- **Consequences:** Every PR gets a private preview URL from day one; no downside identified.
- **Links:** Phase 1.01 brief.
```

10. Verify: `npm run dev` serves the default page at localhost, `npm run build` passes, `npm run lint` passes.

### 4. Update state files (on the branch)
1. `00_stack-and-config.md` — append a dated entry with the exact installed versions (`next@`, `react@`, `typescript@`, `tailwindcss@`, `lucide-react@`, shadcn CLI version, Node version on this machine).
2. `file-map.md` — extend the "App" section to match what create-next-app actually produced (one line per meaningful file/folder; delete listed paths that don't exist).
3. `current-state.md` — overwrite to mirror reality: scaffold exists, default Next.js page only, no design tokens, integrations = Action + Vercel (pending confirmation below); set the first line to `NEXT: 1.02 — Design system`.

### 5. Install the review Action + connect Vercel (interactive)
1. Run `/install-github-app` inside Claude Code and walk the operator through every browser click (select the trajanov repo when GitHub asks which repositories). This installs the automatic PR reviewer.
2. Vercel: have the operator log into vercel.com (their existing Pro account) → Add New → Project → Import Git Repository → connect the GitHub account if prompted (grant access to trajanov) → import with default Next.js settings → Deploy. Exact clicks, one at a time. Confirm the deployment succeeds and note the `*.vercel.app` URL.
3. Collaborator: ask the operator whether Lazar has his own GitHub account. If yes, ask for the exact username and add it: repo → Settings → Collaborators → Add people (walk the clicks); the invite acceptance is owed to Lazar. If Lazar and Petar share the petarjakimov11012011-cell account, skip and record that fact in the completion report §3.

### 6. PR, review, report
1. Write the completion report from `_TEMPLATE-Completion.md` → `src/_project-state/completions/Part-1-Phase-1.01-Completion.md`. Every DoD item below gets evidence.
2. Commit everything on `phase-1.01-scaffold` (conventional messages, e.g. `feat: scaffold Next.js app and project structure`), push, open a PR to `main` titled `Phase 1.01 — Scaffold` with a 5-line summary body.
3. Wait for the GitHub Action review, then check it posted: `gh pr view --comments`. Add the evidence to the report (amend + push). Do not merge — the operator merges after reading the review.
4. Tell the operator, in plain words: read the Action's review on the PR page; if nothing is marked blocking, click Merge. The phase closes when merged.

## Definition of Done
Verifiable by you (evidence required in the report):
- [ ] `gh repo view` shows `petarjakimov11012011-cell/trajanov`, private
- [ ] All 9 docs placed at their `file-map.md` paths; `briefs/` contains this brief; `.gitkeep` dirs committed
- [ ] `npm run dev`, `npm run build`, `npm run lint` all pass (paste key output lines)
- [ ] Exact pinned versions appended to `00_stack-and-config.md`; D-0.00-11 appended to `decisions.md`
- [ ] `current-state.md` overwritten; first line reads `NEXT: 1.02 — Design system`
- [ ] Vercel project imported; production deployment of the default page succeeded (URL noted)
- [ ] PR open from `phase-1.01-scaffold` to `main`; the GitHub Action posted a review on it (this is the Part 1 hard gate — evidence: link/quote of the review)
- [ ] Completion report filed with evidence per item

Owed to Lazar (goes on the owed-verification register):
- [ ] Read the Action's review and merge the PR
- [ ] Accept the collaborator invite (if applicable)
- [ ] Open the `*.vercel.app` URL on his own machine and see the default page load

## Outputs & where they go
- The repo itself: github.com/petarjakimov11012011-cell/trajanov (private), cloned at `~/Projects/trajanov`
- Completion report → `src/_project-state/completions/Part-1-Phase-1.01-Completion.md`
- This brief, versioned → `briefs/Part-1-Phase-1.01-Code.md`
- No secrets in any file, ever. Vercel/GitHub auth lives in the operator's logged-in sessions, not in the repo.
