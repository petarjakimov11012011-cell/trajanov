# brand.md — Trajanov

**The rule:** this file is the **only** source of design tokens and brand rules. The design handover reads from here; all code reads from here; nothing visual is hardcoded elsewhere. If a token needs to change, it changes here and nowhere else.

**Status: FILLED (Phase 1.02); refreshed (Phase 1.02c).** Tokens below are extracted from the approved Stitch design (`docs/design-handovers/` holds the screen renders + code). Two overlapping colour lists that Stitch shipped were reconciled into the one intentional set below, and every text/UI pair was contrast-checked for WCAG 2.2 AA. Voice & tone is a proposal awaiting Lazar's ratification (marked below). **The Phase 1.02b-2 refresh addendum reversed three original rules — logged as owner calls and folded in below:** the display face is now **Syne** (was Bebas Neue — D-1.02c-2); **buttons take a 12px radius and a dark fill** (was 0px + white — D-1.02b-6); and **the Home hero photograph stays in colour** (D-1.02b-7). Everything else stands.

---

## 1. Brand essence

Trajanov is a clothing brand sold direct to customers in Macedonia and the Balkans, order-by-message with cash on delivery. The look is editorial and stripped-back: a near-black page, off-white type, oversized display headlines, and full-bleed high-contrast photography — the clothes are framed like gallery pieces, and the interface stays out of the way.

**The trap to avoid for this brand:** the dark-minimal-fashion look is a deliberate, agreed choice — but "dark + one accent + huge type" is also a common AI-template reflex. Craft here has to come from the *system* (a disciplined type scale, real tonal depth, generous spacing, sharp corners everywhere except buttons), not from decoration. And because it is a real shop, products, prices, and the "add to cart" path must always be obvious — the aesthetic must never hide what's for sale or what it costs.

## 2. Signature motif

**The wall of type.** A very large, tightly-set display headline (Syne 700) that runs close to edge-to-edge, sitting over or beside full-bleed high-contrast imagery. It recurs as: the hero headline on Home, the section headers ("FEATURED"), and the product name on the product page. Everything else on the page is quiet so this one element carries the impact. ("Spend your boldness in one place.")

## 3. Colour palette

Strictly monochrome. Colour is **never the only carrier of meaning** — every state also uses text weight, a label, or a shape. The single "accent" is pure white, reserved for the primary action and active states so it reads as a subtle glow against the matte background.

> **Exception (D-1.02b-6):** buttons use `--surface-2` fill + a white label + a **required** `--border-control` outline, **not** a white fill. White remains the sole functional accent for the **focus ring** and selected/active states. Button hover shades: fill `--btn-hover-bg` `#2A2A2A`, outline `--btn-hover-border` `#B7BABB` (see §12) — the only two values added for the refresh; the resting palette is unchanged.

| Name | Hex | Token | Role |
|---|---|---|---|
| Ink | `#0A0A0A` | `--bg` | Page background — the base "ink" |
| Surface | `#141414` | `--surface` | Raised blocks: card meta strips, footer, panels (tonal lift, **no shadow**) |
| Surface high | `#201F1F` | `--surface-2` | Deeper containers: menus, expanded accordions |
| Hairline | `#262626` | `--border` | Structural / divider hairlines — **decorative only** |
| Control outline | `#8E9192` | `--border-control` | Borders of interactive controls in their resting/unselected state (meets 3:1) |
| Text | `#F5F5F5` | `--text` | Primary text and icons |
| Text muted | `#C6C6C7` | `--text-muted` | Secondary / meta text, captions |
| Accent (white) | `#FFFFFF` | `--accent` | **Primary action color** — buttons, active/selected borders, focus ring |
| On-accent | `#0A0A0A` | `--on-accent` | Text on white buttons |
| Error | `#FFB4AB` | `--error` | Error text (the order-send-failure message) |
| Error surface | `#93000A` | `--error-surface` | Error background block |

**Primary action color = `#FFFFFF` (white)** on `#0A0A0A` text.

Contrast (checked): primary text 18.2:1, muted text 11.6:1, white-button label 19.8:1, error text on its block 5.5:1 — all pass AA. Note: `#262626` hairlines are ~1.3:1, which is fine for a *decorative divider* but **must not** be the only border on an interactive control (see §10).

## 4. Typography

Extreme scale contrast: a bold geometric display face against a clean grotesque body face. Two families only. *(Display face changed Bebas Neue → **Syne** at Phase 1.02c — D-1.02c-2; the Display XL sizes were retuned for the split hero at the same time.)*

