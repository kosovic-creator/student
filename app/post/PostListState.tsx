/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/toast";
import { deletePost } from "@/actions/post";

type Post = {
  id: number | string;
  title: string;
};

type Props = {
  posts: Post[];
  t: any;
};

export default function PostList({ posts, t }: Props) {
  const [postList, setPostList] = useState(posts);
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      const res = await deletePost(Number(id));
      if (res?.success) {
        toast(res.message, "success");
        setPostList((prev) => prev.filter((p) => p.id !== Number(id)));
      } else if (res?.error) {
        toast(res.error, "error");
      }
    });
  };

  // expose addPost for parent
  const addPost = (post: Post) => {
    setPostList((prev) => [post, ...prev]);
  };

  // For parent to access addPost
  return { postList, addPost, handleDelete, isPending };
}
