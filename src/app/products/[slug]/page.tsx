import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllProducts, getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/products/product-detail";

// Product page — Phase 1.04a Task 4. Loads the product by slug (unknown slug →
// shell-wrapped 404), sets per-product metadata, and renders the interactive
// detail. Known products are pre-rendered via generateStaticParams; with zero
// products committed that list is empty and every /products/<slug> 404s by
// design.

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — Trajanov`,
    description: product.description ?? `${product.name}.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="flex-1">
      <ProductDetail product={product} />
    </main>
  );
}
