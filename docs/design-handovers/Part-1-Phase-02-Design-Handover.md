# Design → Code Handover · Part 1 · Phase 1.02 — Design System

**Reads from:** `brand.md` (the only token source). Everything here implements those tokens — do not hardcode a value that contradicts a token.
**Visual reference:** the approved Stitch export (three screen renders + code) belongs in `docs/design-handovers/trajanov-stitch-reference/` (the `home/`, `catalog/`, `product_detail/` folders with `screen.png` + `code.html`, and `trajanov/DESIGN.md`). Those binary assets were **not** supplied with this phase — see `trajanov-stitch-reference/README.md` and the owed-verification register in `current-state.md`. Treat the renders (once supplied) as the intended *look*; treat the tokens in `brand.md` as authoritative where they differ.

> **How this phase ran (note for the record):** the design was generated in **Google Stitch** (not Claude Design) from the approved screenshot, then reconciled by the orchestrator into `brand.md` + this handover. Stitch produced good structure but also (a) shipped two overlapping colour lists, (b) drifted to rounded corners on one screen, (c) used Material icons instead of Lucide, and (d) invented copy/features that violate our content-truth and scope rules. All of that is corrected below.

---

## 1. Screens delivered → routes

| Stitch screen | Our route | Notes |
|---|---|---|
| `home` | `/` | Hero + featured row + footer |
| `catalog` | `/products` | Product grid + sold-out marking |
| `product_detail` | `/products/<item>` | Photos, price, size/colour pickers, add-to-cart, expandable info |

Cart, order, confirmation, contact, and legal pages were **not** generated (they inherit these tokens and are built in later phases). Home + Catalog + Product establish the whole visual language.

## 2. Component specs (implement against `brand.md` tokens)

**Header / nav** — sticky, minimal height, solid `--bg` (no blur). Left: `TRAJANOV` wordmark (Bebas Neue). Centre: `SHOP` (→ `/products`) and `CONTACT` (→ `/contact`), Label-caps style. Right: search and bag (cart) icons (Lucide). Mobile: collapse centre links into a menu icon.

**Buttons** — Primary: solid `--accent` (white) bg, `--on-accent` text, **0px** corners, padding 16px 32px, Label-caps. Hover: invert to `--bg` bg with 1px white border. Secondary: transparent with 1px `--accent` border.

**Product card** — full-bleed image (3:4), 1px `--border` separation, then metadata: name in Body-MD **700**, price in Label-caps. Hover (desktop): image scales 1.05 or swaps to alt photo. **Sold-out:** dim the image and show a `SOLD OUT` Label-caps tag — this is a required state (mark it with the tag *and* the dimmed image, never colour alone).

**Catalog grid** — desktop multi-column with 1px hairline gutters; 2-col or 1-col on mobile. Uniform cards. **Enforce 0px radius** (the Stitch catalog config used rounded corners — override it).

**Product page** — large photo(s) + a second detail image; product name (Headline-LG), price (Label-caps). **Size picker:** square chips 48×48, Label-caps; unselected = 1px `--border-control` (`#8E9192`, not the hairline); selected = 1px white border **+ bold text**. **Colour swatch:** 32px squares; selected = 2px offset white border. **Add to cart:** primary button, prominent. Expandable `SPECIFICATIONS` / `COMPOSITION` accordions for detail. Short description in Body-LG.

**Input fields** — 1px `--border-control` border (or underline), 0px corners; focus changes border to white; visible label always present; placeholder is a hint only (do not use `#555555` placeholder as the sole label).

**Footer** — `--surface` block, generous top gap (128px), 1px top hairline. Wordmark, minimal nav, legal links (Privacy, Terms). Copyright line. **See strip register — the footer had out-of-scope items.**

## 3. Strip / placeholder register — invented content that must NOT ship as-is

Stitch filled the mockups with placeholder content. Everything below is **look-only** and must be removed or replaced before it reaches the live site. Items marked **(binding)** are content-truth or scope rules, not preferences — they come out regardless. Feed this into the placeholder register in `current-state.md`.

| In the mockup | Action | Why |
|---|---|---|
| All product names + prices (e.g. "STRUCTURAL BLAZER · 14,290 MKD") | Placeholder → real from Phase 1.04 | Real products come from Vaki. Currency shown (MKD) matches our assumption; confirm in `facts.md`. |
| "Designed in Skopje. Sourced from the finest European mills." | **Remove (binding)** | Unverified origin/sourcing claim; not in `facts.md`. |
| "CRAFTED FOR THE MODERN ICONOCLAST" · "ETHEREAL PRECISION" · "synthesis of architectural theory" | **Remove (binding)** | Hype/fluff — banned house rule. |
| "EXPRESS SHIPPING WORLDWIDE" + "14-DAY EASY RETURNS" badges | **Remove (binding)** | False/unverified promises — we ship mainly Macedonia, cash on delivery; no stated returns policy. Replace with real terms once verified. |
| "NEWSLETTER" footer signup | **Remove (binding)** | Out of scope (no newsletter at launch). |
| "ADD TO WISHLIST" | **Remove (binding)** | Out of scope (needs accounts we don't have). |
| "© 2024 TRAJANOV" | **Fix → © 2026** | Founded 2026; current year is 2026. |
| Nav "EDITORIAL" / "ARCHIVE" / "VIEW EDITORIAL" / "ARCHIVE_01" | Rename to real IA | No editorial/archive pages in scope. Real nav is Shop (→`/products`) + Contact. Keep the visual, fix labels. |
| "SIZE GUIDE" link | Drop or placeholder | No size-guide page planned. |
| No cash-on-delivery / no Instagram-order messaging | Add in order-flow phases | Product/checkout copy must state COD (opposite of "worldwide express"). |

## 4. Corrections applied to Stitch output (already reflected in `brand.md`)

- **Palette** reconciled from Stitch's two lists into one intentional, AA-verified set.
- **Radius** locked to 0px everywhere (catalog drift overridden).
- **Icons** specified as Lucide (Stitch used Material Symbols).
- **Unselected control borders** raised from `#262626` (1.3:1, fails) to `#8E9192` (≥3:1).

## 5. Decisions to log this phase (append to `decisions.md`)

- **D-1.02-1 — Design tool = Google Stitch (replaces Claude Design for this phase).** Fits the no-coding workflow; exports a DESIGN.md that maps onto `brand.md`. Downside: output needed manual reconciliation (dual palette, radius drift, invented copy) — accepted; orchestrator did the cleanup.
- **D-1.02-2 — Palette reconciled to one AA-verified monochrome set** (`#0A0A0A` ink / `#F5F5F5` text / `#FFFFFF` accent / hairline system) over Stitch's overlapping lists.
- **D-1.02-3 — Type = Bebas Neue (display) + Hanken Grotesk (body).** Cyrillic coverage to be verified before the Macedonian future phase.
- **D-1.02-4 — Monochrome; pure white is the only accent** (follows the agreed direction; no chromatic accent).

## 6. Owed to Lazar (verification register)

- Voice & tone (§9 of `brand.md`) is a proposal — needs ratification.
- Logo: confirm whether Vaki has a logo file, or the Bebas Neue wordmark is the logo.
- Real product photos + names + prices + currency confirmation (Phase 1.04 / parallel track).
- Real shipping/returns/payment terms into `facts.md` (before the order-flow and legal pages ship).
- Supply the approved Stitch export renders/code into `docs/design-handovers/trajanov-stitch-reference/` (they did not arrive with this phase).
