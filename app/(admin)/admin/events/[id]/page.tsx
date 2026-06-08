import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EventEditorForm } from "@/components/admin/EventEditorForm";
import { Icon } from "@/components/common/Icon";

export const dynamic = "force-dynamic";

function isUuid(value: string) {
  return /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value);
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const where = isUuid(params.id) ? { OR: [{ id: params.id }, { slug: params.id }] } : { slug: params.id };
  const event = await prisma.event.findFirst({ where });
  if (!event) notFound();

  const mappedEvent = {
    ...event,
    eventDate: event.eventDate.toISOString(),
    coverImage: event.coverImage || "",
    status: event.status as "DRAFT" | "PUBLISHED"
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/events" className="rounded-md border p-2 hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Go back">
          <Icon name="ArrowLeft" className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="font-display text-2xl font-bold">Edit Event</h2>
          <p className="text-sm text-slate-500">Update event details, summary, date, location or cover image.</p>
        </div>
      </div>
      <EventEditorForm event={mappedEvent} />
    </div>
  );
}
