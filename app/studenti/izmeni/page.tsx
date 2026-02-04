import {ucitajStudentaId,azurirajStudenta} from '@/actions/student';
import { FormWrapper, InputField, HiddenField } from '@/components/form/FormComponents';
import { getLocaleMessages } from '@/i18n/i18n';
import { extractErrors, getFieldValue } from '@/lib/helpers/url';
import { StudentSearchParams } from '@/lib/types/searchParams';

export default async function IzmjeniGostaPage({ searchParams }: { searchParams: Promise<StudentSearchParams> }) {
    const params = await searchParams;
    const lang = params?.lang === 'mn' ? 'mn' : 'en';
    const t = await getLocaleMessages(lang, 'student');
    const commonMessages = await getLocaleMessages(lang, 'common');

    const id = Number(params.studentId ?? params.id);

    if ((!params.studentId && !params.id) || isNaN(id)) {
        return <div>{t.invalid_student_id}</div>;
    }

    const student = await ucitajStudentaId({ studentId: id });
    if (!student) {
        return <div>{t.student_not_found}</div>;
    }

    const errors = extractErrors(params);

    const formData: Record<string, string> = {
       ime: getFieldValue(params?.ime, student.ime),
    };

    return (
        <FormWrapper
            title={`${t.edit} - ID: ${student.id}`}
            action={azurirajStudenta}
            submitLabel={t.edit}
            cancelLabel={t.cancel}
            cancelHref="/studenti"
            description={commonMessages.form_description}
        >
            <HiddenField name="lang" value={lang} />
            <HiddenField name="id" value={student.id} />
            <InputField
                name="ime"
                label={t.ime}
                placeholder={t.ime}
                required
                defaultValue={formData.ime}
                error={errors.ime}
            />

        </FormWrapper>
    );
}