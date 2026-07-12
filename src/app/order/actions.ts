"use server";

// Server action for the order form — Phase 1.05 Task 2. The client form calls
// this; it runs on the server and hands the assembled payload to sendOrder().
// Keeping submission server-side is the whole point (D-1.05-2): Phase 2.01 drops
// the real Resend call — which needs a server-only secret — straight into
// sendOrder() with no change to the client.
import { sendOrder, type OrderPayload, type OrderResult } from "@/lib/order";

export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  return sendOrder(payload);
}
