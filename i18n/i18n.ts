/**
 * Učitaj prevode za dati jezik i namespace u Server Componentama
 * @param lang Jezik (npr. "sr", "en")
 * @param namespace Naziv namespace-a (npr. "student", "common")
 *
 * Korišćenje:
 * const t = await getLocaleMessages('sr', 'student');
 * const poruka = t.key_name;
 */
export async function getLocaleMessages(
  lang: string,
  namespace: string
): Promise<Record<string, string>> {
  try {
    const messages = await import(`./locales/${lang}/${namespace}.json`);
    return messages.default;
  } catch {
    console.warn(`Translation file not found: ${lang}/${namespace}.json`);
    // Fallback na English
    try {
      const fallbackMessages = await import(`./locales/en/${namespace}.json`);
      return fallbackMessages.default;
    } catch {
      console.error(`Fallback translation file not found: en/${namespace}.json`);
      return {};
    }
  }
}