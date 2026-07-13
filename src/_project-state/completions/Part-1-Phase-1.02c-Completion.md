# Part 1 · Phase 1.02c · Code — Completion Report

**Date:** 2026-07-13 · **Outcome (one line):** The Phase 1.02b-2 design refresh is applied to the real site — buttons are now the dark rounded button, the display font is Syne, and the Home hero is a split layout with the owner's campaign photograph.

## 1. What shipped (plain language)
The store's look was refreshed to match the latest design proof. Every button is now a softly rounded, dark button with a white label and a thin light outline (instead of the old sharp white button). The big display type — the `TRAJANOV` wordmark, section headers, and page titles across the whole site — changed from Bebas Neue to **Syne**. And the Home page now shows the owner's real campaign photo beside the `TRAJANOV` headline (the photo stays in colour so its red prints show), instead of a black placeholder. The change is on a branch with an open PR; it is **not** merged to the live site yet.

## 2. Definition of Done
There was no separate code brief for 1.02c — the spec is the **Phase 1.02b-2 handover addendum** (its §5 "Definition of Done") plus the operator's in-session choice to **"match the proof exactly"** (Syne font + `EST. 2026 · STREETWEAR` eyebrow + the proof's intro). Restated against reality:

- ✅ **Buttons: 12px radius (buttons only), `--surface-2` fill, white label, required 1px `#8E9192` outline, hover `#2A2A2A`/`#B7BABB`, white focus ring, ≥44px tap target** — evidence: computed styles on the live Home CTA read `borderRadius: 12px`, `border: 1px solid rgb(142,145,146)`, `background: rgb(32,31,31)`, `color: rgb(245,245,245)`, `height: 46px`. `src/components/ui/button.tsx` (`default` variant + base radius) + tokens in `src/app/globals.css`.
- ✅ **12px is buttons-only; inputs/chips keep 0px** — evidence: on `/cart`, the qty −/+ stepper and its box render square while the `PROCEED TO ORDER` button is rounded (screenshot in §7). `--radius` stays `0px`; only `--radius-button` is `12px`.
- ✅ **Home hero: split — type + eyebrow + intro + CTA left, photo right, colour, whole (no crop), no scrim; stacks type-first on mobile** — evidence: `src/app/page.tsx`; rendered desktop (1280px) + mobile (375px) screenshots; the photo is served in colour with no desaturation filter.
- ✅ **Display font swapped to Syne 700** — evidence: computed `font-family: Syne…`, `font-weight: 700`, `font-size: 72px` on the desktop `<h1>`; propagates to every `.type-display-xl`/`.type-headline-lg`/wordmark site-wide.
- ✅ **No horizontal overflow at 375px; wordmark fits** — evidence: `document.scrollWidth == clientWidth == 375`; `TRAJANOV` at Syne 700 / 50px renders 309px in the 335px content box (26px slack). (Started at the proof's 52px, which measured 0px slack; dropped to the addendum's sanctioned 50px fallback — D-1.02c-2.)
- ✅ **`brand.md` updated for every reversed rule** — evidence: §2/§4 (Bebas→Syne), §3 (white-accent + button-hover note), §5 (`--radius-button` exception), §7 (hero colour exception), §11 (buttons-except line), §12 (tokens). Per the addendum §3 checklist.
- ✅ **Decisions recorded** — `D-1.02b-6` (dark buttons), `D-1.02b-7` (hero photo), and executor calls `D-1.02c-1..5` in `decisions.md`.
- ✅ **Hero image added at `public/images/home/hero.jpg`, served via `next/image` (responsive `sizes`, `priority`, blur placeholder)** — evidence: file present (1352×1390, ~166 KB); `next build` generated the route with the optimized image.
- ⚠️ **Hero intro copy** — the proof's full intro ships, but *"wear-tested"* / *"printed in small runs"* are **UNVERIFIED** in `facts.md`. Shipped on the operator's explicit "match the proof" direction, on a **branch/PR (not merged)**; a `facts.md` sync is owed to Lazar or the clause is cut at review (D-1.02c-3). Tracked on the owed-verification register.
- ✅ **`build` + `lint` green** — evidence: `npm run build` ✓ (11 routes), `npm run lint` ✓ (see §7).

