# decisions.md — Trajanov (append-only)
*Why the project is the way it is. One decision per entry; always the rejected alternative and the honest downside. Append only — reversals get a NEW entry and the old one's Status changes to `Superseded by …`; nothing is ever deleted. IDs are phase-namespaced: `D-<phase>-<n>`, assigned by whoever decides, numbered within that phase. Kickoff/planning decisions use phase `0.00`.*

---

### D-0.00-1 · 2026-07-11 · Cash-on-delivery order form, no payment gateway
- **Status:** Accepted (owner-stated)
- **Context:** How customers buy. Vaki's working model: order details emailed to him, he ships, customer pays the courier.
- **Decision:** Catalog + cart + order form emailed via Resend. No on-site payments, no accounts.
- **Alternatives considered:** Full checkout with card payments — rejected: adds gateway cost/complexity the client's model doesn't need; link-out-to-Instagram only — rejected: no structured orders, no cart.
- **Consequences:** Far simpler and cheaper; downside: no online payment capture, fulfillment is fully manual, and adding card payments later is a real (pre-nameable) project, not a toggle.
- **Links:** Plan §5.

### D-0.00-2 · 2026-07-11 · No CMS — products are repo data files edited via Claude Code
- **Status:** Accepted (owner call)
- **Context:** Who updates the catalog and how.
- **Decision:** One structured data file per product; Lazar/Petar edit via Claude Code.
- **Alternatives considered:** Lightweight CMS/admin screen — rejected for now: setup + cost, not needed at current pace.
- **Consequences:** $0 and version-controlled; downside: Vaki cannot self-edit — every price/stock change is a PR + deploy. "Product admin screen" is a named future phase if change frequency grows.
- **Links:** Plan §6; Phase-Plan future phases.

### D-0.00-3 · 2026-07-11 · Hosting: Vercel Pro
- **Status:** Accepted (owner call) — supersedes the orchestrator's Netlify-free recommendation within this same planning round
- **Context:** Orchestrator recommended Netlify free (commercial use allowed, $0). Lazar first proposed Vercel's free Hobby plan; rejected because Vercel's ToS restrict Hobby to non-commercial personal use, Hobby deployments can be shut down without notice, and Hobby content may be used for AI training — unacceptable for a client store. Team already pays for Vercel Pro.
- **Decision:** Vercel Pro.
- **Alternatives considered:** Vercel Hobby — rejected (ToS violation for commercial client work); Netlify free — rejected only because Pro is already paid, making Vercel the simpler single-dashboard setup.
- **Consequences:** Compliant, best-in-class Next.js hosting, one dashboard for hosting+analytics+domain; downside: $20/mo exists (already sunk) and the stack is Vercel-centered (mild lock-in, accepted).
- **Links:** Plan §8; D-0.00-4; D-0.00-5.

### D-0.00-4 · 2026-07-11 · Domain: .com, bought via Vercel's registrar; Cloudflare dropped
- **Status:** Accepted (.com = owner call; registrar + dropping Cloudflare = orchestrator call)
- **Context:** Domain and DNS layer, given D-0.00-3.
- **Decision:** Register a .com in the Vercel dashboard; DNS handled there; Cloudflare removed from the stack.
- **Alternatives considered:** .mk — rejected by owner preference for .com (also: .mk requires a Macedonian registrar, more friction); cheapest registrar + Cloudflare DNS — rejected: ~$5/yr saving isn't worth a second account and manual DNS for a non-technical team.
- **Consequences:** Zero DNS fiddling, self-configuring connection; downside: slight price premium and registrar lives with the host.
- **Links:** Plan §8; Phase 2.03.

### D-0.00-5 · 2026-07-11 · Analytics: Vercel Web Analytics (replacing planned Umami)
- **Status:** Accepted (orchestrator call, follows from D-0.00-3)
- **Context:** Basic numbers wanted: visitors, product views, orders. Umami was picked when hosting was Netlify.
- **Decision:** Vercel Web Analytics — included in Pro, one-click enable, privacy-friendly, no cookie banner, supports an order-placed event.
- **Alternatives considered:** Umami free — rejected: an extra account/service for the same data.
- **Consequences:** Simpler; downside: analytics tied to the hosting vendor (accepted; data needs are basic).
- **Links:** Plan §8; Phase 2.02.

### D-0.00-6 · 2026-07-11 · Dedicated product page per item
- **Status:** Accepted (orchestrator proposal, owner ratified after discussion)
- **Context:** Size/color pickers (owner requirement) need room; catalog cards are too cramped, especially on phones.
- **Decision:** Each product gets its own page: photos, price, pickers, add-to-cart, shareable URL.
- **Alternatives considered:** Quick-view popup over the catalog — rejected: worse on mobile, invisible to Google, no shareable per-product links (which matter for Instagram DM selling).
- **Consequences:** One extra template built once at 1.04; per-product SEO and share links; no material downside.
- **Links:** Plan §4; Phase 1.04.

### D-0.00-7 · 2026-07-11 · English-only at launch
- **Status:** Accepted (owner call, tradeoff flagged)
- **Context:** Primary audience is North Macedonia; orchestrator flagged that a local-language option can lift sales.
- **Decision:** English only. Macedonian is a named future phase (standard Next.js i18n add-on; nothing in the build blocks it).
- **Alternatives considered:** Bilingual at launch — rejected: doubles copy work and requires a native reviewer on the build's critical path.
- **Consequences:** Faster, simpler launch; downside: possible conversion gap with local-language shoppers, accepted knowingly.
- **Links:** Plan §3; Phase-Plan future phases.

### D-0.00-8 · 2026-07-11 · Repo private under petarjakimov11012011-cell
- **Status:** Accepted (orchestrator default, owner silent = accepted)
- **Context:** Client project; where the repo lives and who sees it.
- **Decision:** Private repo `trajanov` under Petar's GitHub account; Lazar added as collaborator at 1.01.
- **Alternatives considered:** Public — rejected: paying client's store.
- **Consequences:** Client work stays private; downside: raw-GitHub-URL fetches by the orchestrator fail, so the standing procedure is Lazar pastes `current-state.md`/reports when asked (or a GitHub connector gets added to the Claude Project later).
- **Links:** Project-Instructions "How a phase runs" #1.

### D-0.00-9 · 2026-07-11 · Two-machine path convention: `~/Projects/trajanov`, zsh
- **Status:** Accepted (orchestrator call)
- **Context:** Both Lazar's and Petar's MacBooks run Claude Code; briefs must work on either.
- **Decision:** All briefs use `~/Projects/trajanov` (expands correctly per user) and zsh syntax. One person runs Claude Code per phase.
- **Alternatives considered:** Absolute path `/Users/petarjakimov/Projects/trajanov` — rejected: breaks on Lazar's machine.
- **Consequences:** Same command works for both; downside: none identified.
- **Links:** CLAUDE.md "Machine & shell".

### D-0.00-10 · 2026-07-11 · Two-part project structure
- **Status:** Accepted (owner call)
- **Context:** Project sizing: single, two, or three parts (three = a dedicated client-preview part).
- **Decision:** Two parts — Part 1 build, Part 2 integrate + go live.
- **Alternatives considered:** Three-part with a formal client sign-off round — rejected by owner as unnecessary.
- **Consequences:** Leaner; downside: Vaki's review happens on preview links during the build rather than a dedicated gate — if he wants big changes late, they land as change-phases.
- **Links:** Phase-Plan.

### D-0.00-11 · 2026-07-11 · Vercel connection included in Phase 1.01
- **Status:** Accepted (orchestrator call)
- **Context:** The Plan's 1.01 scope didn't name connecting the repo to Vercel, but Part 1 relies on per-PR preview links from 1.03 onward.
- **Decision:** Connect repo → existing Vercel Pro account during scaffold.
- **Alternatives considered:** Defer to a later phase — rejected: five minutes now vs. a stall when the first UI phase needs a preview.
- **Consequences:** Every PR gets a private preview URL from day one; no downside identified.
- **Links:** Phase 1.01 brief.

### D-1.01-1 · 2026-07-11 · Removed create-next-app's generated `AGENTS.md` and stub `CLAUDE.md`
- **Status:** Accepted (executor call)
- **Context:** `create-next-app@latest` (Next 16) now emits an `AGENTS.md` (generic "this Next.js has breaking changes, read node_modules docs" note) and a one-line stub `CLAUDE.md` (`@AGENTS.md`). This repo already has a governing `CLAUDE.md` (the behavioral contract) placed at root from the kickoff docs.
- **Decision:** Exclude both generated files during the scaffold move; the project's kickoff `CLAUDE.md` is the sole agent contract.
- **Alternatives considered:** Keep `AGENTS.md` — rejected: a second, generic agent-instructions file competes with `CLAUDE.md` as a source of truth and isn't in the reserved `file-map.md` structure. Let the stub `CLAUDE.md` overwrite the real one — rejected outright (would destroy the contract).
- **Consequences:** One authoritative agent file. Downside: the generated note's "read the Next 16 docs before coding" warning is lost from the tree — recorded instead in this phase's completion report §8.
- **Links:** Phase 1.01 brief Task 3.5.

