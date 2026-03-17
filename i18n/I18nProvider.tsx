"use client";
// ...existing code...
type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
};
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Locale } from '@/lib/locale';
import i18n from '@/i18n/config';

// ...existing code...

const LanguageContext = createContext<LanguageContextValue | null>(null);

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function I18nProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Locale;
}) {
  const [lang, setLangState] = useState<Locale>(initialLang);

  const setLang = useCallback((nextLang: Locale) => {
    setLangState(nextLang);
    document.cookie = `lang=${nextLang}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
    document.documentElement.lang = nextLang;
    // Sinhronizuj sa react-i18next
    i18n.changeLanguage(nextLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Sinhronizuj sa react-i18next pri montiranju
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within I18nProvider');
  }

  return context;
}
