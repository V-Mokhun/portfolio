import { useSpring } from "@react-spring/web";
import type { ReactNode } from "react";
import { HeaderClient } from "./header";

interface AnimatedHeaderProps {
  currentLang: string;
  children?: ReactNode;
}

export const AnimatedHeader = ({
  currentLang,
  children,
}: AnimatedHeaderProps) => {
  const props = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
    config: {
      duration: 500,
    },
  });

  return (
    <HeaderClient animateProps={props} currentLang={currentLang}>
      {children}
    </HeaderClient>
  );
};
