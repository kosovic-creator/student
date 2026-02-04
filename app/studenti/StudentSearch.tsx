'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useRef } from 'react';
import { X } from 'lucide-react';

export function StudentSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('query')?.toString() || '';

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
        placeholder={placeholder}
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