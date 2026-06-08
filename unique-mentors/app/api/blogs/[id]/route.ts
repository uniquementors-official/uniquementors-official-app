import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { blogSchema } from "@/lib/validators";
import { calculateReadTime, generateExcerpt, slugify } from "@/lib/utils";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
    const blog = await prisma.blog.findFirst({ where });
    if (!blog) return fail("Blog post not found", 404);
    await prisma.blog.update({ where: { id: blog.id }, data: { viewCount: { increment: 1 } } });
    return ok(blog);
  } catch (error) {
    console.error("blog get error", error);
    return fail("Unable to fetch blog post", 500);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = blogSchema.partial().parse(await request.json());
    const existing = await prisma.blog.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!existing) return fail("Blog post not found", 404);

    const blog = await prisma.blog.update({
      where: { id: existing.id },
      data: {
        ...payload,
        slug: payload.slug || (payload.title ? slugify(payload.title) : undefined),
        excerpt: payload.excerpt || (payload.content ? generateExcerpt(payload.content) : undefined),
        readTime: payload.content ? calculateReadTime(payload.content) : undefined,
        publishedAt: payload.status === "PUBLISHED" ? new Date(payload.publishedAt || Date.now()) : undefined
      }
    });
    return ok(blog, "Blog post updated.");
  } catch (error) {
    console.error("blog patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid blog data", 422);
    return fail("Unable to update blog post", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const existing = await prisma.blog.findFirst({ where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id } });
    if (!existing) return fail("Blog post not found", 404);
    await prisma.blog.delete({ where: { id: existing.id } });
    return ok({ id: existing.id }, "Blog post deleted.");
  } catch (error) {
    console.error("blog delete error", error);
    return fail("Unable to delete blog post", 500);
  }
}