### D-1.01-2 · 2026-07-11 · Kept shadcn init's auto-seeded `button.tsx`
- **Status:** Accepted (executor call)
- **Context:** The brief says "add no components yet." `shadcn@4.13.0 init` with its default `base-nova` preset auto-creates `src/components/ui/button.tsx` and `src/lib/utils.ts` as part of `init` itself — not via a separate `shadcn add`.
- **Decision:** Leave the init output untouched (button + utils kept), since the brief instructed running `init` with defaults and these are the unmodified default result. I ran no `shadcn add` command.
- **Alternatives considered:** Delete `button.tsx` to honor "add no components" literally — rejected: deleting init's own output is a bigger deviation from "init, defaults" than leaving it; nothing imports it, and Phase 1.02 will restyle from `brand.md` tokens anyway.
- **Consequences:** A default, unused, unstyled button exists until 1.02. No downside; it is a no-op at runtime.
- **Links:** Phase 1.01 brief Task 3.6.

### D-1.01-3 · 2026-07-11 · "Strip placement-note" read as routing-sentence-only
- **Status:** Accepted (executor call)
- **Context:** The brief says strip the "`Destination in repo: …`" placement-note line from each placed state file. Each such line also carries binding operating guidance (append-only rules, the exact-version pinning rule, map-update discipline).
- **Decision:** Strip only the leading "`Destination in repo: \`path\`.`" routing sentence; preserve the operating guidance that follows in the same line.
- **Alternatives considered:** Delete the entire top line — rejected: would discard rules every future phase depends on.
- **Consequences:** Files no longer carry stale routing text but keep their operating contract. No downside identified.
- **Links:** Phase 1.01 brief Task 3.8.

