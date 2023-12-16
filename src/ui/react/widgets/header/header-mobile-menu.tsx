import { type Lang } from "@/lib";
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
  lang: Lang;
}

export const HeaderMobileMenu = ({ lang }: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger className="md:hidden">
        <Icon name="hamburger" className="fill-primary" />
      </SheetTrigger>
      <SheetContent className="md:hidden" side="left">
        <HeaderNav
          lang={lang}
          onLinkClick={() => {
            setIsOpen(false);
          }}
        />
        <MobileLangPicker lang={lang} />
      </SheetContent>
    </Sheet>
  );
};
