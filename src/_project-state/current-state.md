NEXT: 1.03 — first UI phase (site shell + Home/Catalog; confirm exact title in Trajanov-Phase-Plan)

# current-state.md — Trajanov
*This snapshot gets OVERWRITTEN — it mirrors the repo as it is right now, never the plan. Code updates it (including the NEXT line above) when closing every phase. If plan and code disagree, this file follows the code and the mismatch is surfaced.*

**Last updated:** 2026-07-12 (Phase 1.02 — Design system)

## Summary (plain language)
- Works now: the Next.js app builds, lints, and serves a dark, on-brand placeholder home at `localhost:3000` — the matte near-black background, the TRAJANOV wordmark in Bebas Neue, and off-white type. The design system is real in code: every `brand.md` token is wired into the styling layer, both brand fonts load, and the base button matches the brand.
- Not built yet: no header/nav, footer, catalog, product page, cart, order form, product data, or email. The home page is a temporary placeholder — the real Home is the first UI phase's job.
- Current phase: 1.02 (Design system), closing.
- Next: 1.03 — first UI phase (site shell + Home/Catalog). Unblocked on design; `brand.md` is FILLED and the token layer is in place.

## Current stack
See `src/_project-state/00_stack-and-config.md` (only source). **No new npm dependencies this phase.** Fonts load via the built-in `next/font/google` (Bebas Neue 400 + Hanken Grotesk variable, `latin` subset — Cyrillic owed before the Macedonian phase). Unchanged from 1.01: Next 16.2.10, React 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2, lucide-react 1.24.0, Node v24.17.0.

## Built pages / components
- `src/app/globals.css` — Tailwind v4 entry + the Trajanov token layer: `brand.md` §12 mirrored into `:root`, shadcn semantic names aliased onto the brand tokens, both naming styles exposed via `@theme inline`, and `.type-*` utilities for the `brand.md` §4 type roles. Single always-dark theme, no `.dark` block (D-1.02-5).
- `src/app/layout.tsx` — root layout; loads Bebas Neue + Hanken Grotesk, sets the brand `<title>` = "Trajanov" and a provisional description.
- `src/app/page.tsx` — minimal on-brand placeholder home (wordmark + "Site in progress" Label-caps line). No product content invented. Replaced by the real Home in 1.03 (D-1.02-6).
- `src/components/ui/button.tsx` — base Button restyled to `brand.md`: 0px corners, Label-caps type, white-accent primary that inverts on hover, transparent-with-white-border secondary, visible white focus ring. Not yet placed on any page.
- `src/lib/utils.ts` — shadcn `cn()` helper (unchanged).

## Integrations wired
- Repo: github.com/petarjakimov11012011-cell/trajanov — private ✅. `main` holds the 1.01 scaffold (PR #1 squash-merged via operator override, D-1.01-6). This phase opens PR **#2** (`phase-1.02-design-system` → `main`).
- GitHub review Action (Claude Code) — committed at `.github/workflows/claude-code-review.yml`; runs on every PR but **skips until a Claude auth secret is set** (as of 1.01 close, none was added — D-1.01-5). If the operator has since added `ANTHROPIC_API_KEY` / `CLAUDE_CODE_OAUTH_TOKEN`, it will review PR #2; the executor cannot verify secret state from here.
- Vercel Pro — as of 1.01 close, **not connected** (operator skipped, D-1.01-5). If since connected, PR #2 gets a preview URL; otherwise the preview link is owed. The executor cannot verify account state from here.

## Owed-verification register
*(Checks the executor could not perform and owes to Lazar — in-browser checks, real-inbox tests, owner ratifications.)*
- **New this phase (1.02):**
  - Ratify the Voice & tone proposal in `brand.md` §9.
  - Confirm the logo: does Vaki have a logo file, or is the Bebas Neue TRAJANOV wordmark the logo? (Files land in `public/images/brand/`.)
  - Supply the approved Stitch export into `docs/design-handovers/trajanov-stitch-reference/` (assets did not arrive — D-1.02-7).
  - Verify Bebas Neue + Hanken Grotesk **Cyrillic** coverage before the Macedonian phase (D-1.02-3).
  - Final SEO title/description copy is provisional ("Trajanov clothing store.") — owed a real pass at a content/SEO phase.
- **Carried from 1.01 (state as last recorded; operator may have since done these):**
  - Add a Claude auth secret to activate the automatic reviewer, and optionally install github.com/apps/claude.
  - Connect Vercel (import trajanov, deploy) and note the `*.vercel.app` URL.
  - Read the Action review and merge the phase PR(s); the executor never merges.

## Placeholder register
*(Every visible `[PLACEHOLDER: …]` on the site. Must be EMPTY before cutover — launch blocker.)*
- No `[PLACEHOLDER: …]` fact-tokens render anywhere yet (no fact-bearing pages exist).
- Note (not a fact-token): the home route is a **temporary placeholder page** ("Site in progress"), replaced by the real Home in 1.03.
- Forward guardrail: the handover's strip register (`docs/design-handovers/Part-1-Phase-02-Design-Handover.md` §3) lists invented Stitch copy (fake origin/returns/shipping claims, newsletter, wishlist, editorial nav, "© 2024") that must **not** ship — later UI phases must honour it.

## Carryovers / waiting on
- Product photos + names + prices + currency (MKD) from Vaki → blocks 1.04.
- Contact email/phone/address, legal name, shipping scope, delivery cost → `facts.md` UNVERIFIED rows; needed before order-flow and legal pages.
- Order-notification email (Vaki's) → blocks 2.01.
- trajanov.com availability check (parallel track) → feeds 2.03.

## Known issues
- `npm install` reports 2 moderate-severity advisories in the transitive dependency tree (fresh create-next-app install). Unchanged from 1.01; not addressed (`npm audit fix --force` pulls breaking changes). Revisit only if they reach runtime deps.
- Stack is Next 16 / React 19 / Tailwind v4 (newer than the plan's Next 15 illustration). Watch for breaking-change gotchas in UI phases.
- `next/font` fetches Google Fonts at **build time** — a build with no network will fail on the font step. Verified working here.

## Notes
- Collaborator: Lazar and Petar share the `petarjakimov11012011-cell` GitHub account, so no separate collaborator invite is needed (D-0.00-8).
- Token discipline: `brand.md` is the only source of design values; `globals.css` mirrors §12 and nothing visual is hardcoded elsewhere. shadcn's `--accent` semantic now equals brand white, so use `bg-surface`/`bg-surface-2` (not `bg-accent`) for quiet hovers in future components (D-1.02-5).
