"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// Client-side cart — Phase 1.04a Task 5. React context + localStorage only, so
// it survives reloads (Plan §5) with no state-management dependency, no server,
// no accounts. The cart PAGE and order flow are Phase 1.05; here the store
// exists and the header shows a live count so "add to cart" has visible proof.
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
// increments its quantity rather than creating a duplicate row.
function lineKey(line: Pick<CartLine, "slug" | "size" | "colour">): string {
  return `${line.slug}::${line.size ?? ""}::${line.colour ?? ""}`;
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

  const count = useMemo(
    () => items.reduce((total, line) => total + line.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, hydrated, addItem }),
    [items, count, hydrated, addItem],
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
