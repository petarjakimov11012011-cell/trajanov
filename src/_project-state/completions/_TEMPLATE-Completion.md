# Part X · Phase YY · <Role> — Completion Report
*Destination in repo: `src/_project-state/completions/` — copy this template to `Part-X-Phase-YY-Completion.md`. One phase = one report = one commit. Filing this report AND syncing `current-state.md` is what closes the phase. Report reality: verify every claim before writing it (run the command, open the page) — never a checkmark from memory. Plain, factual language a non-technical owner can read; no marketing tone. Never paste secrets — say where they were placed.*

**Date:** YYYY-MM-DD · **Outcome (one line):** <what now exists that didn't>

## 1. What shipped (plain language)
2–3 sentences a non-technical owner can read. What is now possible.

## 2. Definition of Done
Restate each DoD item from the phase brief. Mark ✅ done / ⚠️ partial / ❌ not done, with evidence beside each (command output, file path, URL, screenshot reference).
- ✅ <item> — evidence: <proof>
- ⚠️ <item> — done except <gap>, because <reason>
- ❌ <item> — not done, because <reason>

## 3. Decisions I made during this phase
Anything chosen that the brief did NOT spell out: off-spec change, library/version pick, scope cut, workaround. For each: what · why · the alternative rejected · logged as `D-<phase>-<n>` in `decisions.md`? If none, write "None." — never leave this section blank.

## 4. Deviations from the brief
Anything in the brief not done, deferred, or changed — and why. "None" if none.

## 5. Changed files / deliverables
- Code: new/edited/deleted files (short list) + branch and PR link.
- Design: handover file path and what it contains.
- Ops/manual: what was created or configured and WHERE it lives (accounts, dashboards). Secrets: where placed, never the value.

## 6. State updates done (code phases — mandatory)
Confirm each now mirrors reality: `current-state.md` (incl. the NEXT line value you set), `file-map.md`, `00_stack-and-config.md`. If not done, this phase is not closed.

## 7. Verified here vs owed to Lazar
- Verified by me: <checks performed, with proof>
- Owed to Lazar: <in-browser/real-inbox checks I could not perform> — each added to the owed-verification register in `current-state.md`.

## 8. Risks, follow-ups, what the next phase needs to know
New blockers, surprises, anything the next agent must know. "None" if none.

## 9. What's now possible that wasn't before
One line, forward-looking.

**NEXT line set to:** `NEXT: <phase id> — <name>`