## 3. Decisions I made during this phase
All logged in `decisions.md`:
- **D-1.02b-6** — buttons rounded/dark/outlined (owner call via the addendum; the outline is required for WCAG 2.2 AA non-text contrast on `#0A0A0A`).
- **D-1.02b-7** — Home hero photo, split layout, kept in colour (§7 hero-only exception; product cards stay B&W).
- **D-1.02c-1** — ran 1.02c out of numeric order (on top of 1.06); scope = this addendum + the operator's "match the proof". The 1.02b **base** handover it builds on (Syne scale, red hairlines, footer/burger changes, button padding) was **never provided and isn't in the repo** — so un-spec'd base items are out of scope.
- **D-1.02c-2** — display font Bebas Neue → Syne; the full Syne type scale isn't in the doc I have, so it's **derived from the proof** (72px desktop / 50px mobile). Flagged for retune if the 1.02b base handover surfaces. Cyrillic flag now applies to Syne.
- **D-1.02c-3** — the two unverified hero production claims ship on operator authority; `facts.md` sync owed to Lazar (I may not edit `facts.md`).
- **D-1.02c-4** — the hero photo (grabbed from the brand's own IG `@trajanovv2026`) had Instagram carousel chrome; I feather-patched the `›` arrow and cropped the carousel dots before committing. Provenance is the brand's own campaign photo, not stock.
- **D-1.02c-5** — button padding set to the addendum's 14/24 (Home CTA 20), replacing the repo's stale `px-8 py-4` (1.02b was never applied), to match the proof.

## 4. Deviations from the brief
- The addendum assumes the **1.02b base handover** had already landed (Syne, new button padding, footer/burger refinements). It had not — the repo was still at Phase-1.02 (Bebas Neue, white `0px` button). I applied the base items this addendum depends on where it specified enough to build (font, button padding) and left the rest (red hairlines, footer/burger) out of scope with no buildable spec (D-1.02c-1). The mobile burger menu already exists from 1.03.
- The mobile Display XL is **50px**, not the proof's 52px — the addendum's own sanctioned fallback after I measured 0px slack at 52px (D-1.02c-2).

## 5. Changed files / deliverables
**Branch:** `phase-1.02c-refresh-buttons-hero` · **PR:** see §7 (opened, not merged).
- Code edited: `src/app/layout.tsx` (Syne), `src/app/globals.css` (display type roles + button/radius tokens), `src/components/ui/button.tsx` (dark rounded button), `src/app/page.tsx` (split hero), `src/components/header.tsx` + `src/components/footer.tsx` (wordmark `font-bold`).
- Asset added: `public/images/home/hero.jpg` (owner-supplied campaign photo, IG chrome removed).
- Docs: `brand.md` (§2/§3/§4/§5/§7/§11/§12), `decisions.md` (D-1.02b-6/-7, D-1.02c-1..5), and the state files below.
- No `package.json` change (font via `next/font`; hero is a committed binary). No secrets touched.

## 6. State updates done (code phases — mandatory)
- ✅ `current-state.md` — added the 1.02c summary, updated the changed built-page/stack entries, added the two owed-verification items, fixed the font references. **NEXT line unchanged:** `NEXT: 1.04b — Products, Catalog, Product page (blocked: awaiting Vaki's product photos + details)` — 1.02c is a refresh and doesn't move the critical path.
- ✅ `file-map.md` — `layout.tsx`/`page.tsx`/`button.tsx`/`globals.css` entries updated; added `public/images/home/hero.jpg`.
- ✅ `00_stack-and-config.md` — appended the 2026-07-13 entry (font swap, new tokens, hero asset; no npm dependency).

## 7. Verified here vs owed to Lazar
**Verified by me (on `localhost:3000`, dev server):**
- `npm run build` ✓ — compiled, TypeScript clean, all 11 routes generated (Home is static with the optimized hero image).
- `npm run lint` ✓ — see §8 for the exact result.
- Home desktop (1280px): split hero renders — Syne wordmark (72px), eyebrow, intro, dark rounded `VIEW CATALOG` (46px tall, `#8E9192` outline), colour photo whole on the right with **no** Instagram arrow/dots.
- Home mobile (375px): stacks type-first, photo below full-width; no horizontal overflow (`scrollWidth == clientWidth == 375`); wordmark 309px in the 335px box.
- `/cart` desktop: Syne `CART` heading; the full-width `PROCEED TO ORDER` button shows the dark rounded style; the qty stepper stays square (buttons-only radius confirmed).
- Button computed styles match the spec exactly (radius 12px, 1px `#8E9192`, `#201F1F` fill, white label, CTA px 20, height 46px).

**Owed to Lazar (on the deployed preview + a real phone):**
- **Sync `facts.md` for the hero copy "wear-tested" / "printed in small runs"** (D-1.02c-3) — at merge the operator **confirmed these are true**; the `facts.md` VERIFIED-row update is owed to Lazar (an executing Claude can't edit `facts.md`), so the source of truth matches the now-live copy.
- Eyeball the refreshed buttons + Syne type + colour hero on the deployed URL and a real phone (fonts fetch at build; outline legibility on the true device).
Both are on the `current-state.md` owed-verification register.

## 8. Risks, follow-ups, what the next phase needs to know
- **Content-truth: hero copy shipped on operator confirmation.** At merge the operator confirmed "wear-tested" / "printed in small runs" are true and directed the merge (D-1.02c-3/-6); the copy is now live. Lazar still owes the `facts.md` VERIFIED-row update so the source of truth matches.
- **Merged at operator direction (D-1.02c-6).** PR #9 squash-merged to `main` with **no review** (the Claude review Action still skips — no auth secret since 1.01, D-1.03b-2); the **seventh** executor-merge override. Vercel auto-deploys the refresh to the public URL.
- **Syne scale is proof-derived, not fully spec'd** (D-1.02c-2) — if the 1.02b base handover later surfaces, re-check the display sizes and the button padding against it.
- **Hero photo can be upgraded** — if Vaki supplies the untouched high-res original, drop it in at the same path; no code change (D-1.02c-4).
- `npm run lint` — **clean** (no errors, no warnings) on the final code; `npm run build` — **green** (11 routes generated) on the final code.

## 9. What's now possible that wasn't before
The storefront matches the current design direction — the whole site can be previewed in its intended refreshed look (Syne type, dark rounded buttons, a real hero photo) rather than the older Bebas/white-button placeholder look.

**NEXT line set to:** `NEXT: 1.04b — Products, Catalog, Product page (blocked: awaiting Vaki's product photos + details)`
