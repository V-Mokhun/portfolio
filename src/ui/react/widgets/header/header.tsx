import { cn } from "@/lib";
import {
  Container,
  HeaderMobileMenu,
  HeaderNav,
  LangPicker,
  RippleButton,
  ThemeToggle,
} from "@/ui/react";
import { useEffect, useState, type ReactNode } from "react";

interface HeaderClientProps {
  currentLang: string;
  children?: ReactNode;
}

const HEADER_HEIGHT = 80;

export const HeaderClient = ({ currentLang, children }: HeaderClientProps) => {
  const [position, setPosition] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const [options, setOptions] = useState({
    visible: true,
    inStartingPosition: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.scrollY;

      const shouldHide = position < moving && position > HEADER_HEIGHT;
      setOptions({
        visible: !shouldHide,
        inStartingPosition: position < HEADER_HEIGHT,
      });
      setPosition(moving);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={cn(
        "bg-background/80 backdrop-blur-md fixed left-0 right-0 z-50 px-5 md:px-10 transition-all duration-300",
        options.visible ? "top-0" : "-top-header-height",
        options.inStartingPosition
          ? "h-header-height"
          : "h-header-scroll-height shadow-card-md"
      )}
    >
      <Container className="h-full">
        <div className="flex items-center justify-between gap-5 h-full">
          {children}
          <HeaderMobileMenu currentLang={currentLang} />
          <HeaderNav navClassName="hidden md:flex" currentLang={currentLang} />
          <div className="hidden md:flex items-center gap-2">
            <RippleButton
              className="mr-2"
              tag="a"
              href="/resume.pdf"
              target="_blank"
              isDynamic
            >
              Resume
            </RippleButton>
            <LangPicker currentLang={currentLang} />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};
