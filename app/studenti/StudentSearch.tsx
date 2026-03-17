/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function StudentSearch() {
  const { t } = useTranslation('student');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('query')?.toString() || '';
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    startTransition(() => {
      router.replace(`/studenti?${params.toString()}`);
    });
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    handleSearch('');
  };

  return (
    <div className="relative max-w-sm">
      <Input
        ref={inputRef}
        placeholder={hydrated ? t('search') : 'Search...'}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={query}
        className="pr-10"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}