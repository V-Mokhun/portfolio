export const languages = {
  en: "English",
  pl: "Polski",
  ua: "Українська",
  ru: "Русский",
};

export type Lang = keyof typeof languages;

export const defaultLang = "en";
export const showDefaultLang = false;

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.twitter": "Twitter",
  },
} as const;
