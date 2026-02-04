import { dodajStudenta } from '@/actions/student';
import { FormWrapper, HiddenField, InputField } from '@/components/form';
import { getLocaleMessages } from '@/i18n/i18n';
import { extractErrors, getFieldValue } from '@/lib/helpers/url';
import { StudentSearchParams } from '@/lib/types';


const DodajStudenta = async ({
    searchParams,
}: {
    searchParams: Promise<StudentSearchParams>;
}) => {
    const params = await searchParams;
    const lang = params.lang === 'mn' ? 'mn' : 'en';
    const messages = await getLocaleMessages(lang, 'student');
    const errors = extractErrors(params);
    const formData: Record<string, string> = {
        ime: getFieldValue(params?.ime, undefined),
    };


    return (
        <>
            <FormWrapper
                title={messages.newStudent}
                action={dodajStudenta}
                submitLabel={messages.newStudent}
                cancelLabel={messages.cancel}
                cancelHref="/studenti"
                description={messages.form_description}
            >
                <HiddenField name="lang" value={lang} />

                <InputField
                    name="ime"
                    label={messages.name}
                    // placeholder={messages.name}
                    defaultValue={formData.ime}
                    error={errors.ime}
                    required
                />


            </FormWrapper>

        </>
    )
}

export default DodajStudenta