import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { studyAbroadSchema } from "@/lib/validators";
import { calculateReadTime, generateExcerpt, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const page = Math.max(Number(params.get("page") || 1), 1);
    const limit = Math.min(Math.max(Number(params.get("limit") || 10), 1), 50);
    const country = params.get("country") || undefined;
    const service = params.get("service") || undefined;
    const search = params.get("search") || undefined;
    const featured = params.get("featured");
    const includeDrafts = params.get("includeDrafts") === "true";
    const isAdmin = includeDrafts && Boolean(await requireAdmin().catch(() => null));

    const where = {
      ...(!isAdmin ? { status: "PUBLISHED" as const } : {}),
      ...(country ? { country } : {}),
      ...(service ? { service } : {}),
      ...(featured ? { featured: featured === "true" } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { excerpt: { contains: search, mode: "insensitive" as const } },
              { country: { contains: search, mode: "insensitive" as const } },
              { service: { contains: search, mode: "insensitive" as const } }
            ]
          }
        : {})
    };

    const [items, total] = await Promise.all([
      prisma.studyAbroad.findMany({
        where,
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.studyAbroad.count({ where })
    ]);

    return ok({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("study abroad get error", error);
    return fail("Unable to fetch study abroad posts", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = studyAbroadSchema.parse(await request.json());
    const post = await prisma.studyAbroad.create({
      data: {
        title: payload.title,
        slug: payload.slug || slugify(payload.title),
        content: payload.content,
        excerpt: payload.excerpt || generateExcerpt(payload.content),
        country: payload.country,
        service: payload.service,
        intake: payload.intake || undefined,
        tags: payload.tags,
        coverImage: payload.coverImage || undefined,
        metaTitle: payload.metaTitle || undefined,
        metaDesc: payload.metaDesc || undefined,
        status: payload.status,
        featured: payload.featured,
        readTime: calculateReadTime(payload.content),
        publishedAt: payload.status === "PUBLISHED" ? new Date(payload.publishedAt || Date.now()) : undefined
      }
    });
    return ok(post, "Study abroad post created.", { status: 201 });
  } catch (error) {
    console.error("study abroad post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid study abroad data", 422);
    return fail("Unable to create study abroad post", 500);
  }
}
