import { ZodError } from "zod";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { deleteInstructor, getInstructorById, updateInstructor } from "@/lib/life-content";
import { instructorSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const existing = await getInstructorById(params.id);
    if (!existing) return fail("Instructor not found", 404);

    const payload = instructorSchema.partial().parse(await request.json());
    const instructor = await updateInstructor(params.id, {
      name: payload.name ?? existing.name,
      slug: payload.slug ?? existing.slug,
      designation: payload.designation ?? existing.designation,
      bio: payload.bio ?? existing.bio,
      image: payload.image ?? existing.image,
      imageAlt: payload.imageAlt ?? existing.imageAlt,
      sortOrder: payload.sortOrder ?? existing.sortOrder,
      status: payload.status ?? existing.status
    });

    return ok(instructor, "Instructor updated.");
  } catch (error) {
    console.error("instructor patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid instructor data", 422);
    return fail("Unable to update instructor", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    await deleteInstructor(params.id);
    return ok({ id: params.id }, "Instructor deleted.");
  } catch (error) {
    console.error("instructor delete error", error);
    return fail("Unable to delete instructor", 500);
  }
}
