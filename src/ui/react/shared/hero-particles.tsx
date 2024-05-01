import { $theme } from "@/lib/stores";
import { useStore } from "@nanostores/react";
import { Particles } from "./particles";
import { cn } from "@/lib";

export const HeroParticles = () => {
  const theme = useStore($theme);

  return (
    <>
      <Particles
        className={cn("absolute inset-0 -z-10", theme === "light" && "-z-20")}
        color="#fafafa"
      />
      <Particles
        className={cn("absolute inset-0 -z-10", theme === "dark" && "-z-20")}
        color="#071831"
      />
    </>
  );
};
