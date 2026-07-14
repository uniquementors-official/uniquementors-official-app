import { ZodError } from "zod";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { createInstructor, getInstructors } from "@/lib/life-content";
import { instructorSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const includeDrafts = params.get("includeDrafts") === "true";
    let isAdmin = false;

    if (includeDrafts) {
      const session = await requireAdmin().catch(() => null);
      isAdmin = Boolean(session);
    }

    const instructors = await getInstructors({ includeDrafts: isAdmin });
    return ok(instructors);
  } catch (error) {
    console.error("instructors get error", error);
    return fail("Unable to fetch instructors", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = instructorSchema.parse(await request.json());
    const instructor = await createInstructor(payload);
    return ok(instructor, "Instructor created.", { status: 201 });
  } catch (error) {
    console.error("instructors post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid instructor data", 422);
    return fail("Unable to create instructor", 500);
  }
}
