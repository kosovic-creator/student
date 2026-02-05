'use client';

import { useTransition } from 'react';
import { handleSubmit } from '@/actions/student';

type ClearFormInputProps = {
  lang: string;
  placeholder?: string;
};

export function ClearFormInput({ lang, placeholder = 'Unesi tekst' }: ClearFormInputProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    startTransition(async () => {
      const formData = new FormData();
      formData.append('imeInputa', value);
      formData.append('lang', lang);

      await handleSubmit(formData);
    });
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      disabled={isPending}
      className="px-3 py-2 border rounded"
    />
  );
}
