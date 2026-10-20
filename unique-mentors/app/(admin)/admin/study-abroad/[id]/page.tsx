import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { StudyAbroadEditorForm } from "@/components/admin/StudyAbroadEditorForm";

export const dynamic = "force-dynamic";

export default async function EditStudyAbroadPage({ params }: { params: { id: string } }) {
  const post = await prisma.studyAbroad.findFirst({ where: { OR: [{ id: params.id }, { slug: params.id }] } });
  if (!post) notFound();
  return <StudyAbroadEditorForm post={{ ...post, coverImage: post.coverImage || "", imageAlt: post.title, intake: post.intake || "", publishedAt: post.publishedAt?.toISOString() || "", status: post.status.toLowerCase() as "draft" | "published" }} />;
}
