import { $theme } from "@/lib/stores";
import { useStore } from "@nanostores/react";
import { Particles } from "./particles";
import { cn } from "@/lib";

export const HeroParticles = () => {
  const theme = useStore($theme);

  return (
    <Particles
      className={cn("absolute inset-0 -z-10")}
      color={theme === "light" ? "#000000" : "#ffffff"}
      refresh={theme === "light"}
    />
  );
};
