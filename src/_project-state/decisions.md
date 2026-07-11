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
