import Link from "next/link";

// Shared site footer — brand.md §2/§4 + handover §2 + Phase 1.03 brief Task 4.
// Surface block, no shadow, a top hairline, generous editorial spacing. Facts
// verified once (decision 6): the verified Instagram link, legal links, and the
// © 2026 line only — no contact rows (email/phone/address are UNVERIFIED), and
// nothing from the strip register (no newsletter, no © 2024).

const LEGAL_LINKS = [
  { label: "PRIVACY", href: "/privacy" },
  { label: "TERMS", href: "/terms" },
] as const;

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[var(--container-max)] px-5 pt-24 pb-12 md:px-16 md:pt-32 md:pb-16">
        <Link
          href="/"
          aria-label="Trajanov — home"
          className={`inline-flex font-[family-name:var(--font-display)] font-bold text-5xl leading-none tracking-[0.12em] text-text transition-opacity hover:opacity-80 motion-reduce:transition-none md:text-6xl ${FOCUS_RING}`}
        >
          TRAJANOV
        </Link>

        <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a
            href="https://www.instagram.com/trajanovv2026"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Trajanov on Instagram (opens in a new tab)"
            className={`type-nav inline-flex min-h-11 items-center text-text-muted transition-colors hover:text-text motion-reduce:transition-none ${FOCUS_RING}`}
          >
            @trajanovv2026
          </a>

          <nav aria-label="Legal" className="flex items-center gap-8">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`type-label inline-flex min-h-11 items-center text-text-muted transition-colors hover:text-text motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="type-label mt-12 text-text-muted">© 2026 Trajanov</p>
      </div>
    </footer>
  );
}
