import { Globals, useReducedMotion } from "@react-spring/web";
import { useEffect, type ReactNode } from "react";

export const AnimationPreference = ({ children }: { children: ReactNode }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      Globals.assign({
        skipAnimation: true,
      });
    }
  }, []);

  return children;
};
