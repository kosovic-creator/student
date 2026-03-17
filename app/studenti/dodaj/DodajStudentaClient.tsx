"use client";
import { useActionState, useEffect } from "react";
import { dodajStudenta } from "@/actions/student";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type State = {
  success: boolean;
  errors?: { ime?: string[] };
  values?: { ime?: string };
  message?: string;
};

type Messages = {
  newStudent: string;
  cancel: string;
  form_description: string;
  name: string;
  student_create_success: string;
};

const initialState: State = { success: false, errors: {}, values: {}, message: "" };

export default function DodajStudentaClient({ messages }: { messages: Messages }) {
  const [state, formAction] = useActionState(dodajStudenta, initialState);
    const toast = useToast();
  useEffect(() => {
    if (state.success) {
        toast(messages.student_create_success, "success");
      const timeout = setTimeout(() => {
        window.location.href = "/studenti";
      }, 1500);
      return () => clearTimeout(timeout);
    } else if (state.message) {
        toast(state.message, "error");
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.message]);

  return (
    <form action={formAction} className="max-w-md mx-auto space-y-6 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{messages.newStudent}</h1>
      <p className="text-gray-500 mb-4">{messages.form_description}</p>
      <div>
        <label htmlFor="ime" className="block text-sm font-medium mb-1">{messages.name}</label>
        <Input
          id="ime"
          name="ime"
          defaultValue={state.values?.ime || ""}
          required
          aria-invalid={!!state.errors?.ime}
        />
        {state.errors?.ime && (
          <div className="text-red-600 text-sm mt-1">{state.errors.ime[0]}</div>
        )}
      </div>
          {/* Toast notifikacije */}
      <div className="flex gap-2 mt-4">
        <Button type="submit">{messages.newStudent}</Button>
        <Button type="button" variant="outline" onClick={() => window.location.href = "/studenti"}>
          {messages.cancel}
        </Button>
      </div>
    </form>
  );
}
