"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import type { Product } from "@/lib/products";
import { formatPrice, PRODUCT_IMAGE_CLASS } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { buttonVariants } from "@/components/ui/button";

// Product page detail — Phase 1.04a Task 4. The interactive half of the product
// page: a gallery whose thumbnails swap the main image (opacity only, brand.md
// §8), the name/price/description, the size + colour pickers, and add-to-cart.
// brand.md §10: every state carries a non-colour cue (selected = white border +
// bold), everything is keyboard-operable with a white focus ring, chips are 48px.

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Chip base — a 48px tap target (brand.md §5), body font, uppercase, tracked.
// Weight is NOT baked in here: it toggles medium→bold as the selected cue that
// brand.md §10 requires, so bold can actually carry meaning (the Label-caps role
// is always 700, which is why chips use their own weight ramp instead).
const CHIP_BASE =
  "inline-flex h-12 min-w-12 items-center justify-center border px-3 text-[13px] uppercase tracking-[0.08em] transition-colors motion-reduce:transition-none";

function chipClasses(selected: boolean): string {
  return [
    CHIP_BASE,
    FOCUS_RING,
    selected
      ? "border-accent font-bold text-text"
      : "border-border-control font-medium text-text-muted hover:text-text",
  ].join(" ");
}

type Feedback = { kind: "error" | "added"; text: string } | null;

export function ProductDetail({ product }: { product: Product }) {
  const { name, price, currency, images, sizes, colors, inStock, description } =
    product;
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [colour, setColour] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const needsSize = sizes.length > 0;
  const needsColour = colors.length > 0;

  const missingHint = useMemo(() => {
    const missing: string[] = [];
    if (needsSize && !size) missing.push("size");
    if (needsColour && !colour) missing.push("colour");
    if (missing.length === 0) return null;
    return `Pick a ${missing.join(" and ")} first.`;
  }, [needsSize, needsColour, size, colour]);

  function handleAddToCart() {
    if (missingHint) {
      setFeedback({ kind: "error", text: missingHint });
      return;
    }
    addItem({
      slug: product.slug,
      name,
      price,
      size: needsSize ? size : null,
      colour: needsColour ? colour : null,
    });
    setFeedback({ kind: "added", text: "Added to cart." });
  }

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-5 py-12 md:px-16 md:py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-surface">
            {images.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={index === activeImage ? image.alt : ""}
                aria-hidden={index !== activeImage}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`object-cover transition-opacity duration-200 motion-reduce:transition-none ${PRODUCT_IMAGE_CLASS} ${
                  index === activeImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {images.length > 1 && (
            <div
              role="group"
              aria-label="Product images"
              className="mt-3 flex flex-wrap gap-2"
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-pressed={index === activeImage}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-[3/4] w-16 overflow-hidden border ${FOCUS_RING} ${
                    index === activeImage
                      ? "border-accent"
                      : "border-border-control"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="64px"
                    className={`object-cover ${PRODUCT_IMAGE_CLASS}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail column */}
        <div className="md:sticky md:top-24 md:self-start">
          <h1 className="type-headline-lg text-text">{name}</h1>
          <p className="type-label mt-4 text-text-muted">
            {formatPrice(price, currency)}
          </p>

          {description && (
            <p className="type-body-lg mt-8 max-w-prose text-text-muted">
              {description}
            </p>
          )}

          {/* Size picker */}
          {needsSize && (
            <div className="mt-10">
              <p id="size-label" className="type-label text-text-muted">
                Size
              </p>
              <div
                role="group"
                aria-labelledby="size-label"
                className="mt-3 flex flex-wrap gap-2"
              >
                {sizes.map((value) => {
                  const selected = value === size;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setSize(value);
                        setFeedback(null);
                      }}
                      className={chipClasses(selected)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Colour picker — text chips of the colour NAME, not swatches
              (D-1.04a-3): the palette is strictly monochrome and colour must
              never be the only carrier of meaning. */}
          {needsColour && (
            <div className="mt-8">
              <p id="colour-label" className="type-label text-text-muted">
                Colour
              </p>
              <div
                role="group"
                aria-labelledby="colour-label"
                className="mt-3 flex flex-wrap gap-2"
              >
                {colors.map((value) => {
                  const selected = value === colour;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setColour(value);
                        setFeedback(null);
                      }}
                      className={chipClasses(selected)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Buy action */}
          <div className="mt-12">
            {inStock ? (
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`${buttonVariants()} w-full`}
                >
                  Add to cart
                </button>
                <p
                  role="status"
                  aria-live="polite"
                  className={`type-body-md mt-4 min-h-6 ${
                    feedback?.kind === "error" ? "text-text" : "text-text-muted"
                  }`}
                >
                  {feedback?.text ?? ""}
                </p>
              </>
            ) : (
              <div className="flex h-12 w-full items-center justify-center border border-border-control">
                <span className="type-body-md text-text">Sold out.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
