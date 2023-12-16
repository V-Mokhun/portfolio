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
    "nav.technologies": "Technologies",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
  },
  pl: {
    "nav.home": "Główna",
    "nav.about": "O mnie",
    "nav.technologies": "Technologie",
    "nav.projects": "Projekty",
    "nav.contact": "Kontakt",
  },
  ua: {
    "nav.home": "Головна",
    "nav.about": "Про мене",
    "nav.technologies": "Технології",
    "nav.projects": "Проекти",
    "nav.contact": "Контакт",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.technologies": "Технологии",
    "nav.projects": "Проекты",
    "nav.contact": "Контакт",
  }
} as const;
