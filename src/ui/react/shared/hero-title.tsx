import { Trans, useTranslation } from "react-i18next";
import {
  Title,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from ".";

interface HeroTitleProps {}

export const HeroTitle = ({}: HeroTitleProps) => {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <Title data-testid="hero-title" tag="h1" size="lg" className="md:text-left mb-2 md:mb-3 group">
            {t("hero.title")}{" "}
            <span className="text-primary md:underline group-hover:no-underline">
              {t("name")},
            </span>
          </Title>
        </TooltipTrigger>
        <TooltipContent data-testid="hero-tooltip" className="hidden md:block max-w-xs">
          <span className="text-lg">
            <Trans i18nKey="hero.titleTooltip">
              I actually prefer the name
              <span className="font-bold">Vova </span>
              as it's easier to pronouce and doesn't sound too formal.
            </Trans>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
