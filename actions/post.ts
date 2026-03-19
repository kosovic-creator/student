/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getLocaleMessages } from '@/i18n/i18n';
import { postSchema } from '@/app/validacija/postSchema';
import { getServerLocale } from '@/lib/locale';
import { error } from "console";

export async function createPost(prevState: any, formData: FormData) {

  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'post');
  const schema = postSchema((key) => t[key]);

  const title = formData.get("title") as string;
  const result = schema.safeParse({
    title: formData.get("title")
  });

  if (title === "greška") {
    return {
      error:  t["error_server"], success: false, message: ""
    };
  }
  if (!result.success) {
    return {
      error: t["error"], success: false, message: ""
    };
  }

  const noviPost = await prisma.post.create({
    data: {
      title: result.data.title
    }
  });

  revalidatePath("/");
  return { success: true, message: t["success_create"], post: noviPost };
}
export async function deletePost(id: number) {
  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'post');
  try {
    const post = await prisma.post.findUnique({ where: { id: String(id) } });
    if (!post) {
      return { error: t["error_server"], success: false, message: "" };
    }
    await prisma.post.delete({ where: { id: String(id) } });
    revalidatePath("/");
    return { success: true, message: t["success_delete"] };
  } catch {
    return { error: t["error_server"], success: false, message: "" };
  }
}