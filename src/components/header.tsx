"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/lib/cart";

// Shared site header — brand.md §2/§4/§6/§10 + Phase 1.03 brief Task 3.
// Sticky, solid Ink background (no blur), a bottom hairline divider, the
// TRAJANOV wordmark, inline nav on desktop, and a focus-trapped panel behind the
// Menu icon on mobile. Nav is CATALOG/ABOUT/CONTACT (ABOUT added 1.08, D-1.08-5);
// cart is visual-only (links to /cart, no badge), nothing from the strip register.

const NAV_LINKS = [
  { label: "CATALOG", href: "/products" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

// Matches the base Button's ring recipe (white ring, 2px, offset) so every
// interactive element in the shell focuses identically. brand.md §10.
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The badge only reads a real count after the cart hydrates from localStorage
  // (see cart.tsx) — before that both server and client render 0, no badge.
  const showBadge = hydrated && count > 0;

  // Close and hand focus back to the toggle that opened the panel.
  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the panel is open: focus into it, trap Tab, close on ESC, lock scroll.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // If the viewport grows to desktop while the panel is open, dismiss it so the
  // scroll lock never lingers and the desktop nav takes over cleanly.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-5 md:grid md:h-20 md:grid-cols-[1fr_auto_1fr] md:px-16">
        {/* Wordmark → home */}
        <Link
          href="/"
          aria-label="Trajanov — home"
          className={`inline-flex min-h-11 items-center font-[family-name:var(--font-display)] font-bold text-[26px] leading-none tracking-[0.16em] text-text transition-opacity hover:opacity-80 motion-reduce:transition-none md:justify-self-start ${FOCUS_RING}`}
        >
          TRAJANOV
        </Link>

        {/* Desktop nav — centre column */}
        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-10 md:justify-self-center"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`type-nav inline-flex min-h-11 items-center uppercase text-text-muted transition-colors hover:text-text motion-reduce:transition-none ${FOCUS_RING}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right cluster — cart (always visible) + mobile menu toggle */}
        <div className="flex items-center gap-1 md:justify-self-end">
          <Link
            href="/cart"
            aria-label={
              showBadge
                ? `Cart, ${count} item${count === 1 ? "" : "s"}`
                : "Cart"
            }
            className={`relative inline-flex size-11 items-center justify-center text-text transition-colors hover:text-text-muted motion-reduce:transition-none ${FOCUS_RING}`}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {showBadge && (
              <span
                aria-hidden="true"
                className="absolute right-1 top-1 inline-flex min-w-4 items-center justify-center bg-accent px-1 py-px text-[10px] font-bold leading-none text-on-accent"
              >
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className={`inline-flex size-11 items-center justify-center text-text transition-colors hover:text-text-muted motion-reduce:transition-none md:hidden ${FOCUS_RING}`}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu panel — full-screen, --surface-2, focus-trapped, ESC/link-close */}
      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-surface-2 md:hidden"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <span className="font-[family-name:var(--font-display)] font-bold text-[26px] leading-none tracking-[0.16em] text-text">
              TRAJANOV
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className={`inline-flex size-11 items-center justify-center text-text transition-colors hover:text-text-muted motion-reduce:transition-none ${FOCUS_RING}`}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label="Primary"
            className="flex flex-col gap-2 px-5 py-8"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={`type-headline-lg inline-flex min-h-11 items-center text-text transition-opacity hover:opacity-80 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2 outline-none`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
