import { InstructorsAdmin } from "@/components/admin/InstructorsAdmin";
import { getInstructors } from "@/lib/life-content";

export const dynamic = "force-dynamic";

export default async function AdminInstructorsPage() {
  const instructors = await getInstructors({ includeDrafts: true });
  return <InstructorsAdmin initialItems={instructors} />;
}
