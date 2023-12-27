import { LOCAL_STORAGE_THEME_KEY } from "@/consts";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../..";

export const ThemeToggle = ({}) => {
  const [theme, setTheme] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ?? "light"
      : "light"
  );
  const [isMounted, setIsMounted] = useState(false);

  const handleClick = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
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
    <button onClick={handleClick}>
      {theme === "light" ? (
        <MoonIcon className="text-white w-6 h-6 transition-colors hover:text-primary-hover" />
      ) : (
        <SunIcon className="text-white w-6 h-6 transition-colors hover:text-primary-hover" />
      )}
    </button>
  );
};
