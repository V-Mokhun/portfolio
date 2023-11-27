import { cn } from "@/lib";
import type { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
}

export const Title = ({
  tag = "h2",
  size = "md",
  className,
  children,
  ...props
}: TitleProps) => {
  const Component = tag;
  return (
    <Component
      className={cn(
        "font-bold mb-4 md:mb-6",
        size === "sm" && "text-xl sm:text-2xl md:text-3xl",
        size === "md" &&
          "text-4xl xl:text-5xl pb-3 md:pb-5 relative after:block after:h-0.5 after:bg-primary after:w-20 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
        size === "lg" && "text-4xl md:text-5xl xl:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
