import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const en = require('./_en.json');
const mk = require('./_mk.json');

i18n

// detect user language
  .use(LanguageDetector)

// pass the i18n instance to react-i18next.
  .use(initReactI18next)

// init i18next
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: en,
      mk: mk
    }
  });

export default i18n;