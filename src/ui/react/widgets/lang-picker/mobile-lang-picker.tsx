import { cn, defaultLang, languages, translatePath } from "@/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Icon,
} from "../..";
import { useTranslation } from "react-i18next";

interface MobileLangPickerProps {}

export const MobileLangPicker = ({}: MobileLangPickerProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage ?? defaultLang;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="lang" className="text-white">
        <AccordionTrigger className="pb-2 mb-2 data-[state='open']:border-b">
          <div className="flex items-center gap-2 text-xl">
            <Icon name={currentLang} />
            <span className="uppercase font-medium">{currentLang}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-xl">
          <ul>
            {Object.entries(languages).map(([lang, label]) => (
              <li
                className={cn(lang === currentLang && "text-primary font-bold")}
                key={lang}
              >
                <a
                  className="flex items-center gap-2 py-2"
                  href={translatePath("/", lang)}
                >
                  <Icon name={lang} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
