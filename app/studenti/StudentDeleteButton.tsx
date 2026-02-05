'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { obrisiStudenta } from '@/actions/student';

type StudentDeleteButtonProps = {
  id: string | number;
  lang: string;
  label: string;
  confirmTitle: string;
  confirmBody: string;
  cancelLabel: string;
  confirmLabel: string;
};

export function StudentDeleteButton({
  id,
  lang,
  label,
  confirmTitle,
  confirmBody,
  cancelLabel,
  confirmLabel,
}: StudentDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const safeConfirmLabel = confirmLabel?.trim() || label || 'Potvrdi';
  const safeCancelLabel = cancelLabel?.trim() || 'Otkaži';

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <form
      action={obrisiStudenta}
      className="inline"
      onSubmit={() => setIsSubmitting(true)}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="lang" value={lang} />
      <Button
        variant="ghost"
        type="button"
        size="sm"
        aria-label={label}
        title={label}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-student-title-${id}`}
            aria-describedby={`delete-student-desc-${id}`}
            className="relative z-10 w-[90vw] max-w-md rounded-lg bg-background p-6 shadow-lg"
          >
            <h3
              id={`delete-student-title-${id}`}
              className="text-lg font-semibold"
            >
              {confirmTitle}
            </h3>
            <p
              id={`delete-student-desc-${id}`}
              className="mt-2 text-sm text-muted-foreground"
            >
              {confirmBody}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                {safeCancelLabel}
              </Button>
              <Button
                type="submit"
                variant="destructive"
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isSubmitting}
              >
                {safeConfirmLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
