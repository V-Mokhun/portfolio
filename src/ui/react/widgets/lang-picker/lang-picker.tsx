import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../..";
import { useEffect, useState } from "react";
import { cn, defaultLang, languages, translatePath } from "@/lib";
import { useTranslation } from "react-i18next";

interface LangPickerProps {}

export const LangPicker = ({}: LangPickerProps) => {
  const [isMd, setIsMd] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage ?? defaultLang;

  useEffect(() => {
    setIsMd(window.matchMedia("(min-width: 1024px)").matches);
  }, []);

  if (!isMd) return null;

  return (
    <Popover>
      <PopoverTrigger className="flex items-center text-lg text-white dark:text-foreground hover:text-primary-hover dark:hover:text-primary-hover transition-colors data-[state='open']:text-primary-hover">
        <span className="uppercase font-medium">{currentLang}</span>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent
        triangleSide="top"
        className="w-32 py-2"
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
              <a className="block" href={translatePath("/", lang)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
