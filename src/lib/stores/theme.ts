import { atom, onMount } from "nanostores";
import { getTheme } from "../theme";
import { LOCAL_STORAGE_THEME_KEY } from "@/consts/local-storage";

export type Theme = "dark" | "light" | "system";

export const $theme = atom<Theme>("dark");

onMount($theme, () => {
  $theme.set(getTheme());
});

export function setTheme(theme: Theme) {
  if (theme === "system") {
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
  } else {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }

  $theme.set(theme);
}
