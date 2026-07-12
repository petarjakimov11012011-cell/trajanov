import type { Metadata } from "next";
import Link from "next/link";

// Order confirmation — Phase 1.05 Task 3. Reached only after a successful submit
// (the cart is already cleared there). Quiet and on-brand: a Bebas headline plus
// the exact confirmation copy from brand.md §9, which states cash-on-delivery
// plainly, and a link back to the catalog. Static server component.

export const metadata: Metadata = {
  title: "Thank you — Trajanov",
};

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function OrderThanksPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-24 pb-24 md:px-16 md:pt-32 md:pb-32">
        <h1 className="type-headline-lg text-text">THANK YOU</h1>
        <p className="type-body-lg mt-6 max-w-prose text-text-muted">
          Thanks. We&apos;ll message you to arrange delivery. You pay the courier
          in cash when it arrives.
        </p>
        <div className="mt-10">
          <Link
            href="/products"
            className={`type-label inline-flex min-h-11 items-center text-text underline decoration-1 underline-offset-4 transition-opacity hover:opacity-80 motion-reduce:transition-none ${FOCUS_RING}`}
          >
            View the catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
