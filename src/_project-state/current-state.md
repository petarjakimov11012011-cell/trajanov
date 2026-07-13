NEXT: 1.04b — Products, Catalog, Product page (blocked: awaiting Vaki's product photos + details)

# current-state.md — Trajanov
*This snapshot gets OVERWRITTEN — it mirrors the repo as it is right now, never the plan. Code updates it (including the NEXT line above) when closing every phase. If plan and code disagree, this file follows the code and the mismatch is surfaced.*

**Last updated:** 2026-07-13 (Phase 1.06 — Code: Contact + Legal)

## Summary (plain language)
- **The site is live at https://trajanov.vercel.app** — Vercel rebuilds automatically on every push to `main`. (⚠️ still on a **Hobby** account, not Pro — an unresolved launch blocker; see Known issues + D-1.03b-1. This phase does not change that.)
- **New this phase — the three pages the header and footer linked into now exist, so the site no longer links into dead ends:**
  - **`/contact` is now a real page** (it used to 404). A short, plain page: a `CONTACT` header, one intro line, then the contact channels — the verified **Instagram** link (`@trajanovv2026`) as the one live channel, and **email** + **phone** shown as visible `[PLACEHOLDER: … — from Vaki]` tokens because those facts are still UNVERIFIED. No street address, no owner name, no form (D-1.06-1).
  - **`/privacy` is now a real page.** Plain-language privacy for a cash-on-delivery store: what the order form collects (name, phone, delivery address, city) and why (to contact the customer and arrange delivery), that the cart lives in the shopper's own browser and is sent nowhere until they order, that there are no accounts and no online payment (so no card data is handled), that the site uses no tracking cookies, and that order details are not sold. The operating entity shows as a placeholder token; the page carries a real "Last updated 13 July 2026" date. It names **no** third-party processor and makes **no** analytics/cookie-vendor disclosure yet (D-1.06-2).
  - **`/terms` is now a real page.** Plain-language terms: what the site is, the ordering flow (submit the order form → the store contacts the customer → the customer **pays the courier in cash**), that it ships **mainly to Macedonia**, that prices are "as shown on each product page" (no currency asserted — D-1.06-3), a **returns & exchanges** section holding its placeholder token (D-1.06-4), the operating entity as a placeholder, and governing law **North Macedonia**. No delivery cost, no delivery time, no cross-border claim.
- **No new dependency, no fake content.** These pages needed none; nothing was invented. Every UNVERIFIED fact renders as a loud, register-tracked placeholder token rather than a guess. A small shared component (`src/components/placeholder-token.tsx`) renders those tokens in the brand's error colours so they read as clearly unfinished.
- **Not built yet:** the real order-notification email (2.01), analytics/order event (2.02), and the processor-naming + cookie/analytics disclosure pass owed to the legal pages (at/after 2.02, D-1.06-2). Real products still aren't in the catalog (1.04b, blocked on Vaki's photos/prices); Home's `FEATURED` still says `Catalog coming soon.`
- Current phase: 1.06, closing. **Next: 1.04b — Products, Catalog, Product page** (the critical-path phase, blocked on Vaki's product photos + details). **1.07 (Part 1 verification) is the remaining Part-1 phase**, but it is best run after 1.04b populates the catalog so the audit runs against a real shop. The orchestrator confirms sequencing at close.

## Current stack
See `src/_project-state/00_stack-and-config.md` (only source). **No new dependency this phase** — the contact/legal pages are plain content built from existing tokens and `.type-*` roles; nothing was installed. The cart still uses React context + `localStorage` (no state-management library); `resend` is still NOT installed (deferred to 2.01, D-1.05-2). Unchanged otherwise: Next 16.2.10, React 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2, lucide-react 1.24.0, zod 4.4.3, Node v24.17.0. `motion` still not installed (CSS transitions only, gated by `prefers-reduced-motion`). Fonts still `next/font/google` (Bebas Neue 400 + Hanken Grotesk, `latin` subset — Cyrillic owed before the Macedonian phase).

## Built pages / components
- `src/app/layout.tsx` — root layout; loads the two brand fonts, sets `<title>`/description, and wraps every route in `<CartProvider>` then `<Header>` + `<Footer>` in a `min-h-dvh` flex column.
- `src/app/page.tsx` — the real **Home** (1.03): wall-of-type `TRAJANOV` hero, intro line, `VIEW CATALOG` CTA → `/products`, and the `FEATURED` heading + the muted `Catalog coming soon.` empty state (unchanged this phase).
- `src/app/products/page.tsx` — **catalog** (1.04a): responsive broadsheet grid from `getAllProducts()`; with zero products shows the centred muted `Products coming soon.` line (its current state on `main`).
- `src/app/products/[slug]/page.tsx` — **product page** (1.04a): loads by slug (unknown → `notFound()`), `generateStaticParams` + `generateMetadata`, renders `<ProductDetail>`.
- **`src/app/cart/page.tsx` — cart page (1.05, NEW):** client component; reads/mutates the cart store; per-line 3:4 treated thumbnail slot (+ name) linking to the product, name, size·colour, unit price, qty −/+ control, line total, Remove; item subtotal in MKD (no delivery line — D-1.05-3); short delivery note; primary `Proceed to order` → `/order`; empty-cart message + link to `/products`.
- **`src/app/order/page.tsx` — order form (1.05, NEW):** client component; redirects to `/cart` if empty; four labelled required fields (name/phone/address/city — no country field); inline per-field validation (focus first invalid; error = `--error` text + visible text, not colour-only); compact order summary; cash-on-delivery stated plainly; submits via the `submitOrder` server action → success clears the cart and routes to `/order/thanks`, failure keeps the cart and shows the exact error + verified Instagram link.
- **`src/app/order/actions.ts` — order server action (1.05, NEW):** `"use server"`; `submitOrder(payload)` calls `sendOrder` server-side. The seam Phase 2.01 edits (drops in the secret-bearing Resend call, no client change).
- **`src/app/order/thanks/page.tsx` — confirmation (1.05):** static server component; Bebas `THANK YOU` + the exact `brand.md` §9 copy + a link back to `/products`; metadata title `Thank you — Trajanov`.
- **`src/app/contact/page.tsx` — contact page (1.06, NEW):** static server component; Bebas `CONTACT` header, one plain intro line, then a `<dl>` of channels — verified Instagram link (`@trajanovv2026`, opens in a new tab) + email/phone as `<PlaceholderToken>`s; no address, no owner name, no form (D-1.06-1); metadata title/description.
- **`src/app/privacy/page.tsx` — privacy page (1.06, NEW):** static server component; `PRIVACY` header + "Last updated 13 July 2026" + seven plain sections (who runs it, what we collect, why, your cart, no accounts/no online payment, cookies, not sold); operating entity as a `<PlaceholderToken>`; processor-agnostic, no analytics/cookie-vendor disclosure (D-1.06-2); metadata title/description.
- **`src/app/terms/page.tsx` — terms page (1.06, NEW):** static server component; `TERMS` header + "Last updated 13 July 2026" + sections (about, how ordering works as a 3-step list, prices, delivery, returns & exchanges, governing law, questions); prices "as shown" with no currency (D-1.06-3); returns section holds its `<PlaceholderToken>` (D-1.06-4); operating entity placeholder; governing law North Macedonia; verified Instagram link; metadata title/description.
- `src/components/header.tsx` — shared header (1.03; badge 1.04a): the live monochrome cart-count badge reads `useCart()`; **the cart icon → `/cart` now resolves to the real page.**
- `src/components/footer.tsx` — shared footer (1.03), unchanged: Instagram link, `PRIVACY`/`TERMS`, `© 2026 Trajanov`. **Its `/privacy` and `/terms` links now resolve to the real pages.**
- **`src/components/placeholder-token.tsx` — shared placeholder token (1.06, NEW):** renders a literal UNVERIFIED-fact token in the brand's error colours (`--error` on `--error-surface`, the AA-checked 5.5:1 pair) so it reads as loud and clearly unfinished; `box-decoration-clone` keeps its background intact when a long token wraps (no 375px overflow). Used by the contact/privacy/terms pages.
- `src/components/products/product-card.tsx` — catalog card (1.04a), unchanged this phase.
- `src/components/products/product-detail.tsx` — product detail (1.04a), unchanged this phase.
- `src/lib/products.ts` — product data layer (1.04a): Zod schema + loader, server-only. Unchanged this phase.
- **`src/lib/order.ts` — order submission (1.05, NEW):** SERVER-ONLY; `OrderPayload`/`OrderResult` types + `sendOrder(payload)`. This phase a **stub** — no network call, no secret (D-1.05-2); validates the payload, honours the server-side `ORDER_STUB_FAIL` flag, else returns success. Carries the `// Phase 2.01: replace stub body with the real Resend send` marker.
- `src/lib/cart.tsx` — client cart store (1.04a; **extended 1.05**): `CartProvider` + `useCart`; 1.05 added `setQty` / `removeLine` / `clear` + a pure `cartSubtotal(items)` helper. Line-item shape `{ slug, name, price, size, colour, qty }` **unchanged** (D-1.05-4).
- `src/lib/format.ts` — client-safe helpers (1.04a; 1.05 added `DEFAULT_CURRENCY = "MKD"`): `formatPrice()`, the shared image-treatment class, and the unverified default currency the cart/order use (a cart line stores no currency).
- `src/components/ui/button.tsx`, `src/lib/utils.ts`, `src/app/globals.css` — unchanged from earlier phases.

## Expected 404s (by design — not bugs)
The header/footer/Home link to these real, final paths; the pages arrive in their own phases. Each currently renders Next's default not-found (wrapped in the shell) and that is intended:
- **`/products/<unknown-slug>` → 404 by design** — any slug without a matching product file calls `notFound()`. (With zero products committed, *every* `/products/<slug>` 404s until 1.04b adds files.)

*(Cleared this phase (1.06): `/contact`, `/privacy`, and `/terms` are now real static pages and are off this list. No route that the header, footer, or Home links to now 404s — the only remaining by-design 404 is an unknown product slug.)*

## Owed-verification register
*(Checks the executor could not perform and owes to Lazar — in-browser checks, real-inbox tests, owner ratifications.)*
- **New this phase (1.06) — eyeball the three new pages on the live preview URL, desktop AND a real phone:** `/contact`, `/privacy`, `/terms` each render inside the shell; the Instagram links open `instagram.com/trajanovv2026` in a new tab; the four placeholder tokens (email, phone, registered business name ×2, returns policy) are visibly present as loud red blocks; no horizontal overflow on a real phone; the white focus ring shows on the Instagram links. *(Executor verified all of this on `localhost` — desktop + 375px screenshots and a scrollWidth==clientWidth overflow check are in the 1.06 completion report — but Lazar's own eyeball on the deployed URL, and on a real phone, is owed.)*
- **New this phase (1.06) — legal-pages processor pass owed at/after 2.02 (D-1.06-2):** once the real order email (2.01) and analytics (2.02) are wired, revisit `/privacy` and `/terms` to name the actual processors (Resend for email, Vercel for hosting, the analytics vendor) and add the cookie/analytics disclosure. Until then the pages stay processor-agnostic and truthful for the site as it exists (they state only "no tracking cookies").
- **Carried, still owed (1.05) — eyeball the order flow on the live preview URL, desktop AND a real phone:** (1) `/cart` with items — lines read cleanly, qty −/+ and Remove work and the header count follows, the subtotal is right, `Proceed to order` goes to `/order`; (2) `/cart` empty — the quiet message + catalog link; (3) `/order` — the four fields, COD line, and (submitting blanks) the per-field errors with focus jumping to the first; (4) a real successful submit lands on `/order/thanks` and empties the cart; (5) the forced-failure error block (set `ORDER_STUB_FAIL=true` in the preview's env) keeps the cart and shows the exact message + a working Instagram link. *(Executor verified all of this on `localhost` — desktop + mobile (375px) screenshots and the logged payload are in the 1.05 completion report — but Lazar's own eyeball on the deployed URL, and on a real phone, is owed.)*
- **Carried, still owed (1.04a):** eyeball the catalog + a product page on the live preview (best done against 1.04b's preview or with local fixtures, since deployed `main` shows the empty "Products coming soon." state).
- **Carried, still owed (1.03b):**
  - **Decide the Vercel Hobby → Pro question** (owner-level, money). Blocks launch. See Known issues + D-1.03b-1.
  - **Look at the site on an actual phone** and capture the desktop + mobile screenshots for the record — the mobile *visual* has still never been seen on a real device (only emulated at 375px). Now also covers `/cart`, `/order`, `/order/thanks`.
- **Still owed to 1.07:**
  - Full **Lighthouse 95+** and a formal **WCAG 2.2 AA** audit on the deployed URL. Nothing seen so far looks likely to fail (focus rings, tap targets ≥44px, contrast, reduced-motion, no colour-only state, no 375px overflow all implemented and spot-checked — the order-form error state uses text + `--error`, never colour alone).
- **Carried from 1.02:**
  - Ratify the Voice & tone proposal in `brand.md` §9. *(1.05 renders the §9 order-confirmation and order-send-failure lines verbatim — this ratification now has visible copy riding on it.)*
  - Confirm the logo (Vaki's file vs. the Bebas Neue wordmark).
  - Supply the approved Stitch export into `docs/design-handovers/trajanov-stitch-reference/` (D-1.02-7).
  - Verify Bebas Neue + Hanken Grotesk **Cyrillic** coverage before the Macedonian phase (D-1.02-3).
  - Final SEO title/description copy is provisional — owed a real pass at a content/SEO phase.
- **Carried from 1.01:**
  - Add a Claude auth secret to activate the automatic reviewer. Deferred to 1.07 (D-1.03b-2). **Six phases have now merged with no review** (PR #6 included, D-1.05-6). The gate has never once run; it activates the moment a secret is added.

## Placeholder register
*(Every visible `[PLACEHOLDER: …]` on the site. Must be EMPTY before cutover — launch blocker.)*
- **Four fact-tokens now render (all new in 1.06, all UNVERIFIED in `facts.md`, all launch blockers until Vaki supplies them):**
  - `[PLACEHOLDER: public email — from Vaki]` — on `/contact` (Email row).
  - `[PLACEHOLDER: phone — from Vaki]` — on `/contact` (Phone row).
  - `[PLACEHOLDER: registered business name — from Vaki]` — on `/privacy` ("Who runs this site") **and** `/terms` ("About this site"); the same token appears on both pages.
  - `[PLACEHOLDER: returns & exchanges policy — from Vaki]` — on `/terms` (Returns and exchanges section, D-1.06-4).
  - All render via `<PlaceholderToken>` in the brand's error colours so they are loud and obviously unfinished, never silently blank or invented text.
- **Currency:** the cart, the order summary, and the product template all show `MKD` as the unconfirmed default (facts.md: "MKD assumed", UNVERIFIED). Presented plainly; nothing depends on it being verified; no fact-token placeholder is used (`DEFAULT_CURRENCY` in `src/lib/format.ts`).
- **Cart line thumbnail (design placeholder, not a fact-token):** a cart line stores no product image (the line-item shape is fixed — D-1.05-4/-5), so `/cart` renders the shared 3:4 treated `bg-surface` tile in place of the photo. Not invented content; a follow-up can add a real thumbnail once the line item can carry an image (post-1.04b).
- **Intentional empty content (not fact-tokens):** the catalog shows `Products coming soon.` and Home's FEATURED shows `Catalog coming soon.`; `data/products/` holds only `_example.json`. All replaced by real products in 1.04b.
- Forward guardrail: the handover's strip register (`docs/design-handovers/Part-1-Phase-02-Design-Handover.md` §3) — invented Stitch copy (fake shipping/returns/origin claims, newsletter, wishlist, editorial nav, "© 2024") that must **not** ship — verified absent from the 1.05 cart/order/thanks pages and the 1.06 contact/privacy/terms pages; the legal pages state no delivery cost, no delivery time, no returns window as fact, no cross-border/worldwide claim, and assert no currency; no review/count/star and no §9-banned hype appears.

## Order flow (state — from 1.05, unchanged this phase)
- **Submission is server-side** (`submitOrder` server action → `sendOrder` in `src/lib/order.ts`) so Phase 2.01 can drop the real Resend call — which needs a server-only secret — into `sendOrder` with **no client change**. The `// Phase 2.01` marker sits at that exact spot.
- **`sendOrder` is a stub this phase:** no network call, no secret. It validates the payload (defensive server-side check), then returns success — unless the server-side env flag **`ORDER_STUB_FAIL=true`** is set, which forces the failure path (for testing/screenshots). Unset = success. The flag is **not** `NEXT_PUBLIC_`-prefixed (undefined in the browser), is **not** committed anywhere, and would only be set in Vercel/`.env.local` if a deployed failure demo is wanted.
- **The order payload** handed to `sendOrder` = the four customer fields (name/phone/address/city) + every cart line (slug, name, size, colour, qty, price) + the subtotal + currency. Verified locally via a dev-only server log (dev-only so no customer PII is logged in production).

## Integrations wired
- Repo: github.com/petarjakimov11012011-cell/trajanov — private ✅. **`main` now holds Phase 1.05** — PR #6 (`phase-1.05-cart-order`) squash-merged with **no review** at the operator's explicit direction (D-1.05-6), the fifth executor-merge override after D-1.01-6, D-1.02-8, D-1.03-2, D-1.04a-4.
- GitHub review Action (Claude Code) — committed at `.github/workflows/claude-code-review.yml`; runs on every PR but **still skips: no auth secret set** (deferred to 1.07, D-1.03b-2). Consequence: **PRs #1–#6 all merged unreviewed; the hard gate has never once run.** The 1.06 PR (contact/legal) will be the seventh and will also skip unless the secret is added first. Activates automatically the moment a secret is added.
- **Vercel — CONNECTED ✅** (1.03b). Project `trajanov` under "Petar Jakimov Projects", auto-deploying `main`. Live URL: https://trajanov.vercel.app. **⚠️ Hobby plan, NOT Pro — launch blocker, see Known issues + D-1.03b-1.**

## Carryovers / waiting on
- **Product photos + names + prices + currency (MKD) from Vaki → blocks 1.04b.** The engine + the cart/order flow are ready; this is the only thing between the empty catalog and a working shop.
- **Contact email + phone + registered business name + returns & exchanges policy → now rendering as visible placeholder tokens on the live `/contact`, `/privacy`, `/terms` pages (1.06).** All UNVERIFIED in `facts.md`; each is a launch blocker until Vaki supplies it and the token is replaced (see the placeholder register). No public street address is needed for this store model (D-1.06-1).
- **Order-notification email (Vaki's) + a Resend API key → blocks 2.01** (the real order send that replaces the 1.05 stub).
- **Delivery cost & courier, and whether orders ship outside Macedonia → still UNVERIFIED.** 1.05 finalized the order form Macedonia-only (city free text, no country field — D-1.05-1) and shows no delivery cost (D-1.05-3); confirming these later is a small follow-up (add a country field / a delivery line), not a rebuild.
- trajanov.com availability check (parallel track) → feeds 2.03.

## Known issues
- **🔴 LAUNCH BLOCKER — the site is hosted on Vercel Hobby, the plan this project explicitly rejected (D-0.00-3).** Unchanged this phase. Needs an owner decision (upgrade to Pro / keep Hobby as a private preview and treat launch as blocked / genuinely revisit D-0.00-3). See D-1.03b-1.
- `npm install` reports 2 moderate-severity advisories in the transitive dependency tree (unchanged since 1.01; not in runtime deps).
- Stack is Next 16 / React 19 / Tailwind v4 (newer than the plan's Next 15 illustration). Watch for breaking-change gotchas.
- `next/font` fetches Google Fonts at **build time** — a build with no network (or a rate-limit) fails on the font step; retry resolves it. Not a code issue.
- Product images use `next/image`; real photos (1.04b) go under `public/images/products/`.

## Notes
- Collaborator: Lazar and Petar share the `petarjakimov11012011-cell` GitHub account (D-0.00-8).
- Token discipline: `brand.md` is the only source of design values. The cart/order/thanks and the new contact/privacy/terms pages hardcode no colour/font/spacing/radius that belongs to a token — type comes from the `.type-*` roles, colour/spacing from the token utilities, and the only reused literal is the standard white focus-ring recipe from 1.02+. The placeholder token uses the `--error`/`--error-surface` pair (the AA-checked 5.5:1 pair from `brand.md` §3). `DEFAULT_CURRENCY = "MKD"` is a facts.md content default (UNVERIFIED), not a design token.
- The cart store is a client component; `useCart()` throws if used outside `<CartProvider>` (which wraps the whole app in `layout.tsx`). The `/cart` and `/order` pages gate on the store's `hydrated` flag so they never flash an empty state before localStorage loads.
- Order-form UX detail: a successful submit sets an internal `placed` flag **before** clearing the cart, so emptying the cart doesn't trip the "empty cart → redirect to /cart" guard; the customer reaches `/order/thanks` as intended. (Found and fixed during in-browser verification.)