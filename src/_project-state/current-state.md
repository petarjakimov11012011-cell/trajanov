NEXT: 1.02 — Design system

# current-state.md — Trajanov
*This snapshot gets OVERWRITTEN — it mirrors the repo as it is right now, never the plan. Code updates it (including the NEXT line above) when closing every phase. If plan and code disagree, this file follows the code and the mismatch is surfaced.*

**Last updated:** 2026-07-11 (Phase 1.01 — Scaffold)

## Summary (plain language)
- Works now: a bare Next.js 16 app that builds, lints, and serves the default create-next-app home page at `localhost:3000`. The repo is live and private on GitHub.
- Stubbed / not wired yet: no real pages, no catalog / cart / order form, no product data, no email. No design tokens yet — `brand.md` is still SEED.
- Current phase: 1.01 (Scaffold), closing.
- Next: 1.02 — Design system (fills `brand.md` tokens). Blocked on the design screenshot from Lazar.

## Current stack
See `src/_project-state/00_stack-and-config.md` (only source). Installed this phase: Next 16.2.10, React 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2, shadcn CLI 4.13.0 (`init` only), lucide-react 1.24.0. Node v24.17.0.

## Built pages / components
- `src/app/page.tsx` — default create-next-app home page (untouched; placeholder until a UI phase).
- `src/app/layout.tsx` + `src/app/globals.css` — root layout and Tailwind v4 / shadcn seed styles.
- `src/components/ui/button.tsx` + `src/lib/utils.ts` — shadcn `init` output; the button is unused and unstyled until 1.02.
- No project-specific UI, and no design tokens (`brand.md` = SEED, so per CLAUDE.md no real UI may be written until 1.02 closes).

## Integrations wired
- Repo: github.com/petarjakimov11012011-cell/trajanov — private ✅. PR **#1** (`phase-1.01-scaffold` → `main`) **squash-merged to `main` via operator override — no review ran (D-1.01-6)**. `main` now holds the scaffold.
- GitHub review Action (Claude Code) — workflow committed at `.github/workflows/claude-code-review.yml`; runs on every PR ✅. It **skips** until a Claude auth secret is set. No secret was added this phase (D-1.01-5), so it never reviewed PR #1 and the Part 1 hard gate was **waived** for 1.01 (D-1.01-6). The workflow stays in place and will review **future** PRs the moment `ANTHROPIC_API_KEY` (or `CLAUDE_CODE_OAUTH_TOKEN`) is added.
- Vercel Pro — **not yet connected** (operator skipped this phase, D-1.01-5); import + deploy is a browser step OWED to the operator. Once connected: per-PR preview URLs (D-0.00-11); production deploys `main` (README only until PR #1 merges), so the default page shows on the PR **preview** deployment until then.

## Owed-verification register
*(Checks the executor could not perform and owes to Lazar — in-browser checks, real-inbox tests. At 3+ items, the next phase is a verification phase. These are all Phase 1.01 closeout steps; they clear when the operator completes them — see completion report §7.)*
- Add a Claude auth secret (`ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN`) to activate the automatic reviewer on **future** PRs (optionally install github.com/apps/claude for a "claude" identity + `@claude` mentions). PR #1 itself was merged without a review by explicit override (D-1.01-6).
- Connect Vercel (import trajanov, deploy) and note the `*.vercel.app` URL.
- Open the production URL on his own machine and confirm the default page loads once Vercel is connected.

## Placeholder register
*(Every visible `[PLACEHOLDER: …]` on the site. Must be EMPTY before cutover — launch blocker.)*
- Empty (only the default create-next-app page exists; no `facts.md` values are rendered yet).

## Carryovers / waiting on
- Design screenshot from Lazar → blocks 1.02.
- Product photos + details from Vaki → blocks 1.04.
- Contact email/phone/address, legal name, shipping scope, currency, delivery cost → `facts.md` UNVERIFIED rows.
- trajanov.com availability check (Cowork, parallel track) → feeds 2.03.

## Known issues
- `npm install` reports 2 moderate-severity advisories in the transitive dependency tree (fresh create-next-app install). Not addressed — `npm audit fix --force` pulls breaking changes; revisit only if they reach runtime deps.
- Stack resolved to Next 16 / React 19 (newer than the plan's Next 15 illustration). See the note in `00_stack-and-config.md`; watch for breaking-change gotchas in later phases (create-next-app itself flags this).

## Notes
- Collaborator: Lazar and Petar share the `petarjakimov11012011-cell` GitHub account, so no separate collaborator invite was needed (see completion report §3 and D-0.00-8).
