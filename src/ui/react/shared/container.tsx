import { cn } from "@/lib";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => {
  return (
    <div className={cn("max-w-6xl px-3 md:px-5 mx-auto", className)} {...props}>
      {children}
    </div>
  );
};