| Role | Family | Weight | Size / line-height | Tracking | Used for |
|---|---|---|---|---|---|
| Display XL | Syne | 700 | 72 / 72 px | −0.02em | Hero wordmark (desktop) |
| Display XL (mobile) | Syne | 700 | 50 / 50 px | −0.02em | Hero wordmark (phone) |
| Headline LG | Syne | 700 | 48 / 48 px | +0.02em | Section headers, product name |
| Body LG | Hanken Grotesk | 400 | 18 / 28 px | +0.01em | Intro lines, descriptions |
| Body MD | Hanken Grotesk | 400 / **700** | 16 / 24 px | +0.01em | Default body; **700** for product names |
| Label caps | Hanken Grotesk | 700 | 11 / 16 px | +0.2em, UPPERCASE | Prices, categories, meta tags |
| Nav link | Hanken Grotesk | 500 | 14 / 20 px | +0.05em | Header navigation |

- **Families:** Syne (display, set at weight **700**) and Hanken Grotesk (body). Fallback stacks: Syne → `var(--font-syne), ui-sans-serif, system-ui, sans-serif`; Hanken Grotesk → `var(--font-hanken), ui-sans-serif, system-ui, sans-serif`. Both load via `next/font/google`.
- Hierarchy comes from **weight + colour + scale**, not from inventing many styles — the roles above are the whole set.
- On mobile, display sizes scale down aggressively (see the mobile row) to prevent horizontal overflow while keeping vertical impact.
- **Script coverage (future-phase flag):** launch is English only. Before the named Macedonian phase, Syne's and Hanken Grotesk's **Cyrillic** coverage must be verified; if a face lacks Cyrillic, a Cyrillic substitute is chosen at that phase. (Ties to D-0.00-7.)

## 5. Spacing & shape

- **Base unit:** 4px. Step scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Editorial section gap:** 128px between major sections on desktop; keep generous on mobile (≈64–80px) — the breathing room is part of the look.
- **Page margins:** 64px desktop · 20px mobile. **Container max:** 1440px.
- **Grid:** 12-column desktop with 1px hairline gutters (the "broadsheet" look); collapses to 2-column or 1-column on mobile.
- **Radius: `0px` everywhere except buttons.** Sharp 90° corners on inputs, size/colour chips, images, tags, and all layout. **Exception (D-1.02b-6): buttons only take `--radius-button: 12px`** — a soft rounded rectangle, not a pill. (Enforce elsewhere: one Stitch screen drifted to rounded corners; on anything that is not a button, that is still a bug, not the spec.)
- **Tap targets:** ≥44px on touch; size chips 48×48px.

## 6. Iconography

- **Set:** Lucide (per our stack — `lucide-react`), line style, matched to the minimal weight of the design. (Stitch mocked with Material Symbols; substitute Lucide equivalents: search→`Search`, bag→`ShoppingBag`, menu→`Menu`, account→`User`.)
- Illustrative/custom marks: purpose-built SVG only.
- **No emoji as icons**, anywhere.

## 7. Imagery

- Full-bleed, high-contrast, **primarily black-and-white / desaturated** photography — the main visual texture.
  - **Exception (D-1.02b-7):** the **Home hero photograph is kept in colour** (or a light, minimal grade) to preserve its red graphic prints, which echo the brand. **Hero-only — product-card imagery stays black-and-white** (§7 default) for catalog cohesion. A scrim is added only where light type overlaps the image; the Home split keeps type **off** the image, so no scrim is used.
- **Uniform treatment so mixed-source photos cohere:** apply a consistent grayscale/contrast filter and a fixed aspect ratio for product cards (**3:4 portrait**). This is deliberate — Vaki's real product photos may be phone shots of varying quality, and the uniform B&W treatment is what makes a mixed set look like one catalog. Confirm what the real photos look like early (parallel track) so the treatment is tuned to them.
- Text over an image uses a subtle gradient scrim only where needed for contrast; otherwise place text on a solid block.

## 8. Motion

Minimal — **Lighthouse 95+ outranks any animation.**

- Product image on hover (desktop only): subtle scale to 1.05, or swap to an alternate photo. ~700ms ease.
- Page/route transitions: quick opacity, ~200ms.
- **Never:** parallax, cursor-followers, or every-section-fades-in-on-scroll.
- **Respect `prefers-reduced-motion`:** drop scale/slide, keep opacity only.

## 9. Voice & tone  *(PROPOSAL — Lazar to ratify)*

