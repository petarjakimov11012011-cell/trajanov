import type { Metadata } from "next";

import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

// Catalog — Phase 1.04a Task 3. A responsive broadsheet grid (3 columns desktop,
// 2 mobile, 1px hairline gutters — brand.md §5) built from the product loader.
// With no real products committed, it shows the quiet "Products coming soon."
// empty state (no fake grid).

export const metadata: Metadata = {
  title: "Catalog — Trajanov",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-24 md:px-16 md:pt-24 md:pb-32">
        <h1 className="type-headline-lg text-text">CATALOG</h1>

        {products.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="type-body-md text-text-muted">Products coming soon.</p>
          </div>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-px bg-border md:mt-16 md:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
