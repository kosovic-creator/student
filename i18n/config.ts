'use client';


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import mnCommon from './locales/mn/common.json';
import mnStudent from './locales/mn/student.json';
import enStudent from './locales/en/student.json';

const resources = {
  en: {
    common: enCommon,
    student: enStudent,
  },
  mn: {
    common: mnCommon,
    student: mnStudent,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'mn'],
      debug: false,
      ns: ['common', 'student'],
      defaultNS: 'common',
      resources,
      backend: false, // onemogući backend loader i na klijentu
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
