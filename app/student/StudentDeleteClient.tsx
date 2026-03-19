"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import { useToast } from "@/components/ui/toast";
import { obrisiStudenta } from "@/actions/student_actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


type Props = {
  id: string | number;
  label: string;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
};

const initialState = { success: false, error: "", message: "" };

export default function StudentDeleteClient({
  id,
  label,
  onSuccess,
  onError,
}: Props) {
  const [state, formAction] = useActionState(obrisiStudenta, initialState);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(state.message || "Uspješno obrisano!", "success");
      if (onSuccess) onSuccess(state.message || "Uspješno obrisano!");
      setTimeout(() => router.refresh(), 1500);
    } else if (state.errors?.ime?.[0]) {
      toast(state.errors.ime[0], "error");
      if (onError) onError(state.errors.ime[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.message, state.errors]);

  return (
    <form action={formAction} className="inline">
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        className="text-red-600 hover:underline text-xs"
      >
        {label}
      </Button>
    </form>
  );
}
