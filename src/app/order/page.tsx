"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart, cartSubtotal } from "@/lib/cart";
import { formatPrice, DEFAULT_CURRENCY } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { submitOrder } from "./actions";
import type { OrderPayload } from "@/lib/order";

// Order form — Phase 1.05 Task 2. Macedonia delivery only: name, phone, address,
// city; city is free text, no country field (D-1.05-1). Cash on delivery stated
// plainly (verified fact). Submission is server-side (the submitOrder action →
// sendOrder), so Phase 2.01 drops the real Resend send in with no client change.
// Success clears the cart and lands on /order/thanks; failure keeps the cart and
// shows the exact error message with the verified Instagram link. Tokens only,
// error state never colour-only (visible per-field text + aria-invalid).

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const INSTAGRAM_URL = "https://www.instagram.com/trajanovv2026";

type FieldName = "name" | "phone" | "address" | "city";

const FIELDS: {
  name: FieldName;
  label: string;
  type: string;
  autoComplete: string;
  inputMode?: "tel";
}[] = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", inputMode: "tel" },
  { name: "address", label: "Address", type: "text", autoComplete: "street-address" },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
];

const EMPTY_VALUES: Record<FieldName, string> = {
  name: "",
  phone: "",
  address: "",
  city: "",
};

function validate(values: Record<FieldName, string>): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  else if (!/\d/.test(values.phone)) errors.phone = "Enter a phone number with digits.";
  if (!values.address.trim()) errors.address = "Enter your address.";
  if (!values.city.trim()) errors.city = "Enter your city.";
  return errors;
}

export default function OrderPage() {
  const router = useRouter();
  const { items, hydrated, clear } = useCart();
  const subtotal = cartSubtotal(items);

  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const inputs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>({});
  // A successful submit clears the cart, which would otherwise trip the
  // empty-cart redirect below and bounce us to /cart instead of /order/thanks.
  // This flag (a ref, set synchronously before clear) suppresses that redirect
  // for the intended navigation to the confirmation page.
  const placed = useRef(false);

  // No order form for an empty cart — send them back to /cart. Wait for
  // hydration first, or the SSR/first-paint empty cart would bounce a real one;
  // and never redirect after a successful order (placed.current) — that goes to
  // the confirmation page.
  const isEmpty = hydrated && items.length === 0;
  useEffect(() => {
    if (isEmpty && !placed.current) router.replace("/cart");
  }, [isEmpty, router]);

  function update(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const firstInvalid = FIELDS.find((field) => found[field.name]);
      if (firstInvalid) inputs.current[firstInvalid.name]?.focus();
      return;
    }

    setErrors({});
    setSendFailed(false);
    setSubmitting(true);

    // Assemble the full payload: the four customer fields + the complete cart
    // (every line's name/size/colour/qty/price) + the subtotal (Task 2).
    const payload: OrderPayload = {
      customer: {
        name: values.name.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
      },
      lines: items.map((line) => ({
        slug: line.slug,
        name: line.name,
        size: line.size,
        colour: line.colour,
        qty: line.qty,
        price: line.price,
      })),
      subtotal,
      currency: DEFAULT_CURRENCY,
    };

    try {
      const result = await submitOrder(payload);
      if (result.ok) {
        // Only clear + confirm AFTER the send is accepted (an order is never
        // silently lost). Set `placed` first so clearing the cart doesn't fire
        // the empty-cart redirect. Keep the button disabled through navigation.
        placed.current = true;
        clear();
        router.push("/order/thanks");
        return;
      }
      setSendFailed(true);
    } catch {
      setSendFailed(true);
    }
    setSubmitting(false);
  }

  // While hydrating (or about to redirect an empty cart) reserve space quietly.
  if (!hydrated || isEmpty) {
    return (
      <main className="flex-1">
        <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
          <h1 className="type-headline-lg text-text">ORDER</h1>
          <div className="min-h-[40vh]" aria-hidden="true" />
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">ORDER</h1>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[1fr_20rem] md:gap-16">
          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="order-2 md:order-1">
            <p className="type-body-md max-w-prose text-text-muted">
              Cash on delivery — you pay the courier when your order arrives. No
              payment is taken online.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {FIELDS.map((field) => {
                const error = errors[field.name];
                const errorId = `${field.name}-error`;
                return (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="type-label text-text-muted"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      inputMode={field.inputMode}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      onChange={(e) => update(field.name, e.target.value)}
                      aria-required="true"
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      ref={(el) => {
                        inputs.current[field.name] = el;
                      }}
                      className={`type-body-md h-12 w-full border bg-transparent px-4 text-text outline-none transition-colors motion-reduce:transition-none ${FOCUS_RING} ${
                        error
                          ? "border-error"
                          : "border-border-control focus:border-accent"
                      }`}
                    />
                    {error && (
                      <p id={errorId} className="type-body-md text-error">
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {sendFailed && (
              <div
                role="alert"
                className="mt-8 bg-error-surface px-4 py-4 text-error"
              >
                <p className="type-body-md">
                  That didn&apos;t send. Please try again, or message us on{" "}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-bold underline decoration-1 underline-offset-4 ${FOCUS_RING}`}
                  >
                    Instagram
                  </a>{" "}
                  and we&apos;ll take your order there.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`${buttonVariants()} mt-8 w-full`}
            >
              {submitting ? "Sending…" : "Place order"}
            </button>
          </form>

          {/* Order summary */}
          <aside className="order-1 md:order-2 md:sticky md:top-24 md:self-start">
            <h2 className="type-label text-text-muted">Your order</h2>
            <ul className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
              {items.map((line) => {
                const meta = [line.size, line.colour].filter(Boolean).join(" · ");
                return (
                  <li
                    key={`${line.slug}::${line.size ?? ""}::${line.colour ?? ""}`}
                    className="flex justify-between gap-4"
                  >
                    <span className="type-body-md min-w-0 text-text-muted">
                      {line.name}
                      {meta ? ` — ${meta}` : ""}
                      {line.qty > 1 ? ` ×${line.qty}` : ""}
                    </span>
                    <span className="type-body-md shrink-0 whitespace-nowrap text-text">
                      {formatPrice(line.price * line.qty, DEFAULT_CURRENCY)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="type-label text-text-muted">Subtotal</span>
              <span className="type-body-md font-bold text-text">
                {formatPrice(subtotal, DEFAULT_CURRENCY)}
              </span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
