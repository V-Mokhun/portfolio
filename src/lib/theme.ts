import { LOCAL_STORAGE_THEME_KEY } from "@/consts";

export const getTheme = () => {
  if (typeof window === "undefined") return "dark";

  if (
    localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === "dark" ||
    (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  }

  return "light";
};
