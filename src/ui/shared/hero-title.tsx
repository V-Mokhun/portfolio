import {
  Title,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from ".";

interface HeroTitleProps {}

export const HeroTitle = ({}: HeroTitleProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Title size="lg" className="md:text-left mb-2 md:mb-3 group">
            Hey, I'm{" "}
            <span className="text-primary md:underline group-hover:no-underline">
              Volodymyr,
            </span>
          </Title>
        </TooltipTrigger>
        <TooltipContent className="hidden md:block max-w-xs">
          <span className="text-lg">
            I actually prefer the name <span className="font-bold">Vova</span>{" "}
            as it's easier to pronouce and doesn't sound too formal.
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
