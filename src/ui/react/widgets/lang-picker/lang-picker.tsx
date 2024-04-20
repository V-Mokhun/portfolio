import { cn, languages, translatePath } from "@/lib";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../..";

interface LangPickerProps {
  currentLang: string;
}

export const LangPicker = ({ currentLang }: LangPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger
        data-testid="lang-picker-trigger"
        className="hidden lg:flex items-center text-lg text-white dark:text-foreground hover:text-primary-hover dark:hover:text-primary-hover transition-colors data-[state='open']:text-primary-hover"
      >
        <span className="uppercase font-medium">{currentLang}</span>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent
        triangleSide="top"
        className="hidden lg:block w-32 py-2"
        side="bottom"
        sideOffset={10}
      >
        <ul className="space-y-2">
          {Object.entries(languages).map(([lang, label]) => (
            <li
              className={cn(
                "text-lg hover:text-primary-hover transition-colors",
                lang === currentLang &&
                  "text-primary font-bold hover:text-primary"
              )}
              key={lang}
            >
              <a
                className="block"
                href={translatePath("/", lang)}
                data-astro-reload
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
