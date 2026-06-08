import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { eventSchema } from "@/lib/validators";
import { generateExcerpt, slugify } from "@/lib/utils";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
    const event = await prisma.event.findFirst({ where });
    if (!event) return fail("Event not found", 404);
    return ok(event);
  } catch (error) {
    console.error("event get error", error);
    return fail("Unable to fetch event", 500);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = eventSchema.partial().parse(await request.json());
    const existing = await prisma.event.findFirst({
      where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id }
    });

    if (!existing) return fail("Event not found", 404);

    const event = await prisma.event.update({
      where: { id: existing.id },
      data: {
        ...payload,
        slug: payload.slug || (payload.title ? slugify(payload.title) : undefined),
        excerpt: payload.excerpt || (payload.content ? generateExcerpt(payload.content) : undefined),
        eventDate: payload.eventDate ? new Date(payload.eventDate) : undefined
      }
    });

    return ok(event, "Event updated.");
  } catch (error) {
    console.error("event patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid event data", 422);
    return fail("Unable to update event", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const existing = await prisma.event.findFirst({
      where: isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id }
    });

    if (!existing) return fail("Event not found", 404);

    await prisma.event.delete({ where: { id: existing.id } });
    return ok({ id: existing.id }, "Event deleted.");
  } catch (error) {
    console.error("event delete error", error);
    return fail("Unable to delete event", 500);
  }
}
