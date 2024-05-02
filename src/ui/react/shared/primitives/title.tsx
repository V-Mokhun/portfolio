import { animated } from "@react-spring/web";
import clsx from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md";
  animate?: boolean;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    { tag = "h2", size = "md", animate, className, children, ...props },
    ref
  ) => {
    let Component = tag;

    if (animate) {
      // @ts-ignore
      Component = animated[tag];
    }

    return (
      <Component
        ref={ref}
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
  }
);
