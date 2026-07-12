NEXT: 1.06 — Contact + Legal

# current-state.md — Trajanov
*This snapshot gets OVERWRITTEN — it mirrors the repo as it is right now, never the plan. Code updates it (including the NEXT line above) when closing every phase. If plan and code disagree, this file follows the code and the mismatch is surfaced.*

**Last updated:** 2026-07-12 (Phase 1.05 — Code: Cart + Order flow)

## Summary (plain language)
- **The site is live at https://trajanov.vercel.app** — Vercel rebuilds automatically on every push to `main`. (⚠️ still on a **Hobby** account, not Pro — an unresolved launch blocker; see Known issues + D-1.03b-1. This phase does not change that.)
- **New this phase — a customer can place an order end-to-end:**
  - **`/cart` is now a real page** (it used to 404). It lists what's in the browser cart — each line shows the product name, size and colour, the unit price, a quantity **−/+** control, a line total, and a **Remove** control; the running **subtotal** is shown in MKD. Changing a quantity or removing a line updates the cart everywhere (the header count stays in sync). There's a **Proceed to order** button, and an empty cart shows a quiet "Your cart is empty." with a link back to the catalog. *(Cart thumbnails are a plain treated tile, not the product photo — a cart line doesn't store an image yet; see the placeholder register + D-1.05-5.)*
  - **`/order` is the order form** — full name, phone, address, city (Macedonia delivery only; **no country field**, D-1.05-1). It states plainly that payment is **cash on delivery**. Empty fields (or a phone with no digits) show a clear message under each field and jump focus to the first problem. It shows a short summary of what's being ordered.
  - **Placing an order is built but the email is a safe stub this phase** (D-1.05-2). On success the cart is emptied and the customer lands on **`/order/thanks`** with the confirmation copy. On a (test-forced) failure the page stays put, the cart is kept intact (**an order is never silently lost**), and a message offers to retry or order via Instagram. **No real email is sent and no secret is used yet** — the real send lands in Phase 2.01.
- **No new dependency, no fake content.** No `resend` package was installed (deferred to 2.01); nothing invented; MKD is shown plainly as the unconfirmed currency, exactly as the product pages do.
- **Not built yet:** contact/legal pages (1.06), the real order-notification email (2.01), analytics/order event (2.02). Real products still aren't in the catalog (1.04b, blocked on Vaki's photos/prices); Home's `FEATURED` still says `Catalog coming soon.`
- Current phase: 1.05, closing. **Next: 1.06 — Contact + Legal.** The remaining Part-1 code phases are **1.06** (available; needs some contact/legal facts that are still UNVERIFIED) and **1.04b** (blocked on Vaki's product data). Both are on the table; the orchestrator confirms sequencing at close.

## Current stack
See `src/_project-state/00_stack-and-config.md` (only source). **No new dependency this phase** — the order-send is a stub, so `resend` was NOT installed (deferred to 2.01, D-1.05-2). The cart still uses React context + `localStorage` (no state-management library). Unchanged otherwise: Next 16.2.10, React 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2, lucide-react 1.24.0, zod 4.4.3, Node v24.17.0. `motion` still not installed (CSS transitions only, gated by `prefers-reduced-motion`). Fonts still `next/font/google` (Bebas Neue 400 + Hanken Grotesk, `latin` subset — Cyrillic owed before the Macedonian phase).

## Built pages / components
- `src/app/layout.tsx` — root layout; loads the two brand fonts, sets `<title>`/description, and wraps every route in `<CartProvider>` then `<Header>` + `<Footer>` in a `min-h-dvh` flex column.
- `src/app/page.tsx` — the real **Home** (1.03): wall-of-type `TRAJANOV` hero, intro line, `VIEW CATALOG` CTA → `/products`, and the `FEATURED` heading + the muted `Catalog coming soon.` empty state (unchanged this phase).
- `src/app/products/page.tsx` — **catalog** (1.04a): responsive broadsheet grid from `getAllProducts()`; with zero products shows the centred muted `Products coming soon.` line (its current state on `main`).
- `src/app/products/[slug]/page.tsx` — **product page** (1.04a): loads by slug (unknown → `notFound()`), `generateStaticParams` + `generateMetadata`, renders `<ProductDetail>`.
- **`src/app/cart/page.tsx` — cart page (1.05, NEW):** client component; reads/mutates the cart store; per-line 3:4 treated thumbnail slot (+ name) linking to the product, name, size·colour, unit price, qty −/+ control, line total, Remove; item subtotal in MKD (no delivery line — D-1.05-3); short delivery note; primary `Proceed to order` → `/order`; empty-cart message + link to `/products`.
- **`src/app/order/page.tsx` — order form (1.05, NEW):** client component; redirects to `/cart` if empty; four labelled required fields (name/phone/address/city — no country field); inline per-field validation (focus first invalid; error = `--error` text + visible text, not colour-only); compact order summary; cash-on-delivery stated plainly; submits via the `submitOrder` server action → success clears the cart and routes to `/order/thanks`, failure keeps the cart and shows the exact error + verified Instagram link.
- **`src/app/order/actions.ts` — order server action (1.05, NEW):** `"use server"`; `submitOrder(payload)` calls `sendOrder` server-side. The seam Phase 2.01 edits (drops in the secret-bearing Resend call, no client change).
- **`src/app/order/thanks/page.tsx` — confirmation (1.05, NEW):** static server component; Bebas `THANK YOU` + the exact `brand.md` §9 copy + a link back to `/products`; metadata title `Thank you — Trajanov`.
- `src/components/header.tsx` — shared header (1.03; badge 1.04a): the live monochrome cart-count badge reads `useCart()`; **the cart icon → `/cart` now resolves to the real page.**
- `src/components/footer.tsx` — shared footer (1.03), unchanged: Instagram link, `PRIVACY`/`TERMS`, `© 2026 Trajanov`.
- `src/components/products/product-card.tsx` — catalog card (1.04a), unchanged this phase.
- `src/components/products/product-detail.tsx` — product detail (1.04a), unchanged this phase.
- `src/lib/products.ts` — product data layer (1.04a): Zod schema + loader, server-only. Unchanged this phase.
- **`src/lib/order.ts` — order submission (1.05, NEW):** SERVER-ONLY; `OrderPayload`/`OrderResult` types + `sendOrder(payload)`. This phase a **stub** — no network call, no secret (D-1.05-2); validates the payload, honours the server-side `ORDER_STUB_FAIL` flag, else returns success. Carries the `// Phase 2.01: replace stub body with the real Resend send` marker.
- `src/lib/cart.tsx` — client cart store (1.04a; **extended 1.05**): `CartProvider` + `useCart`; 1.05 added `setQty` / `removeLine` / `clear` + a pure `cartSubtotal(items)` helper. Line-item shape `{ slug, name, price, size, colour, qty }` **unchanged** (D-1.05-4).
- `src/lib/format.ts` — client-safe helpers (1.04a; 1.05 added `DEFAULT_CURRENCY = "MKD"`): `formatPrice()`, the shared image-treatment class, and the unverified default currency the cart/order use (a cart line stores no currency).
- `src/components/ui/button.tsx`, `src/lib/utils.ts`, `src/app/globals.css` — unchanged from earlier phases.

## Expected 404s (by design — not bugs)
The header/footer/Home link to these real, final paths; the pages arrive in their own phases. Each currently renders Next's default not-found (wrapped in the shell) and that is intended:
- `/contact` (CONTACT nav) → Phase 1.06
- `/privacy`, `/terms` (footer legal links) → Phase 1.06
- **`/products/<unknown-slug>` → 404 by design** — any slug without a matching product file calls `notFound()`. (With zero products committed, *every* `/products/<slug>` 404s until 1.04b adds files.)

*(Cleared this phase: `/cart` is now a real page and is off this list. `/order` and `/order/thanks` are new real pages, never on the list.)*

## Owed-verification register
*(Checks the executor could not perform and owes to Lazar — in-browser checks, real-inbox tests, owner ratifications.)*
- **New this phase (1.05) — eyeball the order flow on the live preview URL, desktop AND a real phone:** (1) `/cart` with items — lines read cleanly, qty −/+ and Remove work and the header count follows, the subtotal is right, `Proceed to order` goes to `/order`; (2) `/cart` empty — the quiet message + catalog link; (3) `/order` — the four fields, COD line, and (submitting blanks) the per-field errors with focus jumping to the first; (4) a real successful submit lands on `/order/thanks` and empties the cart; (5) the forced-failure error block (set `ORDER_STUB_FAIL=true` in the preview's env) keeps the cart and shows the exact message + a working Instagram link. *(Executor verified all of this on `localhost` — desktop + mobile (375px) screenshots and the logged payload are in the 1.05 completion report — but Lazar's own eyeball on the deployed URL, and on a real phone, is owed.)*
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
  - Add a Claude auth secret to activate the automatic reviewer. Deferred to 1.07 (D-1.03b-2). Five phases have merged with no review; **1.05's PR #6 will be the sixth unreviewed PR** unless the secret is added first. The gate has never once run.

## Placeholder register
*(Every visible `[PLACEHOLDER: …]` on the site. Must be EMPTY before cutover — launch blocker.)*
- No `[PLACEHOLDER: …]` fact-tokens render anywhere. No UNVERIFIED fact is shown on any page.
- **Currency:** the cart, the order summary, and the product template all show `MKD` as the unconfirmed default (facts.md: "MKD assumed", UNVERIFIED). Presented plainly; nothing depends on it being verified; no fact-token placeholder is used (`DEFAULT_CURRENCY` in `src/lib/format.ts`).
- **Cart line thumbnail (design placeholder, not a fact-token):** a cart line stores no product image (the line-item shape is fixed — D-1.05-4/-5), so `/cart` renders the shared 3:4 treated `bg-surface` tile in place of the photo. Not invented content; a follow-up can add a real thumbnail once the line item can carry an image (post-1.04b).
- **Intentional empty content (not fact-tokens):** the catalog shows `Products coming soon.` and Home's FEATURED shows `Catalog coming soon.`; `data/products/` holds only `_example.json`. All replaced by real products in 1.04b.
- Forward guardrail: the handover's strip register (`docs/design-handovers/Part-1-Phase-02-Design-Handover.md` §3) — invented Stitch copy (fake shipping/returns/origin claims, newsletter, wishlist, editorial nav, "© 2024") that must **not** ship — verified absent from the 1.05 cart/order/thanks pages; no shipping/returns/delivery-cost/sourcing claim appears; the only money shown is the item subtotal.

## Order flow (state — new this phase)
- **Submission is server-side** (`submitOrder` server action → `sendOrder` in `src/lib/order.ts`) so Phase 2.01 can drop the real Resend call — which needs a server-only secret — into `sendOrder` with **no client change**. The `// Phase 2.01` marker sits at that exact spot.
- **`sendOrder` is a stub this phase:** no network call, no secret. It validates the payload (defensive server-side check), then returns success — unless the server-side env flag **`ORDER_STUB_FAIL=true`** is set, which forces the failure path (for testing/screenshots). Unset = success. The flag is **not** `NEXT_PUBLIC_`-prefixed (undefined in the browser), is **not** committed anywhere, and would only be set in Vercel/`.env.local` if a deployed failure demo is wanted.
- **The order payload** handed to `sendOrder` = the four customer fields (name/phone/address/city) + every cart line (slug, name, size, colour, qty, price) + the subtotal + currency. Verified locally via a dev-only server log (dev-only so no customer PII is logged in production).

## Integrations wired
- Repo: github.com/petarjakimov11012011-cell/trajanov — private ✅. `main` holds Phase 1.04a; **Phase 1.05 is PR #6 (`phase-1.05-cart-order`) → `main`, opened and left UNMERGED** per the brief (Lazar merges).
- GitHub review Action (Claude Code) — committed at `.github/workflows/claude-code-review.yml`; runs on every PR but **still skips: no auth secret set** (deferred to 1.07, D-1.03b-2). Consequence: PRs #1–#5 all merged unreviewed; **the hard gate has never once run**, and PR #6 will be the sixth unreviewed PR unless the secret is added first. Activates automatically the moment a secret is added.
- **Vercel — CONNECTED ✅** (1.03b). Project `trajanov` under "Petar Jakimov Projects", auto-deploying `main`. Live URL: https://trajanov.vercel.app. **⚠️ Hobby plan, NOT Pro — launch blocker, see Known issues + D-1.03b-1.**

## Carryovers / waiting on
- **Product photos + names + prices + currency (MKD) from Vaki → blocks 1.04b.** The engine + the cart/order flow are ready; this is the only thing between the empty catalog and a working shop.
- **Contact email/phone/address + legal/registered business name → needed for 1.06 (Contact + Legal).** All UNVERIFIED in `facts.md`; 1.06 will likely ship visible `[PLACEHOLDER: …]` tokens until they land.
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
- Token discipline: `brand.md` is the only source of design values. The cart/order/thanks pages hardcode no colour/font/spacing/radius that belongs to a token — type comes from the `.type-*` roles, colour/spacing from the token utilities, and the only reused literal is the standard white focus-ring recipe from 1.02+. `DEFAULT_CURRENCY = "MKD"` is a facts.md content default (UNVERIFIED), not a design token.
- The cart store is a client component; `useCart()` throws if used outside `<CartProvider>` (which wraps the whole app in `layout.tsx`). The `/cart` and `/order` pages gate on the store's `hydrated` flag so they never flash an empty state before localStorage loads.
- Order-form UX detail: a successful submit sets an internal `placed` flag **before** clearing the cart, so emptying the cart doesn't trip the "empty cart → redirect to /cart" guard; the customer reaches `/order/thanks` as intended. (Found and fixed during in-browser verification.)