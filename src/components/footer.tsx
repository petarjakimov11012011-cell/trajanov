import Link from "next/link";
import { Mail } from "lucide-react";

import { PlaceholderToken } from "@/components/placeholder-token";

// Shared site footer — brand.md tokens + the standalone footer Design Handover
// (Part 1 · Phase 1.02b-3), which supersedes 1.02b §4 as the single footer source.
// Restrained Syne wordmark, two columns (CONTACT + SOCIAL) each with a leading
// Lucide icon, then a bottom bar. Facts verified once against facts.md: SOCIAL is
// Instagram only (VERIFIED @trajanovv2026); the public email is UNVERIFIED, so
// CONTACT renders the loud <PlaceholderToken> — never an invented address. Handover
// §6 guardrails honoured: two columns only (no Facebook, no third column), English
// headers, no other-brand content.
//
// Two owner calls (2026-07-13) reconcile the handover to the actual stack:
//  1. Red top hairline (--accent-red / #E5322E, handover §2.1/§4) NOT applied —
//     brand.md is strictly monochrome (D-1.02-4, owner-agreed: "pure white is the
//     only accent") and defines no such token, so the top edge uses --border.
//  2. Instagram icon (handover §4 says "Lucide only") drawn as a purpose-built SVG
//     (<InstagramGlyph> below) — this pinned lucide-react (1.24.0) removed brand
//     icons, so there is no Lucide Instagram. brand.md §6 permits custom marks; it
//     is drawn on Lucide's 24×24 / 2px grid so it sits flush with the Mail icon.

// Bottom-bar secondary nav — ABOUT added 1.08 (D-1.08-5), alongside the legal
// links, reusing the same link classes + separator pattern.
const FOOTER_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "PRIVACY", href: "/privacy" },
  { label: "TERMS", href: "/terms" },
] as const;

// Line-style Instagram glyph on Lucide's 24×24 / 2px-stroke grid (see note above).
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// White focus ring, ≥2px, offset — offset colour is --surface since the footer sits
// on --surface (brand.md §10, handover §5). Same recipe as the header.
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-surface">
      <div className="mx-auto max-w-[var(--container-max)] px-5 pt-12 pb-8 md:px-16 md:pt-16 md:pb-12">
        {/* Wordmark — restrained (≈ header size), never hero-scale (handover §2.2) */}
        <Link
          href="/"
          aria-label="Trajanov — home"
          className={`inline-flex min-h-11 items-center font-[family-name:var(--font-display)] font-bold text-[22px] leading-none tracking-[0.16em] text-text transition-opacity hover:opacity-80 motion-reduce:transition-none md:text-[26px] ${FOCUS_RING}`}
        >
          TRAJANOV
        </Link>

        {/* Two columns only — CONTACT + SOCIAL, left-aligned (handover §2.3) */}
        <div className="mt-9 flex flex-col gap-9 md:mt-14 md:flex-row md:gap-12">
          {/* CONTACT — email is UNVERIFIED → loud placeholder, never invented */}
          <div>
            <p className="type-label text-text-muted">CONTACT</p>
            <div className="mt-4 flex items-start gap-2">
              <Mail
                className="mt-1 size-4 shrink-0 text-text-muted"
                strokeWidth={2}
                aria-hidden="true"
              />
              {/* min-w-0 + overflow-wrap keep a long token from forcing 375px overflow */}
              <span className="min-w-0 [overflow-wrap:anywhere]">
                <PlaceholderToken>
                  [PLACEHOLDER: public email — from Vladimir]
                </PlaceholderToken>
              </span>
            </div>
          </div>

          {/* SOCIAL — Instagram only (VERIFIED); opens in a new tab */}
          <div>
            <p className="type-label text-text-muted">SOCIAL</p>
            <a
              href="https://www.instagram.com/trajanovv2026"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trajanov on Instagram (opens in a new tab)"
              className={`type-body-md mt-4 inline-flex min-h-11 items-center gap-2 text-text-muted transition-colors hover:text-text motion-reduce:transition-none ${FOCUS_RING}`}
            >
              <InstagramGlyph className="size-4 shrink-0" />
              @trajanovv2026
            </a>
          </div>
        </div>

        {/* Bottom bar — separated by a 1px --border rule (handover §2.4) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="type-label text-text-muted">© 2026 Trajanov</p>
          <nav aria-label="Secondary" className="flex items-center gap-2">
            {FOOTER_LINKS.map(({ label, href }, index) => (
              <span key={href} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="type-label text-text-muted">
                    ·
                  </span>
                )}
                <Link
                  href={href}
                  className={`type-label inline-flex min-h-11 items-center text-text-muted transition-colors hover:text-text motion-reduce:transition-none ${FOCUS_RING}`}
                >
                  {label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
