import type { ReactNode } from "react";

// Phase 1.06. A visible, deliberately-unfinished content token for facts that are
// UNVERIFIED in facts.md. It renders the literal register token (e.g.
// "[PLACEHOLDER: public email — from Vladimir]") in the brand's error colours so it
// reads as loud and clearly unfinished — never as real copy and never a silent
// blank. Every one of these is a launch blocker tracked in the placeholder
// register in current-state.md and must be gone before cutover.
//
// Tokens only: uses --error / --error-surface, the one AA-checked pair in
// brand.md §3 (5.5:1). box-decoration-clone keeps the background intact when a
// long token wraps, so it never forces horizontal overflow at 375px.
export function PlaceholderToken({ children }: { children: ReactNode }) {
  return (
    <span className="type-body-md box-decoration-clone bg-error-surface px-2 py-1 font-bold text-error">
      {children}
    </span>
  );
}
