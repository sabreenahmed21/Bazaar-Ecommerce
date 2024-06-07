import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import arabic from "./languages/ar.json";
import english from "./languages/en.json";

const resources = {
  en: {
    translation: english,
  },
  ar: {
    translation: arabic,
  }
};

// دالة لتحويل الأكواد الطويلة إلى الأكواد القصيرة
const getShortLangCode = (langCode) => {
  if (!langCode) return 'en';
  return langCode.split('-')[0];
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getShortLangCode(localStorage.getItem('i18nextLng') || 'en'),
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    whitelist: ['en', 'ar'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    initImmediate: false,
    debug: true,
  });

// مراقبة تغيير اللغة وتحديث القيمة في LocalStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', getShortLangCode(lng));
});

export default i18n;
