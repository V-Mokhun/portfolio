import { cn, translatePath } from "@/lib";
import { useTranslation } from "react-i18next";

interface HeaderNavProps {
  navClassName?: string;
  listClassName?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
  currentLang: string;
}

export const HeaderNav = ({
  navClassName,
  linkClassName,
  listClassName,
  onLinkClick,
  currentLang,
}: HeaderNavProps) => {
  const { t } = useTranslation();

  return (
    <nav
      className={cn(
        "flex md:justify-center text-foreground-light flex-1 py-4 mb-4 md:mb-0 md:py-0",
        navClassName
      )}
    >
      <ul
        className={cn(
          "flex flex-col md:flex-row md:items-center gap-6 md:gap-2 text-xl md:text-sm",
          listClassName
        )}
      >
        <li className="md:hidden">
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href={translatePath("/#", currentLang)}
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
            href={translatePath("/#about", currentLang)}
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
            href={translatePath("/#skills", currentLang)}
          >
            {/* {t("nav.skills")} */}
            Skills
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href={translatePath("/#projects", currentLang)}
          >
            {t("nav.projects")}
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href={translatePath("/#contact", currentLang)}
          >
            {t("nav.contact")}
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="/blog"
          >
            <span>{t("nav.blog")}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
