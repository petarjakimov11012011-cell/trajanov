import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Buttons follow brand.md ("Spacing & shape", "Accessibility") + the Phase
// 1.02b-2 refresh addendum (D-1.02b-6): a soft 12px radius (--radius-button;
// buttons ONLY — everything else keeps 0px), Label-caps type, and a visible
// white focus ring. The default (primary) is now a DARK button — --surface-2
// fill, white label, and a REQUIRED 1px --border-control outline so the control
// clears WCAG 2.2 AA non-text contrast on the near-black page (a fill-only dark
// button is ~1.5:1 and invisible). Hover lifts the fill + brightens the outline.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-button)] border whitespace-nowrap uppercase font-bold text-[11px] leading-4 tracking-[0.2em] transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-border-control bg-surface-2 text-text hover:bg-[var(--btn-hover-bg)] hover:border-[var(--btn-hover-border)]",
        secondary:
          "border-accent bg-transparent text-foreground hover:bg-accent hover:text-on-accent",
        outline:
          "border-border-control bg-transparent text-foreground hover:border-accent",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-surface",
        destructive:
          "border-transparent bg-error-surface text-error hover:opacity-90",
        link: "border-transparent bg-transparent text-foreground normal-case tracking-normal underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[var(--btn-pad-x)] py-[var(--btn-pad-y)]",
        sm: "px-6 py-3",
        lg: "px-10 py-5",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
