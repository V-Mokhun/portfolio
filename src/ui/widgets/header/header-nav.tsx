import { cn } from "@/lib";

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
  return (
    <nav
      className={cn("flex md:justify-center flex-1 py-4 md:py-0", navClassName)}
    >
      <ul
        className={cn(
          "flex flex-col md:flex-row md:items-center gap-6 md:gap-4 text-white font-medium text-xl",
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
            Home
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
            About
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
            Projects
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
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
