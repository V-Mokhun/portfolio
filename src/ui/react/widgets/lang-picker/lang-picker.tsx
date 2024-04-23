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
        className="hidden md:flex p-1 lg:p-2 items-center text-foreground-light hover:text-primary transition-colors data-[state='open']:text-primary"
      >
        <span className="uppercase">{currentLang}</span>
        <ChevronDown className="w-6 h-6" />
      </PopoverTrigger>
      <PopoverContent
        triangleSide="top"
        className="hidden md:block w-32 py-2"
        side="bottom"
        sideOffset={10}
      >
        <ul className="space-y-2">
          {Object.entries(languages).map(([lang, label]) => (
            <li
              className={cn(
                "text-lg hover:text-primary transition-colors",
                lang === currentLang &&
                  "text-primary font-semibold hover:text-primary"
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
