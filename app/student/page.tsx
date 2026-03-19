import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getLocaleMessages } from '@/i18n/i18n';
import { getServerLocale } from '@/lib/locale';
import StudentListClient from './StudentListClient';
import { ucitajStudenta } from '@/actions/student_actions';

export default async function StudentiPage(

) {

  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'student');
  const students = await ucitajStudenta();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">

        <Link href="/student/dodaj">
          <Button>+ {t.newStudent}</Button>
        </Link>
      </div>
      <StudentListClient students={students ?? []} t={t} />
    </div>
  );
}