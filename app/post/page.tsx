
import prisma from "@/lib/prisma";
// import Form from "./Form";
import { getLocaleMessages } from '@/i18n/i18n';
import { getServerLocale } from '@/lib/locale';

type Post = {
  id: number;
  title: string;
  createdAt: Date;
}
import Form from "./Form";
import DeleteButton from "./DaleteButton";

export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });
  const lang = await getServerLocale();
  const t = await getLocaleMessages(lang, 'post');
  return (
    <div>
      <h1>{t["title"]}</h1>
      {/* Form za dodavanje posta */}
      {/* <Form t={t} /> */}
      <DeleteButton posts={posts} t={t} /* onDelete={id => { ... }} */ />
      <Form t={t} />
     {/* <PostListClient posts={posts} t={t} /> */}
     {/* <PostList posts={posts} t={t} /> */}
    </div>
  );
}