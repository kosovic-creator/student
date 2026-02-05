import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@/components/table/SimpleTable';
import traziStudenta, { handleSubmit } from '@/actions/student';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getLocaleMessages } from '@/i18n/i18n';
import { ErrorMessage, SuccessMessage } from '@/components/messages';
import { StudentSearch } from './StudentSearch';
import { Suspense } from 'react';
import { StudentDeleteButton } from './StudentDeleteButton';

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
        <SuccessMessage message={successParam} namespace="student" />
      )}
      {errorParam && (
        <ErrorMessage message={errorParam} namespace="student" />
      )}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
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
                        <StudentDeleteButton
                          id={student.id}
                          lang={lang}
                          label={t.delete}
                          confirmTitle={t.delete_confirm_title ?? 'Potvrdi brisanje'}
                          confirmBody={
                            t.delete_confirm_body ?? 'Da li ste sigurni da želite obrisati studenta?'
                          }
                          cancelLabel={t.cancel ?? 'Otkaži'}
                          confirmLabel={t.confirm ?? t.delete ?? 'Potvrdi'}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </SimpleTable>
            <form action={handleSubmit}>
              <input type="text" name="imeInputa" placeholder="Unesi tekst" />
              <button type="submit">Pošalji UseStete</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}