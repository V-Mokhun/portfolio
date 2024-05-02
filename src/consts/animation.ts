import type { UseSpringProps } from "@react-spring/web";

export const defaultAnimationConfig: UseSpringProps = {
  from: {
    opacity: 0,
    transform: "translateY(30px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
  delay: 300,
  config: {
    duration: 500,
  },
};
