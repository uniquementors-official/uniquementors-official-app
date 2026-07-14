import { ZodError } from "zod";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { createGalleryItem, getGalleryItems } from "@/lib/life-content";
import { galleryItemSchema } from "@/lib/validators";

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

    const items = await getGalleryItems({ includeDrafts: isAdmin });
    return ok(items);
  } catch (error) {
    console.error("gallery items get error", error);
    return fail("Unable to fetch gallery items", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = galleryItemSchema.parse(await request.json());
    const item = await createGalleryItem(payload);
    return ok(item, "Gallery item created.", { status: 201 });
  } catch (error) {
    console.error("gallery items post error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid gallery item data", 422);
    return fail("Unable to create gallery item", 500);
  }
}
