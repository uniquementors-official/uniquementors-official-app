import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArticleEditorForm } from "@/components/admin/ArticleEditorForm";

export const dynamic = "force-dynamic";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
  const post = await prisma.article.findFirst({ where });
  if (!post) notFound();

  const mappedPost = {
    ...post,
    coverImage: post.coverImage || "",
    imageAlt: post.title,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : "",
    status: post.status.toLowerCase() as any
  };

  return <ArticleEditorForm post={mappedPost} />;
}