### D-1.01-4 · 2026-07-11 · Review Action set up as a committed workflow (not via `/install-github-app`), auth deferred to operator
- **Status:** Accepted (executor call + operator instruction)
- **Context:** Task 5.1 says run `/install-github-app`, but that interactive Claude Code terminal wizard cannot be triggered from this (embedded) session, and the `claude` CLI is not on this machine (so `claude setup-token` for a subscription OAuth token isn't readily runnable). The operator chose to skip wiring the reviewer's Claude auth for now and finish the rest of the phase.
- **Decision:** Commit the reviewer as `.github/workflows/claude-code-review.yml` (official `anthropics/claude-code-action@v1`, the `pr-review-comprehensive` pattern). Make it auth-agnostic: it accepts EITHER `CLAUDE_CODE_OAUTH_TOKEN` or `ANTHROPIC_API_KEY`, and SKIPS the review step (job still succeeds, with a warning) until one secret is present, so PRs don't collect a failing check. Installing the Claude GitHub App and adding the auth secret are owed to the operator; the hard-gate review posts once auth is configured (re-run the check or push).
- **Alternatives considered:** Run `/install-github-app` — not possible here. Hard-code one auth method — rejected: the operator hadn't settled the method, so an either-secret workflow avoids a later code edit. Let the workflow fail loudly without a secret — rejected: a red ✗ on every PR is noise and misreads as a real failure.
- **Consequences:** The reviewer is fully wired in code and activates the moment a secret is added — no further code change. Downside: the Part 1 hard gate (a posted review) is not satisfied until the operator adds auth; this phase closes only after that review runs clean and the operator merges.
- **Links:** Phase 1.01 brief Tasks 5.1 & 6; D-0.00-11; D-1.01-5.

### D-1.01-5 · 2026-07-11 · Operator did not add the Anthropic API key (reviewer auth) this phase
- **Status:** Accepted (operator decision)
- **Context:** The review workflow (D-1.01-4) is committed and runs on every PR but skips until a Claude auth secret (`ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN`) is set. Setting that secret means entering the operator's own credential, which the executor is not permitted to do. The operator was given the one-step path (create key at console.anthropic.com → paste as the `ANTHROPIC_API_KEY` repo secret) and chose to skip it for now.
- **Decision:** No auth secret was added this phase. The automatic reviewer stays inactive and posts no review; Vercel connection was likewise skipped.
- **Alternatives considered:** Add the secret now to satisfy the Part 1 hard gate — declined by the operator. Have the executor add it — not possible (entering an API key/token into a field is off-limits).
- **Consequences:** The Part 1 hard gate (a posted Action review on the phase PR) is **not** satisfied, so PR #1 has no review to read and cannot be merged under the brief's rule yet. The phase is code-complete but not closed. When the operator later adds the secret, the workflow activates with zero code changes (re-run the check or push a commit to trigger it).
- **Links:** Phase 1.01 brief Tasks 5–6; D-1.01-4; D-0.00-11; owed-verification register in `current-state.md`.

### D-1.01-6 · 2026-07-11 · PR #1 merged to `main` without a review (operator override of the Part 1 hard gate)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. No review ran this phase because the auth secret was not added (D-1.01-5). When the executor surfaced this conflict, the operator explicitly instructed it to merge PR #1 to `main` now and confirmed the override.
- **Decision:** Squash-merge `phase-1.01-scaffold` into `main` with no review, executed by the executor at the operator's explicit direction.
- **Alternatives considered:** Add the auth secret and get a clean review first (the intended path) — declined. Operator merges via the GitHub UI themselves — declined in favor of the executor doing it.
- **Consequences:** `main` now contains the scaffold; the Part 1 hard gate (a posted review) was **waived** for this phase and never exercised. The review workflow stays committed and will run on future PRs once a secret is added. Two `CLAUDE.md` rules were overridden by explicit instruction: "never merge a PR yourself" and "merge after the Action review posts." This is a one-off override, not a precedent for later phases.
- **Links:** Phase 1.01 brief Task 6; D-1.01-5; D-1.01-4; `CLAUDE.md` Branch & PR rules.

### D-1.02-1 · 2026-07-12 · Design tool = Google Stitch (replaces Claude Design for this phase)
- **Status:** Accepted (orchestrator call)
- **Context:** The design needed to be produced from the approved screenshot in a way that fits the no-coding workflow and exports something that maps onto `brand.md`.
- **Decision:** Generate the design in **Google Stitch** (not Claude Design) for Phase 1.02; the orchestrator reconciles its output into `brand.md` + the handover.
- **Alternatives considered:** Claude Design — set aside for this phase in favour of Stitch's screenshot-to-design fit and its `DESIGN.md` export.
- **Consequences:** Usable structure fast; downside: Stitch's raw output needed manual reconciliation (two overlapping colour lists, a rounded-corner drift, Material icons instead of Lucide, and invented luxury copy that violates content-truth/scope) — all corrected in `brand.md` and the handover strip register.
- **Links:** `docs/design-handovers/Part-1-Phase-02-Design-Handover.md`.

### D-1.02-2 · 2026-07-12 · Palette reconciled to one AA-verified monochrome set
- **Status:** Accepted (orchestrator call)
- **Context:** Stitch shipped two overlapping colour lists; a single intentional palette was needed, with every text/UI pair meeting WCAG 2.2 AA.
- **Decision:** One monochrome set — `#0A0A0A` ink / `#F5F5F5` text / `#FFFFFF` accent, plus a hairline (`#262626`) vs. control-outline (`#8E9192`) border system — recorded in `brand.md` §3 and contrast-checked.
- **Alternatives considered:** Keep Stitch's dual lists — rejected: ambiguous source of truth and at least one border colour failed contrast (`#262626` at 1.3:1).
- **Consequences:** One unambiguous, accessible palette; downside: none identified. The `#262626` hairline is decorative-only and must never be the sole border on an interactive control (enforced in `brand.md` §10).
- **Links:** `brand.md` §3, §10.

### D-1.02-3 · 2026-07-12 · Type = Bebas Neue (display) + Hanken Grotesk (body)
- **Status:** Accepted (orchestrator call)
- **Context:** The look needs extreme scale contrast — a condensed display face against a clean grotesque body face — with two families only.
- **Decision:** Bebas Neue for display, Hanken Grotesk for body; loaded via `next/font/google` (self-hosted at build). Roles fixed in `brand.md` §4.
- **Alternatives considered:** A single family with weight contrast — rejected: doesn't deliver the condensed-headline motif that carries the brand.
- **Consequences:** The "wall of type" motif is achievable; downside/flag: **Cyrillic coverage of both faces must be verified before the Macedonian future phase** (ties D-0.00-7); a substitute is chosen there if a face lacks Cyrillic.
- **Links:** `brand.md` §4; D-0.00-7.

### D-1.02-4 · 2026-07-12 · Monochrome; pure white is the only accent
- **Status:** Accepted (owner-agreed direction)
- **Context:** Whether to introduce any chromatic accent.
- **Decision:** Strictly monochrome — pure white (`#FFFFFF`) is the single accent, reserved for the primary action and active/selected states; colour is never the only carrier of meaning.
- **Alternatives considered:** A chromatic accent (a brand colour) — rejected: dilutes the gallery/editorial direction and the "spend your boldness in one place" motif.
- **Consequences:** Cohesive, disciplined look; downside: state must always also use weight/label/shape (not colour alone) — already required by the AA rules, so no extra cost.
- **Links:** `brand.md` §3, §11.

### D-1.02-5 · 2026-07-12 · Token architecture: single always-dark theme; shadcn names aliased to brand tokens
- **Status:** Accepted (executor call)
- **Context:** `brand.md`'s palette is a dark monochrome with no light variant, but the scaffold's `globals.css` shipped shadcn's light `:root` + `.dark` split and a large set of semantic/sidebar/chart tokens. The app's primitives (currently `ui/button.tsx`) read shadcn's semantic names (`--primary`, `--muted`, `--ring`, …).
- **Decision:** Make `brand.md` §12 the source values in a single `:root` (no `.dark` block, no theme toggle), then alias shadcn's semantic names onto those brand tokens and expose both brand-named (`bg-surface`, `border-border-control`, `text-error`) and shadcn-named (`bg-primary`, `text-muted-foreground`) Tailwind utilities via `@theme inline`. Dropped the unused sidebar/chart token families. Also added `.type-*` utility classes for the `brand.md` §4 type roles.
- **Alternatives considered:** Keep the light/dark split and only edit `.dark` — rejected: the site is never light, so a light `:root` is dead weight and a foot-gun. Rename every shadcn token to brand names and rewrite the button from scratch — rejected: more churn than aliasing, and future `shadcn add` components expect the semantic names.
- **Consequences:** One source of truth, one theme, both naming styles available; `brand.md` stays the only place a value changes. Downsides: shadcn's `--accent` semantic (a subtle hover bg) now equals brand white, so future components must use `bg-surface`/`bg-surface-2` for quiet hovers, not `bg-accent`; and components' `dark:` variants are inert (there is no `.dark` ancestor) — acceptable and documented here.
- **Links:** `brand.md` §12, §4; `src/app/globals.css`; `src/components/ui/button.tsx`.

### D-1.02-6 · 2026-07-12 · Scope: Phase 1.02 executed as design-system-in-code, no product/section UI
- **Status:** Accepted (executor call, operator ratified "do what you recommend")
- **Context:** No `briefs/Part-1-Phase-1.02-*.md` code brief was handed over — only the design handover. `current-state.md` says "no real UI may be written until 1.02 closes" and `file-map.md` says "real tokens land at 1.02" and the button is "restyled at 1.02," but neither names page/section work for this phase.
- **Decision:** Execute 1.02 as the code layer of the design system only — wire `brand.md` tokens into `globals.css`, load the fonts, restyle the base `Button`, add the type-role utilities, file the handover, log these decisions, and do the state duties. Defer all product/section UI (Header, Footer, ProductCard, real pages) to the later UI phases. To satisfy the render-before-close UI rule, the create-next-app home page was replaced with a **minimal on-brand placeholder** (the TRAJANOV wordmark + a "Site in progress" Label-caps line) — no product content invented.
- **Alternatives considered:** Docs-only (file the handover, no code) — rejected: contradicts "real tokens land at 1.02." Also build the component shells + page scaffolds — rejected: that is the next UI phase's work and would pre-empt its brief.
- **Consequences:** The design system is real, renderable, and verified (build ✅, lint ✅, screenshot ✅) without pre-empting later phases. Downside: the home route shows a placeholder until the first UI phase replaces it.
- **Links:** `current-state.md`; `file-map.md`; `src/app/page.tsx`; Phase 1.02 handover §1–§2.

### D-1.02-7 · 2026-07-12 · Stitch visual-reference assets absent — proceeded from tokens, registered as owed
- **Status:** Accepted (executor call, operator ratified "do what you recommend")
- **Context:** The handover's visual reference (the `trajanov-stitch-reference/` `screen.png` + `code.html` + `DESIGN.md`) was not present in the repo, in the handover, or anywhere on disk (`~/Downloads`, `~/Desktop`, `~/Documents` searched).
- **Decision:** Build the design system from `brand.md` + the handover text (the tokens are authoritative anyway), create `docs/design-handovers/trajanov-stitch-reference/` with a `README.md` marking the export PENDING, and add "supply the Stitch export" to the owed-verification register. Nothing was invented to stand in for the renders.
- **Alternatives considered:** Fabricate placeholder renders — rejected outright (content-truth). Skip the folder entirely — rejected: it would lose the pointer that the reference is owed.
- **Consequences:** No blockage — the tokens are enough to implement against; downside: the intended-look renders aren't in the repo for cross-checking until Lazar supplies them.
- **Links:** `docs/design-handovers/trajanov-stitch-reference/README.md`; `current-state.md` owed-verification register.

### D-1.02-8 · 2026-07-12 · PR #2 merged to `main` without a review (operator override — second occurrence)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. The reviewer skipped again on PR #2 (no auth secret set since 1.01 — D-1.01-5; confirmed: 0 comments / 0 reviews, 4s run, green by skip-gracefully design). The executor surfaced the conflict and offered the compliant paths (operator clicks Merge; or add the secret so a real review runs first); the operator explicitly directed the executor to merge via CLI anyway.
- **Decision:** Squash-merge `phase-1.02-design-system` into `main` with no review, executed by the executor at the operator's explicit direction.
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — declined. Add the auth secret and get the intended hard-gate review first — declined.
- **Consequences:** `main` now holds Phase 1.02; the Part 1 hard-gate review was waived again. This is the **second** override of these rules after D-1.01-6 framed the first as "one-off, not a precedent" — so in practice the "executor never merges / merge only after review" contract is not being enforced in Part 1. The reviewer still activates automatically once a secret is added; strongly recommend adding it before the next phase so the gate actually runs.
- **Links:** D-1.01-6; D-1.01-5; D-1.01-4; `CLAUDE.md` Branch & PR rules; PR #2.

### D-1.03-2 · 2026-07-12 · PR #3 merged to `main` without a review (operator override — third occurrence)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. The reviewer still skips (no auth secret set since 1.01 — D-1.01-5). After the phase was filed as code-complete and left unmerged (PR #3 open), the operator explicitly instructed the executor to "merge to main." The executor surfaced the conflict and the compliant alternatives (add the auth secret for a real review, or merge via the GitHub UI); the operator's instruction stood.
- **Decision:** Squash-merge `phase-1.03-layout-home` into `main` with no review, executed by the executor at the operator's explicit direction.
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — not chosen. Add the auth secret and get the intended hard-gate review first — not chosen.
- **Consequences:** `main` now holds Phase 1.03; the Part 1 hard-gate review was waived a **third** time (after D-1.01-6, D-1.02-8), so the "executor never merges / merge only after review" contract is effectively not enforced in Part 1. The reviewer still activates automatically once a secret is added — recommend adding it before 1.04 so the gate finally runs at least once.
- **Links:** D-1.02-8; D-1.01-6; D-1.01-5; `CLAUDE.md` Branch & PR rules; PR #3.

### D-1.03-1 · 2026-07-12 · Home catalog CTA is a `Link` styled with `buttonVariants()`, not the `Button` component
- **Status:** Accepted (executor call)
- **Context:** The brief says render a primary "VIEW CATALOG" button that links to `/products`, and to reuse the 1.02 `Button` without restyling it. The `Button` is a Base UI button; rendering it as an anchor (`render={<Link/>}` + `nativeButton={false}`) produces an `<a href>` that Base UI also stamps with `role="button"`. Verified in-browser: the element announced as a button while actually navigating — a semantic mismatch for a link, and a likely flag in the 1.07 WCAG audit.
- **Decision:** Render the CTA as `<Link href="/products" className={buttonVariants()}>` — the idiomatic shadcn "link that looks like a button" pattern. It reuses the exact 1.02 button styling (the same exported `buttonVariants` recipe: white primary, 0px corners, Label-caps, white focus ring) with no restyle, and keeps true link semantics (role=null, Enter navigates). Verified in-browser: `<a>` with `role` null, white bg, 0px radius, 50px tall.
- **Alternatives considered:** `<Button render={<Link/>} nativeButton={false}>` — rejected: yields `role="button"` on a navigational anchor (announced as a button, activates on Space), a worse semantic for a link. A plain `<Button onClick={router.push}>` — rejected: loses real anchor semantics (no middle-click/open-in-new-tab, no href for crawlers/SEO), which matters for a shareable storefront.
- **Consequences:** Correct link semantics and identical brand styling, no new component. Downside: the CTA uses the button's exported style recipe rather than the `Button` component instance — a hair looser than the brief's "use that Button" wording, though it honours the intent (no new/restyled button). `buttonVariants` was already exported from `button.tsx` for exactly this use.
- **Links:** `src/app/page.tsx`; `src/components/ui/button.tsx`; brief "Exact copy" (hero CTA) + Task 6; `brand.md` §10.

### D-1.03b-1 · 2026-07-12 · Deployed to Vercel **Hobby** — directly contradicts D-0.00-3
- **Status:** Accepted as a temporary measure (operator approved in-session) — **must be resolved before launch; see Consequences**
- **Context:** Phase 1.03b's Task 2 says to import the repo into "the team's Pro account", and the project instructions record hosting as "Vercel Pro (already paid)". On opening the Vercel dashboard, **no Pro team exists**: the only team is "Petar Jakimov Projects", tagged **Hobby**, with Upgrade-to-Pro prompts throughout. D-0.00-3 had already considered and **rejected** Hobby, for three stated reasons — Vercel's ToS restrict Hobby to non-commercial personal use, Hobby deployments can be shut down without notice, and Hobby content may be used for AI training — concluding "Team already pays for Vercel Pro." That premise is false.
- **Decision:** Surface the gap to the operator before publishing anything, then (with his explicit approval) import and deploy on the Hobby team, so the phase's actual purpose — putting the site on a real URL and clearing the owed-verification register — could be completed at zero cost.
- **Alternatives considered:** Halt and return to the orchestrator — rejected: would have blocked the entire verification phase on a billing decision, leaving the register uncleared and 1.04 still gated. Upgrade to Pro on the spot — rejected: spending the client's money is an owner call, not an executor's, and was declined for now.
- **Consequences:** The site is live at https://trajanov.vercel.app and **publicly reachable**, hosted on precisely the plan this project ruled out, for precisely the risks it named. A commercial storefront on Hobby is a ToS violation. This is a **launch blocker**, not a cosmetic one. Three routes out: (1) upgrade the team to Pro — the original decision, and the premise D-0.00-3 assumed; (2) keep Hobby as a private preview only and treat launch as blocked until Pro exists; (3) genuinely revisit D-0.00-3 — note it rejected the orchestrator's Netlify-free recommendation (commercial use permitted, $0) *on the grounds that Pro was already paid for*, and that ground has now collapsed. The project instructions' "running cost" line also needs correcting: **Pro is not already paid.**
- **Links:** D-0.00-3; D-0.00-11; Phase 1.03b brief Task 2; `src/_project-state/completions/Part-1-Phase-1.03b-Completion.md` §8.

### D-1.03b-2 · 2026-07-12 · Reviewer auth secret deferred again — now to Phase 1.07 (fourth deferral)
- **Status:** Accepted (operator decision)
- **Context:** The GitHub review Action has been committed since 1.01 but skips for want of a Claude auth secret (D-1.01-5). Phase 1.03b's Task 1 existed to fix this. Both routes were put to the operator — an Anthropic API key from console.anthropic.com (pay-as-you-go, a few cents per review), or a Claude Code OAuth token via `/install-github-app` (uses the existing Claude subscription, no new billing).
- **Decision:** Neither. The operator chose to defer the secret to Phase 1.07. No secret was created, viewed, or pasted anywhere.
- **Alternatives considered:** Add the OAuth token now — offered as the recommended option (no billing setup required) and declined. Add the API key now — offered and declined.
- **Consequences:** The hard-gate review stays dead. PRs #1, #2 and #3 all merged with no review (D-1.01-6, D-1.02-8, D-1.03-2), and **1.04 — the largest code phase so far, introducing real product data, the catalog and product pages — will now merge unreviewed as well.** The stated review gate exists because Lazar is a solo merger who cannot review his own PRs; four phases in, that gate has never once run. Deferring to 1.07 means it would first run *after* all of Part 1's code is already on `main`, which is close to no gate at all. Reversible at any time: the Action activates automatically the moment the secret is added.
- **Links:** D-1.01-4; D-1.01-5; D-1.01-6; D-1.02-8; D-1.03-2; Phase 1.03b brief Task 1.

### D-1.04a-1 · 2026-07-12 · Phase 1.04 split into 1.04a (engine) + 1.04b (real data)
- **Status:** Accepted (owner-ratified; recorded by executor per brief)
- **Context:** Phase 1.04 as planned bundled the products *engine* (data format, catalog page, product page, cart) with the *real product content* (photos, names, prices) that only Vaki can supply. That content had not arrived, so the whole phase was blocked on an external dependency.
- **Decision:** Split 1.04 into **1.04a** — build the engine now with zero real products — and **1.04b** — drop in Vaki's real products once they arrive (a short follow-up phase). This phase is 1.04a.
- **Alternatives considered:** Keep 1.04 as one phase — rejected: it would sit blocked on Vaki, stalling everything downstream (including 1.05, the cart/order flow, which only needs the engine). 
- **Consequences:** Product data leaves the critical path; the shop can be filled in one small phase the moment photos land, and 1.05 is unblocked to run in parallel with 1.04b. Downside: two phases and two PRs instead of one, and the catalog ships publicly empty (a deliberate, honest "Products coming soon." state) until 1.04b.
- **Links:** Phase 1.04a brief; D-0.00-6; `current-state.md` NEXT line.

### D-1.04a-2 · 2026-07-12 · Product data format = one JSON file per product + Zod validation + `_`-ignore convention
- **Status:** Accepted (baked into the 1.04a brief; recorded by executor)
- **Context:** Products need a storage format a non-coding team edits via Claude Code (no CMS — D-0.00-2), that fails loudly and legibly when a file is wrong.
- **Decision:** One JSON file per product in `data/products/`; the filename is the URL slug. A TypeScript type plus a **Zod** schema validate every file at load; a malformed file fails the build with a message naming the file and the offending field. Files whose name starts with `_` are ignored by the loader, so `data/products/_example.json` documents the format and is the fill-against template without ever rendering.
- **Alternatives considered:** TS/TSX modules per product — rejected: a syntax slip is a hard compiler error with a stack trace, not a friendly "field X is wrong" message, and it invites logic in data. MDX — rejected: heavier, aimed at prose, overkill for structured fields.
- **Consequences:** Friendly build-time errors for a non-coding editor (verified: a bad `price` fails with `Invalid product file "data/products/broken.json": field "price" — Invalid input: expected number, received string`); data stays pure JSON; the `_`-prefix gives a zero-render example. Downside: one dependency added (`zod`), and JSON has no comments, so the format is documented in `_example.json` + the loader header + `file-map.md` rather than inline.
- **Links:** Phase 1.04a brief Task 1; `src/lib/products.ts`; `data/products/_example.json`; D-0.00-2.

### D-1.04a-3 · 2026-07-12 · Colour options render as text chips of the colour name, not swatches
- **Status:** Accepted (baked into the 1.04a brief; recorded by executor)
- **Context:** The product page needs a colour picker, but the brand is strictly monochrome (D-1.02-4) and colour must **never** be the only carrier of meaning (brand.md §3/§10).
- **Decision:** Render each colour option as a **text chip of the colour name** (e.g. `BLACK`, `GREY`), using the exact same chip pattern and selected/unselected cues as the size chips (unselected = `--border-control`; selected = white border + bold), **not** as coloured swatches.
- **Alternatives considered:** Grayscale swatches — rejected: a grey square for "Grey" and a grey square for "Black" are indistinguishable and meaningless. Real-colour dots — rejected: they would break the monochrome palette and lean on colour as the sole cue, failing the AA rule.
- **Consequences:** Colour is legible, on-brand, and never colour-only; sizes and colours share one accessible component. Downside: a shopper sees the colour *name*, not a visual sample — acceptable given the monochrome direction and that names are unambiguous.
- **Links:** Phase 1.04a brief Task 4; `src/components/products/product-detail.tsx`; brand.md §3/§10; D-1.02-4.

### D-1.04a-4 · 2026-07-12 · PR #5 merged to `main` without a review (operator override — fourth executor-merge)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. The reviewer still skips (no auth secret since 1.01 — D-1.01-5; deferred to 1.07 — D-1.03b-2). The 1.04a brief said "do not merge", so the phase was filed code-complete with PR #5 left open; the operator then explicitly instructed the executor to "merge to main." The executor surfaced the conflict and the compliant alternatives (add the auth secret so a real review runs first, or the operator merges via the GitHub UI); the instruction stood.
- **Decision:** Squash-merge `phase-1.04a-products-engine` into `main` with no review, executed by the executor at the operator's explicit direction.
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — not chosen. Add the auth secret and get the intended hard-gate review first — not chosen.
- **Consequences:** `main` now holds Phase 1.04a. This is the **fourth** executor merge with no review after D-1.01-6, D-1.02-8, D-1.03-2 — so the "executor never merges / merge only after review" contract is effectively not enforced in Part 1, and the hard-gate review has **never once run**. This PR carried the largest code surface so far (the product data layer, catalog, product page, and cart). The reviewer still activates automatically the moment the secret is added — recommend adding it before 1.05 / 1.04b so at least the rest of Part 1 is gated.
- **Links:** D-1.03-2; D-1.02-8; D-1.01-6; D-1.03b-2; `CLAUDE.md` Branch & PR rules; PR #5.

### D-1.05-1 · 2026-07-12 · Order form targets Macedonia delivery only — city is free text, no country field
- **Status:** Accepted (baked into the 1.05 brief; recorded by executor)
- **Context:** The order form needs an address. `facts.md` marks "ships mainly Macedonia" VERIFIED but "ships outside Macedonia? (which countries may order)" UNVERIFIED, and flags it to confirm before 1.05 finalizes the form.
- **Decision:** Collect **name, phone, address, city** only. **City is a free-text field; there is no country selector.** The form assumes Macedonia delivery.
- **Alternatives considered:** A country dropdown / international address handling — rejected: cross-border ordering is UNVERIFIED, so a country field would imply a capability not confirmed. A structured Macedonian city list — rejected: free text is simpler, never wrong, and imposes no list to maintain.
- **Consequences:** The form matches the one verified fact (Macedonia) and invents nothing. Downside: if cross-border ordering is later confirmed, adding a country field is a small follow-up (a new field + payload key), not a rebuild.
- **Links:** Phase 1.05 brief Task 2 / D-1.05-1; `facts.md` Shipping & payment; `src/app/order/page.tsx`.

### D-1.05-2 · 2026-07-12 · Order email is a stub this phase — no `resend` dependency added
- **Status:** Accepted (baked into the 1.05 brief; recorded by executor)
- **Context:** The order flow must be buildable and fully testable now, but the real order email needs a server-only secret (Resend API key) and Vaki's inbox address, neither of which is in scope for 1.05 (that is Phase 2.01).
- **Decision:** The submit path calls a single server function `sendOrder(payload)` (`src/lib/order.ts`) that **makes no network call and uses no secret** this phase — it validates the payload and returns success. No `resend` package is installed (the install is deferred from 1.05 to 2.01; a stub needs no SDK). A `// Phase 2.01: replace stub body with the real Resend send` marker sits at the exact spot 2.01 edits.
- **Alternatives considered:** Install `resend` now and wire a real send — rejected: it needs a secret + Vaki's address (both unavailable) and would email a real inbox during testing. Fake the email client-side — rejected: submission must be server-side so 2.01 can drop the secret-bearing call in with no client change.
- **Consequences:** The whole flow (including the failure path) is testable now with zero secrets and zero emails sent; 2.01 swaps one function body. Downside: no real notification is sent until 2.01 — an accepted, planned gap.
- **Links:** Phase 1.05 brief Task 4 / D-1.05-2; `src/lib/order.ts`; `00_stack-and-config.md` (resend deferred to 2.01); D-0.00-1.

### D-1.05-3 · 2026-07-12 · No delivery-cost / shipping line anywhere in the cart or order total
- **Status:** Accepted (baked into the 1.05 brief; recorded by executor)
- **Context:** A cart/order normally shows a shipping line. `facts.md` marks "Delivery cost & courier" UNVERIFIED, and `brand.md` §9 frames delivery as arranged off-site with cash paid to the courier.
- **Decision:** The order total is the **item subtotal only** (Σ price×qty). No delivery/shipping line, no cost, no timeframe, no free-shipping claim anywhere. A short plain line states delivery is arranged after ordering and paid in cash to the courier, in wording consistent with `brand.md` §9.
- **Alternatives considered:** Show a delivery line with a placeholder/`[PLACEHOLDER: cost]` — rejected: a visible cost token in the money total reads as broken and invites a wrong number; the honest state is "no cost shown." A flat guessed fee — rejected outright (invented, UNVERIFIED).
- **Consequences:** Nothing unverified about money reaches the customer; the total is exactly the goods. Downside: the customer doesn't learn the delivery cost on-site — matching the current business reality (it's arranged by message). Revisit when the cost is verified.
- **Links:** Phase 1.05 brief Task 1/Task 4 / D-1.05-3; `facts.md` Shipping & payment; `brand.md` §9; `src/lib/cart.tsx` (`cartSubtotal`).

