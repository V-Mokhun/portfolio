import {
  useInView,
  type IntersectionArgs,
  type UseSpringProps,
} from "@react-spring/web";
import { Title } from "../primitives";
import type { HTMLAttributes, ReactNode } from "react";
import { defaultAnimationConfig } from "@/consts";

interface AnimatedTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  config?: UseSpringProps;
  intersectionArgs?: IntersectionArgs;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

const defaultIntersectionArgs = { once: true, rootMargin: "-50px 0px" };

export const AnimatedTitle = ({
  config = defaultAnimationConfig,
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
