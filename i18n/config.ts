
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { supportedLocales, defaultLocale } from './locales-config';
import enCommon from './locales/en/common.json';
import enStudent from './locales/en/student.json';
import srCommon from './locales/sr/common.json';
import srStudent from './locales/sr/student.json';
import enPost from './locales/en/post.json';
import srPost from './locales/sr/post.json';

const resources = {
  en: {
    common: enCommon,
    student: enStudent,
    post: enPost,

  },
  sr: {
    common: srCommon,
    student: srStudent,
    post: srPost,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: defaultLocale,
      fallbackLng: defaultLocale,
      supportedLngs: supportedLocales as unknown as string[],
      debug: false,
      ns: ['common', 'student', 'post'],
      defaultNS: 'student',
      resources,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
