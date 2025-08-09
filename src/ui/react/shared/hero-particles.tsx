import { $theme, $particles } from "@/lib/stores";
import { useStore } from "@nanostores/react";
import { Particles } from "./particles";
import { cn } from "@/lib";

export const HeroParticles = () => {
  const theme = useStore($theme);
  const particles = useStore($particles);

  return (
    <>
      <Particles
        className={cn("absolute inset-0 -z-10", theme === "light" && "-z-20")}
        color="#fafafa"
        quantity={particles.quantity}
        staticity={particles.staticity}
        ease={particles.ease}
        vx={particles.vx}
        vy={particles.vy}
        refresh={particles.refresh}
      />
      <Particles
        className={cn("absolute inset-0 -z-10", theme === "dark" && "-z-20")}
        color="#071831"
        quantity={particles.quantity}
        staticity={particles.staticity}
        ease={particles.ease}
        vx={particles.vx}
        vy={particles.vy}
        refresh={particles.refresh}
      />
    </>
  );
};
