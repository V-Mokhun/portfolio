import {
  useInView,
  type IntersectionArgs,
  type UseSpringProps,
} from "@react-spring/web";
import { Title } from "../primitives";
import type { HTMLAttributes, ReactNode } from "react";

interface AnimatedTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  config?: UseSpringProps;
  intersectionArgs?: IntersectionArgs;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

const defaultConfig = {
  from: {
    opacity: 0,
    transform: "translateY(40px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
  delay: 300,
  config: {
    duration: 300,
  },
};
const defaultIntersectionArgs = { once: true, rootMargin: "-50px 0px" };

export const AnimatedTitle = ({
  config = defaultConfig,
  intersectionArgs = defaultIntersectionArgs,
  tag = "h2",
  children,
  ...restProps
}: AnimatedTitleProps) => {
  const [ref, springs] = useInView(() => config, intersectionArgs);

  return (
    <Title tag={tag} animate ref={ref} style={springs} {...restProps}>
      {children}
    </Title>
  );
};
