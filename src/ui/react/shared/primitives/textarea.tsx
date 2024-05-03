import * as React from "react";

import { cn } from "@/lib";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full text-foreground-light text-sm appearance-none bg-transparent border-border border-0 border-b-2 px-2 py-2.5 placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-primary aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50 peer",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
