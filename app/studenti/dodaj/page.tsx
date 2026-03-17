/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocaleMessages } from '@/i18n/i18n';
import { getServerLocale } from '@/lib/locale';
import DodajStudentaClient from './DodajStudentaClient';

const DodajStudenta = async () => {
    const lang = await getServerLocale();
    const messages = await getLocaleMessages(lang, 'student');
    return <DodajStudentaClient messages={messages as any} />;
}

export default DodajStudenta;