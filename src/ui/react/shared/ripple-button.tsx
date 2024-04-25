import { cn } from "@/lib";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { buttonVariants, type ButtonProps } from "./primitives";

interface RippleButtonProps extends Omit<ButtonProps, "asChild"> {
  tag?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  isDynamic?: boolean;
}

export const RippleButton = forwardRef<HTMLElement, RippleButtonProps>(
  (
    { className, children, size, tag = "button", isDynamic = false, ...props },
    ref
  ) => {
    const buttonRef = useRef<HTMLElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const Comp = tag;

    const onMouseOver = (e: React.MouseEvent) => {
      if (!spanRef.current || !buttonRef.current) return;

      spanRef.current.style.left =
        (isDynamic ? e.clientX : e.pageX) - buttonRef.current.offsetLeft + "px";
      spanRef.current.style.top =
        (isDynamic ? e.clientY : e.pageY) - buttonRef.current.offsetTop + "px";
    };

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: "ghost",
            size,
            className: cn(
              className,
              "relative overflow-hidden group duration-500 hover:bg-transparent"
            ),
          })
        )}
        ref={(node: any) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        // @ts-ignore
        onMouseOver={onMouseOver}
        // @ts-ignore
        onMouseOut={onMouseOver}
        {...props}
      >
        <span
          style={{
            transition:
              "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding-top 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className="absolute block z-0 w-0 h-0 rounded-full bg-primary-dark -translate-x-1/2 -translate-y-1/2 group-hover:w-[225%] group-hover:pt-[225%]"
          ref={spanRef}
        />
        <span className="relative z-[5] transition-colors duration-500 ">
          {children}
        </span>
      </Comp>
    );
  }
);
