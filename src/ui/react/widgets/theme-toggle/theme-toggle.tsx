import { LOCAL_STORAGE_THEME_KEY } from "@/consts";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../..";
import { useStore } from "@nanostores/react";
import { $theme } from "@/lib/stores";

export const ThemeToggle = ({}) => {
  const theme = useStore($theme);
  const [isMounted, setIsMounted] = useState(false);

  const handleClick = () => {
    $theme.set(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  if (!isMounted) return <Skeleton className="w-6 h-6 rounded-md" />;

  return (
    <button
      className="p-1 lg:p-2"
      data-testid="dark-mode-toggle"
      onClick={handleClick}
    >
      {theme === "light" ? (
        <MoonIcon className="text-foreground-light w-6 h-6 transition-colors hover:text-primary" />
      ) : (
        <SunIcon className="text-foreground-light w-6 h-6 transition-colors hover:text-primary" />
      )}
    </button>
  );
};
