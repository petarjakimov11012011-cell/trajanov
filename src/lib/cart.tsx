"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// Client-side cart — Phase 1.04a Task 5 + Phase 1.05. React context + localStorage
// only, so it survives reloads (Plan §5) with no state-management dependency, no
// server, no accounts. 1.04a built the store + add-to-cart + the header count;
// 1.05 adds the mutations the cart page needs — change quantity, remove a line,
// clear the cart on a successful order. The line-item SHAPE is unchanged
// (`{ slug, name, price, size, colour, qty }`, D-1.05-4); only new methods are
// added, so every change still writes through the one store and the header badge
// stays in sync.
//
// localStorage is read through useSyncExternalStore: the server and the first
// client (hydration) render both see an empty cart, then the real cart loads
// after hydration — no hydration mismatch, and no setState inside an effect.

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  size: string | null;
  colour: string | null;
  qty: number;
};

const STORAGE_KEY = "trajanov.cart.v1";
const CART_EVENT = "trajanov:cart-change";

// A line is unique per product + size + colour: adding the same combination
// increments its quantity rather than creating a duplicate row. The same key
// identifies a line for quantity changes and removal.
export type CartLineId = Pick<CartLine, "slug" | "size" | "colour">;

function lineKey(line: CartLineId): string {
  return `${line.slug}::${line.size ?? ""}::${line.colour ?? ""}`;
}

// The order total is the item subtotal only — no delivery/shipping line
// (D-1.05-3; delivery cost is UNVERIFIED in facts.md and arranged off-site).
export function cartSubtotal(items: CartLine[]): number {
  return items.reduce((total, line) => total + line.price * line.qty, 0);
}

// ----- external store (localStorage) -----

const EMPTY: CartLine[] = [];

// Cache the parsed snapshot so getSnapshot returns a STABLE reference until the
// stored string actually changes (required by useSyncExternalStore).
let snapshot: { raw: string | null; items: CartLine[] } = {
  raw: null,
  items: EMPTY,
};

function readItems(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === snapshot.raw) return snapshot.items;

  let items: CartLine[] = EMPTY;
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed as CartLine[];
    } catch {
      items = EMPTY;
    }
  }
  snapshot = { raw, items };
  return items;
}

function writeItems(next: CartLine[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore write failures (private mode / quota); still notify so the UI updates.
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CART_EVENT, onChange); // same-tab writes
  window.addEventListener("storage", onChange); // other-tab writes
  return () => {
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// ----- context API -----

type CartContextValue = {
  items: CartLine[];
  count: number;
  hydrated: boolean;
  addItem: (line: Omit<CartLine, "qty">) => void;
  // Set a line's quantity; qty <= 0 removes the line (never leave a qty-0 row).
  setQty: (line: CartLineId, qty: number) => void;
  // Remove a line outright.
  removeLine: (line: CartLineId) => void;
  // Empty the cart (called after a successful order — Phase 1.05 Task 2).
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, readItems, () => EMPTY);
  // false during SSR + hydration, true once mounted on the client.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const addItem = useCallback((line: Omit<CartLine, "qty">) => {
    const current = readItems();
    const key = lineKey(line);
    const next = current.some((existing) => lineKey(existing) === key)
      ? current.map((existing) =>
          lineKey(existing) === key
            ? { ...existing, qty: existing.qty + 1 }
            : existing,
        )
      : [...current, { ...line, qty: 1 }];
    writeItems(next);
  }, []);

  const setQty = useCallback((line: CartLineId, qty: number) => {
    const current = readItems();
    const key = lineKey(line);
    const next =
      qty <= 0
        ? current.filter((existing) => lineKey(existing) !== key)
        : current.map((existing) =>
            lineKey(existing) === key ? { ...existing, qty } : existing,
          );
    writeItems(next);
  }, []);

  const removeLine = useCallback((line: CartLineId) => {
    const current = readItems();
    const key = lineKey(line);
    writeItems(current.filter((existing) => lineKey(existing) !== key));
  }, []);

  const clear = useCallback(() => {
    writeItems(EMPTY);
  }, []);

  const count = useMemo(
    () => items.reduce((total, line) => total + line.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, hydrated, addItem, setQty, removeLine, clear }),
    [items, count, hydrated, addItem, setQty, removeLine, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return context;
}
