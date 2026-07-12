"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";

import { useCart, cartSubtotal, type CartLine } from "@/lib/cart";
import { formatPrice, DEFAULT_CURRENCY, PRODUCT_IMAGE_CLASS } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";

// Cart page — Phase 1.05 Task 1. A client page (the cart lives in the browser).
// Reads and mutates the one cart store so the header badge stays in sync. Review
// lines, change quantity, remove, see the item subtotal (no delivery line —
// D-1.05-3), and proceed to the order form. Empty cart shows a quiet message and
// a link back to the catalog. Tokens only, 0px, monochrome, white focus rings.

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const CURRENCY = DEFAULT_CURRENCY;

function CartRow({ line }: { line: CartLine }) {
  const { setQty, removeLine } = useCart();
  const { slug, name, price, size, colour, qty } = line;
  const id = { slug, size, colour };
  const meta = [size, colour].filter(Boolean).join(" · ");

  return (
    <li className="flex gap-4 border-b border-border py-6 md:gap-6">
      {/* Thumbnail → product page. A cart line stores no image (the line-item
          shape is fixed — D-1.05-4) and product data is server-only, so this is
          the shared 3:4 treated slot, not an invented photo. */}
      <Link
        href={`/products/${slug}`}
        aria-label={name}
        className={`block w-20 shrink-0 md:w-24 ${FOCUS_RING}`}
      >
        <div
          className={`aspect-[3/4] bg-surface ${PRODUCT_IMAGE_CLASS}`}
          aria-hidden="true"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <h2 className="type-body-md font-bold">
              <Link
                href={`/products/${slug}`}
                className={`text-text transition-opacity hover:opacity-80 motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {name}
              </Link>
            </h2>
            {meta && <p className="type-label mt-2 text-text-muted">{meta}</p>}
            <p className="type-body-md mt-2 text-text-muted">
              {formatPrice(price, CURRENCY)}
            </p>
          </div>
          <p className="type-body-md shrink-0 font-bold whitespace-nowrap text-text">
            {formatPrice(price * qty, CURRENCY)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Quantity — decrease at qty 1 removes the line (D-1.05-3 wording is
              elsewhere; here it just never leaves a qty-0 row). */}
          <div
            role="group"
            aria-label={`Quantity, ${name}`}
            className="flex items-center border border-border-control"
          >
            <button
              type="button"
              aria-label={`Decrease quantity of ${name}`}
              onClick={() => setQty(id, qty - 1)}
              className={`inline-flex size-11 items-center justify-center text-text transition-colors hover:text-text-muted motion-reduce:transition-none ${FOCUS_RING}`}
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <span
              aria-live="polite"
              className="type-body-md min-w-8 text-center tabular-nums text-text"
            >
              {qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${name}`}
              onClick={() => setQty(id, qty + 1)}
              className={`inline-flex size-11 items-center justify-center text-text transition-colors hover:text-text-muted motion-reduce:transition-none ${FOCUS_RING}`}
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            aria-label={`Remove ${name} from cart`}
            onClick={() => removeLine(id)}
            className={`type-label inline-flex min-h-11 items-center text-text-muted underline decoration-1 underline-offset-4 transition-colors hover:text-text motion-reduce:transition-none ${FOCUS_RING}`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default function CartPage() {
  const { items, hydrated } = useCart();
  const subtotal = cartSubtotal(items);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">CART</h1>

        {!hydrated ? (
          // Before the cart hydrates from localStorage, reserve space rather than
          // flash the empty-cart message then swap in the lines.
          <div className="min-h-[40vh]" aria-hidden="true" />
        ) : items.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6 text-center">
            <p className="type-body-md text-text-muted">Your cart is empty.</p>
            <Link
              href="/products"
              className={`type-label inline-flex min-h-11 items-center text-text underline decoration-1 underline-offset-4 transition-opacity hover:opacity-80 motion-reduce:transition-none ${FOCUS_RING}`}
            >
              View the catalog
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[1fr_20rem] md:gap-16">
            <ul>
              {items.map((line) => (
                <CartRow
                  key={`${line.slug}::${line.size ?? ""}::${line.colour ?? ""}`}
                  line={line}
                />
              ))}
            </ul>

            {/* Summary */}
            <div className="md:sticky md:top-24 md:self-start">
              <div className="flex items-baseline justify-between border-b border-border pb-6">
                <span className="type-label text-text-muted">Subtotal</span>
                <span className="type-body-md font-bold text-text">
                  {formatPrice(subtotal, CURRENCY)}
                </span>
              </div>
              <p className="type-body-md mt-6 text-text-muted">
                Delivery is arranged after you order. You pay the courier in cash
                when it arrives.
              </p>
              <Link
                href="/order"
                className={`${buttonVariants()} mt-8 w-full`}
              >
                Proceed to order
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
