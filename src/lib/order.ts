// Order submission — Phase 1.05 Task 4. A single server-side function the order
// form hands its assembled payload to. THIS PHASE IT IS A STUB (D-1.05-2): it
// makes NO network call and uses NO secret, so the whole order flow — including
// the send-failure path — can be tested without touching Vaki's real inbox.
// Phase 2.01 replaces the stub body with the real Resend send (a server-only
// secret drops in at the marked spot, with no change to the client form).
//
// SERVER-ONLY: this module reads a server-side env flag (ORDER_STUB_FAIL) and is
// only ever reached through the `submitOrder` server action (app/order/actions.ts).
// Import only its TYPES into client code (`import type { … }`).

// The four customer fields (Macedonia delivery only — city is free text, no
// country field, D-1.05-1).
export type OrderCustomer = {
  name: string;
  phone: string;
  address: string;
  city: string;
};

// One ordered line: the full cart line minus the internal qty accounting shape.
export type OrderLine = {
  slug: string;
  name: string;
  size: string | null;
  colour: string | null;
  qty: number;
  price: number;
};

// The complete order: the customer's four fields plus the entire cart (every
// line's name/size/colour/qty/price) and the item subtotal (no delivery line —
// D-1.05-3). This is exactly what Phase 2.01 will email to Vaki.
export type OrderPayload = {
  customer: OrderCustomer;
  lines: OrderLine[];
  subtotal: number;
  currency: string;
};

export type OrderResult = { ok: true } | { ok: false };

// Defensive server-side validation — the client validates for UX, but the
// server never trusts it: an empty customer field, no lines, or a phone with no
// digit is rejected so a malformed order can't be "sent".
function isValidPayload(payload: OrderPayload): boolean {
  const { customer, lines } = payload;
  if (!customer) return false;
  const filled = (value: string) =>
    typeof value === "string" && value.trim().length > 0;
  if (!filled(customer.name) || !filled(customer.address) || !filled(customer.city))
    return false;
  if (!filled(customer.phone) || !/\d/.test(customer.phone)) return false;
  if (!Array.isArray(lines) || lines.length === 0) return false;
  return true;
}

export async function sendOrder(payload: OrderPayload): Promise<OrderResult> {
  // A malformed order is never accepted (and never "sent").
  if (!isValidPayload(payload)) return { ok: false };

  // Inspect the assembled payload during local development so the order contents
  // can be verified (Phase 1.05 DoD). Dev-only: never log customer PII in
  // production. Phase 2.01's real send replaces this stub body entirely.
  if (process.env.NODE_ENV !== "production") {
    console.log(
      "[sendOrder] stub received order:\n" + JSON.stringify(payload, null, 2),
    );
  }

  // Deterministic failure switch (server-side only): set ORDER_STUB_FAIL=true to
  // force the send-failure path for testing/screenshots. Unset (or anything else)
  // = success. Not exposed to the client — it has no NEXT_PUBLIC_ prefix, so it
  // is undefined in the browser bundle.
  if (process.env.ORDER_STUB_FAIL === "true") return { ok: false };

  // Phase 2.01: replace stub body with the real Resend send.
  // (No network call, no secret this phase — D-1.05-2. The order is accepted
  //  locally so the flow is fully testable; the real email lands in 2.01.)
  return { ok: true };
}
