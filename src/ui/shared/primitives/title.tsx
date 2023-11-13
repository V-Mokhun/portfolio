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
        size === "sm" && "text-3xl",
        size === "md" && "text-4xl",
        size === "lg" && "text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
