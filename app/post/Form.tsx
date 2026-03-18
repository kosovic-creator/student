"use client"

import { useActionState } from "react"
import { createPost } from "@/actions/post"

const initialState = {
  error: undefined,
  success: false,
}

export default function Form() {

  const [state, formAction, pending] =
    useActionState(createPost, initialState)

  return (
    <form action={formAction}>

      <input
        name="title"
        placeholder="Post title"
      />

      <button disabled={pending}>
        {pending ? "Creating..." : "Create"}
      </button>

      {state?.error && (
        <p style={{color:"red"}}>
          {state.error}
        </p>
      )}

      {state?.success && (
        <p>Post created!</p>
      )}

    </form>
  )
}