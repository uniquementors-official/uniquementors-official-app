import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { courseSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const course = await prisma.course.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!course) return fail("Course not found", 404);
    await prisma.course.update({ where: { id: course.id }, data: { viewCount: { increment: 1 } } });
    return ok(course);
  } catch (error) {
    console.error("course get error", error);
    return fail("Unable to fetch course", 500);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const payload = courseSchema.partial().parse(await request.json());
    const existing = await prisma.course.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!existing) return fail("Course not found", 404);
    const course = await prisma.course.update({
      where: { id: existing.id },
      data: {
        ...payload,
        slug: payload.slug || (payload.title ? slugify(payload.title) : undefined),
        examTypes: payload.examType ? [payload.examType] : undefined
      }
    });
    return ok(course, "Course updated.");
  } catch (error) {
    console.error("course patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid course data", 422);
    return fail("Unable to update course", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const existing = await prisma.course.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!existing) return fail("Course not found", 404);
    await prisma.course.delete({ where: { id: existing.id } });
    return ok({ id: existing.id }, "Course deleted.");
  } catch (error) {
    console.error("course delete error", error);
    return fail("Unable to delete course", 500);
  }
}
