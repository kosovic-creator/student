import { getLocaleMessages } from '@/i18n/i18n';

type CommonSearchParams = {
  lang?: string;
};

export default async function Home({ searchParams }: { searchParams: Promise<CommonSearchParams> }) {
  const params = await searchParams;
  const lang = params?.lang === 'mn' ? 'mn' : 'en';

  const t = await getLocaleMessages(lang, 'common');
  return (
    <>
      <div className="flex justify-center mt-60">
        <p>{t.welcomeMessage}</p>
      </div>

    </>
  );
}
