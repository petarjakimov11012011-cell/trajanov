# Part 1 · Phase 1.03b · Cowork — Verify & Unblock — Completion Report

**Date:** 2026-07-12 · **Outcome (one line):** The site is deployed and viewable at a real URL for the first time — but on a **Vercel Hobby** account, which the project explicitly rejected in D-0.00-3.

## 1. What shipped (plain language)

Vercel is now connected to the repo, and the Home page is live at **https://trajanov.vercel.app**. It rebuilds automatically whenever `main` changes. The 1.03 shell and Home page were checked on that real URL and they hold up: the hero reads as a wall of type, everything is monochrome with square corners, the mobile menu opens and closes properly, and no invented content appears anywhere.

The catch: the Vercel account is on the **Hobby** plan, not Pro. The project instructions say "Vercel Pro (already paid)". That is not the case, and it matters — see §8.

## 2. Definition of Done

- ❌ **Auth secret present in the repo's Actions secrets** — **not done.** Lazar was given both options (an Anthropic API key from console.anthropic.com, or a Claude Code OAuth token via `/install-github-app`) and chose to defer to Phase 1.07 rather than set up billing or run the token flow. No secret was created, viewed, or pasted. The brief permits this ("If Lazar chose option B, mark this deferred to 1.07"). Logged as D-1.03b-2.
- ✅ **Vercel connected; `*.vercel.app` preview URL captured** — evidence: project `trajanov` exists under the "Petar Jakimov Projects" team, linked to `petarjakimov11012011-cell/trajanov`, deploying commit `Phase 1.03 — Layout + Home (#3)` from `main`. URL **https://trajanov.vercel.app** returns the Home page (`<title>Trajanov</title>`).
- ⚠️ **5-point eyeball done; 2 screenshots captured** — the five checks all **pass** (§7), but **no screenshots were produced and no genuine phone-width render was ever made.** The browser viewport would not resize below desktop (stayed pinned at 1408 CSS px across repeated attempts), and screenshots were not persistable to disk in that session. Points 2 and 4 were instead verified *programmatically*, which is stronger than eyeballing — but it says nothing about how the phone layout actually looks. Owed to Lazar, re-registered.

## 3. Decisions I made during this phase

- **Deployed to Vercel Hobby rather than stopping.** Why: Lazar was shown the Hobby/Pro gap before anything was published and explicitly approved proceeding; a Hobby deploy costs nothing, is reversible, and it was the only way to unblock the eyeball check the phase exists to perform. Alternative rejected: halt and take it back to the orchestrator (would have left the whole phase blocked on a billing decision). **Logged as D-1.03b-1.** This decision sits in tension with D-0.00-3 and must not be allowed to stand into launch.
- **Reviewer auth deferred to 1.07 at Lazar's direction.** Alternative rejected: adding the secret now, which was offered first and declined. **Logged as D-1.03b-2.**
- **Renamed the Vercel project from Vercel's auto-suggested `trajanov-hlk2` to `trajanov`,** giving the clean URL `trajanov.vercel.app`. Cosmetic, reversible. Not logged — no tradeoff worth re-litigating.
- **Scoped the Vercel GitHub app to the `trajanov` repo only** ("Only select repositories") rather than granting access to all repos. Least privilege. Not logged.

## 4. Deviations from the brief

- The brief states hosting is "Vercel Pro (already paid)" and instructs importing into "the team's Pro account". **No Pro team exists on the account.** The import was done into the Hobby team instead. See §8 — this is the headline finding of the phase.
- Task 1 (auth secret) not performed — deferred, which the brief permits.
- Screenshots not delivered — see §2/§7.

## 5. Changed files / deliverables

- **Ops/manual:** Vercel project `trajanov` created under the "Petar Jakimov Projects" (Hobby) team, linked to the GitHub repo, auto-deploying `main`. Live at https://trajanov.vercel.app. The Vercel GitHub app was installed on `petarjakimov11012011-cell`, scoped to the `trajanov` repo only.
- **Secrets:** none created, none placed, none viewed.
- **Code:** no application code changed. Repo edits this phase are state files only: this report, `decisions.md` (D-1.03b-1, D-1.03b-2), and `current-state.md`.

## 6. State updates done

- `current-state.md` — updated: Vercel integration now recorded as connected with the live URL; the 1.03 "eyeball the Home + shell" register item resolved down to the outstanding mobile-visual check; Hobby-plan risk added to Known issues. **NEXT line unchanged: `NEXT: 1.04 — Products + Catalog + Product page`** (1.03b was an unscheduled verification phase; it does not advance the plan).
- `file-map.md` — not touched: no new source files.
- `00_stack-and-config.md` — not touched: no stack or dependency change.

