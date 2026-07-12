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

## App (created at 1.01, design system wired at 1.02, shell + Home at 1.03)
- `src/app/layout.tsx` — root layout: loads Bebas Neue + Hanken Grotesk via `next/font`, sets brand `<title>`/description, imports `globals.css`, and wraps every route with `<Header>` + `<Footer>` (min-h-dvh flex column)
- `src/app/page.tsx` — the real Home (1.03): wall-of-type hero, intro line, `VIEW CATALOG` CTA (a `Link` styled with `buttonVariants`, D-1.03-1), and the `FEATURED` heading + `Catalog coming soon.` empty state (no product content invented)
- `src/app/globals.css` — Tailwind v4 entry + Trajanov design tokens (mirrors `brand.md` §12), shadcn semantic aliases, and `.type-*` role utilities (`brand.md` §4)
- `src/app/favicon.ico` — default favicon (placeholder)
- `src/components/` — shared UI components
- `src/components/header.tsx` — shared site header (1.03), client component: sticky Ink bar with hairline, `TRAJANOV` wordmark → `/`, `CATALOG`/`CONTACT` nav, cart icon → `/cart` (visual only, no badge), and a focus-trapped mobile menu panel (Lucide `Menu`/`X`/`ShoppingBag`)
- `src/components/footer.tsx` — shared site footer (1.03): Surface block, top hairline, `TRAJANOV` wordmark, verified Instagram link, `PRIVACY`/`TERMS` legal links, `© 2026 Trajanov` (no contact rows)
- `src/components/ui/button.tsx` — base Button, restyled to `brand.md` tokens at 1.02 (0px corners, Label-caps, white-accent primary); exports `buttonVariants` (used by the Home CTA)
- `src/lib/utils.ts` — shadcn `cn()` class-merge helper
- `data/products/` — one structured data file per product (format fixed at 1.04); empty, holds `.gitkeep`
- `public/images/` — product photos and brand assets; empty, holds `.gitkeep`
- `public/*.svg` — default create-next-app assets (`file`, `globe`, `next`, `vercel`, `window`)
