import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const payload = testimonialSchema.partial().parse(await request.json());
    const testimonial = await prisma.testimonial.update({ where: { id: params.id }, data: payload });
    return ok(testimonial, "Testimonial updated.");
  } catch (error) {
    console.error("testimonial patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid testimonial data", 422);
    return fail("Unable to update testimonial", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    await prisma.testimonial.delete({ where: { id: params.id } });
    return ok({ id: params.id }, "Testimonial deleted.");
  } catch (error) {
    console.error("testimonial delete error", error);
    return fail("Unable to delete testimonial", 500);
  }
}
