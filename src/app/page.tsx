import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

// Home — Phase 1.03 brief Task 6. The wall-of-type hero (brand.md §2), one
// Body-LG intro line, and the primary catalog CTA; then a generous editorial
// gap into the FEATURED section, which ships as a heading + a quiet empty state
// until real featured products arrive in 1.04 (baked-in decision 2). Strictly
// monochrome, 0px radius, left-aligned broadsheet — no product content invented.
export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero — the wall of type */}
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 md:px-16 md:pt-24">
        <h1 className="type-display-xl text-text">TRAJANOV</h1>
        <p className="type-body-lg mt-6 max-w-xl text-text-muted">
          Clothing, sold direct. Cash on delivery.
        </p>
        <div className="mt-10">
          {/* Reuse the 1.02 Button's exact styling on a Link so the catalog CTA
              keeps true link semantics (navigation), not role="button" (D-1.03-1). */}
          <Link href="/products" className={buttonVariants()}>
            VIEW CATALOG
          </Link>
        </div>
      </section>

      {/* Editorial gap (mt), then the FEATURED section */}
      <section className="mx-auto mt-16 max-w-[var(--container-max)] px-5 pb-24 md:mt-32 md:px-16 md:pb-32">
        <h2 className="type-headline-lg text-text">FEATURED</h2>
        <p className="type-body-md mt-4 text-text-muted">Catalog coming soon.</p>
      </section>
    </main>
  );
}
