/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLocaleMessages } from '@/i18n/i18n';
import { studentSchema } from '@/app/validacija/studentSchema';
import { getServerLocale } from '@/lib/locale';


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
export async function dodajStudenta(
  prevState: {
    success: boolean;
    errors?: { ime?: string[] };
    values?: { ime?: string };
    message?: string;
  },
  formData: FormData
) {
  const ime = formData.get('ime') as string;
  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'student');
  const result = studentSchema((key: string) => t[key] || key).safeParse({ ime });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, errors, values: { ime } };
  }

  try {
    await prisma.student.create({
      data: { ime },
    });
    revalidatePath('/studenti');
    return { success: true, message: t.success_create };
  } catch (error: any) {
    revalidatePath('/studenti');
    const message = error.code === 'P2002' ? t.student_already_exists : t.student_create_error;
    return { success: false, errors: { ime: [message] }, values: { ime } };
  }
}


export async function izmeniStudenta(
  prevState: {
    success: boolean;
    errors?: { ime?: string[] };
    values?: { ime?: string; studentId?: number };
    message?: string;
  },
  formData: FormData
) {
  const id = Number(formData.get('studentId'));
  const ime = formData.get('ime') as string;
  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'student');
  const result = studentSchema((key: string) => t[key] || key).safeParse({ ime });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, errors, values: { ime, studentId: id } };
  }

  try {
    await prisma.student.update({
      where: { id },
      data: { ime },
    });
    revalidatePath('/studenti');
    return { success: true, message: t.success_update };
  } catch (error: any) {
    revalidatePath('/studenti');
    const message = error.code === 'P2002' ? t.student_already_exists : t.student_update_error;
    return { success: false, errors: { ime: [message] }, values: { ime, studentId: id } };
  }
}


export async function obrisiStudenta(
  prevState: {
    success: boolean;
    message?: string;
    error?: string;
  },
  formData: FormData
) {
  const id = Number(formData.get('id'));
  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'student');
  try {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return { success: false as false, error: t.student_not_found };
    }
    await prisma.student.delete({ where: { id } });
    revalidatePath('/studenti');
    return { success: true as true, message: t.student_delete_success };
  } catch (error) {
    revalidatePath('/studenti');
    return { success: false as false, error: t.student_delete_error };
  }
}

export default traziStudenta;

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
export async function handleSubmit(formData: FormData) {
  const inputValue = formData.get("imeInputa"); // npr. name="imeInputa"
  const params = new URLSearchParams();
  params.append('query', inputValue as string);
  revalidatePath('/studenti');
  redirect(`/studenti?${params.toString()}`);
}
