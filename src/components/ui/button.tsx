import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Buttons follow brand.md ("Spacing & shape", "Accessibility") + the Phase 1.02
// handover §2: 0px corners, Label-caps type, a visible white focus ring, and a
// primary that is solid white and inverts to a white-outlined transparent chip
// on hover. Secondary is transparent with a 1px white border.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-none border whitespace-nowrap uppercase font-bold text-[11px] leading-4 tracking-[0.2em] transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-background hover:text-foreground hover:border-accent",
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
        default: "px-8 py-4",
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
