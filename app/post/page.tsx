import  prisma  from "@/lib/prisma";
import Form from "./Form"

// Add type for Form props to accept 't'


// Type assertion for Form usage

import { getLocaleMessages } from '@/i18n/i18n';
import { getServerLocale } from '@/lib/locale';

export default async function Page() {

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  })
const lang = await getServerLocale();
const t = await getLocaleMessages(lang, 'post');
  return (
    <div>
      <h1>{t["title"]}</h1>

      <Form  t={t} />

      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}