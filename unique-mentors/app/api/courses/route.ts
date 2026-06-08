import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { courseSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const examType = params.get("examType") || undefined;
    const profession = params.get("profession") || undefined;
    const country = params.get("country") || undefined;
    const featured = params.get("featured");
    const includeDrafts = params.get("includeDrafts") === "true";
    let isAdmin = false;
    if (includeDrafts) {
      const session = await requireAdmin().catch(() => null);
      if (session) {
        isAdmin = true;
      }
    }

    const courses = await prisma.course.findMany({
      where: {
        ...(!isAdmin ? { status: "PUBLISHED" } : {}),
        ...(examType ? { examTypes: { has: examType } } : {}),
        ...(profession ? { profession: { contains: profession, mode: "insensitive" } } : {}),
        ...(country ? { country: { contains: country, mode: "insensitive" } } : {}),
        ...(featured ? { featured: featured === "true" } : {})
      },
      orderBy: { title: "asc" }
    });
    return ok(courses);
  } catch (error) {
    console.error("courses get error", error);
    return fail("Unable to fetch courses", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = courseSchema.parse(await request.json());
    const course = await prisma.course.create({
      data: {
        title: payload.title,
        slug: payload.slug || slugify(payload.title),
        examType: payload.examType,
        examTypes: [payload.examType],
        profession: payload.profession,
        country: payload.country,
        duration: payload.duration,
        fees: payload.fees || undefined,
        mode: payload.mode,
        shortDescription: payload.shortDescription,
        description: payload.description,
        eligibility: payload.eligibility,
        highlights: payload.highlights,
        syllabus: payload.syllabus || "",
        coverImage: payload.coverImage || undefined,
        status: payload.status,
        featured: payload.featured
      }
    });
    return ok(course, "Course created.", { status: 201 });
  } catch (error) {
    console.error("courses post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid course data", 422);
    return fail("Unable to create course", 500);
  }
}
