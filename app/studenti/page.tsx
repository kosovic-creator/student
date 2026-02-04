import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@/components/table/SimpleTable';
import traziStudenta, { obrisiStudenta } from '@/actions/student';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getLocaleMessages } from '@/i18n/i18n';
import { ErrorMessage, SuccessMessage } from '@/components/messages';
import { StudentSearch } from './StudentSearch';
import { Suspense } from 'react';

export default async function StudentiPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; success?: string; error?: string; query?: string }>;
}) {
  const params = await searchParams;
  const lang = params?.lang === 'mn' ? 'mn' : 'en';
  const query = params?.query || '';
  const t = await getLocaleMessages(lang, 'student');
  const students = await traziStudenta({ query });
  const successParam = params.success;
  const errorParam = params.error;
  const hasStudents = !!students && students.length > 0;
  const isSingleRow = !!students && students.length === 1;

  return (
    <>
      {successParam && (
        <SuccessMessage message={successParam} />
      )}
      {errorParam && (
        <ErrorMessage message={errorParam} />
      )}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.students}</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <StudentSearch placeholder={t.search ?? 'Pretraži...'} />
          </Suspense>
          <Link href="/studenti/dodaj">
            <Button>+ {t.newStudent}</Button>
          </Link>
        </div>

        {!hasStudents ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            {t.noStudents ?? 'Nema studenata.'}
          </div>
        ) : (
          <div className={isSingleRow ? 'max-w-xl' : ''}>
            <SimpleTable>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>{t.name}</TableHeaderCell>
                    <TableHeaderCell className="min-w-fit">{t.actions}</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students && students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.ime}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex gap-2">
                        <Link href={`/studenti/izmeni?id=${student.id}&lang=${lang}`}>
                          <Button variant="ghost" >
                            {t.edit}
                          </Button>
                        </Link>
                        <form action={obrisiStudenta}>
                          <input type="hidden" name="id" value={student.id} />
                          <input type="hidden" name="lang" value={lang} />
                          <Button variant="ghost" type="submit" size="sm" aria-label={t.delete} title={t.delete} >
                            {t.delete}
                          </Button>

                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </SimpleTable>

          </div>
        )}
      </div>
    </>
  );
}