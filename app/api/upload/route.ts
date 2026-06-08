import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return fail("Image file is required", 422);
    if (!allowedTypes.has(file.type)) return fail("Only JPG, PNG, WebP and GIF images are allowed", 422);
    if (file.size > maxSize) return fail("Image must be 5MB or smaller", 422);

    const result = await uploadImage(file, "unique-mentors");
    return ok({ url: result.secureUrl, publicId: result.publicId, width: result.width, height: result.height }, "Image uploaded.");
  } catch (error) {
    console.error("upload error", error);
    return fail("Unable to upload image", 500);
  }
}
