import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-display font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:opacity-90 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow hover:opacity-90",
        accent:
          "bg-accent text-accent-foreground shadow hover:opacity-90 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent hover:bg-muted text-foreground",
        ghost: "hover:bg-muted text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        hero: "bg-primary text-primary-foreground shadow-elevated text-base font-semibold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98]",
        heroAccent:
          "bg-accent text-accent-foreground shadow-elevated text-base font-semibold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6",
        xl: "h-14 rounded-xl px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
