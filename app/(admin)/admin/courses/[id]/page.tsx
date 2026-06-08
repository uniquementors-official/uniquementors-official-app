import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { CourseEditorForm } from "@/components/admin/CourseEditorForm";

export const dynamic = "force-dynamic";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
  const course = await prisma.course.findFirst({ where });
  if (!course) notFound();

  const mappedCourse = {
    ...course,
    coverImage: course.coverImage || "",
    imageAlt: course.title,
    status: course.status.toLowerCase() as any
  };

  return <CourseEditorForm course={mappedCourse as any} />;
}
