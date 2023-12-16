import type { Lang } from "@/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../..";

interface MobileLangPickerProps {
  lang: Lang;
}

export const MobileLangPicker = ({
  lang: currentLang,
}: MobileLangPickerProps) => {
  return (
    <Accordion type="single">
      <AccordionItem value="lang">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <span className="uppercase font-medium">{currentLang}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
