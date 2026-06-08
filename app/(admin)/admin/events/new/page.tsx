import Link from "next/link";
import { EventEditorForm } from "@/components/admin/EventEditorForm";
import { Icon } from "@/components/common/Icon";

export default function NewEventPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/events" className="rounded-md border p-2 hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Go back">
          <Icon name="ArrowLeft" className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="font-display text-2xl font-bold">New Event</h2>
          <p className="text-sm text-slate-500">Create a seminar, institutional event, quiz contest, or workshop.</p>
        </div>
      </div>
      <EventEditorForm />
    </div>
  );
}
