/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createErrorRedirect, createSuccessRedirect, createFailureRedirect } from '@/lib/formHelpers';
import { getLocaleMessages } from '@/i18n/i18n';
import { studentSchema } from '@/app/validacija/studentSchema';


export const ucitajStudenta = async () => {
  try {
    const student = await prisma.student.findMany();
    return student;
  } catch (error) {
    console.error("Greška pri učitavanju studenata:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
export const ucitajStudentaId = async (searchParams: { studentId: number }) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: searchParams.studentId },
    });
    return student;
  } catch (error) {
    console.error("Greška pri učitavanju studenta:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
export async function dodajStudenta(formData: FormData) {
  const ime = formData.get('ime') as string;
  const lang = (formData.get('lang') as string) === 'en' ? 'en' : 'mn';
  const t = await getLocaleMessages(lang, 'student');
  const tFunc = (key: string) => t[key] || key;
  const result = studentSchema(tFunc).safeParse({ ime });

  if (!result.success) {
    revalidatePath('/studenti/dodaj');
    const errors = result.error.flatten().fieldErrors;
    const formValues = { ime };
    redirect(createErrorRedirect('/studenti/dodaj', errors, formValues, lang));
  }

  try {
    await prisma.student.create({
      data: { ime },
    });
  } catch (error: any) {
    revalidatePath('/studenti');
    const message = error.code === 'P2002' ? 'errorExists' : 'errorGeneral';
    redirect(createFailureRedirect('/studenti', message, lang));
  }

  revalidatePath('/studenti');
  redirect(createSuccessRedirect('/studenti', 'successAdded', lang));
}

export const azurirajStudenta = async (formData: FormData) => {
  const { getLocaleMessages } = await import('@/i18n/i18n');
  const id = Number(formData.get('id'));
  const ime = formData.get('ime') as string;
  const lang = (formData.get('lang') as string) === 'en' ? 'en' : 'mn';

  const t = await getLocaleMessages(lang, 'student'); // Promijeni sa 'studenti' na 'student'
  const tFunc = (key: string) => t[key] || key;
  const result = studentSchema(tFunc).safeParse({ ime });

  if (!result.success) {
    const basePath = `/studenti/izmeni`;
    revalidatePath(basePath);
    const errors = result.error.flatten().fieldErrors;
    const formValues = { ime, studentId: id };
    redirect(createErrorRedirect(basePath, errors, formValues, lang));
  }

  try {
    await prisma.student.update({
      where: { id },
      data: { ime },
    });
  } catch (error: any) {
    revalidatePath('/studenti');
    const message = error.code === 'P2002' ? 'errorExists' : 'errorGeneral';
    redirect(createFailureRedirect('/studenti', message, lang));
  }

  revalidatePath('/studenti');
  redirect(createSuccessRedirect('/studenti', 'successUpdated', lang));
};


export async function obrisiStudenta(formData: FormData) {
  const id = Number(formData.get('id'));
  const lang = (formData.get('lang') as string) === 'en' ? 'en' : 'mn';

  try {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new Error('errorNotFound');
    }
    await prisma.student.delete({ where: { id } });
  } catch (error) {
    revalidatePath('/studenti');
    redirect(createFailureRedirect('/studenti', 'errorGeneral', lang));
  }

  revalidatePath('/studenti');
  redirect(createSuccessRedirect('/studenti', 'successDeleted', lang));
}
export default  traziStudenta;

async function traziStudenta(searchParams: { query: string }) {
  try {
    const students = await prisma.student.findMany({
      where: {
        ime: {
          contains: searchParams.query,
          mode: 'insensitive',
        },
      },
    });
    return students;
  } catch (error) {
    console.error("Greška pri pretrazi studenata:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

