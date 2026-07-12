NEXT: 1.04b — Populate real products (blocked on Vaki's product data)

# current-state.md — Trajanov
*This snapshot gets OVERWRITTEN — it mirrors the repo as it is right now, never the plan. Code updates it (including the NEXT line above) when closing every phase. If plan and code disagree, this file follows the code and the mismatch is surfaced.*

**Last updated:** 2026-07-12 (Phase 1.04a — Code: Products engine)

## Summary (plain language)
- **The site is live at https://trajanov.vercel.app** — Vercel rebuilds automatically on every push to `main`. (⚠️ still on a **Hobby** account, not Pro — an unresolved launch blocker; see Known issues + D-1.03b-1. This phase does not change that.)
- **New this phase — the shop machinery is built, ready for real products:**
  - **`/products` (the catalog) is now a real page.** It reads products from data files and shows a responsive black-and-white grid (3 across on desktop, 2 on a phone) with hairline gutters — name, price, and a `SOLD OUT` marking on anything out of stock. **Right now it shows a quiet "Products coming soon." line**, because no real products have been added yet (that is 1.04b).
  - **Every product gets its own page** at `/products/<name>` — big photo(s) with clickable thumbnails, the product name, price, a size picker, a colour picker, a short description, and an **Add to cart** button. Out-of-stock products show "Sold out." instead of the button.
  - **The cart works.** Adding a product stores it in the browser (survives a page reload), and the cart icon in the header now shows a **live count badge**. The cart *page* itself is still to come (1.05) — clicking the icon still 404s for now.
  - **A documented product format.** Products are simple JSON files, one per product, in `data/products/`. A bad file stops the build with a plain message saying which file and which field is wrong — so a non-coding editor gets a clear error, not a crash. One example file (`_example.json`) documents the format and is the template to fill against; it never shows on the site.
- **No fake products shipped.** The committed catalog is intentionally empty apart from the hidden example — nothing invented (no fake names, prices, photos, or claims). The real products drop in during 1.04b.
- **Not built yet:** the cart page + order form (1.05), contact/legal pages (1.06), the order-notification email (2.01). Home's `FEATURED` section still says `Catalog coming soon.` (it gets wired to real featured products in 1.04b).
- Current phase: 1.04a, closing. Next: **1.04b — Populate real products (blocked on Vaki's photos/names/prices). 1.05 (cart + order flow) is now unblocked and can run in parallel with 1.04b** — the engine it needs exists; the orchestrator confirms sequencing at phase close.

## Current stack
See `src/_project-state/00_stack-and-config.md` (only source). **One new dependency this phase: `zod@4.4.3` (pinned exact)** — build-time validation of the product JSON files. No state-management library was added (the cart uses React context + `localStorage`). Otherwise unchanged from 1.01: Next 16.2.10, React 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2, lucide-react 1.24.0, Node v24.17.0. `motion` still not installed (CSS transitions only, gated by `prefers-reduced-motion`). Fonts still `next/font/google` (Bebas Neue 400 + Hanken Grotesk, `latin` subset — Cyrillic owed before the Macedonian phase).

## Built pages / components
- `src/app/layout.tsx` — root layout; loads the two brand fonts, sets `<title>`/description, and wraps every route in `<CartProvider>` (new, 1.04a) then `<Header>` + `<Footer>` in a `min-h-dvh` flex column.
- `src/app/page.tsx` — the real **Home** (1.03): wall-of-type `TRAJANOV` hero, intro line, `VIEW CATALOG` CTA → `/products`, and the `FEATURED` heading + the muted `Catalog coming soon.` empty state (unchanged this phase).
- `src/app/products/page.tsx` — **catalog** (1.04a): builds a responsive broadsheet grid from `getAllProducts()` (3-col desktop / 2-col mobile, 1px hairline gutters); with zero products shows the centred muted `Products coming soon.` line. No fake grid.
- `src/app/products/[slug]/page.tsx` — **product page** (1.04a): loads by slug (unknown slug → `notFound()` → shell-wrapped 404), `generateStaticParams` (pre-renders known products; empty for now), `generateMetadata` (`<title>` = `"<name> — Trajanov"`, description = `description` or `"<name>."`), and renders `<ProductDetail>`.
- `src/components/products/product-card.tsx` — catalog card (server): 3:4 grayscale/high-contrast image (brand §7), name (Body-MD 700), price (`{price} {currency}` Label-caps) on a raised surface strip; whole card links to the product; sold-out = `SOLD OUT` tag **and** a dimmed image (non-colour cue).
- `src/components/products/product-detail.tsx` — product detail (client): gallery with clickable thumbnails that swap the main image (opacity transition only), name (Headline-LG, Bebas), price (Label-caps), size chips (48×48), colour **text** chips (D-1.04a-3), description (Body-LG) when present, and the white `0px` Add-to-cart button. Requires a size + colour when the product defines them (inline text hint if missing); shows `Sold out.` and no add-to-cart when out of stock.
- `src/components/header.tsx` — shared header (1.03); **this phase** the cart icon gained a **live monochrome item-count badge** (square, `0px`, white on ink) reading from `useCart()`, plus a count in its `aria-label`. Still links to `/cart` (which still 404s).
- `src/components/footer.tsx` — shared footer (1.03), unchanged: Instagram link, `PRIVACY`/`TERMS`, `© 2026 Trajanov`, no contact rows.
- `src/lib/products.ts` — product data layer: Zod schema + TS type + loader (`getAllProducts`, `getProductBySlug`); reads `data/products/*.json`, ignores `_`-prefixed files, fails the build on a malformed file with a file+field message. Server-only (`node:fs`).
- `src/lib/cart.tsx` — client cart store: React context + `localStorage` (via `useSyncExternalStore`); `CartProvider` + `useCart`. Line item: `{ slug, name, price, size, colour, qty }`.
- `src/lib/format.ts` — client-safe helpers: `formatPrice()` and the shared image-treatment class.
- `src/components/ui/button.tsx`, `src/lib/utils.ts`, `src/app/globals.css` — unchanged from earlier phases.

## Product data (state)
- `data/products/` contains **only `_example.json`** — the hidden, documented example. **No real or fake-looking products are committed** (content-truth, brief Task 2). The catalog therefore renders its empty state.
- `public/images/products/` holds only `.gitkeep` — real photos land in 1.04b.

## Expected 404s (by design — not bugs)
The header/footer/Home link to these real, final paths; the pages arrive in their own phases. Each currently renders Next's default not-found (wrapped in the shell) and that is intended:
- `/cart` (cart icon) → Phase 1.05 (the cart store already works; only the page is missing)
- `/contact` (CONTACT nav) → Phase 1.06
- `/privacy`, `/terms` (footer legal links) → Phase 1.06
- **`/products/<unknown-slug>` → 404 by design** — any slug without a matching product file calls `notFound()`. (With zero products committed, *every* `/products/<slug>` 404s until 1.04b adds files.)

*(Cleared this phase: `/products` is now a real page and is off this list.)*

## Owed-verification register
*(Checks the executor could not perform and owes to Lazar — in-browser checks, real-inbox tests, owner ratifications.)*
- **New this phase (1.04a) — eyeball the catalog + a product page on the live preview URL (5-item check):** (1) cards read as one clean B&W catalog; (2) monochrome + sharp corners, nothing rounded; (3) size/colour pickers show a clear selected state without relying on colour; (4) add-to-cart bumps the header count; (5) nothing hypey, invented, or off-brand. *(Executor verified all of this on `localhost` with temporary throwaway fixtures — desktop + mobile screenshots in the completion report — but Lazar's own eyeball on the deployed URL is owed. Note: on the deployed `main`, the catalog is the empty "Products coming soon." state until 1.04b, so the populated-grid check is best done against 1.04b's preview or by re-adding local fixtures.)*
- **Carried, still owed (1.03b):**
  - **Decide the Vercel Hobby → Pro question** (owner-level, money). Blocks launch. See Known issues + D-1.03b-1.
  - **Look at the site on an actual phone** and capture the desktop + mobile screenshots for the record — the mobile *visual* has still never been seen on a real device (only emulated at 375px). Now includes the catalog + a product page at phone width.
- **Still owed to 1.07:**
  - Full **Lighthouse 95+** and a formal **WCAG 2.2 AA** audit on the deployed URL. Nothing seen so far looks likely to fail (focus rings, tap targets ≥44px / chips 48×48, contrast, reduced-motion, no colour-only state all implemented and spot-checked this phase).
- **Carried from 1.02:**
  - Ratify the Voice & tone proposal in `brand.md` §9.
  - Confirm the logo (Vaki's file vs. the Bebas Neue wordmark).
  - Supply the approved Stitch export into `docs/design-handovers/trajanov-stitch-reference/` (D-1.02-7).
  - Verify Bebas Neue + Hanken Grotesk **Cyrillic** coverage before the Macedonian phase (D-1.02-3).
  - Final SEO title/description copy is provisional — owed a real pass at a content/SEO phase.
- **Carried from 1.01:**
  - Add a Claude auth secret to activate the automatic reviewer. Deferred to 1.07 (D-1.03b-2). Four phases have merged with no review; **1.04a will be the fifth** unless the secret is added first. The gate has never once run.

## Placeholder register
*(Every visible `[PLACEHOLDER: …]` on the site. Must be EMPTY before cutover — launch blocker.)*
- No `[PLACEHOLDER: …]` fact-tokens render anywhere. No UNVERIFIED fact is shown on any page.
- **Currency:** the product template shows `MKD` as the unconfirmed default (facts.md: "MKD assumed", UNVERIFIED). It is presented plainly and nothing on the page depends on it being verified; no fact-token placeholder is used.
- **Intentional empty content (not fact-tokens):** the catalog shows `Products coming soon.` and Home's FEATURED shows `Catalog coming soon.` in place of real products. `data/products/` deliberately holds only `_example.json`. All replaced by real products in 1.04b.
- Forward guardrail: the handover's strip register (`docs/design-handovers/Part-1-Phase-02-Design-Handover.md` §3) — invented Stitch copy (fake shipping/returns/origin claims, newsletter, wishlist, editorial nav, "© 2024") that must **not** ship — verified absent from the 1.04a catalog + product pages; no shipping/returns/delivery-cost/sourcing claim appears anywhere.

## Integrations wired
- Repo: github.com/petarjakimov11012011-cell/trajanov — private ✅. **`main` now holds Phase 1.04a** — PR #5 (`phase-1.04a-products-engine`) squash-merged with **no review** at the operator's explicit direction (D-1.04a-4), the fourth executor-merge override after D-1.01-6, D-1.02-8, D-1.03-2.
- GitHub review Action (Claude Code) — committed at `.github/workflows/claude-code-review.yml`; runs on every PR but **still skips: no auth secret set** (deferred to 1.07, D-1.03b-2). Consequence: **1.04a merged unreviewed too (D-1.04a-4); the hard gate has never once run.** Activates automatically the moment a secret is added.
- **Vercel — CONNECTED ✅** (1.03b). Project `trajanov` under "Petar Jakimov Projects", auto-deploying `main`. Live URL: https://trajanov.vercel.app. **⚠️ Hobby plan, NOT Pro — launch blocker, see Known issues + D-1.03b-1.**

## Carryovers / waiting on
- **Product photos + names + prices + currency (MKD) from Vaki → blocks 1.04b.** (The engine is ready; this is now the only thing between the empty catalog and a full shop.)
- Contact email/phone/address, legal name, shipping scope, delivery cost → `facts.md` UNVERIFIED rows; needed before order-flow and legal pages.
- Order-notification email (Vaki's) → blocks 2.01.
- trajanov.com availability check (parallel track) → feeds 2.03.

## Known issues
- **🔴 LAUNCH BLOCKER — the site is hosted on Vercel Hobby, the plan this project explicitly rejected (D-0.00-3).** Unchanged this phase. Needs an owner decision (upgrade to Pro / keep Hobby as a private preview and treat launch as blocked / genuinely revisit D-0.00-3). See D-1.03b-1.
- `npm install` reports 2 moderate-severity advisories in the transitive dependency tree (unchanged since 1.01; not in runtime deps). `zod` added no new advisories.
- Stack is Next 16 / React 19 / Tailwind v4 (newer than the plan's Next 15 illustration). Watch for breaking-change gotchas.
- `next/font` fetches Google Fonts at **build time** — a build with no network (or a rate-limit) fails on the font step; retry resolves it. Not a code issue.
- **Product images use `next/image`.** In dev the first request optimizes on demand (a brief blank before paint — normal). On Vercel this is fine. Real photos (1.04b) go under `public/images/products/`.

## Notes
- Collaborator: Lazar and Petar share the `petarjakimov11012011-cell` GitHub account (D-0.00-8).
- Token discipline: `brand.md` is the only source of design values. The products UI hardcodes no colour/font/spacing/radius that belongs to a token — type comes from the `.type-*` roles, colour/spacing from the token utilities. The only component-level literals are the same standard focus-ring recipe reused from 1.02/1.03, the chip weight ramp (medium→bold, to make "bold" a real selected cue since Label-caps is always 700 — brand §10), and the image grayscale/contrast filter (brand §7 pins no exact filter numbers; conservative defaults, to be tuned to Vaki's real photos in 1.04b).
- The cart store is a client component (`"use client"`); `useCart()` throws if used outside `<CartProvider>` (which wraps the whole app in `layout.tsx`).
- Deterministic catalog order: products sort by name A→Z (readdir order is not stable across OSes). If a curated order is wanted later, that becomes a small follow-up.