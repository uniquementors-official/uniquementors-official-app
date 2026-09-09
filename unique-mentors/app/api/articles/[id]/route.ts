import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { articleSchema } from "@/lib/validators";
import { calculateReadTime, generateExcerpt, slugify } from "@/lib/utils";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
    const article = await prisma.article.findFirst({ where });
    if (!article) return fail("Article post not found", 404);
    await prisma.article.update({ where: { id: article.id }, data: { viewCount: { increment: 1 } } });
    return ok(article);
  } catch (error) {
    console.error("article get error", error);
    return fail("Unable to fetch article post", 500);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = articleSchema.partial().parse(await request.json());
    const existing = await prisma.article.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!existing) return fail("Article post not found", 404);

    const article = await prisma.article.update({
      where: { id: existing.id },
      data: {
        ...payload,
        slug: payload.slug || (payload.title ? slugify(payload.title) : undefined),
        excerpt: payload.excerpt || (payload.content ? generateExcerpt(payload.content) : undefined),
        readTime: payload.content ? calculateReadTime(payload.content) : undefined,
        publishedAt: payload.status === "PUBLISHED" ? new Date(payload.publishedAt || Date.now()) : undefined
      }
    });
    return ok(article, "Article post updated.");
  } catch (error) {
    console.error("article patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid article data", 422);
    return fail("Unable to update article post", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const existing = await prisma.article.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!existing) return fail("Article post not found", 404);
    await prisma.article.delete({ where: { id: existing.id } });
    return ok({ id: existing.id }, "Article post deleted.");
  } catch (error) {
    console.error("article delete error", error);
    return fail("Unable to delete article post", 500);
  }
}
