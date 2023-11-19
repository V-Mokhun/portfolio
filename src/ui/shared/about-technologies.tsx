import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from ".";

const TECHNOLOGIES = [
  {
    path: "/sprite.svg#react",
    label: "React",
  },
  {
    path: "/sprite.svg#typescript",
    label: "TypeScript",
  },
  {
    path: "/sprite.svg#nextdotjs",
    label: "Next.js",
  },
  {
    path: "/sprite.svg#javascript",
    label: "JavaScript",
  },
  {
    path: "/sprite.svg#html",
    label: "HTML",
  },
  {
    path: "/sprite.svg#css",
    label: "CSS",
  },
  {
    path: "/sprite.svg#tailwindcss",
    label: "TailwindCSS",
  },
  {
    path: "/sprite.svg#radixui",
    label: "Radix UI",
  },
  {
    path: "/sprite.svg#reactquery",
    label: "React Query",
  },
  {
    path: "/sprite.svg#redux",
    label: "Redux",
  },
  {
    path: "/sprite.svg#reacthookform",
    label: "React Hook Form",
  },
  {
    path: "/sprite.svg#zod",
    label: "Zod",
  },
  {
    path: "/sprite.svg#git",
    label: "Git",
  },
  {
    path: "/sprite.svg#vim",
    label: "Vim extension in VS Code",
  },
  {
    path: "/sprite.svg#figma",
    label: "Figma",
  },
];

export const AboutTechnologies = () => {
  return (
    <TooltipProvider>
      <ul className="flex flex-wrap gap-6">
        {TECHNOLOGIES.map(({ label, path }) => (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger>
                <svg
                  onMouseEnter={() => {}}
                  className="w-20 h-20 transition-colors cursor-pointer fill-background hover:fill-primary-hover"
                >
                  <use xlinkHref={path} />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <span>{label}</span>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
};
