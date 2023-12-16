import { cn } from "@/lib";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon = ({ className, name, ...props }: IconProps) => {
  return (
    <svg viewBox="0 0 16 16" className={cn("w-8 h-8", className)} {...props}>
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};
