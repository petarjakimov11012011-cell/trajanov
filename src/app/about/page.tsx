import type { Metadata } from "next";
import Link from "next/link";

import { PlaceholderToken } from "@/components/placeholder-token";
import { buttonVariants } from "@/components/ui/button";

// About — Phase 1.08. A static server component in the existing shell, same
// pattern as the other content pages (contact/privacy/terms): a Syne page title,
// the founder's story in body prose, a quiet slogan pull-quote, then a catalog
// link. Every factual claim is VERIFIED in facts.md → "Founder / About"
// (Vladimir Trajanov · "from Macedonia" · First place, Creative Day × EAM, 2026);
// the founder's nickname, birth year, school, and home town are omitted by policy
// (child-safety, facts.md) and appear nowhere here. Copy is the agreed §2 wording
// (D-1.08-1/-2/-3). No photograph is added — the one consented photo on Home stays
// the only image of the founder (minor) on the site.

const DESCRIPTION =
  "Trajanov is the label of Vladimir Trajanov, a young designer from Macedonia — printed in small runs, sold direct with cash on delivery.";

export const metadata: Metadata = {
  title: "About — Trajanov",
  description: DESCRIPTION,
  openGraph: {
    title: "About — Trajanov",
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">ABOUT</h1>

        {/* Body copy — the agreed §2 wording; sentence case per brand.md §9.
            Every factual claim is VERIFIED in facts.md → Founder / About and
            Shipping & payment. "printed in small runs" reuses the attested-true
            Home-hero claim (D-1.02c-3 / D-1.08 §2 note). */}
        <div className="mt-12 flex max-w-prose flex-col gap-6 md:mt-16">
          <p className="type-body-lg text-text-muted">
            Trajanov is the label of Vladimir Trajanov, a young designer from
            Macedonia.
          </p>
          <p className="type-body-lg text-text-muted">
            In 2026 his t-shirt design won first place at Creative Day, a
            national student design competition run with the textile company
            EAM. The prize was a batch of shirts printed with his own design —
            and the start of his own label.
          </p>
          <p className="type-body-lg text-text-muted">
            Trajanov is where those designs go now: printed in small runs, made
            to be worn, sold direct with cash on delivery. What he&apos;s after
            is straightforward — to keep designing under his own name, with his
            own studio one day.
          </p>
        </div>

        {/* Slogan block — a quiet pull-quote set off from the prose, holding the
            founder's winning-design slogan (Macedonian, Cyrillic). The exact
            wording is UNVERIFIED (facts.md → Founder / About: "pending from
            Vladimir"), so it ships as a loud placeholder token, never scraped
            press text (D-1.08-6).
            Font: this uses the BODY font role (.type-body-lg → var(--font-body)),
            never the Syne display face. Hanken Grotesk offers no `cyrillic`
            Google Fonts subset (only latin/latin-ext/cyrillic-ext/vietnamese;
            cyrillic-ext excludes the Macedonian core block U+0400–045F), so the
            eventual Macedonian text paints via the system Cyrillic fallback
            already at the tail of --font-body (ui-sans-serif, system-ui,
            sans-serif) — the D-1.08-6 fallback branch, verified in dev with a
            temporary Macedonian test string. When the real slogan replaces this
            token, add lang="mk" to the line. */}
        <blockquote className="mt-12 max-w-prose border-l-2 border-border-control pl-5 md:mt-16 md:pl-6">
          <p className="type-body-lg text-text-muted">
            <PlaceholderToken>
              [PLACEHOLDER: winning-design slogan — exact Macedonian wording from Vladimir]
            </PlaceholderToken>
          </p>
        </blockquote>

        {/* Quiet catalog link — never hide what's for sale (brand rule). A Link
            styled with buttonVariants keeps true link semantics (D-1.03-1). */}
        <div className="mt-12 md:mt-16">
          <Link href="/products" className={buttonVariants()}>
            VIEW CATALOG
          </Link>
        </div>
      </section>
    </main>
  );
}
