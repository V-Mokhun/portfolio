import { Sheet, SheetContent, SheetTrigger } from "@/ui/react";
import { HeaderNav } from "./header-nav";
import { useState } from "react";

interface HeaderMobileMenuProps {}

export const HeaderMobileMenu = ({}: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger className="md:hidden">
        <svg className="w-8 h-8 fill-primary">
          <use xlinkHref="/sprite.svg#hamburger"></use>
        </svg>
      </SheetTrigger>
      <SheetContent className="md:hidden" side="left">
        <HeaderNav
          onLinkClick={() => {
            setIsOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
