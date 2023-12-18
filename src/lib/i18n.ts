export const languages = {
  en: "English",
  pl: "Polski",
  ua: "Українська",
  ru: "Русский",
};
export const defaultLang = "en";

export function getLangFromPath(path: string) {
  const lang = path.split("/")[1];
  return lang ?? defaultLang;
}

export function translatePath(path: string, l: string) {
  return l === defaultLang ? path : `/${l}${path}`;
}

export const translateUrl = (url: string | URL, lang: string) => {
  const newUrl = new URL(url);
  const path = newUrl.pathname;
  const newPath = translatePath(path, lang);
  newUrl.pathname = newPath;
  return newUrl.toString();
};
