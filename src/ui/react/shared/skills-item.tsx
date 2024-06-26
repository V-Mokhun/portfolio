import { useState } from "react";
import { Particles } from "./particles";
import { Icon } from "./primitives";

interface SkillsItemProps {
  name: string;
  icon: string;
  color: string;
}

export const SkillsItem = ({ color, icon, name }: SkillsItemProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative h-full rounded-[inherit] z-10 overflow-hidden"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Particles
        className="absolute rounded-md inset-0 -z-10 opacity-40 group-hover/item:opacity-100 transition-opacity duration-1000 ease-in-out"
        quantity={50}
        color={color}
        vy={-0.2}
      />
      <div className="p-4 text-center">
        <h4 className="font-semibold text-xl lg:text-2xl text-title mb-4">
          {name}
        </h4>
        <Icon
          style={{
            ...(hover
              ? {
                  fill: color,
                  color: color,
                }
              : null),
          }}
          name={icon}
          className={`w-12 h-12 text-black fill-black dark:text-white dark:fill-white mx-auto transition-colors duration-500`}
        />
      </div>
    </div>
  );
};
