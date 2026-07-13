# 00_stack-and-config.md — Trajanov (append-only)
*A dated log of stack and config reality with EXACT pinned versions (`next@15.1.3`, never `latest` or bare `^`). Append new entries; never rewrite past ones. Rationale for these picks lives in `Trajanov-Plan.md` §8 — this file records what is actually installed.*

## 2026-07-11 — Kickoff: stack locked (nothing installed yet)

Stack ratified by Lazar; see `Trajanov-Plan.md` §8 for the why-per-layer and `decisions.md` for the contested calls.

- Framework: Next.js — **pin exact version at 1.01 install and append it here**
- Styling: Tailwind CSS — pin at 1.01
- UI components: shadcn/ui — pin at 1.01 (record the CLI version + which components were added, per phase)
- Icons: lucide-react — pin at 1.01
- Animation: motion — pin at first use (may be later than 1.01)
- Order email: resend SDK — pin at 1.05 (stub) / 2.01 (live)
- Analytics: Vercel Web Analytics (`@vercel/analytics`) — pin at 2.02
- Hosting: Vercel Pro (account pre-existing, owner: Lazar/Petar)
- Repo: github.com/petarjakimov11012011-cell/trajanov — private
- Node runtime: record installed Node version at 1.01 (both machines should match; note each)

**Rule for every phase that touches dependencies:** append a dated entry — package@exact.version, why, which phase.

## 2026-07-11 — Phase 1.01 scaffold: exact versions installed

Machine: Petar's MacBook (macOS, Darwin 25.5.0). Scaffolded with `create-next-app@latest` (into a temp dir, then moved in — README/`.git` preserved) and `shadcn@latest init -d`.

- **Node:** v24.17.0 · **npm:** 11.13.0 — this machine. Lazar's machine: record its Node version on first use there (both should match).
- **next@16.2.10** — Turbopack default; App Router, `src/` dir, TypeScript, ESLint, Tailwind, `@/*` alias. (create-next-app pins this exact.)
- **react@19.2.4** · **react-dom@19.2.4** (exact-pinned by create-next-app)
- **typescript@5.9.3** (package.json range `^5`)
- **tailwindcss@4.3.2** · **@tailwindcss/postcss@4.3.2** — Tailwind v4, PostCSS-based; no `tailwind.config` file (v4 config lives in `globals.css`)
- **eslint@9.39.5** · **eslint-config-next@16.2.10** — flat config in `eslint.config.mjs`; `npm run lint` runs bare `eslint`
- **lucide-react@1.24.0** — pinned **EXACT** (no caret; installed via `npm i -E`)
- **shadcn CLI: 4.13.0** — `init` only, defaults. Config: style `base-nova`, base color `neutral`, css-variables on, icon library lucide. Components added this phase: `button` (auto-seeded by `init`, not by `shadcn add` — see D-1.01-2).
  - Runtime deps pulled in by the `base-nova` preset (all `^`-ranged in package.json): `@base-ui/react@1.6.0`, `class-variance-authority@0.7.1`, `clsx@2.1.1`, `tailwind-merge@3.6.0`, `tw-animate-css@1.4.0`, and `shadcn@4.13.0` (added to dependencies by init).
- **Not yet installed** (pinned at first use, per plan): `motion`, `resend` (1.05 stub / 2.01 live), `@vercel/analytics` (2.02).

Note: `create-next-app@latest` resolved to the **Next 16 / React 19** line (newer than the `next@15` illustration above). Kept as-is — it is the current create-next-app default and the brief specified "defaults."

## 2026-07-12 — Phase 1.02 design system: tokens + fonts wired (no new npm dependencies)

Machine: Petar's MacBook. Node/npm and all package versions unchanged from the 1.01 entry — **nothing was added to `package.json`.**

- **Fonts:** loaded with the built-in `next/font/google` (no package to pin; faces are fetched and self-hosted at build):
  - **Bebas Neue** — display face, weight `400` (its only weight), `latin` subset, CSS var `--font-bebas`.
  - **Hanken Grotesk** — body face, variable (covers 400/500/700), `latin` subset, CSS var `--font-hanken`.
  - `latin` subset only at launch; **Cyrillic coverage owed before the Macedonian phase** (D-1.02-3 / D-0.00-7).
- **Design tokens:** `brand.md` §12 mirrored into `src/app/globals.css` (`:root`), with shadcn semantic names aliased onto the brand tokens and both naming styles exposed via Tailwind v4 `@theme inline`; single always-dark theme, no `.dark` block (D-1.02-5). No `tailwind.config` file (v4 config lives in `globals.css`).
- **Build note:** `next/font` requires network access at build time to fetch the Google Fonts (verified working: `npm run build` ✓).

## 2026-07-12 — Phase 1.03 layout + Home: no new npm dependencies

Machine: Petar's MacBook. Node/npm and all package versions unchanged from the 1.01 entry — **nothing was added to `package.json`.**

- **Icons:** first real use of the already-installed **lucide-react@1.24.0** — `ShoppingBag` (cart), `Menu` (mobile toggle), `X` (panel close) in `src/components/header.tsx`. No new package.
- **No animation library:** `motion` still not installed (deferred to first use per plan). Shell hover/focus uses CSS transitions only, gated by `motion-reduce:transition-none` (`brand.md` §8).
- **Build note (recurring):** `next build` failed once this phase on `next/font` fetching Google Fonts (transient network/rate-limit), then passed on retry — the same network-dependent font-fetch behaviour recorded at 1.02, not a code issue.

## 2026-07-12 — Phase 1.04a products engine: added `zod`

Machine: Petar's MacBook. First npm dependency added since the 1.01 scaffold.

