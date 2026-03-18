import  prisma  from "@/lib/prisma";
import Form from "./Form"

export default async function Page() {

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <h1>Posts</h1>

      <Form />

      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}