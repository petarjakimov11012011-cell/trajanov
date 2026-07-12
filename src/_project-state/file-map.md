# file-map.md — Trajanov
*Every meaningful file/folder, one line each: what it's for. Updated on EVERY add, rename, or delete — a stale map lies. Seeded at kickoff; 1.01 extends it with the app skeleton.*

## Repo root
- `CLAUDE.md` — Claude Code's standing rules (behavioral contract, under 150 lines)
- `facts.md` — verified business facts; the only legal source for factual claims on the site
- `brand.md` — design tokens + brand rules; the only token source (FILLED at Phase 1.02)

## Process folders
- `briefs/` — every phase brief (`Part-X-Phase-YY-<Role>.md`), saved by Lazar; versioned instruction history
- `docs/design-handovers/` — Design → Code handover docs, one per design phase
- `docs/design-handovers/Part-1-Phase-02-Design-Handover.md` — Phase 1.02 design system handover (component specs + strip register)
- `docs/design-handovers/trajanov-stitch-reference/README.md` — home for the approved Stitch export; PENDING (assets owed to Lazar, see D-1.02-7)

## Project state
- `src/_project-state/current-state.md` — live snapshot; NEXT line first; owed-verification + placeholder registers
- `src/_project-state/file-map.md` — this file
- `src/_project-state/00_stack-and-config.md` — locked stack + pinned versions; append-only
- `src/_project-state/decisions.md` — why the project is the way it is; append-only
- `src/_project-state/completions/` — one completion report per phase
- `src/_project-state/completions/_TEMPLATE-Completion.md` — the report template every phase copies

## Tooling & config (repo root — from create-next-app + shadcn)
- `package.json` / `package-lock.json` — dependencies + scripts (`dev`/`build`/`start`/`lint`); exact versions logged in `00_stack-and-config.md`
- `tsconfig.json` — TypeScript config; `@/*` import alias → `src/*`
- `next.config.ts` — Next.js config (defaults)
- `next-env.d.ts` — Next.js TS shim (auto-generated, gitignored)
- `eslint.config.mjs` — ESLint flat config (extends `eslint-config-next`)
- `postcss.config.mjs` — PostCSS config (loads `@tailwindcss/postcss`)
- `components.json` — shadcn/ui config (style `base-nova`, base color neutral, icons lucide)
- `.gitignore` — ignores `node_modules/`, `.next/`, `.env*`, `.vercel`
- `README.md` — 3-line project pointer

