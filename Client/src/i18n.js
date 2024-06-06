import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";


import arabic from "./languages/ar.json"
import english from "./languages/en.json";

const resources = {
  en: {
    translation: english,
  },
  ar: {
    translation: arabic,
  }
};
const i18nextLng = "en";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: i18nextLng, 
    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;