### D-1.05-4 · 2026-07-12 · Cart store extended with mutation methods (setQty/removeLine/clear); line-item shape unchanged
- **Status:** Accepted (executor call)
- **Context:** The 1.04a cart store (`src/lib/cart.tsx`) exposed only `addItem`. The 1.05 cart page needs to change a line's quantity and remove a line, and the order flow needs to clear the cart on success. The brief says use the store "as-is; do not change the shape" (emphasis on the line-item **shape** `{ slug, name, price, size, colour, qty }`), and every change must write through the one store so the header badge stays in sync.
- **Decision:** Add `setQty(line, qty)`, `removeLine(line)`, and `clear()` to the cart context (and a pure `cartSubtotal(items)` helper), all operating on the **unchanged** line-item shape via the same `readItems`/`writeItems` internals. No shape field was added, renamed, or removed.
- **Alternatives considered:** Mutate `localStorage` directly from the cart page — rejected: it duplicates the store's key/serialisation/event logic and risks the header badge going out of sync (two writers). Store the cart in React state on the page — rejected: it would not persist and would fork the single source of truth.
- **Consequences:** One store remains the single source of truth; the header badge updates on every cart change (verified in-browser). Downside: `cart.tsx` grew (new methods), but its public shape and storage format are untouched, so nothing downstream breaks.
- **Links:** Phase 1.05 brief Task 1; `src/lib/cart.tsx`; D-1.05-5.

