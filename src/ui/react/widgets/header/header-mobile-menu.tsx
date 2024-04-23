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

interface HeaderMobileMenuProps {
  currentLang: string;
}

export const HeaderMobileMenu = ({ currentLang }: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger data-testid="mobile-menu-trigger" className="md:hidden">
        <Icon name="hamburger" className="fill-primary" />
      </SheetTrigger>
      <SheetContent className="md:hidden overflow-y-auto" side="right">
        <HeaderNav
          onLinkClick={() => {
            setIsOpen(false);
          }}
          currentLang={currentLang}
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