## App (created at 1.01, design system wired at 1.02, shell + Home at 1.03, products engine at 1.04a, cart + order flow at 1.05)
- `src/app/layout.tsx` — root layout: loads Bebas Neue + Hanken Grotesk via `next/font`, sets brand `<title>`/description, imports `globals.css`, wraps every route with `<CartProvider>` (1.04a) then `<Header>` + `<Footer>` (min-h-dvh flex column)
- `src/app/page.tsx` — the real Home (1.03): wall-of-type hero, intro line, `VIEW CATALOG` CTA (a `Link` styled with `buttonVariants`, D-1.03-1), and the `FEATURED` heading + `Catalog coming soon.` empty state (no product content invented)
- `src/app/products/page.tsx` — catalog (1.04a): responsive broadsheet grid (3-col desktop / 2-col mobile, 1px hairline gutters) from `getAllProducts()`; `Products coming soon.` empty state when there are no products
- `src/app/products/[slug]/page.tsx` — product page (1.04a): loads by slug (unknown → `notFound()`), `generateStaticParams` + `generateMetadata` (title/description from product data), renders `<ProductDetail>`
- `src/app/cart/page.tsx` — **cart page (1.05)**, client component: reads/mutates the cart store (`useCart`), renders each line (3:4 treated thumbnail slot → product, name, size·colour, unit price, qty −/+ control, line total, Remove), item subtotal in MKD (no delivery line — D-1.05-3), delivery note, and a `Proceed to order` primary button → `/order`; empty cart shows a quiet message + a link to `/products`
- `src/app/order/page.tsx` — **order form (1.05)**, client component: redirects to `/cart` if the cart is empty; four labelled required fields (name, phone, address, city — no country field, D-1.05-1) with inline validation (focus first invalid; error = `--error` text + text, not colour-only), a compact order summary, cash-on-delivery stated plainly; submits via the `submitOrder` server action; success → clears cart → `/order/thanks`; failure → keeps cart, shows the exact error + the verified Instagram link
- `src/app/order/actions.ts` — **order server action (1.05)** (`"use server"`): `submitOrder(payload)` runs server-side and calls `sendOrder`; the seam where Phase 2.01's secret-bearing Resend call drops in with no client change
- `src/app/order/thanks/page.tsx` — **order confirmation (1.05)**, static server component: Bebas `THANK YOU` headline + the exact `brand.md` §9 confirmation copy (states cash-on-delivery) + a link back to `/products`; `generateMetadata` title `Thank you — Trajanov`
- `src/app/globals.css` — Tailwind v4 entry + Trajanov design tokens (mirrors `brand.md` §12), shadcn semantic aliases, and `.type-*` role utilities (`brand.md` §4)
- `src/app/favicon.ico` — default favicon (placeholder)
- `src/components/` — shared UI components
- `src/components/header.tsx` — shared site header (1.03; badge added 1.04a), client component: sticky Ink bar with hairline, `TRAJANOV` wordmark → `/`, `CATALOG`/`CONTACT` nav, cart icon → `/cart` now with a live monochrome item-count badge (reads `useCart()`), and a focus-trapped mobile menu panel (Lucide `Menu`/`X`/`ShoppingBag`)
- `src/components/footer.tsx` — shared site footer (1.03): Surface block, top hairline, `TRAJANOV` wordmark, verified Instagram link, `PRIVACY`/`TERMS` legal links, `© 2026 Trajanov` (no contact rows)
- `src/components/products/product-card.tsx` — catalog card (1.04a), server component: 3:4 B&W image, name (Body-MD 700), price (Label-caps), whole card links to the product page, sold-out = `SOLD OUT` tag + dimmed image
- `src/components/products/product-detail.tsx` — product-page detail (1.04a), client component: gallery + thumbnail swap (opacity only), name/price/description, size chips (48×48) + colour text chips (D-1.04a-3), add-to-cart (requires size+colour when defined; inline hint), sold-out shows `Sold out.`
- `src/components/ui/button.tsx` — base Button, restyled to `brand.md` tokens at 1.02 (0px corners, Label-caps, white-accent primary); exports `buttonVariants` (used by the Home CTA + the add-to-cart button)
- `src/lib/utils.ts` — shadcn `cn()` class-merge helper
- `src/lib/products.ts` — **product data layer (1.04a):** Zod schema + TS type + loader (`getAllProducts`, `getProductBySlug`); reads `data/products/*.json`, ignores `_`-prefixed files, fails the build on a malformed file. SERVER-ONLY (uses `node:fs`)
- `src/lib/format.ts` — client-safe product presentation helpers (1.04a; 1.05 added `DEFAULT_CURRENCY`): `formatPrice(price, currency)`, the shared grayscale/contrast image-treatment class, and `DEFAULT_CURRENCY = "MKD"` (the UNVERIFIED default the cart/order use, since a cart line stores no currency)
- `src/lib/cart.tsx` — client cart store (1.04a; **extended 1.05**): React context + `localStorage` (via `useSyncExternalStore`), `CartProvider` + `useCart`; no state-management dependency. 1.05 added `setQty` / `removeLine` / `clear` mutations and a pure `cartSubtotal(items)` helper — the line-item shape `{ slug, name, price, size, colour, qty }` is unchanged (D-1.05-4)
- `src/lib/order.ts` — **order submission (1.05)**, SERVER-ONLY: `OrderPayload`/`OrderResult` types + `sendOrder(payload)`. This phase it is a **stub** — no network call, no secret (D-1.05-2); validates the payload, honours the server-side `ORDER_STUB_FAIL` flag, else returns success. Carries the `// Phase 2.01: replace stub body with the real Resend send` marker
- `data/products/` — **product data format (1.04a):** one JSON file per product; the filename is the URL slug; files starting with `_` never render. Fields: `name` (string), `price` (number), `currency` (string, default `MKD`), `images` (`{src,alt}[]`, ≥1, `src` under `public/images/products/`), `sizes` (string[]), `colors` (colour-name string[]), `inStock` (bool), `description` (string?), `featured` (bool, default false; consumed in 1.04b). Validated by `src/lib/products.ts`
- `data/products/_example.json` — the one committed product file: a filled, realistic example that documents the format and (being `_`-prefixed) never renders. The template 1.04b/Vaki fill against
- `public/images/` — brand assets root; `public/images/products/` — product photos (holds `.gitkeep`; real photos land in 1.04b)
- `public/*.svg` — default create-next-app assets (`file`, `globe`, `next`, `vercel`, `window`)