### D-1.05-5 · 2026-07-12 · Cart line has no image → cart thumbnail is the shared 3:4 treated placeholder slot
- **Status:** Accepted (executor call)
- **Context:** Task 1 asks for the product image on each cart line, but the fixed line-item shape (`{ slug, name, price, size, colour, qty }`, D-1.05-4) stores **no image reference**, the product data layer (`src/lib/products.ts`) is server-only (`node:fs`), the cart page is a client component, and the committed catalog is currently empty (1.04b adds real products). So the real photo is not reachable from a cart line without either changing the fixed shape or building a client-side product-data path — both out of scope for 1.05.
- **Decision:** Render each cart line's image as the shared **3:4 grayscale treatment** on a `bg-surface` slot (`PRODUCT_IMAGE_CLASS`, brand §7) — a treated placeholder tile, not an invented photo. The tile and the product name both link to `/products/<slug>` (the slug **is** in the line item), so the line is navigable.
- **Alternatives considered:** Add an `image` field to the line item at add-to-cart time — rejected: the brief forbids changing the line-item shape and forbids touching `product-detail.tsx` (where add-to-cart lives). Fetch product data client-side to resolve the image — rejected: premature (catalog is empty; product population is 1.04b) and adds a client product path this phase doesn't need. Guess the image path from the slug — rejected (content-truth: image paths are arbitrary, set per product in JSON).
- **Consequences:** No invented content; the cart is fully functional and on-brand. Downside: cart thumbnails show a plain treated tile rather than the product photo. Follow-up when real thumbnails are wanted: add an `image` to the line item (set at add-to-cart) — a small change once the shape can move (post-1.04b).
- **Links:** Phase 1.05 brief Task 1; `src/app/cart/page.tsx`; `src/lib/format.ts` (`PRODUCT_IMAGE_CLASS`); D-1.05-4; D-1.04a-2.

### D-1.05-6 · 2026-07-12 · PR #6 merged to `main` without a review (operator override — fifth executor-merge)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. The reviewer still skips (no auth secret since 1.01 — D-1.01-5; deferred to 1.07 — D-1.03b-2; confirmed on PR #6: `claude-review` passed in 3s by skip-gracefully design, 0 comments / 0 reviews). The 1.05 brief said "do not merge", so the phase was filed code-complete with PR #6 left open; the operator then explicitly instructed "merge to main." The executor surfaced the conflict and the compliant alternatives (add the auth secret so a real review runs first, or the operator merges via the GitHub UI); the instruction stood.
- **Decision:** Squash-merge `phase-1.05-cart-order` into `main` with no review, executed by the executor at the operator's explicit direction.
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — not chosen. Add the auth secret and get the intended hard-gate review first — not chosen.
- **Consequences:** `main` now holds Phase 1.05. This is the **fifth** executor merge with no review after D-1.01-6, D-1.02-8, D-1.03-2, D-1.04a-4 — so the "executor never merges / merge only after review" contract remains effectively unenforced in Part 1, and the hard-gate review has **never once run**. All of Part 1's customer-facing flow (catalog, product, cart, order) is now on `main` unreviewed. The reviewer still activates automatically the moment the secret is added — recommend adding it before 1.06 / 1.04b so at least the tail of Part 1 is gated.
- **Links:** D-1.04a-4; D-1.03-2; D-1.02-8; D-1.01-6; D-1.03b-2; `CLAUDE.md` Branch & PR rules; PR #6.

