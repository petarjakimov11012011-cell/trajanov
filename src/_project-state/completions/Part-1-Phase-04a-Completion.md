# Part 1 · Phase 04a · Code — Completion Report

**Date:** 2026-07-12 · **Outcome (one line):** the shop's machinery is built — a documented product data format, a real `/products` catalog, per-product pages with pickers and add-to-cart, and a working browser cart with a live header count — all shipping with zero real (or fake) products, ready for 1.04b to drop content into.

## 1. What shipped (plain language)
The site now has the whole "engine" of a shop, just no products in it yet. `/products` is a real catalog page that reads products from data files and lays them out in a black-and-white grid; every product gets its own page with photos (and clickable thumbnails), a size picker, a colour picker, a short description, and an Add-to-cart button; and the cart actually stores what you add — it survives a page reload and the header cart icon shows a live count. Products are plain JSON files, one per product, and a bad file stops the build with a clear message naming the file and field, so a non-coding editor gets a real error instead of a crash. Because no real products have been supplied yet, the committed catalog shows a quiet "Products coming soon." line and nothing fake was invented; the moment Vaki's photos and prices arrive, 1.04b fills the shop with one short follow-up.

## 2. Definition of Done
Verifiable by me:
- ✅ **`zod@4.4.3` installed (exact) + logged; `npm run build` and `npm run lint` pass** — evidence: `package.json` shows `"zod": "4.4.3"` (no caret); `00_stack-and-config.md` has the dated 1.04a entry. Passing build tail: `✓ Compiled successfully` · `✓ Generating static pages using 5 workers (5/5)` · route table `○ /products (Static)` and `● /products/[slug] (SSG, uses generateStaticParams)`. `npm run lint` exits clean (no output/errors).
- ✅ **Schema (TS type + Zod) + loader that ignores `_`-prefixed files and fails the build on a malformed file** — `src/lib/products.ts`. Evidence (triggered while testing): a `broken.json` with `"price":"not a number"` and `images:[]` failed the build with `Error: Invalid product file "data/products/broken.json": field "price" — Invalid input: expected number, received string`, then `Build error occurred`. The broken file was removed after the test.
- ✅ **`data/products/` in the committed tree contains only `_example.json`** — verified `ls data/products/` → `_example.json` only. It is `_`-prefixed, so the loader skips it and it does not render (confirmed by the empty state below).
- ✅ **`/products` renders a responsive grid; zero products → `Products coming soon.`** — verified with temporary throwaway fixtures (4 real-shaped products + generated placeholder images, all deleted before commit). Desktop screenshot: 3-column grid, 1px hairline gutters, 3:4 B&W cards, name (Body-MD 700, Hanken), price (`9,990 MKD` Label-caps, `text-transform:uppercase`, 0.2em tracking), card radius `0px`, whole card links to the product. Mobile (375px) screenshot: 2-column grid. After deleting the fixtures, `/products` shows the centred muted `Products coming soon.` and no `<ul>` grid (verified in the DOM).
- ✅ **Sold-out card shows `SOLD OUT` label AND a dimmed image** — screenshot of the "Cropped jacket" fixture card: visibly dimmed image (opacity 0.4) with the `SOLD OUT` Label-caps tag. Non-colour cue (dim + tag), and the card still links through.
- ✅ **`/products/<slug>` renders name (Headline-LG), price (Label-caps), 48×48 size chips (selected = white border + bold, unselected = `--border-control`), colour text chips (same cues), description, white `0px` add-to-cart; unknown slug → shell-wrapped 404** — screenshots + measurements: size chip 48×48, colour chip 71×48 (auto-width text chip), add-to-cart 335×50; selected chip computed `font-weight:700` + `border-color rgb(255,255,255)`, unselected `font-weight:500` + `rgb(142,145,146)` (=`#8E9192`). Unknown slug `/products/does-not-exist` → title `404: This page could not be found.` (wrapped in the shell).
- ✅ **Add-to-cart requires size + colour when defined (inline non-colour hint); on success pushes the line item and increments the header badge** — verified: clicking Add with nothing selected shows `Pick a size and colour first.` (text hint), cart stays empty (`aria-label:"Cart"`, no badge, localStorage null). After selecting M + Black and clicking Add: `Added to cart.`, cart `aria-label:"Cart, 1 item"`, badge text `1` (white bg, `0px` radius), localStorage = `[{"slug":"tmp-overcoat","name":"Wool overcoat","price":14290,"size":"M","colour":"Black","qty":1}]` (exact line-item shape). Before/after screenshots captured.
- ✅ **Sold-out product page shows `Sold out.` and add-to-cart is unavailable** — the "Cropped jacket" fixture page shows `Sold out.` in a bordered block where the button would be; no Add-to-cart button in the DOM; pickers still shown.
- ✅ **Cart survives a page reload (localStorage); no state-management dependency added** — after a full reload the badge still read `1` and localStorage was intact. The store is React context + `localStorage` via `useSyncExternalStore`; only `zod` was added to `package.json`.
- ✅ **`generateMetadata` sets title + description from product data** — browser tab titles read `Wool overcoat — Trajanov`, `Cropped jacket — Trajanov`, and `Catalog — Trajanov`; description falls back to `<name>.` when a product has no `description`.
- ✅ **Keyboard operable, focus ring, tap targets, no colour-only state, reduced-motion, no overflow at 375px** — a size chip under keyboard Tab matched `:focus-visible` with box-shadow `... rgb(10,10,10) 0 0 0 2px, rgb(255,255,255) 0 0 0 4px` (2px ink offset + 4px white ring, brand §10). Tap targets: chips 48px, add-to-cart 50px (all ≥44). State never colour-only (weight + border + `aria-pressed`). Transitions carry `motion-reduce:transition-none` / `motion-reduce:transform-none`. No horizontal overflow at 375px on catalog and product page (`scrollWidth === innerWidth === 375`).
- ✅ **facts.md template check + humanizer pass** — MKD shown as the unconfirmed default; no shipping/returns/delivery-cost/sourcing claim anywhere; nothing from the handover strip register leaks in. Humanizer pass done on the visible strings (`Products coming soon.`, `Sold out.`, `SOLD OUT`, `Add to cart`, `Added to cart.`, the `Pick a size and colour first.` hint, `SIZE`/`COLOUR` labels): all are already plain gallery-label microcopy with no AI tells — no changes needed.
- ✅ **State files updated** — `current-state.md` (NEXT = `1.04b — Populate real products (blocked on Vaki's product data)`, 404 list updated, registers refreshed), `file-map.md`, `00_stack-and-config.md`, `decisions.md` (D-1.04a-1..3).
- ✅ **Branch pushed, PR opened** — PR [#5](https://github.com/petarjakimov11012011-cell/trajanov/pull/5). Filed unmerged per the brief; then **squash-merged to `main` at the operator's explicit direction, with no review (D-1.04a-4)** — see §5/§8.

## 3. Decisions I made during this phase
Three baked-in decisions recorded in `decisions.md` as instructed by the brief:
- **D-1.04a-1** — split Phase 1.04 into 1.04a (engine) + 1.04b (real data). Owner-ratified; alt rejected = one phase blocked on Vaki; consequence = product data leaves the critical path and 1.05 is unblocked.
- **D-1.04a-2** — product format = one JSON file per product + Zod validation + `_`-ignore convention. Alt rejected = TS/MDX modules; consequence = friendly build-time errors for a non-coding team.
- **D-1.04a-3** — colour options render as text chips of the colour name, not swatches. Alt rejected = grayscale swatches (meaningless) / real-colour dots (breaks the monochrome palette); consequence = colour is legible and never colour-only.

Minor implementation choices (not logged as `D-` decisions, called out here for transparency):
- **Cart persistence via `useSyncExternalStore`.** The brief said "React context + localStorage". I kept the React-context API (`CartProvider` + `useCart`) exactly, but back it with `useSyncExternalStore` to read localStorage. Reason: the naive "load in a `useEffect` + `setState`" pattern trips the project's `react-hooks/set-state-in-effect` lint rule (which fails `npm run lint`), and `useSyncExternalStore` is the React-blessed way to read an external store without a hydration mismatch. Still no state-management dependency; still context + localStorage.
- **Chip weight ramp (medium→bold).** brand §10 requires the selected state to use "white border + bold text". The Label-caps type role is always 700, so if chips used it, "bold" couldn't carry meaning. Chips therefore use the body font at `font-medium` (unselected) → `font-bold` (selected), keeping the uppercase/tracked label look while making weight a real, non-colour selected cue.
- **Image treatment values.** brand §7 mandates a uniform grayscale/high-contrast treatment but pins no exact filter numbers; I used a conservative `grayscale contrast-[1.05]`, to be tuned against Vaki's real photos in 1.04b.
- **Deterministic catalog order:** products sort by name A→Z (filesystem readdir order is not stable across OSes). If a curated order is wanted, that is a small follow-up.
- **Price formatting:** rendered as `{grouped number} {currency}` using English number grouping (e.g. `14,290 MKD`) — launch is English-only (D-0.00-7); currency stays the unverified `MKD` default.

## 4. Deviations from the brief
None in scope or output. The only nuances are the implementation notes in §3 — most notably backing the cart with `useSyncExternalStore` while keeping the exact React-context API the brief asked for. No scope was added or cut.

## 5. Changed files / deliverables
- **New:** `data/products/_example.json`; `src/lib/products.ts`, `src/lib/format.ts`, `src/lib/cart.tsx`; `src/components/products/product-card.tsx`, `src/components/products/product-detail.tsx`; `src/app/products/page.tsx`, `src/app/products/[slug]/page.tsx`; `public/images/products/.gitkeep`.
- **Edited:** `src/app/layout.tsx` (wraps app in `<CartProvider>`), `src/components/header.tsx` (live cart-count badge + count in `aria-label`), `package.json` / `package-lock.json` (`zod@4.4.3`), and the state files (`current-state.md`, `file-map.md`, `00_stack-and-config.md`, `decisions.md`).
- **Deleted:** `data/products/.gitkeep` (replaced by `_example.json`).
- **Branch / PR:** `phase-1.04a-products-engine` → PR [#5](https://github.com/petarjakimov11012011-cell/trajanov/pull/5) to `main`. Filed unmerged, then **squash-merged with no review at the operator's explicit direction (D-1.04a-4).**
- **Dependencies:** `zod@4.4.3` (exact) added — build-time product validation. No state-management library.

## 6. State updates done (mandatory)
- `current-state.md` — overwritten to mirror the repo; **NEXT line = `NEXT: 1.04b — Populate real products (blocked on Vaki's product data)`**; `/products` moved off the Expected-404 list; `/products/<unknown-slug> → 404 (by design)` added; `/cart` noted as still 404 until 1.05; placeholder + owed-verification registers refreshed; flags that **1.05 is now unblocked and can run in parallel with 1.04b**.
- `file-map.md` — added the new `data/`, `src/lib/`, `src/components/products/`, and `src/app/products/` files, plus the "product data format" note.
- `00_stack-and-config.md` — dated 1.04a entry: `zod@4.4.3` (exact), why, phase; no other deps.
- `decisions.md` — appended D-1.04a-1, D-1.04a-2, D-1.04a-3.

## 7. Verified here vs owed to Lazar
**Verified by me (on `localhost:3000`, with temporary throwaway fixtures I deleted before committing):** build ✅ + lint ✅; the malformed-file build failure; catalog grid (desktop 3-col / mobile 2-col, hairline gutters, B&W, name/price, links, radius 0); sold-out card (tag + dimmed); the empty state on the real committed tree; the product page (name/price/pickers/description/button); selected-state cues (white border + bold, non-colour); colour **text** chips; add-to-cart validation + hint; add-to-cart success → badge increment + `Added to cart.` + exact line-item in localStorage; cart survives reload; per-product metadata; unknown slug → 404; keyboard `:focus-visible` white ring; tap-target sizes; no 375px overflow.

**Owed to Lazar (cannot be done from the repo):**
- Eyeball the catalog + a product page on the live preview URL (the 5-item check). Note: on deployed `main` the catalog is the empty "Products coming soon." state until 1.04b, so the populated-grid check is best done against 1.04b's preview (or by re-adding local fixtures).
- Confirm the catalog + a product page look right at real phone width (the mobile *visual* is still owed from 1.03b).
- Full Lighthouse 95+ and formal WCAG 2.2 AA audit → carried to Phase 1.07 on the deployed URL.

## 8. Risks, follow-ups, what the next phase needs to know
- **1.05 is unblocked.** The cart store (`useCart`, `localStorage`, line-item shape `{ slug, name, price, size, colour, qty }`) exists; 1.05 builds the `/cart` page + order form on top of it. It can run in parallel with 1.04b — the orchestrator confirms sequencing.
- **1.04b just needs data.** Drop real product JSON files into `data/products/` (filename = slug), real photos into `public/images/products/`, and wire Home's `FEATURED` to `featured: true` products. No engine changes expected. `_example.json` is the template.
- **Reviewer gate still off** (D-1.03b-2), so this PR **was merged unreviewed** at the operator's explicit direction (D-1.04a-4) — the fourth executor-merge with no review (after D-1.01-6, D-1.02-8, D-1.03-2); the hard gate has never once run. Strongly recommend adding the auth secret before 1.05 / 1.04b so the rest of Part 1 is gated.
- **Vercel Hobby launch blocker** (D-1.03b-1) is unchanged and still owner-pending.
- Build remains network-dependent on Google Fonts via `next/font` (retry resolves a flake).

## 9. What's now possible that wasn't before
The moment Vaki sends photos, names, and prices, the shop fills up in one short phase — and the cart/order flow (1.05) can be built in parallel right now.

**NEXT line set to:** `NEXT: 1.04b — Populate real products (blocked on Vaki's product data)`
