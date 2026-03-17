"use client";
import { useActionState } from "react";
import { izmeniStudenta } from "@/actions/student";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessMessage } from "@/app/components/SuccessMessage";

type State = {
  success: boolean;
  errors?: { ime?: string[] };
  values?: { ime?: string; studentId?: number };
  message?: string;
};

type Messages = {
  edit: string;
  cancel: string;
  form_description: string;
  ime: string;
  student_update_success: string;
  student_not_found?: string;
  invalid_student_id?: string;
};

type CommonMessages = {
  form_description: string;
};

const initialState: State = { success: false, errors: {}, values: {}, message: "" };

export default function IzmeniStudentaClient({ messages, commonMessages, student }:{ messages: Messages, commonMessages: CommonMessages, student: { id: number, ime: string } }) {
  const [state, formAction] = useActionState(izmeniStudenta, initialState);

  return (
    <form action={formAction} className="max-w-md mx-auto space-y-6 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{messages.edit} - ID: {student.id}</h1>
      <p className="text-gray-500 mb-4">{commonMessages.form_description}</p>
      <input type="hidden" name="studentId" value={student.id} />
      <div>
        <label htmlFor="ime" className="block text-sm font-medium mb-1">{messages.ime}</label>
        <Input
          id="ime"
          name="ime"
          placeholder={messages.ime}
          defaultValue={state.values?.ime ?? student.ime}
          required
          aria-invalid={!!state.errors?.ime}
        />
        {state.errors?.ime && (
          <div className="text-red-600 text-sm mt-1">{state.errors.ime[0]}</div>
        )}
      </div>
          {state.success && <SuccessMessage>{messages.student_update_success}</SuccessMessage>}
        {!state.success && state.message && <SuccessMessage message={state.message} type="error" />}
      <div className="flex gap-2 mt-4">
        <Button type="submit">{messages.edit}</Button>
        <Button type="button" variant="outline" onClick={() => window.location.href = "/studenti"}>
          {messages.cancel}
        </Button>
      </div>
    </form>
  );
}