### D-1.06-1 · 2026-07-13 · Contact page channels: Instagram primary, email/phone as placeholder tokens, no street address
- **Status:** Accepted (baked into the 1.06 brief; recorded by executor)
- **Context:** The contact page needs real ways to reach the store. `facts.md` marks Instagram VERIFIED (the one live channel) but public email, phone, and address all UNVERIFIED (parallel track).
- **Decision:** Instagram is the primary, working channel (`https://www.instagram.com/trajanovv2026`). Email and phone render as their visible `[PLACEHOLDER: … — from Vaki]` tokens. **No public street address is shown** — this is an online, order-by-message, cash-on-delivery store that does not need to publish one; if Vaki later wants an address it is a trivial add.
- **Alternatives considered:** An address block placeholder — rejected: it adds a register item for a fact this store model does not require publicly. Silently omitting email/phone — rejected: content-truth wants the gap visible and tracked, not hidden.
- **Consequences:** The page shows one real channel and two loud, register-tracked gaps; nothing is invented. Downside: until Vaki supplies email/phone, the page carries two placeholder tokens (launch blockers, on the register).
- **Links:** Phase 1.06 brief Task 1 / D-1.06-1; `facts.md` Contact; `src/app/contact/page.tsx`.

### D-1.06-2 · 2026-07-13 · Legal pages stay processor-agnostic; no analytics/cookie-vendor disclosure yet
- **Status:** Accepted (baked into the 1.06 brief; recorded by executor)
- **Context:** The privacy and terms pages describe how customer data is handled. The real email send (2.01) and analytics (2.02) are not wired yet, so naming live infrastructure would describe something that does not exist today.
- **Decision:** The legal copy describes data handling **at the model level** — what is collected (name, phone, address, city), why (to contact the customer and arrange delivery), that it is not sold — and **does not name Resend, Vercel, or any analytics vendor, and makes no cookie/analytics disclosure**. It does state plainly that the site **does not use tracking cookies** (true across the whole model). A "name the actual processors + add the cookie/analytics disclosure" pass is **owed at/after 2.02** and is on the owed-verification register.
- **Alternatives considered:** Name Resend/Vercel/the analytics vendor now — rejected: untrue today (none are wired), and content-truth forbids describing infrastructure that does not exist. Omit the cookie line entirely — rejected: "no tracking cookies" is true and worth stating for a shopper.
- **Consequences:** The pages are truthful for the site as it exists now and need one disclosed follow-up pass once 2.01/2.02 land. Downside: the privacy page is not yet its final, processor-named form — flagged on the register so it is not forgotten.
- **Links:** Phase 1.06 brief Task 2/Task 3 / D-1.06-2; `src/app/privacy/page.tsx`; `current-state.md` owed-verification register; Phases 2.01 / 2.02.

### D-1.06-3 · 2026-07-13 · Currency not asserted in legal text
- **Status:** Accepted (baked into the 1.06 brief; recorded by executor)
- **Context:** The terms page states how prices work. `facts.md` marks "Prices / currency" (MKD assumed) UNVERIFIED, and the rest of the site treats MKD as a plain default, not a committed fact.
- **Decision:** Terms says the price is "shown on each product page" and never states a currency (no "prices are in MKD"). This mirrors how the cart, order summary, and product template present MKD as an unverified default rather than a committed legal fact.
- **Alternatives considered:** State "prices are in MKD" in the terms — rejected: it upgrades an UNVERIFIED default into a committed legal claim.
- **Consequences:** Nothing unverified about currency is asserted in legal copy. Downside: none — the price with its currency still shows on each product page where the customer decides.
- **Links:** Phase 1.06 brief Task 3 / D-1.06-3; `facts.md` Shipping & payment; `src/lib/format.ts` (`DEFAULT_CURRENCY`); `src/app/terms/page.tsx`.

### D-1.06-4 · 2026-07-13 · Returns is a placeholder token, not silence
- **Status:** Accepted (baked into the 1.06 brief; recorded by executor)
- **Context:** A clothing store needs a stated stance on returns, but `facts.md` has no verified returns policy.
- **Decision:** The terms page carries a "Returns and exchanges" section holding the `[PLACEHOLDER: returns & exchanges policy — from Vaki]` token, so the missing policy is loud and register-tracked. This makes "supply a returns policy" a launch-blocking item until Vaki provides it.
- **Alternatives considered:** Omit returns entirely — rejected: a clothing store needs a stated stance, and silence hides the gap. Invent a window (e.g. "14-day returns") — rejected outright (content-truth; that exact false badge is on the do-not-ship strip register).
- **Consequences:** The gap is visible and blocks launch until filled. Downside: the terms page ships with a visible placeholder in the returns section until Vaki supplies the policy.
- **Links:** Phase 1.06 brief Task 3 / D-1.06-4; `src/app/terms/page.tsx`; `current-state.md` placeholder register.

### D-1.06-5 · 2026-07-13 · PR #7 merged to `main` without a review (operator override — sixth executor-merge)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. The reviewer still skips (no auth secret since 1.01 — D-1.01-5; deferred to 1.07 — D-1.03b-2; confirmed on PR #7: `claude-review` passed in 4s by skip-gracefully design, Vercel preview deployed green). The 1.06 phase was filed code-complete with PR #7 open; the executor surfaced that this would be the seventh unreviewed PR unless the secret is added first, and the operator then explicitly instructed "merge to main."
- **Decision:** Squash-merge `phase-1.06-contact-legal` into `main` with no review, executed by the executor at the operator's explicit direction. This decision entry is committed inside PR #7 so `main` carries the record after the squash-merge.
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — not chosen. Add the auth secret and get the intended hard-gate review first — not chosen.
- **Consequences:** `main` now holds Phase 1.06. This is the **sixth** executor merge with no review after D-1.01-6, D-1.02-8, D-1.03-2, D-1.04a-4, D-1.05-6 — so the "executor never merges / merge only after review" contract remains effectively unenforced in Part 1, and the hard-gate review has **never once run**. The four placeholder tokens now on `main` are launch blockers until Vaki fills them. The reviewer still activates automatically the moment the secret is added — recommend adding it before 1.04b / 1.07 so at least the tail of Part 1 is gated.
- **Links:** D-1.05-6; D-1.04a-4; D-1.03-2; D-1.02-8; D-1.01-6; D-1.03b-2; `CLAUDE.md` Branch & PR rules; PR #7.

### D-1.02b-6 · 2026-07-13 · Buttons: rounded (12px), dark fill, required outline — reverses two brand rules
- **Status:** Accepted (owner call via the Phase 1.02b-2 design addendum; applied + recorded by the 1.02c executor)
- **Context:** The owner supplied a reference — a softly **rounded, dark** button with a **white** label — to replace the sharp white primary. This reverses two stated brand rules: `0px` corners "everywhere, no exceptions" (§5/§11) and "white is the single accent, reserved for the primary action so it reads as a glow" (§1/§3).
- **Decision:** All buttons take a **12px** radius (`--radius-button`, **buttons only**), a **`--surface-2` `#201F1F` fill**, a **white label** (`--text`), and a **REQUIRED 1px `--border-control` `#8E9192` outline**; hover lifts fill → `#2A2A2A` (`--btn-hover-bg`) and outline → `#B7BABB` (`--btn-hover-border`); the white `:focus-visible` ring stays. Inputs, size/colour chips, images, and all layout keep `0px`.
- **Alternatives considered:** Keep the sharp white button — rejected (owner direction). Dark button **without** the outline — rejected: `#201F1F` on `#0A0A0A` is ~1.5:1, which **fails WCAG 2.2 AA 1.4.11** (non-text contrast, 3:1) and is barely visible; the `#8E9192` outline (≥3:1 on `#0A0A0A`) is what makes it legible + compliant. A pill radius — rejected: the reference is a soft rectangle, not a pill.
- **Consequences:** Matches the owner reference and stays AA-compliant via the mandatory outline. Downside: two brand rules are reversed (logged here and folded into `brand.md` §3/§5/§11/§12 so the token source stays truthful); the "buy path is obvious" cue now comes from the outline + label rather than a white glow.
- **Links:** addendum §1; `brand.md` §3/§5/§11/§12; `src/components/ui/button.tsx`; `src/app/globals.css`; D-1.02c-5.

### D-1.02b-7 · 2026-07-13 · Home hero: owner's photograph, split layout, kept in colour (§7 exception)
- **Status:** Accepted (owner call via the addendum; applied + recorded by the 1.02c executor)
- **Context:** The owner supplied a campaign photograph (two models in white Trajanov tees with red line-art prints, in a bar) to complete the §2 "wall of type over/beside full-bleed photography" motif, which had been sitting on a black placeholder.
- **Decision:** The Home hero becomes a **split** — `TRAJANOV` + eyebrow + intro + CTA on the left, the photograph on the right shown **whole** (natural aspect, no crop). The photo is kept **in colour** — a documented **§7 hero-only exception (D-1.02b-7)** — so the **red graphic prints** (which echo the brand) stay visible; **product cards stay black-and-white**. Type sits **off** the image, so **no scrim**. On mobile it **stacks, type-first**.
- **Alternatives considered:** Full-bleed type-over-photo — rejected: the source is portrait and would crop a model, and light type over the busy image would need a scrim. Desaturate the hero to match the §7 B&W default — rejected: it kills the red prints, which are the point.
- **Consequences:** The signature motif is complete and on-brand; the red echoes `--accent`-adjacent brand energy without adding a chromatic UI token. Downside: one documented departure from the B&W imagery default (hero only). Photo handling: see D-1.02c-3 (copy) and D-1.02c-4 (crop/provenance).
- **Links:** addendum §2; `brand.md` §7; `src/app/page.tsx`; `public/images/home/hero.jpg`.

