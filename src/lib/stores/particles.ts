import { atom } from "nanostores";

export type ParticlesConfig = {
  quantity: number;
  staticity: number;
  ease: number;
  vx: number;
  vy: number;
  refresh: boolean;
};

export const $particles = atom<ParticlesConfig>({
  quantity: 30,
  staticity: 50,
  ease: 50,
  vx: 0,
  vy: 0,
  refresh: false,
});

export function updateParticlesConfig(partial: Partial<ParticlesConfig>) {
  const current = $particles.get();
  $particles.set({ ...current, ...partial });
}


