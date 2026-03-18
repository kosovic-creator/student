/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { z } from "zod"
import  prisma  from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const schema = z.object({
  title: z.string().min(3)
})

export async function createPost(prevState: any, formData: FormData) {
  const result = schema.safeParse({
    title: formData.get("title")
  })

  if (!result.success) {
    return {
      error: "Title must be at least 3 characters"
    }
  }

  await prisma.post.create({
    data: {
      title: result.data.title
    }
  })

  revalidatePath("/")

  return { success: true }
}