### D-1.02c-1 · 2026-07-13 · Ran 1.02c out of numeric order (on top of 1.06); scope = this addendum + the operator's "match the proof"
- **Status:** Accepted (executor call; scope operator-directed)
- **Context:** The addendum is framed as "Code phase 1.02c applies the 1.02b handover AND this addendum in one pass," but `main` is already at **Phase 1.06**, and the **1.02b _base_ handover** the addendum builds on (Syne scale, decorative red hairlines, two-column footer, mobile burger refinement, new button padding) is **not in the repo and was not provided**. The repo still carried the Phase-1.02 button (`px-8 py-4`, white, `0px`) and **Bebas Neue** — i.e. the base the addendum assumes had never landed.
- **Decision:** Run 1.02c now, **out of numeric order**, on top of 1.06. Apply what **this** addendum concretely specifies (dark rounded buttons + split hero) **plus** the font swap + eyebrow + hero copy the operator explicitly chose after being shown the gap ("**match the proof exactly**" — the proof screenshot shows **Syne 700** + an `EST. 2026 · STREETWEAR` eyebrow + a new intro). Un-provided 1.02b-base items with no buildable spec (red hairlines; footer/burger changes) are **out of scope** — the header already has a burger menu from 1.03, and no red-accent token exists.
- **Alternatives considered:** Wait for the 1.02b base handover before touching anything — rejected: the operator wanted the visible refresh now, and the addendum + the proof are enough to build the two changes. Do only the addendum's literal two changes and keep Bebas — rejected: the operator chose to match the proof, which is Syne.
- **Consequences:** The refresh lands now. Downside: without the 1.02b written spec, the Syne type scale is **derived from the proof** (D-1.02c-2), so a later-surfacing 1.02b handover may retune it; and the phase numbering is non-monotonic (1.02c after 1.06) — noted in `current-state.md`.
- **Links:** addendum "Applied by"; `current-state.md`; D-1.02c-2; D-1.02c-3.

### D-1.02c-2 · 2026-07-13 · Display font Bebas Neue → Syne 700; scale derived from the proof
- **Status:** Accepted (executor call; operator-directed via "match the proof")
- **Context:** The operator chose to match the proof, whose wordmark is **Syne 700** (the repo used **Bebas Neue**). The full Syne type scale lives in the un-provided 1.02b base handover; the only hard datapoints are the proof's **"Syne 700 / 72px"** desktop wordmark and the addendum's **52px** mobile.
- **Decision:** Switch the display family **Bebas Neue → Syne** (loaded via `next/font/google`, variable, set at weight **700**). Retune **Display XL** from Bebas 120/64 to **Syne 72px desktop / 50px mobile** — the only `.type-display-xl` use is the Home hero, and 50px was chosen over the proof's 52px after measuring **0px slack** for `TRAJANOV` in the 335px mobile content box (the addendum's sanctioned fallback; 50px renders 309px wide → 26px slack, no overflow). **Headline LG** keeps 48px but weight **400→700** (Syne 400 is too light to read as display); header/footer wordmarks set to `font-bold` for the same reason.
- **Alternatives considered:** Keep Bebas — rejected (operator wants the proof). Load Syne but keep the 120px Display XL token — rejected: Syne at 120px overflows, and nothing else uses `.type-display-xl`, so retuning the token to the actual hero size is cleaner and keeps `brand.md` truthful.
- **Consequences:** The whole display layer is Syne, consistent site-wide (every `.type-display-xl` / `.type-headline-lg` / wordmark — Home, catalog, product, cart, order, contact, privacy, terms, thanks). Downsides: the scale is derived from **one** proof measurement, not a full written spec (flagged for retune if the 1.02b base handover surfaces); the **Cyrillic-coverage flag (D-0.00-7/D-1.02-3)** now applies to **Syne**, not Bebas.
- **Links:** `src/app/layout.tsx`; `src/app/globals.css`; `brand.md` §2/§4/§12; the proof screenshot; D-1.02c-1.

### D-1.02c-3 · 2026-07-13 · Home hero intro ships two UNVERIFIED production claims on operator authority — facts.md sync owed to Lazar
- **Status:** Accepted (operator decision — explicit). **Update 2026-07-13:** at merge the operator confirmed the two claims are **TRUE** for the brand (Vaki does small-run, wear-tested prints) and directed the merge (D-1.02c-6). The claims are therefore attested-true and now live; the **`facts.md` VERIFIED-row update is still owed to Lazar** (an executing Claude may not edit `facts.md`, so the source of truth is synced by Lazar via the orchestrator, not here).
- **Context:** The proof's hero intro is *"Wear-tested graphics, printed in small runs. Cash on delivery, mainly across Macedonia."* Cash-on-delivery and "mainly across Macedonia" are **VERIFIED** in `facts.md`; **"wear-tested"** and **"printed in small runs"** are production claims that are **not** in `facts.md`. Content-truth (CLAUDE.md) binds on-site factual claims to `facts.md` VERIFIED entries; executing Claudes **read** `facts.md` and **never edit** it (only Lazar, via the orchestrator, does).
- **Decision:** Ship the proof's **full** intro — including the two unverified claims — at the operator's **explicit** direction ("match the proof exactly," chosen with the content-truth caveat shown at the ask). Because the change lands on a **`phase-1.02c` branch → PR (not merged)**, nothing unverified reaches the **deployed** store until Lazar merges. The gap is recorded here **and** on the `current-state.md` owed-verification register; **Lazar owes a `facts.md` row** for the production claim, or the clause is cut at review.
- **Alternatives considered:** Render only the verified half / a placeholder token for the clause — rejected: contradicts the operator's explicit "match the proof." Silently treat the claim as fact — rejected: content-truth requires the gap be **visible + tracked**. Edit `facts.md` myself to mark it VERIFIED — **not permitted** (executor may not edit `facts.md`).
- **Consequences:** The hero reads exactly as designed. Downside: a factual **production claim sits in the PR ahead of its `facts.md` verification** — a real but **tracked, reversible** content-truth exception; it resolves when Lazar either verifies the claim (updates `facts.md`) or cuts the clause before merge. Nothing hits the live site unreviewed because the PR is not self-merged.
- **Links:** addendum §2; `facts.md` (Identity / Shipping & payment); `current-state.md` owed-verification register; `src/app/page.tsx`; `CLAUDE.md` "Content truth".

