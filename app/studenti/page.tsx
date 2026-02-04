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
          <StudentSearch placeholder={t.search ?? 'Pretraži...'} />
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
                  <TableHeaderCell>{t.actions}</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students && students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.ime}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/studenti/izmeni?id=${student.id}&lang=${lang}`}>
                          <Button variant="outline" size="sm" aria-label={t.edit} title={t.edit}>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                        </Link>
                        <form action={(obrisiStudenta)} >
                          <input type="hidden" name="id" value={student.id} />
                          <input type="hidden" name="lang" value={lang} />
                          <Button type="submit" variant="destructive" size="sm" aria-label={t.delete} title={t.delete}>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            
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