Plain, confident, sparse — gallery-label brevity. Say what the thing is; don't sell a feeling. **Banned:** fluff and hype ("elevate your style", "iconoclast", "ethereal precision"), and any claim not verified in `facts.md` (no "finest European mills", no "worldwide shipping", no "14-day returns"). UI meta (prices, categories, buttons) is UPPERCASE; descriptions are sentence case.

Worked examples (compliant — these replace Stitch's invented luxury copy):

- **Product description** — *not* "Constructed from high-density technical wool… brutalist aesthetic…" → **"Wool overcoat with a straight, structured cut and a concealed button placket. Fully lined."** (material + cut + one real detail; no adjective-stacking.)
- **Sold-out** → **"Sold out."**
- **Order confirmation** → **"Thanks. We'll message you to arrange delivery. You pay the courier in cash when it arrives."** (states cash-on-delivery plainly.)
- **Order-send failure** → **"That didn't send. Please try again, or message us on Instagram and we'll take your order there."** (no order silently lost.)

## 10. Accessibility (non-negotiable — WCAG 2.2 AA)

- **Contrast:** body text ≥4.5:1 (primary 18.2:1, muted 11.6:1 — pass); large display ≥3:1 (easily met).
- **Interactive borders:** an unselected-but-selectable control (size chip, colour swatch, input) uses `--border-control` `#8E9192` (≥3:1); **not** the `#262626` hairline (which fails at 1.3:1). Selected state = white border **plus bold text** (a non-colour cue) — never colour alone.
- **Focus:** a visible white `:focus-visible` ring, ≥2px, offset, on every interactive element. Never remove an outline without replacing it.
- **Tap targets:** ≥44px on touch (size chips 48×48).
- **Placeholders:** never the only label — every field has a visible label; placeholder text is a hint only.
- **Motion:** respect `prefers-reduced-motion`.

## 11. Avoid vs. achieve (Trajanov-specific)

| Avoid | Achieve |
|---|---|
| Hero that hides the product behind a mood | Product/photography is the hero; type frames it |
| Colour anywhere but the white accent | Strictly monochrome; white = the single glow |
| Rounded corners "to soften it" | 0px everywhere except buttons, which take `--radius-button: 12px` (D-1.02b-6) — sharpness *is* the brand everywhere else |
| Shadows/glass for depth | Depth from tonal steps (`#0A0A0A`→`#141414`) + 1px borders |
| Hype copy ("elevate", "iconoclast") | Plain gallery-label statements of fact |
| Unverified trust badges (worldwide shipping, returns) | Only real, `facts.md`-verified shipping/payment terms |
| Cramming the grid | Generous 128px editorial gaps; let it breathe |

## 12. Design tokens — quick reference (copy into the theme)

```css
:root{
  /* colour */
  --bg:#0A0A0A; --surface:#141414; --surface-2:#201F1F;
  --border:#262626; --border-control:#8E9192;
  --text:#F5F5F5; --text-muted:#C6C6C7;
  --accent:#FFFFFF; --on-accent:#0A0A0A;
  --error:#FFB4AB; --error-surface:#93000A;
  --btn-hover-bg:#2A2A2A; --btn-hover-border:#B7BABB;  /* button hover (D-1.02b-6) */
  /* type — Syne (display, wt 700) + Hanken (body), loaded via next/font */
  --font-display:var(--font-syne), ui-sans-serif, system-ui, sans-serif;
  --font-body:var(--font-hanken), ui-sans-serif, system-ui, sans-serif;
  /* spacing (base 4px) */
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-6:24px;
  --sp-8:32px; --sp-12:48px; --sp-16:64px; --sp-24:96px; --sp-32:128px;
  --margin-desktop:64px; --margin-mobile:20px; --container-max:1440px;
  /* shape — 0px everywhere; buttons ONLY take --radius-button (D-1.02b-6) */
  --radius:0px; --radius-button:12px; --tap-min:44px;
  /* buttons — padding (default 14/24; Home CTA 20 horizontal) */
  --btn-pad-y:14px; --btn-pad-x:24px; --btn-cta-pad-x:20px;
}
```

## Logo & brand assets  *(owner-level — Lazar to confirm)*

Current logo treatment is the wordmark **TRAJANOV** set in Syne 700 with light letter-spacing (matches the design). **Open question:** does Vaki have an actual logo file? If not, this wordmark *is* the logo, and a clean SVG wordmark can be produced. Files land in `public/images/brand/` when supplied.

- Wordmark: TRAJANOV — Syne 700, letter-spaced (placeholder until confirmed / SVG produced)
