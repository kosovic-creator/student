'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import i18n from '@/i18n/config';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'mn';

  useEffect(() => {
    // Promeni jezik kada se promeni parametar
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <>{children}</>;
}
