import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = ({}) => {
  const [theme, setTheme] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("theme") ?? "light"
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
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!isMounted) return null;

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
