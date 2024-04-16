import { cn } from "@/lib";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderNavProps {
  navClassName?: string;
  listClassName?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
}

export const HeaderNav = ({
  navClassName,
  linkClassName,
  listClassName,
  onLinkClick,
}: HeaderNavProps) => {
  const { t } = useTranslation();

  return (
    <nav
      className={cn("flex lg:justify-center flex-1 py-4 lg:py-0", navClassName)}
    >
      <ul
        className={cn(
          "flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-2 text-white dark:text-foreground font-medium text-xl",
          listClassName
        )}
      >
        <li className="lg:hidden">
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="/#"
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
            href="/#about"
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
            href="/#technologies"
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
            href="/#projects"
          >
            {t("nav.projects")}
          </a>
        </li>
        <li className="lg:hidden">
          <a
            onClick={onLinkClick}
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="/#contact"
          >
            {t("nav.contact")}
          </a>
        </li>
        <li>
          <a
            onClick={onLinkClick}
            className={cn(
              "inline-flex items-center gap-1 transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="/blog"
          >
            <span>{t("nav.blog")}</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </li>
      </ul>
    </nav>
  );
};
