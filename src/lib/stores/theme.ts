import { atom, onMount } from "nanostores";
import { getTheme } from "../theme";

export const $theme = atom<"dark" | "light">("dark");

onMount($theme, () => {
  $theme.set(getTheme());
});
