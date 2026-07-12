// Presentation helpers for product UI. No Node/fs here — safe to import from
// both server components (catalog card) and client components (product detail).

// Price rendered as "{grouped number} {currency}" for the Label-caps price tag.
// Currency is UNVERIFIED (facts.md) and defaults to "MKD"; the thousands
// grouping is English number formatting only — launch is English-only (D-0.00-7).
export function formatPrice(price: number, currency: string): string {
  return `${new Intl.NumberFormat("en-US").format(price)} ${currency}`;
}

// brand.md §7 — the uniform grayscale / high-contrast treatment that makes a
// mixed set of real phone photos read as one catalog. brand.md pins no exact
// filter numbers; these are conservative defaults, to be re-tuned against Vaki's
// real photos in 1.04b.
export const PRODUCT_IMAGE_CLASS = "grayscale contrast-[1.05]";
