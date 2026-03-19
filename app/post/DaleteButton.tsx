/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useToast } from "@/components/ui/toast";
import { deletePost } from "@/actions/post";
import { useState, useTransition } from "react";

type Post = {
  id: number | string;
  title: string;
};

type Props = {
  posts: Post[];
  t: any;
};

export default function DeleteButton({ posts, t }: Props) {
  const [postList, setPostList] = useState(posts);
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      const res = await deletePost(Number(id));
      if (res?.success) {
        toast(res.message, "success");
        setPostList((prev) => prev.filter((p) => p.id !== id)); // <- ažuriraj listu!
      } else if (res?.error) {
        toast(res.error, "error");
      }
    });
  };

  return (
    <ul>
      {postList.map((post) => (
        <li key={post.id} className="flex items-center gap-2">
          <span>{post.title}</span>
          <button
            type="button"
            onClick={() => handleDelete(post.id)}
            disabled={isPending}
            className="text-red-600 hover:underline text-xs"
            title={t["delete"] || "Obriši"}
          >
            {t["delete"] || "Obriši"}
          </button>
        </li>
      ))}
    </ul>
  );
}