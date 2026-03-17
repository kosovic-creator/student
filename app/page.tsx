import { getLocaleMessages } from '@/i18n/i18n';
import { CommonSearchParams } from '@/lib/types/searchParams';
import { getServerLocale } from '@/lib/locale';

// type CommonSearchParams = {
// ...existing code...
// };

export default async function Home({ searchParams }: { searchParams: Promise<CommonSearchParams> }) {
  await searchParams;
  const lang = await getServerLocale();

  const t = await getLocaleMessages(lang, 'common');
  return (
    <>
      <div className="flex justify-center mt-60">
        <p>{t.welcomeMessage}</p>
      </div>

    </>
  );
}
