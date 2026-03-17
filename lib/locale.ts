import { cookies } from "next/headers";

import { defaultLocale, supportedLocales } from "@/i18n/locales-config";

export type Locale = (typeof supportedLocales)[number];

export function normalizeLocale(value?: string | null): Locale {
  if (value && (supportedLocales as readonly string[]).includes(value)) {
    return value as Locale;
  }

  return defaultLocale;
}

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  return normalizeLocale(langCookie);
}
