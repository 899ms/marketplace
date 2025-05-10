// i18n.ts
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// point at your actual JSON files
import commonEN from './public/locales/en/common.json';
import commonZH from './public/locales/zh/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: commonEN },
      zh: { common: commonZH },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],         // we only have one namespace
    defaultNS: 'common',    // make it the default
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
