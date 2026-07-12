import Link from "next/link";
import Image from "next/image";

import type { Product } from "@/lib/products";
import { formatPrice, PRODUCT_IMAGE_CLASS } from "@/lib/format";

// Catalog card — Phase 1.04a Task 3. A 3:4 B&W image (brand.md §7), the product
// name (Body-MD 700) and price (Label-caps) on a raised surface strip. The whole
// card links to the product page. Sold-out shows a SOLD OUT tag AND a dimmed
// image — a non-colour cue (brand.md §7/§10). Server component (no state).

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ProductCard({ product }: { product: Product }) {
  const { slug, name, price, currency, images, inStock } = product;
  const primary = images[0];

  return (
    <Link href={`/products/${slug}`} className={`group block ${FOCUS_RING}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          sizes="(min-width: 768px) 33vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none ${PRODUCT_IMAGE_CLASS} ${
            inStock ? "" : "opacity-40"
          }`}
        />
        {!inStock && (
          <span className="type-label absolute left-3 top-3 bg-surface px-2 py-1 text-text">
            Sold out
          </span>
        )}
      </div>
      <div className="bg-surface px-3 py-4 md:px-4">
        <h3 className="type-body-md font-bold text-text">{name}</h3>
        <p className="type-label mt-1 text-text-muted">
          {formatPrice(price, currency)}
        </p>
      </div>
    </Link>
  );
}
