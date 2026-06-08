import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { eventSchema } from "@/lib/validators";
import { generateExcerpt, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const page = Number(params.get("page") || 1);
    const limit = Math.min(Number(params.get("limit") || 10), 50);
    const search = params.get("search") || undefined;
    const includeDrafts = params.get("includeDrafts") === "true";

    // If requesting drafts, check admin authentication
    let isAdmin = false;
    if (includeDrafts) {
      const session = await requireAdmin();
      if (session) {
        isAdmin = true;
      }
    }

    const where = {
      ...(!isAdmin ? { status: "PUBLISHED" as const } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { excerpt: { contains: search, mode: "insensitive" as const } }
            ]
          }
        : {})
    };

    const [items, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { eventDate: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.event.count({ where })
    ]);

    return ok({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("events get error", error);
    return fail("Unable to fetch events", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = eventSchema.parse(await request.json());
    const content = payload.content;

    const event = await prisma.event.create({
      data: {
        title: payload.title,
        slug: payload.slug || slugify(payload.title),
        content,
        excerpt: payload.excerpt || generateExcerpt(content),
        eventDate: new Date(payload.eventDate),
        location: payload.location,
        coverImage: payload.coverImage || undefined,
        status: payload.status
      }
    });

    return ok(event, "Event created.", { status: 201 });
  } catch (error) {
    console.error("events post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid event data", 422);
    return fail("Unable to create event", 500);
  }
}
