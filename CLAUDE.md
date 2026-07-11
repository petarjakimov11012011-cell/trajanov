# CLAUDE.md — Trajanov

## What this is
Online clothing store for the Trajanov brand. Catalog → cart → cash-on-delivery order form emailed to the owner. No payments on-site, no accounts, no CMS. You are the executing coder; the plan and decisions are made elsewhere.

## Machine & shell
- macOS (two MacBooks share this repo), project path: `~/Projects/trajanov`
- All commands in zsh syntax. Never write PowerShell/cmd syntax.

## Commands
- Install: `npm install` · Dev: `npm run dev` · Build: `npm run build` · Lint: `npm run lint`
- Run `npm run build` and `npm run lint` before every commit; both must pass.
- If scaffold makes the real commands differ, update this section in the same PR.

## Branch & PR rules
- Branch name: `phase-X.YY-<slug>`. One phase branch at a time — never cut a new phase branch while another phase branch is unmerged.
- PR to `main`. Never merge a PR yourself; Lazar merges after the GitHub Action review posts. An unresolved blocking review comment means the phase is not done.
- Never commit secrets or API keys. Env values go in Vercel/`.env.local`; `.env*` stays gitignored.

## Decisions
- Any choice the brief did not spell out gets logged in `src/_project-state/decisions.md`, append-only, ID `D-<phase>-<n>` (e.g. `D-1.04-2`), numbered within your own phase.
- Include: context, decision, alternative rejected, honest downside. Reversals get a new entry linking the old — never edit history.
- Every such decision is also listed in §3 of your completion report. No silent decisions.

## State duties (on closing every phase)
- Overwrite `src/_project-state/current-state.md` to mirror the repo as it now is, including the first-line `NEXT: <phase id> — <name>`.
- Sync `src/_project-state/file-map.md` on every file add/rename/delete.
- Append any new/changed dependency to `src/_project-state/00_stack-and-config.md` with the exact pinned version (`next@15.x.y`, never `latest` or bare `^`).
- File the completion report at `src/_project-state/completions/Part-X-Phase-YY-Completion.md` per its template. A phase is not closed until the report is filed and the snapshot is true.

## Content truth (binding)
- Factual claims rendered on the site come only from `facts.md` entries marked VERIFIED.
- Nothing invented: no fake testimonials, awards, counts, names, or links; never wire a personal account where the client's belongs.
- Missing fact → render a visible `[PLACEHOLDER: what's needed]` and add it to the placeholder register in `current-state.md`.
- Strings that render on multiple pages (the product template) : verify their facts once against `facts.md` before generation.
- No fluff copy. Real-person language. User-facing copy gets a `humanizer` pass before the completion report.

## UI rule
- No UI phase closes sight-unseen: render the affected pages against the current design handover and `brand.md` before filing the report; if you cannot render, list exact preview URLs in the report for Lazar's checklist.
- All design tokens come from `brand.md`. Never hardcode a color/font/spacing value that belongs there.

## Read before working
- Current phase brief: `briefs/Part-X-Phase-YY-*.md` — do only what it says; it outranks habit.
- Live state: `src/_project-state/current-state.md`
- Design tokens: `brand.md` (only source) · UI spec: `docs/design-handovers/` (current handover)
- Business facts: `facts.md` (only source)
- Stack & pinned versions: `src/_project-state/00_stack-and-config.md` — read before adding any dependency.

## The humans
Lazar and Petar do not code. Anything you need them to do (clicks, terminal, dashboards) must be exact numbered steps with zero assumed knowledge.
