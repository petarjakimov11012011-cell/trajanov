NEXT: 1.04 — Products + Catalog + Product page

# current-state.md — Trajanov
*This snapshot gets OVERWRITTEN — it mirrors the repo as it is right now, never the plan. Code updates it (including the NEXT line above) when closing every phase. If plan and code disagree, this file follows the code and the mismatch is surfaced.*

**Last updated:** 2026-07-12 (Phase 1.03b — Cowork: Verify & Unblock)

## Summary (plain language)
- **The site is live at https://trajanov.vercel.app** — Vercel is connected and rebuilds automatically on every push to `main`. Anyone can now see the site on a real URL instead of one person's localhost.
- **⚠️ It is deployed on a Vercel Hobby account, not Pro.** The plan assumed "Vercel Pro (already paid)" — that is not true, no Pro team exists. D-0.00-3 explicitly *rejected* Hobby (commercial use is against Vercel's ToS; deployments can be pulled without notice). **This is a launch blocker awaiting an owner decision — see Known issues and D-1.03b-1.**
- Works now: the site looks like a storefront. Every page carries a shared **header** (the TRAJANOV wordmark, CATALOG/CONTACT links, a cart icon, and a mobile menu) and a shared **footer** (wordmark, Instagram link, Privacy/Terms, © 2026 Trajanov). The **Home page** is real: a large "wall of type" TRAJANOV hero, the line "Clothing, sold direct. Cash on delivery.", a white VIEW CATALOG button, and a FEATURED section that currently reads "Catalog coming soon." All dark, monochrome, sharp-cornered — on brand, and now confirmed so on the live URL.
- Not built yet: the catalog grid, product pages, cart, order form, product data, contact/legal page content, and email. Several links point at pages that do not exist yet and 404 on purpose (see "Expected 404s" below).
- Current phase: 1.03b (Cowork verification phase), closing. It shipped no application code.
- Next: 1.04 — Products + Catalog + Product page (blocked on real product photos/names/prices from Vaki).

## Current stack
See `src/_project-state/00_stack-and-config.md` (only source). **No new npm dependencies this phase.** First real use of the already-installed `lucide-react@1.24.0` (icons `ShoppingBag`, `Menu`, `X` in the header). Unchanged from 1.01: Next 16.2.10, React 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2, lucide-react 1.24.0, Node v24.17.0. Fonts still load via `next/font/google` (Bebas Neue 400 + Hanken Grotesk variable, `latin` subset — Cyrillic owed before the Macedonian phase). `motion` still not installed (shell uses CSS transitions only, gated by `prefers-reduced-motion`).

## Built pages / components
- `src/app/layout.tsx` — root layout; loads the two brand fonts, sets `<title>` = "Trajanov" + provisional description, and now wraps every route with `<Header>` + `<Footer>` in a `min-h-dvh` flex column so the footer sits at the page bottom.
- `src/app/page.tsx` — the real **Home** (replaces the 1.02 "Site in progress" placeholder): wall-of-type `TRAJANOV` hero (Display-XL, 120px desktop / 64px mobile), Body-LG intro line "Clothing, sold direct. Cash on delivery.", a `VIEW CATALOG` primary CTA → `/products` (a `Link` styled with `buttonVariants`, D-1.03-1), then a 128px/64px editorial gap into the `FEATURED` heading (Headline-LG) + the muted `Catalog coming soon.` empty state. No product content invented.
- `src/components/header.tsx` — shared header, **client component**: sticky Ink bar with a bottom hairline; wordmark → `/`; inline `CATALOG`/`CONTACT` nav on desktop (centre); cart icon → `/cart` (visual only — no badge, no logic); on mobile the nav collapses behind a `Menu` toggle into a full-screen `--surface-2` panel that is focus-trapped, closes on ESC and on link click, returns focus to the toggle, and locks body scroll while open. Cart stays visible in the bar on mobile.
- `src/components/footer.tsx` — shared footer: `--surface` block, top hairline, no shadow, generous editorial spacing; `TRAJANOV` wordmark, the verified Instagram link (`@trajanovv2026` → https://www.instagram.com/trajanovv2026, opens in a new tab), `PRIVACY`/`TERMS` legal links, and `© 2026 Trajanov`. No contact rows (email/phone/address are UNVERIFIED — decision 3).
- `src/app/globals.css` — unchanged from 1.02: Tailwind v4 entry + the Trajanov token layer (`brand.md` §12 mirror, shadcn aliases, `.type-*` role utilities). Single always-dark theme (D-1.02-5).
- `src/components/ui/button.tsx` — unchanged from 1.02 (0px corners, Label-caps, white primary, white focus ring). Its exported `buttonVariants` now styles the Home CTA.
- `src/lib/utils.ts` — shadcn `cn()` helper (unchanged).

## Expected 404s (by design this phase — not bugs)
The header/footer/Home link to these real, final paths; the pages arrive in their own phases. Each currently renders Next's default not-found (wrapped in the shell) and that is intended:
- `/products` (CATALOG nav + VIEW CATALOG CTA) → Phase 1.04
- `/cart` (cart icon) → Phase 1.05
- `/contact` (CONTACT nav) → Phase 1.06
- `/privacy`, `/terms` (footer legal links) → Phase 1.06

## Integrations wired
- Repo: github.com/petarjakimov11012011-cell/trajanov — private ✅. `main` now holds **Phase 1.03** — PR **#3** (`phase-1.03-layout-home`) was squash-merged at the operator's explicit direction with **no review** (D-1.03-2), the third such override after D-1.01-6 and D-1.02-8.
- GitHub review Action (Claude Code) — committed at `.github/workflows/claude-code-review.yml`; runs on every PR but **still skips: no auth secret set.** Both options (Anthropic API key / Claude Code OAuth token) were put to the operator in 1.03b and **deferred to Phase 1.07** (D-1.03b-2). Consequence: **1.04 will merge unreviewed too** — that will be four phases with zero review (D-1.01-6, D-1.02-8, D-1.03-2). The gate activates automatically the moment a secret is added.
- **Vercel — CONNECTED ✅ (1.03b).** Project `trajanov` under the "Petar Jakimov Projects" team, linked to `petarjakimov11012011-cell/trajanov`, auto-deploying `main`. **Live URL: https://trajanov.vercel.app.** The Vercel GitHub app is scoped to the `trajanov` repo only. **⚠️ The team is on the Hobby plan, NOT Pro — see Known issues + D-1.03b-1. This is a launch blocker.**

## Owed-verification register
*(Checks the executor could not perform and owes to Lazar — in-browser checks, real-inbox tests, owner ratifications.)*
- **New this phase (1.03b):**
  - **Decide the Vercel Hobby → Pro question** (owner-level, money). Blocks launch. See Known issues + D-1.03b-1.
  - **Look at the site on an actual phone** and capture the desktop + mobile screenshots for the record. Cowork could not render below desktop width (viewport stayed pinned at 1408px), so **the mobile *visual* has still never been seen by anyone** — only its DOM behaviour was verified. Open https://trajanov.vercel.app on a phone: does the hero still read as a wall of type at that width, and does the menu open/close cleanly by touch?
- **Resolved this phase (1.03b) — was owed from 1.03:**
  - ~~Eyeball the rendered Home + shell~~ — **DONE on the live URL.** All 5 checks pass. (1) hero = wall of type ✅; (2) monochrome + sharp corners ✅ — verified programmatically: zero elements with non-zero border-radius, zero colours with any chroma; (3) header + footer intentional ✅; (4) mobile menu opens/closes cleanly ✅ — verified in the DOM: toggle sets `aria-expanded` + body scroll lock, a dedicated Close button *and* Escape both release it; (5) nothing hypey or invented ✅ — full page text audited, `© 2026` correct, no fake shipping/returns/products. Footer's Instagram link re-checked against `facts.md`: **VERIFIED**, legitimate. Caveat: the phone-width *look* remains unseen — re-registered above.
  - ~~Connect Vercel and note the `*.vercel.app` URL~~ — **DONE** (with the Hobby caveat above).
- **Still owed to 1.07:**
  - Full Lighthouse 95+ and a formal WCAG 2.2 AA audit, on the deployed URL — nothing seen so far looks likely to fail (focus rings, tap targets, contrast, reduced-motion all implemented and spot-checked). Now unblocked: a deployed URL finally exists.
- **Carried from 1.02:**
  - Ratify the Voice & tone proposal in `brand.md` §9.
  - Confirm the logo: does Vaki have a logo file, or is the Bebas Neue TRAJANOV wordmark the logo? (This phase uses the wordmark as the logo — decision 5.)
  - Supply the approved Stitch export into `docs/design-handovers/trajanov-stitch-reference/` (assets did not arrive — D-1.02-7).
  - Verify Bebas Neue + Hanken Grotesk **Cyrillic** coverage before the Macedonian phase (D-1.02-3).
  - Final SEO title/description copy is provisional ("Trajanov clothing store.") — owed a real pass at a content/SEO phase.
- **Carried from 1.01:**
  - Add a Claude auth secret to activate the automatic reviewer. **Offered in 1.03b and deferred by the operator to 1.07 (D-1.03b-2).** Three phases have merged with no review; 1.04 will be the fourth. The gate has never once run.

## Placeholder register
*(Every visible `[PLACEHOLDER: …]` on the site. Must be EMPTY before cutover — launch blocker.)*
- No `[PLACEHOLDER: …]` fact-tokens render anywhere. No UNVERIFIED fact is shown on any page (contact rows are deliberately omitted, not placeholdered — decision 3).
- **Temporary content placeholder (not a fact-token):** the FEATURED section shows the muted line `Catalog coming soon.` in place of real featured products. Logged per decision 2; **replaced by real featured products in 1.04.**
- Forward guardrail: the handover's strip register (`docs/design-handovers/Part-1-Phase-02-Design-Handover.md` §3) lists invented Stitch copy (fake origin/returns/shipping claims, newsletter, wishlist, editorial nav, "© 2024") that must **not** ship — verified absent from the 1.03 shell + Home; later UI phases must keep honouring it.

## Carryovers / waiting on
- Product photos + names + prices + currency (MKD) from Vaki → blocks 1.04.
- Contact email/phone/address, legal name, shipping scope, delivery cost → `facts.md` UNVERIFIED rows; needed before order-flow and legal pages.
- Order-notification email (Vaki's) → blocks 2.01.
- trajanov.com availability check (parallel track) → feeds 2.03.

## Known issues
- **🔴 LAUNCH BLOCKER — the site is hosted on Vercel Hobby, the plan this project explicitly rejected.** D-0.00-3 ruled Hobby out for three reasons: Vercel's ToS restrict it to **non-commercial personal use**; Hobby deployments **can be shut down without notice**; and Hobby content **may be used for AI training**. It concluded "Team already pays for Vercel Pro" — **that is false.** The only Vercel team is "Petar Jakimov Projects", on Hobby. So a commercial clothing store is now live, publicly reachable, on exactly the plan that was ruled out, for exactly the risks named. Deployed anyway (with the operator's explicit in-session approval) because it cost nothing, is reversible, and was the only way to unblock this verification phase. **Needs an owner decision before more is built on this URL or anything is shown to Vaki.** Routes: (1) upgrade to Pro — the original decision; (2) keep Hobby as a *private* preview and treat launch as blocked (note: it is public right now); (3) genuinely revisit D-0.00-3 — it rejected the orchestrator's Netlify-free recommendation (commercial use permitted, $0) *on the grounds that Pro was already paid*, and that ground has collapsed. The project instructions' "running cost" line also needs correcting. See D-1.03b-1.
- `npm install` reports 2 moderate-severity advisories in the transitive dependency tree (fresh create-next-app install). Unchanged since 1.01; not addressed. Revisit only if they reach runtime deps.
- Stack is Next 16 / React 19 / Tailwind v4 (newer than the plan's Next 15 illustration). Watch for breaking-change gotchas in UI phases.
- `next/font` fetches Google Fonts at **build time** — a build with no network (or a Google Fonts rate-limit) fails on the font step. Seen again this phase: `npm run build` failed once on the font fetch, then passed on retry. Not a code issue; both `build` and `lint` pass with network.

## Notes
- Collaborator: Lazar and Petar share the `petarjakimov11012011-cell` GitHub account, so no separate collaborator invite is needed (D-0.00-8).
- Token discipline: `brand.md` is the only source of design values; the shell + Home hardcode no colour/font/spacing/radius that belongs to a token — sizes, spacing, and type all come from the token layer or the `.type-*` roles. The only component-level literals are the wordmark logo-lockup sizes (brand.md pins no logo size) and the standard focus-ring recipe reused from the 1.02 Button.
- Header is a client component (`"use client"`) because the mobile menu needs state, ESC handling, and a focus trap; the footer stays a server component.
