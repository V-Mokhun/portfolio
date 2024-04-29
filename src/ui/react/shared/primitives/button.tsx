import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-normal transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border border-border bg-background  hover:text-accent-foreground",
        ghost:
          "bg-transparent text-primary border border-primary hover:bg-primary-dark hover:text-primary-foreground hover:border-transparent",
        link: "text-primary hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm rounded-md",
        sm: "h-9 rounded-sm px-3 text-sm",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const linkVariants = cva("text-primary", {
  variants: {
    variant: {
      default:
        "relative after:absolute after:block after:h-0.5 after:w-full after:rounded-sm after:bg-primary after:bottom-0 after:left-0 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-left hover:after:scale-x-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, linkVariants };
