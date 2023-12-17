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
      <SheetTrigger className="md:hidden">
        <Icon name="hamburger" className="fill-primary" />
      </SheetTrigger>
      <SheetContent className="md:hidden" side="left">
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
