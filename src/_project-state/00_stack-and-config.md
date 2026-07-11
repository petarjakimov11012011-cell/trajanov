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
