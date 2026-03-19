/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useActionState, useEffect } from "react"
import { useToast } from "@/components/ui/toast"
import { createPost } from "@/actions/post"

const initialState = {
  error: undefined,
  success: false,
  message: "",
}
type Props = {
  t: any;

};

export default function Form({ t }: Props) {
  const [state, formAction, pending] = useActionState(async (prev: any, formData: FormData) => {
    const res = await createPost(prev, formData);
    if (res?.success && res.post) {
      // addPost(res.post);
    }
    return res;
  }, initialState);
  const toast = useToast();

  useEffect(() => {
    if (state?.success && state.message) {
      toast(state.message, "success");
    } else if (state?.error) {
      toast(state.error, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.success, state?.error, state?.message]);

  return (
    <form action={formAction}>
      <input
        name="title"
        placeholder={t["title"]}
      />
      <button disabled={pending}>
        {pending ? t["creating"] : t["create"]}
      </button>
      {/* Poruke se prikazuju kao toast notifikacije */}
    </form>
  );
}