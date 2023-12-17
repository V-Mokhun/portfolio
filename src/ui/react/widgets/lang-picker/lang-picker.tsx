import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../..";
import { useEffect, useState } from "react";
import { cn } from "@/lib";

interface LangPickerProps {}

export const LangPicker = ({}: LangPickerProps) => {
  const [isMd, setIsMd] = useState(false);
  const currentLang = "en";

  useEffect(() => {
    setIsMd(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  if (!isMd) return null;

  return (
    <Popover>
      <PopoverTrigger className="flex items-center text-lg text-white hover:text-primary-hover transition-colors data-[state='open']:text-primary-hover">
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
          {/* {Object.entries(languages).map(([lang, label]) => (
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
          ))} */}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
