import { animated, useSpring, type UseSpringProps } from "@react-spring/web";
import type { ReactNode } from "react";

interface AnimateProps {
  config: UseSpringProps;
  children: ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Animate = ({
  config,
  children,
  className,
  tag = "div",
}: AnimateProps) => {
  const props = useSpring(config);

  const Component = animated[tag];

  return (
    <Component className={className} style={props}>
      {children}
    </Component>
  );
};
