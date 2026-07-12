import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

/*
  Product data format — Phase 1.04a (D-1.04a-2).

  One JSON file per product in `data/products/`. The FILENAME is the URL slug:
  `overcoat.json` → `/products/overcoat`. Files whose name starts with `_` are
  ignored by the loader (so `data/products/_example.json` documents the shape and
  is the template 1.04b/Vaki fill against, but never renders on the site).

  Every field below is validated with Zod at load time. A malformed file fails
  the build with a message naming the file and the offending field — friendly
  errors for a non-coding team (that is the whole point of D-1.04a-2).

  This module reads the filesystem (`node:fs`), so it is SERVER-ONLY: import it
  from server components (the catalog + product pages) only, never from a client
  component.

  Fields:
    name        string            — product name (the "wall of type" on the page)
    price       number ≥ 0        — amount in `currency`
    currency    string            — defaults to "MKD" (UNVERIFIED in facts.md)
    images      { src, alt }[]    — at least one; `src` under public/images/products/
    sizes       string[]          — e.g. ["S","M","L","XL"] or ["One size"]; may be empty
    colors      string[]          — colour NAMES, e.g. ["Black","Grey"]; may be empty
    inStock     boolean           — false → sold-out treatment
    description  string?          — optional
    featured    boolean = false   — optional; not consumed this phase (1.04b wires it)
*/

export const productImageSchema = z.object({
  src: z.string().min(1, "src is required"),
  alt: z.string().min(1, "alt is required"),
});

export const productSchema = z.object({
  name: z.string().min(1, "name is required"),
  price: z.number().nonnegative("price must be a non-negative number"),
  currency: z.string().min(1).default("MKD"),
  images: z.array(productImageSchema).min(1, "at least one image is required"),
  sizes: z.array(z.string().min(1)),
  colors: z.array(z.string().min(1)),
  inStock: z.boolean(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
});

export type ProductImage = z.infer<typeof productImageSchema>;
export type Product = z.infer<typeof productSchema> & { slug: string };

const PRODUCTS_DIR = join(process.cwd(), "data", "products");

function loadProducts(): Product[] {
  let entries: string[];
  try {
    entries = readdirSync(PRODUCTS_DIR);
  } catch {
    // The directory may be absent in some contexts; an empty catalog is valid.
    return [];
  }

  const products = entries
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.json$/, "");
      const raw = readFileSync(join(PRODUCTS_DIR, file), "utf8");

      let json: unknown;
      try {
        json = JSON.parse(raw);
      } catch (error) {
        throw new Error(
          `Invalid product file "data/products/${file}": not valid JSON — ${
            (error as Error).message
          }`,
        );
      }

      const result = productSchema.safeParse(json);
      if (!result.success) {
        const issue = result.error.issues[0];
        const field = issue.path.join(".") || "(root)";
        throw new Error(
          `Invalid product file "data/products/${file}": field "${field}" — ${issue.message}`,
        );
      }

      return { slug, ...result.data };
    });

  // Deterministic order regardless of the OS's readdir order (name A→Z).
  products.sort((a, b) => a.name.localeCompare(b.name));
  return products;
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getProductBySlug(slug: string): Product | null {
  return loadProducts().find((product) => product.slug === slug) ?? null;
}
