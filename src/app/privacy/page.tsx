import type { Metadata } from "next";

import { PlaceholderToken } from "@/components/placeholder-token";

// Privacy — Phase 1.06 Task 2. Plain-language privacy page for a cash-on-delivery
// store, built only from VERIFIED facts. Covers what the order form collects and
// why, that the cart lives in the shopper's browser, no accounts / no online
// payment, no tracking cookies, and that order details are not sold. The operating
// entity is UNVERIFIED, so it renders as a placeholder token. Stays
// processor-agnostic and makes no analytics/cookie-vendor disclosure (D-1.06-2).

export const metadata: Metadata = {
  title: "Privacy — Trajanov",
  description:
    "What Trajanov collects when you order, why, and how your details are used.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">PRIVACY</h1>
        <p className="type-label mt-6 text-text-muted">Last updated 13 July 2026</p>

        <div className="mt-12 flex max-w-prose flex-col gap-10 md:mt-16">
          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Who runs this site</h2>
            <p className="type-body-md text-text-muted">
              This site is the online store for Trajanov, operated by{" "}
              <PlaceholderToken>
                [PLACEHOLDER: registered business name — from Vaki]
              </PlaceholderToken>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">What we collect</h2>
            <p className="type-body-md text-text-muted">
              When you place an order, the order form asks for your full name,
              phone number, delivery address, and city. That is all we collect.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Why we collect it</h2>
            <p className="type-body-md text-text-muted">
              We use these details only to contact you about your order and to
              arrange delivery.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Your cart</h2>
            <p className="type-body-md text-text-muted">
              Your cart is kept in your own browser. Nothing about it is sent to
              us until you place an order.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">No accounts, no online payment</h2>
            <p className="type-body-md text-text-muted">
              The site has no accounts and no passwords. Payment is cash on
              delivery, so no card or payment details are entered or handled on
              the site.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">Cookies</h2>
            <p className="type-body-md text-text-muted">
              This site does not use tracking cookies.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-text">We do not sell your details</h2>
            <p className="type-body-md text-text-muted">
              Your order details are used only to fulfil your order. We do not
              sell them or pass them on for marketing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
