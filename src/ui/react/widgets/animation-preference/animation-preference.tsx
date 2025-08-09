import { Globals, useReducedMotion } from "@react-spring/web";
import { useEffect, type ReactNode } from "react";
import { LOCAL_STORAGE_ANIMATION_PREF_KEY } from "@/consts/local-storage";

export const AnimationPreference = ({ children }: { children: ReactNode }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const apply = () => {
      const pref = localStorage.getItem(LOCAL_STORAGE_ANIMATION_PREF_KEY);
      if (pref === "reduced") {
        Globals.assign({ skipAnimation: true });
      } else if (pref === "on") {
        Globals.assign({ skipAnimation: false });
      } else {
        Globals.assign({ skipAnimation: !!reducedMotion });
      }
    };
    apply();
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_ANIMATION_PREF_KEY) apply();
    };
    const onCustom = () => apply();
    window.addEventListener("storage", onStorage);
    window.addEventListener("animation-pref-change", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(
        "animation-pref-change",
        onCustom as EventListener
      );
    };
  }, [reducedMotion]);

  return children;
};
