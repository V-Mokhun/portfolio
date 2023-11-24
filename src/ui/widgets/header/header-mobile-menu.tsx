import { Sheet, SheetContent, SheetTrigger } from "@/ui/shared";
import { HeaderNav } from "./header-nav";

interface HeaderMobileMenuProps {}

export const HeaderMobileMenu = ({}: HeaderMobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <svg className="w-8 h-8 fill-primary">
          <use xlinkHref="/sprite.svg#hamburger"></use>
        </svg>
      </SheetTrigger>
      <SheetContent className="md:hidden" side="left">
        <HeaderNav />
      </SheetContent>
    </Sheet>
  );
};
