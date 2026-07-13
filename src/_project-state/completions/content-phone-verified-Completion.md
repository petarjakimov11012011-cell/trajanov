# Content update · Code — Vaki's verified phone on Contact — Completion Report

**Date:** 2026-07-13 · **Outcome (one line):** the store's phone is now VERIFIED, so the loud phone placeholder on `/contact` is replaced by a real, tappable `tel:` link — one of the four launch-blocking placeholders cleared.

## 1. What shipped (plain language)
Vaki supplied the store's phone number. On the Contact page the red "phone coming from Vaki" placeholder is gone; in its place is the real number, **078 820 520**, shown as a link that starts a call when tapped. It looks exactly like the Instagram link above it (underlined, bold, white, same tap size, same focus ring) — it is not styled as anything new. The number is recorded as VERIFIED in `facts.md`, and the phone placeholder is struck from the launch-blocker registers. Email, the registered business name, and the returns policy are still placeholders and were not touched. No software was installed; nothing was invented.

## 2. Definition of Done
- ✅ **`npm run build` and `npm run lint` pass** — evidence: `next build` compiled clean and lists `○ /contact` under "(Static) prerendered as static content"; `eslint` returned no output/no errors.
- ✅ **`/contact` shows 078 820 520 as a working `tel:+38978820520` link; no phone placeholder token remains** — evidence: read_page shows `link "Call Trajanov on 078 820 520" href="tel:+38978820520"`; `grep "phone — from Vaki" src/app/contact/page.tsx` returns nothing (the only remaining repo match is the historical 1.06 completion report, which records what shipped then and is not edited).
- ✅ **The phone link matches the Instagram link's styling: token colours only, visible white focus ring on `:focus-visible`, tap target ≥44px, radius 0, no colour-only cue** — evidence: an in-browser check found the phone link's class string **byte-identical** to the Instagram link's; computed `border-radius: 0px`, `color: rgb(245,245,245)` (`--text`) with `underline` (so meaning is not colour-only), and `min-h-11` → measured height **44px**; `--ring` resolves to `#fff` and the focused link matched `:focus-visible` with the white ring visible in the desktop screenshot; the anchor has **no** `target` and **no** `rel` (a `tel:` link starts a call, it does not open a tab), and no "opens in a new tab" wording.
- ✅ **No horizontal overflow at 375px on `/contact`** — evidence: JS check returned `scrollWidth === clientWidth === 375`.
- ✅ **`facts.md` Phone row reads exactly the verbatim VERIFIED line** — evidence: row now `| Phone | 078 820 520 (tel: +38978820520) | VERIFIED (owner via Lazar, 2026-07-13) |`.
- ✅ **Placeholder register lists three tokens (email, business name ×2, returns policy); the phone line is removed; the count is updated** — evidence: "Four fact-tokens" → "Three fact-tokens"; the `[PLACEHOLDER: phone — from Vaki]` bullet is deleted.
- ✅ **Owed-verification register updated (three tokens; phone now a `tel:` link; the real-phone tap-to-call item added)** — evidence: the 1.06 eyeball item now reads "the three placeholder tokens (email, registered business name ×2, returns policy)" and notes the phone renders as a real `tel:` link to be checked; a new owed item asks Lazar to tap the number on a real phone and confirm the dialer opens with 078 820 520 / +389 78 820 520.
- ✅ **The email placeholder token still renders unchanged** — evidence: `[PLACEHOLDER: public email — from Vaki]` still renders as a red block on `/contact` (desktop + 375px screenshots).
- ✅ **Ship-seen: desktop + 375px screenshot of `/contact` captured** — evidence: rendered on `localhost:3100` at desktop (1280×720) and mobile (375×812); phone link, focus ring, email placeholder, and no-overflow all confirmed in-browser.

## 3. Decisions I made during this update
No `decisions.md` entry was added: this fills a placeholder with a verified fact and makes no tradeoff (per the brief, Task 5).

- **Phone format — local display + E.164 `tel:` target.** The visible text is the number as a Macedonian reader writes it, **078 820 520**; the `href` is the E.164 form, **`tel:+38978820520`** (country code 389, national trunk `0` dropped). Why: the local form is what the customer recognises, while E.164 is the unambiguous form a dialer needs so the call works whether or not the phone is roaming on a Macedonian network. Both come verbatim from the verified `facts.md` row (`078 820 520 (tel: +38978820520)`); nothing was reformatted or inferred. Alternative rejected: putting the local `078…` string in the `href` — it can misdial from abroad or on some carriers. No downside for the in-country case; the only cost is the two representations must stay in sync, which is why both live in the single verified `facts.md` row.

## 4. Deviations from the brief
None on scope. The brief named the two register edits in `current-state.md`; I additionally corrected three now-stale narrative lines in the **same** file (the Summary `/contact` line, the Built-pages entry, and the Carryovers line) plus the "Last updated" stamp, because leaving them saying the phone is an UNVERIFIED placeholder would make the snapshot untrue — which CLAUDE.md's state duty forbids ("the snapshot must be true"). No feature, page, dependency, or other file beyond those named was touched. The out-of-scope placeholders (email, business name, returns) and the Vercel/review-secret questions were left alone.

## 5. Changed files / deliverables
- Code: `src/app/contact/page.tsx` (phone `<PlaceholderToken>` → `tel:` anchor; header comment updated to match).
- Facts: `facts.md` (Phone row → VERIFIED, verbatim).
- State: `src/_project-state/current-state.md` (placeholder register: 4→3, phone line removed; owed-verification register: token list + phone-is-now-a-link note + real-phone tap-to-call item; plus the three stale narrative lines and the date stamp corrected for truth).
- This report.
- No change to `file-map.md` (no file added/removed) or `00_stack-and-config.md` (no dependency touched), per the brief.
- Branch: `content-phone-verified` · PR: https://github.com/petarjakimov11012011-cell/trajanov/pull/8

## 6. State updates done
- `current-state.md` — ✅ mirrors reality: phone is a VERIFIED live channel, three placeholder tokens remain, the tap-to-call check is owed. NEXT line unchanged (`1.04b — Products, Catalog, Product page …`), as this update does not advance the phase sequence.
- `file-map.md` — ✅ no change needed (the contact page is already listed; no file added/removed).
- `00_stack-and-config.md` — ✅ no change needed (no dependency added).

## 7. Verified here vs owed to Lazar
- **Verified by me (on `localhost:3100`):** build + lint pass; `/contact` renders the phone as a `tel:+38978820520` link showing **078 820 520**; the link's classes are byte-identical to the Instagram link (radius 0, 44px tap target, `--text` colour + underline, white `:focus-visible` ring shown); no `target`/`rel`, no "new tab" wording; email placeholder unchanged; no horizontal overflow at 375px; desktop + 375px screenshots captured.
- **Owed to Lazar (added to the owed-verification register):** tap the number on a **real phone** and confirm the dialer opens prefilled with 078 820 520 / +389 78 820 520 — a `tel:` link can only be fully exercised on a device with a dialer, which the executor cannot do. Also carries into the still-owed 1.06 live-eyeball of `/contact` on the deployed URL.

## 8. Risks, follow-ups, what the next phase needs to know
- Three placeholder tokens remain and are still launch blockers: public email, registered business name (×2), and the returns & exchanges policy. Each clears the same way the phone just did — Vaki supplies it, it goes into `facts.md` as VERIFIED, then the token is replaced.
- The GitHub review gate still skips (no auth secret — D-1.03b-2); this PR would merge unreviewed unless the secret is added first.
- No sequencing change: NEXT remains **1.04b** (critical path, blocked on Vaki's product data).
