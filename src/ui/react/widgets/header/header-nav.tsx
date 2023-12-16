import { cn, useTranslations, type Lang } from "@/lib";

interface HeaderNavProps {
  navClassName?: string;
  listClassName?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
  lang: Lang;
}

export const HeaderNav = ({
  navClassName,
  linkClassName,
  listClassName,
  onLinkClick,
  lang,
}: HeaderNavProps) => {
  const t = useTranslations(lang);

  return (
    <nav
      className={cn("flex md:justify-center flex-1 py-4 md:py-0", navClassName)}
    >
      <ul
        className={cn(
          "flex flex-col md:flex-row md:items-center gap-6 md:gap-2 lg:gap-4 text-white font-medium text-xl",
          listClassName
        )}
      >
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="#"
          >
            {t("nav.home")}
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="#about"
          >
            {t("nav.about")}
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="#technologies"
          >
            {t("nav.technologies")}
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="#projects"
          >
            {t("nav.projects")}
          </a>
        </li>
        <li className="md:hidden">
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="#contact"
          >
            {t("nav.contact")}
          </a>
        </li>
      </ul>
    </nav>
  );
};
