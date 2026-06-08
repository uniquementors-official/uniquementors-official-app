import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { visible: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
    });
    return ok(testimonials);
  } catch (error) {
    console.error("testimonials get error", error);
    return fail("Unable to fetch testimonials", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const payload = testimonialSchema.parse(await request.json());
    const testimonial = await prisma.testimonial.create({ data: payload });
    return ok(testimonial, "Testimonial created.", { status: 201 });
  } catch (error) {
    console.error("testimonials post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid testimonial data", 422);
    return fail("Unable to create testimonial", 500);
  }
}
