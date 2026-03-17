import traziStudenta from '@/actions/student';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getLocaleMessages } from '@/i18n/i18n';
import { StudentSearch } from './StudentSearch';
import { Suspense } from 'react';
import { getServerLocale } from '@/lib/locale';
import StudentListClient from './StudentListClient';

export default async function StudentiPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string; query?: string }>;
}) {

  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'student');


  const params = await searchParams;
  const query = params?.query || '';
  const students = await traziStudenta({ query });
  // Success/error message i dugmad su u klijentskoj komponenti

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <StudentSearch />
        </Suspense>
        <Link href="/studenti/dodaj">
          <Button>+ {t.newStudent}</Button>
        </Link>
      </div>
      <StudentListClient students={students} t={t} />
    </div>
  );
}