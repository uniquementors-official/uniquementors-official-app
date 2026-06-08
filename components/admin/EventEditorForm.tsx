"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SEOPreview } from "@/components/admin/SEOPreview";
import { Icon } from "@/components/common/Icon";

type EventEditorFormProps = {
  event?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    eventDate: string;
    location: string;
    coverImage?: string;
    status: "DRAFT" | "PUBLISHED";
  };
};

const formatDatetimeLocal = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export function EventEditorForm({ event }: EventEditorFormProps) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [slug, setSlug] = useState(event?.slug ?? "");
  const [content, setContent] = useState(event?.content ?? "<p></p>");
  const [excerpt, setExcerpt] = useState(event?.excerpt ?? "");
  const [eventDate, setEventDate] = useState(event?.eventDate ? formatDatetimeLocal(event.eventDate) : "");
  const [location, setLocation] = useState(event?.location ?? "Unique Mentors Kochi");
  const [coverImage, setCoverImage] = useState(event?.coverImage ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(event?.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT");
  const [saving, setSaving] = useState(false);

  const previewSlug = useMemo(() => slug || slugify(title), [slug, title]);

  async function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!eventDate) {
      toast.error("Event Date is required");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(event ? `/api/events/${event.id}` : "/api/events", {
        method: event ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: previewSlug,
          content,
          excerpt,
          eventDate: new Date(eventDate).toISOString(),
          location,
          coverImage,
          status
        })
      });
      const result = (await response.json()) as { success: boolean; error?: string };
      if (!result.success) throw new Error(result.error || "Save failed");
      toast.success(event ? "Event updated." : "Event created.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save event.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div className="surface p-5">
          <Label htmlFor="event-title">Event Title</Label>
          <Input id="event-title" className="mt-2 text-lg font-semibold" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Label htmlFor="event-slug" className="mt-5 block">
            Slug
          </Label>
          <Input id="event-slug" className="mt-2" value={previewSlug} onChange={(e) => setSlug(e.target.value)} />
          <p className="mt-2 text-xs text-slate-500">Preview URL: /events/{previewSlug}</p>
        </div>
        <div className="surface p-5">
          <Label>Event Content Details</Label>
          <div className="mt-2">
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>
        <div className="surface p-5">
          <Label htmlFor="event-excerpt">Short Excerpt Summary</Label>
          <Textarea id="event-excerpt" className="mt-2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
        </div>
      </div>
      <aside className="space-y-5 xl:sticky xl:top-24 xl:h-max">
        <div className="surface p-5">
          <h2 className="font-display text-xl font-bold">Publish</h2>
          <div className="mt-4 space-y-4">
            <label className="flex items-center justify-between gap-3 text-sm font-semibold">
              Status
              <select className="rounded-md border border-input bg-background px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </label>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Save" className="h-4 w-4" />}
              {status === "PUBLISHED" ? "Publish" : "Save Draft"}
            </Button>
          </div>
        </div>
        <div className="surface p-5 space-y-4">
          <div>
            <Label htmlFor="event-date">Event Date & Time</Label>
            <Input id="event-date" type="datetime-local" className="mt-2" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="event-location">Location</Label>
            <Input id="event-location" className="mt-2" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
        </div>
        <div className="surface p-5">
          <h2 className="mb-4 font-display text-xl font-bold">Cover Image</h2>
          <ImageUpload value={coverImage} onChange={setCoverImage} />
        </div>
        <div className="surface p-5">
          <h2 className="font-display text-xl font-bold">SEO Preview</h2>
          <div className="mt-4">
            <SEOPreview title={title} description={excerpt} slug={`events/${previewSlug}`} />
          </div>
        </div>
      </aside>
    </form>
  );
}
