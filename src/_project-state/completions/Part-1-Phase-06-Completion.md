# Part 1 · Phase 06 · Code — Contact + Legal — Completion Report

**Date:** 2026-07-13 · **Outcome (one line):** `/contact`, `/privacy`, and `/terms` are now real pages, so the header's CONTACT link and the footer's PRIVACY/TERMS links no longer 404.

## 1. What shipped (plain language)
The three pages the site already linked to but had never built now exist. Contact shows the store's one live channel (Instagram) plus email and phone as clearly-unfinished placeholders that Vaki still needs to supply. Privacy and Terms are plain-language pages that describe, using only confirmed facts, what the order form collects, how cash-on-delivery ordering works, that the store ships mainly to Macedonia, and what is still missing (the registered business name and the returns policy) — shown as loud placeholders rather than guessed. No new software was installed and nothing was invented.

## 2. Definition of Done
- ✅ **`/contact`, `/privacy`, `/terms` render in the shell, no longer 404; `npm run build` + `npm run lint` pass; all three listed as static routes** — evidence: `npm run build` output lists `○ /contact`, `○ /privacy`, `○ /terms` under "(Static) prerendered as static content"; `npm run lint` returned clean (no output/no errors); each page rendered inside the header+footer shell on `localhost:3000` (screenshots below).
- ✅ **Contact: Instagram working link with the exact verified href; email + phone as visible placeholder tokens; no address; no owner name; no form** — evidence: read_page shows `link "Trajanov on Instagram (opens in a new tab)" href="https://www.instagram.com/trajanovv2026"`; the email/phone tokens render as red blocks (`[PLACEHOLDER: public email — from Vaki]`, `[PLACEHOLDER: phone — from Vaki]`); no `<form>`, no address, no owner name in the page source or the accessibility tree.
- ✅ **Privacy: data collected + why, cart-in-browser, no accounts/online-payment, no tracking cookies, not sold; business-name token; real "Last updated" date; no processor names / no analytics disclosure; no invented claim** — evidence: read_page lists all seven sections and "Last updated 13 July 2026"; the `[PLACEHOLDER: registered business name — from Vaki]` token is present; the copy names no processor (grep for "Resend"/"Vercel"/analytics vendor: none) and makes no cookie/analytics-vendor disclosure beyond "does not use tracking cookies".
- ✅ **Terms: COD flow stated plainly; ships mainly to Macedonia; prices "as shown" with no currency; returns section with its token; business-name token; governing law North Macedonia; no delivery-cost / delivery-time / returns-window / cross-border claim** — evidence: read_page shows the 3-step ordering list, "We ship mainly within Macedonia", "The price for each item is shown on its product page" (no currency), the `[PLACEHOLDER: returns & exchanges policy — from Vaki]` token, and "governed by the law of North Macedonia". No MKD/currency string, no delivery cost/time, no returns window, no worldwide/cross-border wording.
- ✅ **Tokens only; radius 0; visible white focus ring; body AA; no 375px overflow; reduced-motion respected** — evidence: pages use only `.type-*` roles + token utilities (`text-text`, `text-text-muted`, `bg-error-surface`, `text-error`); the Instagram link's focused box-shadow is `rgb(255,255,255) 0 0 0 4px` over a `rgb(10,10,10)` 2px offset (the brand §10 recipe) and `:focus-visible` matched true; a JS check returned `scrollWidth === clientWidth === 375` (no horizontal overflow) on all three pages; the only transitions are `transition-opacity`/`transition-colors` on links, each with `motion-reduce:transition-none`; body/muted text is `--text`/`--text-muted` (18.2:1 / 11.6:1) and the placeholder pair is `--error` on `--error-surface` (5.5:1), all AA per `brand.md` §3.
- ✅ **Each page has an accurate title + description** — evidence: `metadata` exports set titles "Contact — Trajanov" / "Privacy — Trajanov" / "Terms — Trajanov" (confirmed as the browser tab titles) each with a plain, on-brand description.
- ✅ **Humanizer pass; every factual claim traces to a VERIFIED `facts.md` row or a placeholder token; nothing from the strip register, no reviews/counts/stars, no §9 hype** — evidence: ran the `humanizer` skill over every visible string (one echo tightened in the Terms delivery line: "confirm delivery … delivery" → "confirm the details"); each claim maps to a VERIFIED row (brand name, Instagram, cash-on-delivery, ships mainly Macedonia, no accounts/no online payment) or is one of the four placeholder tokens; no strip-register item, review, count, star, or banned hype word appears.
- ✅ **Placeholder register updated with the four new tokens; owed-verification register updated with the live-eyeball item and the D-1.06-2 processor-naming/analytics follow-up** — evidence: `current-state.md` placeholder register now lists the four tokens with their exact locations; the owed-verification register has the 1.06 live-eyeball item and the 2.02 processor-pass item.
- ✅ **`current-state.md` (incl. NEXT line), `file-map.md`, `decisions.md` (D-1.06-1..4) synced** — evidence: NEXT line set to `1.04b …`; the three pages + component added to `file-map.md`; D-1.06-1..4 appended to `decisions.md`.
- ✅ **Branch `phase-1.06-contact-legal` pushed, PR opened to `main`** — evidence: see §5 for the branch and PR link.
- ✅ **Ship-seen: desktop + 375px screenshots of all three pages captured** — evidence: rendered on `localhost:3000` at desktop (1280×800) and mobile (375×812); screenshots captured for Contact (both), Privacy (both), Terms (375px) and the full Privacy/Terms structure confirmed via the accessibility tree; overflow + focus-ring checks run in-browser.

