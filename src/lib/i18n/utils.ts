import { ui, defaultLang, showDefaultLang, type Lang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(
    key: keyof (typeof ui)[typeof defaultLang]
  ): string | React.ReactNode {
    // @ts-ignore
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}
