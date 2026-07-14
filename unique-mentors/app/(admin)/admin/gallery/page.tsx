import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { getGalleryItems } from "@/lib/life-content";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await getGalleryItems({ includeDrafts: true });
  return <GalleryAdmin initialItems={items} />;
}
