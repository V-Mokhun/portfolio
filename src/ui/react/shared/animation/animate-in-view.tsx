import {
  animated,
  useInView,
  type IntersectionArgs,
  type UseSpringProps,
} from "@react-spring/web";
import type { ReactNode } from "react";

interface AnimateInViewProps {
  config?: UseSpringProps;
  intersectionArgs?: IntersectionArgs;
  children: ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
}

const defaultConfig = {
  from: {
    opacity: 0,
    y: 100,
  },
  to: {
    opacity: 1,
    y: 0,
  },
  delay: 300,
  config: {
    duration: 500,
  },
};
const defaultIntersectionArgs = { once: true, rootMargin: "-20% 0%" };

export const AnimateInView = ({
  config = defaultConfig,
  intersectionArgs = defaultIntersectionArgs,
  children,
  className,
  tag = "div",
  id,
}: AnimateInViewProps) => {
  const [ref, springs] = useInView(() => config, intersectionArgs);

  const Component = animated[tag];

  return (
    // @ts-ignore
    <Component ref={ref} className={className} id={id} style={springs}>
      {children}
    </Component>
  );
};