### D-1.02c-4 · 2026-07-13 · Hero photo cropped to remove Instagram carousel chrome; provenance = the brand's own IG
- **Status:** Accepted (executor call)
- **Context:** The owner-supplied hero photo was grabbed from Trajanov's **own** Instagram (`@trajanovv2026`, VERIFIED in `facts.md`) as a **1352×1436** screenshot that included Instagram carousel chrome — a semi-transparent `›` next-arrow **inset** on the right edge (over blurred bar background) and two carousel **dots** at the bottom.
- **Decision:** Ship it as the hero **after removing the chrome**: feather-patch the `›` arrow with adjacent dark background (it is inset over blurred background and **cannot** be cropped off without losing the male model's shirt/print), and **crop 46px off the bottom** to drop the dots → **1352×1390** JPG at `public/images/home/hero.jpg`, served via `next/image` (colour, `priority`, blur placeholder). Provenance: the brand's **own** campaign photo from its **own** verified account — **not** third-party/stock — so it is owner-supplied content consistent with content-truth and needs **no** placeholder token.
- **Alternatives considered:** Ship the raw screenshot with IG chrome — rejected: the `›` arrow + dots read as broken on a storefront. Crop the arrow off — rejected: it is inset, so cropping loses the man's shirt/print. Wait for a clean original from Vaki — deferred: this exact frame **matches the design source (1352×1436)** and is publishable now; a higher-res untouched original can replace the file later with **no code change**.
- **Consequences:** A clean, professional hero now. Downside: a small feather-patch sits in the **deep blurred background** (imperceptible at display scale — verified at the real 560px column width); replace the file if Vaki supplies the untouched original.
- **Links:** addendum §2 (path/provenance); `public/images/home/hero.jpg`; `src/app/page.tsx`; `facts.md` Instagram row; D-1.02b-7.

### D-1.02c-5 · 2026-07-13 · Button padding set to the addendum's 14/24 (Home CTA 20), replacing the repo's stale `px-8 py-4`
- **Status:** Accepted (executor call)
- **Context:** The addendum specifies button padding **14px 24px** (default) / **14px 20px** (Home CTA), "unchanged from 1.02b." But 1.02b was never applied, so the repo's **actual** padding was the Phase-1.02 `px-8 py-4` (**32/16**) — larger and less like the proof's compact rounded button.
- **Decision:** Tokenise and set padding to `--btn-pad-y:14px` / `--btn-pad-x:24px` (default) and `--btn-cta-pad-x:20px` (Home CTA, applied via `cn()` so tailwind-merge overrides the default `px`). Renders **≈46px** tall (14+16+14 + 1px outline top & bottom), clearing the **≥44px** tap floor. All app buttons use the `default` variant, so the change is uniform; `sm`/`lg` sizes (unused in the app) were left as-is.
- **Alternatives considered:** Keep the repo's `px-8 py-4` — rejected: larger than the proof/addendum, and "match the proof" wants the tighter 14/24. Hardcode the CTA px in the component — rejected: tokenised values keep `brand.md` §12 the source.
- **Consequences:** Buttons match the proof and stay ≥44px (verified: Home CTA = 46px tall, 20px sides; cart full-width button = default 24px sides). Downside: a site-wide button-size change — verified on the two rendered pages; the rest share the one `default` recipe.
- **Links:** addendum §1 (padding table) + §3 checklist; `src/app/globals.css`; `src/components/ui/button.tsx`; `brand.md` §12; D-1.02b-6.

### D-1.02c-6 · 2026-07-13 · PR #9 merged to `main` by the executor (operator override — seventh executor-merge)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts. The reviewer still skips (no auth secret since 1.01 — D-1.01-5; deferred to 1.07 — D-1.03b-2). The 1.02c phase was filed code-complete with PR #9 open; the executor surfaced (a) that merging auto-deploys to the public live site and (b) the content-truth gap on the hero copy (D-1.02c-3). The operator confirmed the hero claims are **true** and explicitly instructed "merge now."
- **Decision:** Squash-merge `phase-1.02c-refresh-buttons-hero` into `main` with no review, executed by the executor at the operator's explicit direction. This entry is committed inside PR #9 so `main` carries the record after the squash-merge.
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — not chosen. Add the auth secret and get the intended hard-gate review first — not chosen. Trim the unverified hero copy before merge — offered and declined (operator confirmed the copy is true).
- **Consequences:** `main` now holds Phase 1.02c and Vercel auto-deploys the refresh (Syne, dark rounded buttons, colour hero) + the operator-attested hero copy to the public URL. This is the **seventh** executor merge with no review after D-1.01-6, D-1.02-8, D-1.03-2, D-1.04a-4, D-1.05-6, D-1.06-5 — the "executor never merges / merge only after review" contract remains unenforced in Part 1, and the hard-gate review has **never once run**. Still owed: Lazar's `facts.md` VERIFIED-row update for the hero claims (D-1.02c-3) to keep the source of truth honest, and the deployed-URL/real-phone eyeball (owed-verification register).
- **Links:** D-1.06-5; D-1.05-6; D-1.04a-4; D-1.03-2; D-1.02-8; D-1.01-6; D-1.03b-2; D-1.02c-3; `CLAUDE.md` Branch & PR rules; PR #9.

### D-1.02c-7 · 2026-07-13 · Renewed footer applied from the standalone 1.02b-3 handover; red top hairline NOT applied (kept monochrome)
- **Status:** Accepted (executor call; hairline colour operator-directed)
- **Context:** The two-column footer was deferred at D-1.02c-1 ("footer/burger changes … out of scope"; "no red-accent token exists"). The standalone footer brief (**Part 1 · Phase 1.02b-3**) was later provided and directed applied. Its signature element is a **2px `--accent-red` `#E5322E`** top hairline "tying to the 1.02b red-accent system" — but no such token or system exists: `brand.md` is **strictly monochrome** (D-1.02-4, owner-agreed: "pure white is the only accent"), and no `--accent-red` is defined in `brand.md` or `globals.css`. The brief was authored without `brand.md` in front of it (its §9 admits it used literal hex "because `brand.md` was not available") and assumed a red accent the brand forbids.
- **Decision:** Apply the whole footer from tokens — restrained Syne wordmark (≈ header size, not hero-scale), two columns **CONTACT** (Lucide `Mail` + the email `<PlaceholderToken>`) and **SOCIAL** (Instagram + `@trajanovv2026`, new tab), bottom bar (`© 2026 Trajanov` · `PRIVACY` · `TERMS`) above a 1px `--border` rule — but render the **top hairline monochrome**: a 2px `--border` `#262626` line, **not** red. Surfaced to the operator as red-vs-monochrome; operator chose monochrome. Documented in a comment block at the top of `footer.tsx`.
- **Alternatives considered:** Add `--accent-red: #E5322E` to `brand.md` §3 + `globals.css` and use it — rejected by the operator: it reverses the owner-agreed monochrome rule (D-1.02-4), an owner-level brand change needing Lazar/Vaki sign-off + a decision superseding D-1.02-4. Drop the top hairline entirely — rejected: the design wants a defined top edge, and `--border` gives it monochrome. Ship the brief's red literally — rejected: hardcodes a colour `brand.md` forbids (CLAUDE.md UI rule) and invents a brand token.
- **Consequences:** The footer matches the brief's layout while staying on-brand; `brand.md` is unchanged and no new token was added. Downside: the footer diverges from the brief's literal red accent — a deliberate, logged deviation; if a chromatic accent is ever wanted it must start in `brand.md` with an entry superseding D-1.02-4, not in a component.
- **Links:** footer handover §2.1/§4/§9; `src/components/footer.tsx`; `brand.md` §3/§12; D-1.02-4; D-1.02c-1.

### D-1.02c-8 · 2026-07-13 · Footer Instagram icon drawn as a purpose-built SVG (pinned lucide-react dropped brand icons)
- **Status:** Accepted (executor call; operator-directed)
- **Context:** The footer brief §4 says "Lucide only — `Mail`, `Instagram`." `Mail` exists, but the pinned **`lucide-react@1.24.0`** removed brand icons, so there is **no `Instagram` export** — the production build failed on the import (`Export Instagram doesn't exist in target module`). The rest of the site links Instagram as **text-only** (`/contact`, `/order`) for the same reason.
- **Decision:** Render the SOCIAL Instagram link with a **purpose-built inline SVG** glyph — `brand.md` §6 permits "illustrative/custom marks: purpose-built SVG only" — drawn on Lucide's **24×24 / 2px-stroke** grid (`fill:none`, `stroke:currentColor`, rounded caps/joins) so it sits flush with the `Mail` icon at `size-4` (16px). Surfaced to the operator as text-only vs custom-SVG vs no-icons; operator chose the custom SVG.
- **Alternatives considered:** Text-only Instagram link (matches the rest of the site) — not chosen. Drop both icons for symmetry — not chosen. Substitute a Lucide `AtSign`/`Camera` — rejected: not recognizably Instagram. Upgrade/replace `lucide-react` to a version carrying brand icons — rejected: a dependency change well outside a footer task, and Lucide deprecated brand icons upstream anyway.
- **Consequences:** Both columns get their leading icon exactly as the brief shows, with no dependency change; the build passes. Downside: a hand-drawn glyph now lives in `footer.tsx` — a mark used nowhere else — so the footer's Instagram treatment differs from the text-only links on `/contact` and `/order`.
- **Links:** footer handover §2.3/§4; `src/components/footer.tsx`; `brand.md` §6; `lucide-react@1.24.0` (`00_stack-and-config.md`).

### D-1.02c-9 · 2026-07-13 · PR #10 (renewed footer) merged to `main` by the executor (operator override — eighth executor-merge)
- **Status:** Accepted (operator decision — explicit override)
- **Context:** `CLAUDE.md` requires the operator (not the executor) to merge, and only after the GitHub Action review posts; the reviewer still skips (no auth secret since 1.01 — D-1.01-5; deferred to 1.07 — D-1.03b-2). The renewed footer landed code-complete on `phase-1.02c-footer` → PR #10; the executor surfaced that merging auto-deploys to the public live site. The operator explicitly instructed "merge it to main."
- **Decision:** Squash-merge PR #10 into `main` with no review, executed by the executor at the operator's explicit direction (branch pushed → PR opened → squash-merged → branch deleted). This state-log entry (with D-1.02c-7/-8 and the placeholder-register note) lands in a **follow-up** PR merged the same way, so the record trails the footer merge by one PR (that follow-up merge is the ninth executor-merge, covered by this same override — not given a separate ID).
- **Alternatives considered:** Operator merges via the GitHub UI (rule-compliant) — not chosen. Add the auth secret and get the intended hard-gate review first — not chosen.
- **Consequences:** `main` now holds the renewed footer and Vercel auto-deploys it to the public URL. This is the **eighth** executor merge with no review after D-1.01-6, D-1.02-8, D-1.03-2, D-1.04a-4, D-1.05-6, D-1.06-5, D-1.02c-6 — the "executor never merges / merge only after review" contract remains unenforced in Part 1, and the hard-gate review has **never once run**.
- **Links:** D-1.02c-6; D-1.06-5; D-1.05-6; D-1.04a-4; D-1.03-2; D-1.02-8; D-1.01-6; D-1.03b-2; `CLAUDE.md` Branch & PR rules; PR #10.
