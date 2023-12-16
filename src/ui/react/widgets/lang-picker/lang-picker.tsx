import {
  useTranslations,
  type Lang,
  useTranslatedPath,
  languages,
  cn,
} from "@/lib";
import { Popover, PopoverContent, PopoverTrigger } from "../..";
import { ChevronDown } from "lucide-react";

interface LangPickerProps {
  lang: Lang;
}

export const LangPicker = ({ lang: currentLang }: LangPickerProps) => {
  const translatePath = useTranslatedPath(currentLang);

  return (
    <Popover>
      <PopoverTrigger className="flex items-center text-lg text-white hover:text-primary-hover transition-colors data-[state='open']:text-primary-hover">
        <span className="uppercase font-medium">{currentLang}</span>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent triangleSide="top" className="w-32 py-2" side="bottom" sideOffset={10}>
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
