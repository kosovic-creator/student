"use client";
import { useState, useEffect, useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { obrisiStudenta } from "@/actions/student";
import { Button } from "@/components/ui/button";

type Props = {
  id: string | number;
  label: string;
  confirmTitle: string;
  confirmBody: string;
  cancelLabel: string;
  confirmLabel: string;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
};

type DeleteState =
  | { success: false; error: string; message?: undefined }
  | { success: true; message: string; error?: undefined };

const initialState: DeleteState = { success: false, error: "" };

export function StudentDeleteButtonClient({
  id,
  label,
  confirmTitle,
  confirmBody,
  cancelLabel,
  confirmLabel,
  onSuccess,
  onError,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState<DeleteState, FormData>(obrisiStudenta, initialState);
  const [isPending, startTransition] = useTransition();

  // Pozovi callback na success/error
  useEffect(() => {
    if (state.success && state.message) {
      if (onSuccess) onSuccess(state.message);
    } else if (!state.success && state.error) {
      if (onError) onError(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.message, state.error]);

  return (
    <>
      {/* Toast notifikacije */}
      <form
        action={formAction}
        className="inline"
        onSubmit={() => setIsOpen(false)}
      >
        <input type="hidden" name="id" value={id} />
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
                  {cancelLabel}
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={isPending}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
