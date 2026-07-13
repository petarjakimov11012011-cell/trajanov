import type { Metadata } from "next";

import { PlaceholderToken } from "@/components/placeholder-token";

// Terms — Phase 1.06 Task 3. Plain-language terms for a cash-on-delivery store,
// built only from VERIFIED facts. States what the site is, how ordering works
// (order form → we contact you → you pay the courier in cash), that we ship
// mainly to Macedonia, that prices are as shown on each product (no currency
// asserted — D-1.06-3), a returns section carrying its placeholder token
// (D-1.06-4), the operating entity as a placeholder, and North Macedonia as the
// governing law. No delivery cost, no delivery time, no cross-border claim, no
// returns window as fact.

export const metadata: Metadata = {
  title: "Terms — Trajanov",
  description:
    "How ordering works at Trajanov: order by form, cash on delivery, shipping mainly within Macedonia.",
};

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function TermsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">TERMS</h1>
        <p className="type-label mt-6 text-text-muted">Last updated 13 July 2026</p>

        <div className="mt-12 flex max-w-prose flex-col gap-10 md:mt-16">
          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">About this site</h2>
            <p className="type-body-md text-text-muted">
              Trajanov is an online clothing store, operated by{" "}
              <PlaceholderToken>
                [PLACEHOLDER: registered business name — from Vaki]
              </PlaceholderToken>
              . You order through the form on this site and pay cash on delivery.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">How ordering works</h2>
            <ol className="type-body-md flex flex-col gap-2 text-text-muted">
              <li>
                1. You add items to your cart and submit the order form with your
                name, phone, delivery address, and city.
              </li>
              <li>
                2. We receive your order and message you to arrange delivery.
              </li>
              <li>
                3. You pay the courier in cash when your order arrives.
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Prices</h2>
            <p className="type-body-md text-text-muted">
              The price for each item is shown on its product page.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Delivery</h2>
            <p className="type-body-md text-text-muted">
              We ship mainly within Macedonia. We will confirm the details when
              we message you about your order.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Returns and exchanges</h2>
            <p className="type-body-md text-text-muted">
              <PlaceholderToken>
                [PLACEHOLDER: returns &amp; exchanges policy — from Vaki]
              </PlaceholderToken>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Governing law</h2>
            <p className="type-body-md text-text-muted">
              These terms are governed by the law of North Macedonia.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Questions</h2>
            <p className="type-body-md text-text-muted">
              Message us on{" "}
              <a
                href="https://www.instagram.com/trajanovv2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trajanov on Instagram (opens in a new tab)"
                className={`font-bold text-text underline decoration-1 underline-offset-4 transition-opacity hover:opacity-80 motion-reduce:transition-none ${FOCUS_RING}`}
              >
                Instagram
              </a>{" "}
              and we will help.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
