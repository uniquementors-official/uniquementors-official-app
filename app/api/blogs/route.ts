import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { blogSchema } from "@/lib/validators";
import { calculateReadTime, generateExcerpt, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const page = Number(params.get("page") || 1);
    const limit = Math.min(Number(params.get("limit") || 10), 50);
    const category = params.get("category") || undefined;
    const search = params.get("search") || undefined;
    const featured = params.get("featured");
    const includeDrafts = params.get("includeDrafts") === "true";
    let isAdmin = false;
    if (includeDrafts) {
      const session = await requireAdmin().catch(() => null);
      if (session) {
        isAdmin = true;
      }
    }

    const where = {
      ...(!isAdmin ? { status: "PUBLISHED" as const } : {}),
      ...(category ? { category } : {}),
      ...(featured ? { featured: featured === "true" } : {}),
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
      prisma.blog.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.blog.count({ where })
    ]);
    return ok({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("blogs get error", error);
    return fail("Unable to fetch blog posts", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = blogSchema.parse(await request.json());
    const content = payload.content;
    const blog = await prisma.blog.create({
      data: {
        title: payload.title,
        slug: payload.slug || slugify(payload.title),
        content,
        excerpt: payload.excerpt || generateExcerpt(content),
        category: payload.category,
        tags: payload.tags,
        coverImage: payload.coverImage || undefined,
        metaTitle: payload.metaTitle || undefined,
        metaDesc: payload.metaDesc || undefined,
        status: payload.status,
        featured: payload.featured,
        readTime: calculateReadTime(content),
        publishedAt: payload.status === "PUBLISHED" ? new Date(payload.publishedAt || Date.now()) : undefined
      }
    });
    return ok(blog, "Blog post created.", { status: 201 });
  } catch (error) {
    console.error("blogs post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid blog data", 422);
    return fail("Unable to create blog post", 500);
  }
}