## 3. Decisions I made during this phase
The four content decisions were pre-specified in the brief and are logged as **D-1.06-1, D-1.06-2, D-1.06-3, D-1.06-4** in `decisions.md` (contact channels / processor-agnostic legal copy / no currency asserted / returns-is-a-placeholder).

One small implementation choice the brief did not spell out: I put the placeholder-token rendering in a **shared component** (`src/components/placeholder-token.tsx`) instead of duplicating a styled `<span>` across the three pages. Why: one styling source and one place to change when the tokens get filled. Alternative rejected: inline the span in each page (more duplication, three places to edit at cutover). Downside: one extra file beyond the three pages named in the brief's outputs — it touches no existing component and adds no dependency, so it stays within scope. It is minor enough that it does not warrant its own `D-` entry, but it is recorded here and in `file-map.md`.

## 4. Deviations from the brief
None. Scope was held to the three pages, their metadata, and the four placeholder tokens; the header/footer/nav were not changed (their hrefs already matched the routes created), and no dependency was added.

## 5. Changed files / deliverables
- Code (new): `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/components/placeholder-token.tsx`.
- State: `src/_project-state/current-state.md`, `src/_project-state/file-map.md`, `src/_project-state/decisions.md` (D-1.06-1..4), and this report.
- Branch: `phase-1.06-contact-legal` · PR: https://github.com/petarjakimov11012011-cell/trajanov/pull/7
- No design handover was created — none exists or is needed for this phase (content laid into the established layout). No secrets, no ops/dashboard changes.

## 6. State updates done (code phases — mandatory)
- `current-state.md` — ✅ mirrors reality: NEXT line = `1.04b — Products, Catalog, Product page (blocked: awaiting Vaki's product photos + details)`; summary, built-pages, expected-404s (three cleared), owed-verification, and placeholder registers all updated.
- `file-map.md` — ✅ the three pages + `placeholder-token.tsx` added.
- `00_stack-and-config.md` — ✅ no change needed (no dependency added), consistent with the brief.

## 7. Verified here vs owed to Lazar
- **Verified by me (on `localhost`):** `npm run build` (all three routes static) and `npm run lint` both pass; each page renders inside the shell; the Instagram links resolve to the exact verified href and open in a new tab; the four placeholder tokens render as loud red blocks; no horizontal overflow at 375px (scrollWidth == clientWidth on all three); the white focus ring shows on the Instagram link (box-shadow + `:focus-visible` confirmed); metadata titles are correct; the fact-check and humanizer passes were run.
- **Owed to Lazar (added to the owed-verification register):** eyeball the three pages on the deployed preview URL and on a real phone (desktop + real-device screenshots for the record); and the D-1.06-2 processor-naming + cookie/analytics-disclosure pass on Privacy/Terms, owed at/after 2.02 once the real email send and analytics are wired.

## 8. Risks, follow-ups, what the next phase needs to know
- The four placeholder tokens are launch blockers — the site cannot go live with them visible. They clear the moment Vaki supplies the public email, phone, registered business name, and returns & exchanges policy (add each to `facts.md` as VERIFIED, then replace the token).
- Privacy/Terms are truthful for the site as it exists today but are **not** their final form: the processor-naming + cookie/analytics disclosure pass is owed at/after 2.02 (D-1.06-2).
- The GitHub review gate still skips (no auth secret — D-1.03b-2). This phase's PR will be the seventh to merge unreviewed unless the secret is added first; recommend adding it before merge so at least the tail of Part 1 is gated.
- Sequencing: NEXT is **1.04b** (critical path, blocked on Vaki's product data); **1.07** (Part 1 verification) is the last Part-1 phase and is best run after 1.04b so the audit runs against a populated catalog.

## 9. What's now possible that wasn't before
Every link in the header and footer now lands on a real page — a visitor can find how to reach the store and read plain privacy/terms — so the site is internally complete except for the catalog and the placeholders Vaki still owes.

**NEXT line set to:** `NEXT: 1.04b — Products, Catalog, Product page (blocked: awaiting Vaki's product photos + details)`
