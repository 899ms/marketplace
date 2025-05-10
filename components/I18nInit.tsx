'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/i18n';

export default function I18nInit() {
  const pathname = usePathname();           // e.g. "/zh/auth/login"
  const [, locale] = pathname.split('/');   // grabs "zh" or "en"

  useEffect(() => {
    if (locale && ['en', 'zh'].includes(locale) && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return null;
}
