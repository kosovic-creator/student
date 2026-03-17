import { ucitajStudentaId } from '@/actions/student';
import { getLocaleMessages } from '@/i18n/i18n';
import { StudentSearchParams } from '@/lib/types/searchParams';
import { getServerLocale } from '@/lib/locale';
import IzmeniStudentaClient from './IzmeniStudentaClient';

export default async function IzmeniStudentaPage({ searchParams }: { searchParams: Promise<StudentSearchParams> }) {
    const params = await searchParams;
    const lang = await getServerLocale();
    const t = await getLocaleMessages(lang, 'student');
    const commonMessages = await getLocaleMessages(lang, 'common');

    const studentId = params.studentId;
    const id = Number(studentId);

    if ((!studentId) || isNaN(id)) {
        return <div>{t.invalid_student_id}</div>;
    }

    const student = await ucitajStudentaId({ studentId: id });
    if (!student) {
        return <div>{t.student_not_found}</div>;
    }

    return (
        <IzmeniStudentaClient messages={t as any} commonMessages={commonMessages as any} student={student} />
    );
}