## 7. Verified here vs owed to Lazar

**Verified by me, on the live URL (https://trajanov.vercel.app):**

1. **Hero reads as a wall of type** — ✅ "TRAJANOV" set enormous in the condensed display face, left-aligned on near-black; subline "Clothing, sold direct. Cash on delivery."; single square VIEW CATALOG CTA. Not a generic banner.
2. **Monochrome, sharp corners** — ✅ **verified programmatically, not by eye.** Swept every rendered element on the page: **zero** with a non-zero `border-radius`; **zero** colours with any chroma (every `color` / `background-color` / `border-color` resolves to pure grey, black or white).
3. **Header + footer intentional and uncluttered** — ✅ header: wordmark left, CATALOG/CONTACT centre, cart icon right, hairline rule. Footer: wordmark, Instagram handle, PRIVACY/TERMS, `© 2026 TRAJANOV`.
4. **Mobile menu opens and closes cleanly** — ✅ **logic verified in the DOM.** Toggle present (`md:hidden`, `aria-label="Open menu"`, `aria-expanded="false"`). Clicking it sets `aria-expanded=true` and locks body scroll. A dedicated "Close menu" button closes it; **Escape also closes it**; both restore `aria-expanded=false` and release the scroll lock. Accessibility markup is correct.
5. **Nothing hypey or invented** — ✅ the page's entire text is: TRAJANOV / CATALOG / CONTACT / "Clothing, sold direct. Cash on delivery." / VIEW CATALOG / FEATURED / "Catalog coming soon." / PRIVACY / TERMS / © 2026 TRAJANOV. No fabricated shipping or returns terms, no product names or prices, no reviews, no awards, no fluff. Copyright year is **2026**, correct.

Also confirmed: `/products`, `/cart`, `/contact`, `/privacy`, `/terms` 404 as designed. The footer's Instagram link (`@trajanovv2026` → https://www.instagram.com/trajanovv2026) was checked against `facts.md` and **is VERIFIED** — it is a legitimate fact, not an invention.

**Owed to Lazar:**

- **The phone-width look, and the two screenshots.** I could not render the page below desktop width, so I have not seen the mobile layout and will not claim I have. Open https://trajanov.vercel.app on an actual phone: confirm the hero still reads as a wall of type at that width, tap the menu open and closed, and capture the desktop + mobile screenshots for the record.
- **The Hobby/Pro decision** (§8) — owner-level, money.

## 8. Risks, follow-ups, what the next phase needs to know

**🔴 The Hobby plan directly contradicts a decision this project already made. Launch blocker.**

`D-0.00-3 · Hosting: Vercel Pro` records that Lazar first proposed Vercel's free Hobby plan and it was **rejected**, for three stated reasons: Vercel's ToS restrict Hobby to non-commercial personal use; Hobby deployments can be shut down without notice; and Hobby content may be used for AI training. The decision concludes "Team already pays for Vercel Pro."

**That last part is not true.** The only Vercel team on the account is "Petar Jakimov Projects", tagged **Hobby**, with "Upgrade to Pro" prompts throughout the dashboard. So the project is now hosting a commercial clothing store on exactly the plan it explicitly ruled out, for exactly the reasons it ruled it out — and `trajanov.vercel.app` is public right now.

This did not block the phase and cost nothing, which is why it proceeded with Lazar's approval. But it needs an owner decision **before more work is built on this URL**, and certainly before any of it is shown to Vaki or a customer. Three ways out:

1. **Upgrade the team to Pro** (the original decision; costs money now) — then this all simply becomes true.
2. **Keep Hobby only as a private preview**, and treat launch as blocked until Pro exists. Acceptable short-term, but the deployment is currently public.
3. **Revisit D-0.00-3 honestly** — e.g. the Netlify-free option the orchestrator originally recommended (commercial use permitted, $0), which D-0.00-3 rejected *on the basis that Pro was already paid for*. That premise was false, so the decision deserves re-examination rather than automatic re-affirmation.

The orchestrator should log the outcome and correct the "running cost" line in the project instructions — **Pro is not already paid.**

**🟠 Three phases have now merged with zero review, and the reviewer is deferred again.** D-1.01-6, D-1.02-8, D-1.03-2 were each an override, and D-1.01-6 called itself "one-off, not a precedent". The auth secret was offered at the top of this phase and deferred to 1.07 (D-1.03b-2), so 1.04 — the biggest code phase so far, with real product data — will merge unreviewed too, unless this changes. Not my call, but the cost should be named rather than quietly absorbed.

## 9. What's now possible that wasn't before

Every future phase can be seen and checked on a real URL by anyone, instead of only on one person's `localhost`.

**NEXT line set to:** `NEXT: 1.04 — Products + Catalog + Product page`
