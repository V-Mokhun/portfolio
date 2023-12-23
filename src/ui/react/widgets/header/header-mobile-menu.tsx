import {
  Icon,
  MobileLangPicker,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/ui/react";
import { useState } from "react";
import { HeaderNav } from "./header-nav";
import { useTranslation } from "react-i18next";
import { FileSymlinkIcon } from "lucide-react";

interface HeaderMobileMenuProps {}

export const HeaderMobileMenu = ({}: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-xl flex items-center gap-2 mt-4 text-primary"
        >
          <FileSymlinkIcon className="w-6 h-6 text-primary" />
          <span>{t("seeResume")}</span>
        </a>
      </SheetContent>
    </Sheet>
  );
};
