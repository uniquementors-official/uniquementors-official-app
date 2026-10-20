import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { studyAbroadSchema } from "@/lib/validators";
import { calculateReadTime, generateExcerpt, slugify } from "@/lib/utils";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

function lookup(id: string) {
  return isUuid(id) ? { OR: [{ id }, { slug: id }] } : { slug: id };
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.studyAbroad.findFirst({ where: lookup(params.id) });
    if (!post) return fail("Study abroad post not found", 404);
    await prisma.studyAbroad.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } });
    return ok(post);
  } catch (error) {
    console.error("study abroad detail error", error);
    return fail("Unable to fetch study abroad post", 500);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = studyAbroadSchema.partial().parse(await request.json());
    const existing = await prisma.studyAbroad.findFirst({ where: lookup(params.id) });
    if (!existing) return fail("Study abroad post not found", 404);

    const post = await prisma.studyAbroad.update({
      where: { id: existing.id },
      data: {
        ...payload,
        intake: payload.intake || undefined,
        coverImage: payload.coverImage || undefined,
        metaTitle: payload.metaTitle || undefined,
        metaDesc: payload.metaDesc || undefined,
        slug: payload.slug || (payload.title ? slugify(payload.title) : undefined),
        excerpt: payload.excerpt || (payload.content ? generateExcerpt(payload.content) : undefined),
        readTime: payload.content ? calculateReadTime(payload.content) : undefined,
        publishedAt: payload.status === "PUBLISHED" ? new Date(payload.publishedAt || Date.now()) : undefined
      }
    });
    return ok(post, "Study abroad post updated.");
  } catch (error) {
    console.error("study abroad patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid study abroad data", 422);
    return fail("Unable to update study abroad post", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const existing = await prisma.studyAbroad.findFirst({ where: lookup(params.id) });
    if (!existing) return fail("Study abroad post not found", 404);
    await prisma.studyAbroad.delete({ where: { id: existing.id } });
    return ok({ id: existing.id }, "Study abroad post deleted.");
  } catch (error) {
    console.error("study abroad delete error", error);
    return fail("Unable to delete study abroad post", 500);
  }
}
