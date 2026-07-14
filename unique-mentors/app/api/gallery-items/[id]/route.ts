import { ZodError } from "zod";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { deleteGalleryItem, getGalleryItemById, updateGalleryItem } from "@/lib/life-content";
import { galleryItemSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const existing = await getGalleryItemById(params.id);
    if (!existing) return fail("Gallery item not found", 404);

    const payload = galleryItemSchema.partial().parse(await request.json());
    const item = await updateGalleryItem(params.id, {
      title: payload.title ?? existing.title,
      description: payload.description ?? existing.description,
      image: payload.image ?? existing.image,
      imageAlt: payload.imageAlt ?? existing.imageAlt,
      sortOrder: payload.sortOrder ?? existing.sortOrder,
      status: payload.status ?? existing.status
    });

    return ok(item, "Gallery item updated.");
  } catch (error) {
    console.error("gallery item patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid gallery item data", 422);
    return fail("Unable to update gallery item", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    await deleteGalleryItem(params.id);
    return ok({ id: params.id }, "Gallery item deleted.");
  } catch (error) {
    console.error("gallery item delete error", error);
    return fail("Unable to delete gallery item", 500);
  }
}
