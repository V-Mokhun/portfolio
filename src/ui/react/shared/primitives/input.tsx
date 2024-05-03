import * as React from "react";

import { cn } from "@/lib";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full text-foreground-light text-sm appearance-none bg-transparent border-border border-0 border-b-2 px-2 py-2.5 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-0 focus:border-primary placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive peer",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
