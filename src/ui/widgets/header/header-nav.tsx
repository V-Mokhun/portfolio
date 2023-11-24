import { cn } from "@/lib";

interface HeaderNavProps {
  navClassName?: string;
  listClassName?: string;
  linkClassName?: string;
}

export const HeaderNav = ({ navClassName, linkClassName, listClassName }: HeaderNavProps) => {
  return (
    <nav className={cn("flex justify-center flex-1", navClassName)}>
      <ul
        className={cn(
          "flex items-center gap-4 text-white font-medium text-xl",
          listClassName
        )}
      >
        <li>
          <a
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
            className={cn(
              "transition-colors hover:text-primary p-2",
              linkClassName
            )}
            href="#projects"
          >
            Projects
          </a>
        </li>
      </ul>
    </nav>
  );
};
