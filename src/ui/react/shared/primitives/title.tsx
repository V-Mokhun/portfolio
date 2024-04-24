import { cn } from "@/lib";
import clsx from "clsx";
import type { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md";
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
      className={clsx(
        "font-semibold text-title leading-tight",
        size === "sm" && "text-clamp-heading-sm",
        size === "md" &&
          "text-clamp-heading relative pl-4 after:block after:h-full after:bg-primary after:w-0.5 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
