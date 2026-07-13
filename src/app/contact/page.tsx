import type { Metadata } from "next";

import { PlaceholderToken } from "@/components/placeholder-token";

// Contact — Phase 1.06 Task 1. A short, plain page inside the existing shell.
// Instagram is the one live, verified channel (facts.md); email and phone are
// UNVERIFIED, so they render as visible placeholder tokens (D-1.06-1). No street
// address, no owner name, no form.

export const metadata: Metadata = {
  title: "Contact — Trajanov",
  description:
    "Reach Trajanov on Instagram to ask about a piece or place an order.",
};

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">CONTACT</h1>
        <p className="type-body-lg mt-6 max-w-prose text-text-muted">
          Instagram is the quickest way to reach us. Email and phone are below.
        </p>

        <dl className="mt-12 flex max-w-prose flex-col gap-8 md:mt-16">
          <div className="flex flex-col gap-2">
            <dt className="type-label text-text-muted">Instagram</dt>
            <dd>
              <a
                href="https://www.instagram.com/trajanovv2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trajanov on Instagram (opens in a new tab)"
                className={`type-body-md inline-flex min-h-11 items-center font-bold text-text underline decoration-1 underline-offset-4 transition-opacity hover:opacity-80 motion-reduce:transition-none ${FOCUS_RING}`}
              >
                @trajanovv2026
              </a>
            </dd>
          </div>

          <div className="flex flex-col gap-2">
            <dt className="type-label text-text-muted">Email</dt>
            <dd>
              <PlaceholderToken>
                [PLACEHOLDER: public email — from Vaki]
              </PlaceholderToken>
            </dd>
          </div>

          <div className="flex flex-col gap-2">
            <dt className="type-label text-text-muted">Phone</dt>
            <dd>
              <PlaceholderToken>
                [PLACEHOLDER: phone — from Vaki]
              </PlaceholderToken>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