- **zod@4.4.3** — pinned **EXACT** (no caret; installed via `npm i -E zod@4.4.3`). Why: build-time validation of the per-product JSON files (`data/products/*.json`) so a malformed product fails `next build` with a human-readable message naming the file + field, for a non-coding team (D-1.04a-2). Used only server-side in `src/lib/products.ts`. Phase 1.04a.
- **No other dependencies.** The cart store uses React context + `localStorage` (via `useSyncExternalStore`) only — **no state-management library** was added (brief Task 5). No animation library (`motion` still deferred); transitions are CSS only, gated by `motion-reduce:*`.
- `npm install` still reports the same 2 moderate advisories in the transitive tree (unchanged since 1.01; not in runtime deps).
- Node/npm and all other package versions unchanged from the 1.01 entry.

## 2026-07-12 — Phase 1.05 cart + order flow: NO new npm dependency

Machine: Petar's MacBook. Node/npm and all package versions unchanged from the 1.01/1.04a entries — **nothing was added to `package.json`.**

- **`resend` NOT installed — deferred from 1.05 to 2.01 (D-1.05-2).** The order-send is a stub this phase: `sendOrder(payload)` in `src/lib/order.ts` makes no network call and uses no secret, so a stub needs no SDK. The `resend` SDK is pinned and installed at 2.01 when the real send lands (replacing the marked `// Phase 2.01` stub body). The stack table's "Order email: resend SDK — pin at 1.05 (stub) / 2.01 (live)" line resolves to: **1.05 = stub, no install; 2.01 = install + live.**
- **Submission is server-side** via a Next.js server action (`src/app/order/actions.ts`, `"use server"`) that calls `sendOrder`. This is what lets 2.01 drop a server-only secret into `sendOrder` with no client change. No route handler / API route file added.
- **`ORDER_STUB_FAIL` env flag (server-side only, deterministic failure switch).** `sendOrder` returns failure when `process.env.ORDER_STUB_FAIL === "true"` (unset = success), so the send-failure path is testable. It is **not** `NEXT_PUBLIC_`-prefixed, so it is undefined in the client bundle — server-only by construction. It belongs in Vercel/`.env.local` only if a deployed failure demo is wanted; it is unset (success) by default and is **not** committed anywhere. No `.env*` file was added (`.env*` stays gitignored).
- **No animation library** (`motion` still deferred); transitions are CSS only, gated by `motion-reduce:*`.
- Node/npm and all other package versions unchanged.

## 2026-07-13 — Phase 1.02c design refresh: display font swapped, NO new npm dependency

Machine: Petar's MacBook. Node/npm and all package versions unchanged from the 1.01 entry — **nothing was added to `package.json`.**

- **Display font swapped Bebas Neue → Syne (D-1.02c-2).** Still loaded with the built-in **`next/font/google`** (no package to pin; the face is fetched and self-hosted at build):
  - **Syne** — display face, **variable** (set at weight `700` in the `.type-*` roles), `latin` subset, CSS var `--font-syne` (replaces `--font-bebas`).
  - **Hanken Grotesk** — body face, unchanged (variable, `latin`, `--font-hanken`).
  - `latin` subset only at launch; **Cyrillic coverage owed before the Macedonian phase now applies to Syne**, not Bebas (D-1.02-3 / D-0.00-7).
- **New design tokens (in `globals.css`, mirrored to `brand.md` §12):** `--radius-button: 12px` (buttons only), `--btn-hover-bg #2A2A2A`, `--btn-hover-border #B7BABB`, `--btn-pad-y 14px`, `--btn-pad-x 24px`, `--btn-cta-pad-x 20px`. No colour added to the resting palette.
- **New asset:** `public/images/home/hero.jpg` — the owner-supplied Home hero photograph (1352×1390 JPG, ~166 KB), served via `next/image`. Not an npm dependency; committed binary.
- **Build note:** `next/font` still fetches Google Fonts at build (verified working: `npm run build` ✓ this phase). No `next.config` change (the hero image is a local static import, so no remote-image domains).

## 2026-07-14 — Phase 1.08 About page: NO new npm dependency; Hanken Cyrillic subset NOT enabled (unavailable)

Machine: Petar's MacBook. Node/npm and all package versions unchanged from the 1.01 entry — **nothing was added to `package.json`.**

- **Fonts unchanged. The brief's planned Hanken `cyrillic` subset was NOT enabled — Hanken Grotesk does not offer it (D-1.08-6).** `next/font/google` exposes only `["cyrillic-ext","latin","latin-ext","vietnamese"]` for Hanken Grotesk (empirically confirmed: `subsets: ["latin","cyrillic"]` fails the build with *`Type '"cyrillic"' is not assignable to type '"latin" | "latin-ext" | "cyrillic-ext" | "vietnamese"'`*). `cyrillic-ext` (U+0460+) does **not** cover the Macedonian core block (U+0400–045F: Ѓ Ќ Ѕ Ј Љ Њ Џ and а–я), so it would not help either. Hanken stays `subsets: ["latin"]`.
- **Fallback taken (brief-sanctioned):** the About slogan block uses the body-font role, whose stack (`--font-body: var(--font-hanken), ui-sans-serif, system-ui, sans-serif`) already ends in a **system Cyrillic fallback**. Verified in dev with a temporary Macedonian test string — all Macedonian-specific glyphs paint (measured non-zero, varied widths; no tofu; screenshot in the 1.08 completion report). No `.notdef` boxes. **No subset change, no new package, no Lighthouse-affecting extra font download.**
- A comment in `src/app/layout.tsx` records that Hanken has no `cyrillic` subset so a later dev does not re-add it and break the build.
- Node/npm and all other package versions unchanged.
