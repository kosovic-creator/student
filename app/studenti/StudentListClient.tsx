"use client";
import React from "react";
import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SuccessMessage } from '@/app/components/SuccessMessage';
import { StudentDeleteButtonClient } from './StudentDeleteButtonClient';

type Student = { id: number; ime: string };

type Props = {
  students: Student[];
  t: any;
};

export default function StudentListClient({ students, t }: Props) {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const hasStudents = !!students && students.length > 0;
  const isSingleRow = !!students && students.length === 1;

  // Redirect posle prikaza poruke o uspehu brisanja

  React.useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        window.location.href = "/studenti";
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <SuccessMessage message={errorMessage} type="error" />}
      {!hasStudents ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          {t.noStudents ?? 'Nema studenata.'}
        </div>
      ) : (
        <div className={isSingleRow ? 'max-w-xl' : ''}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.name}</TableHead>
                <TableHead className="min-w-fit">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.ime}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex gap-2">
                      <Link href={`/studenti/izmeni?studentId=${student.id}`}>
                        <Button variant="ghost" >
                          {t.edit}
                        </Button>
                      </Link>
                      <StudentDeleteButtonClient
                        id={student.id}
                        label={t.delete}
                        confirmTitle={t.delete_confirm_title ?? 'Potvrdi brisanje'}
                        confirmBody={t.delete_confirm_body ?? 'Da li ste sigurni da želite obrisati studenta?'}
                        cancelLabel={t.cancel ?? 'Otkaži'}
                        confirmLabel={t.confirm ?? t.delete ?? 'Potvrdi'}
                        onSuccess={setSuccessMessage}
                        onError={setErrorMessage}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
