import { prisma } from "@/lib/db";

interface PageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PageProps) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true
    }
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
