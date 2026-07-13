import Link from "next/link";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroPhoto from "../../public/images/home/hero.jpg";

// Home — the wall-of-type hero, refreshed to the split layout from the Phase
// 1.02b-2 addendum (D-1.02b-7): TRAJANOV (Syne) + eyebrow + intro + CTA on the
// left, the owner's campaign photograph on the right, shown WHOLE and in COLOUR
// (a documented brand.md §7 hero-only exception — the red graphic prints echo
// the brand and must stay visible; product cards stay black-and-white). On
// mobile it stacks with the type block first. The type sits off the image, so
// no scrim is needed. Then a generous editorial gap into the FEATURED section,
// which stays a heading + quiet empty state until real featured products
// arrive in 1.04b. Strictly monochrome UI, sharp corners (buttons excepted).
export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero — split: type column beside the full campaign photo */}
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-10 pb-16 md:px-16 md:pt-16 md:pb-24">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,540px)] md:gap-14">
          {/* Type column (first in the DOM → shows first when stacked on mobile) */}
          <div>
            <p className="type-label text-text-muted">EST. 2026 · STREETWEAR</p>
            <h1 className="type-display-xl mt-5 text-text">TRAJANOV</h1>
            <p className="type-body-lg mt-6 max-w-md text-text-muted">
              Wear-tested graphics, printed in small runs. Cash on delivery,
              mainly across Macedonia.
            </p>
            <div className="mt-10">
              {/* Reuse the Button's exact styling on a Link so the catalog CTA
                  keeps true link semantics (navigation), not role="button"
                  (D-1.03-1). The Home CTA uses the tighter --btn-cta-pad-x. */}
              <Link
                href="/products"
                className={cn(buttonVariants(), "px-[var(--btn-cta-pad-x)]")}
              >
                VIEW CATALOG
              </Link>
            </div>
          </div>

          {/* Photo column — whole image, natural aspect, kept in colour (§7 hero
              exception). priority: it's the LCP element above the fold. */}
          <div>
            <Image
              src={heroPhoto}
              alt="Two models in the Trajanov collection — white oversized tees with red line-art graphic prints — at a vintage bar hung with framed music posters."
              sizes="(min-width: 768px) 540px, 100vw"
              priority
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Editorial gap (mt), then the FEATURED section */}
      <section className="mx-auto mt-16 max-w-[var(--container-max)] px-5 pb-24 md:mt-24 md:px-16 md:pb-32">
        <h2 className="type-headline-lg text-text">FEATURED</h2>
        <p className="type-body-md mt-4 text-text-muted">Catalog coming soon.</p>
      </section>
    </main>
  );
}
