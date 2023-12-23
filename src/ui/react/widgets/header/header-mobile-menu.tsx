import {
  Icon,
  MobileLangPicker,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/ui/react";
import { useState } from "react";
import { HeaderNav } from "./header-nav";

interface HeaderMobileMenuProps {
}

export const HeaderMobileMenu = ({ }: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger className="lg:hidden">
        <Icon name="hamburger" className="fill-primary" />
      </SheetTrigger>
      <SheetContent className="lg:hidden" side="left">
        <HeaderNav
          onLinkClick={() => {
            setIsOpen(false);
          }}
        />
        <MobileLangPicker />
      </SheetContent>
    </Sheet>
  );
};
