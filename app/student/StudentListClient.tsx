/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import StudentDeleteClient  from './StudentDeleteClient';

type Student = { id: number; ime: string };

type Props = {
  students: Student[];
  t: any;
};

export default function StudentListClient({ students, t }: Props) {
  const hasStudents = !!students && students.length > 0;
  const isSingleRow = !!students && students.length === 1;
    const toast = useToast();
    const router = useRouter();

    // Callback samo za refresh, toast prikazuje StudentDeleteClient
    const handleDeleteSuccess = (msg: string) => {
      setTimeout(() => {
        router.refresh();
      }, 1500);
    };
    const handleDeleteError = (msg: string) => {};

  return (
      <>
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
                      <Link href={`/student/izmeni?studentId=${student.id}`}>
                        <Button variant="ghost" >
                          {t.edit}
                        </Button>
                      </Link>
                      <StudentDeleteClient
                        id={student.id}
                        label={t.delete}
                        onSuccess={handleDeleteSuccess}
                        onError={handleDeleteError}
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
