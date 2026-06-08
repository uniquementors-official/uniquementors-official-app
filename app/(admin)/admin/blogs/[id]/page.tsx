import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";

export const dynamic = "force-dynamic";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
  const post = await prisma.blog.findFirst({ where });
  if (!post) notFound();

  const mappedPost = {
    ...post,
    coverImage: post.coverImage || "",
    imageAlt: post.title,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : "",
    status: post.status.toLowerCase() as any
  };

  return <BlogEditorForm post={mappedPost} />;
}
