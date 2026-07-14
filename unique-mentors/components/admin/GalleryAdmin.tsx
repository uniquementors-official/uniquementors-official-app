"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { ApiResponse } from "@/lib/api";
import type { GalleryItem } from "@/types";

type GalleryForm = {
  id?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

const blankForm: GalleryForm = {
  title: "",
  description: "",
  image: "",
  imageAlt: "",
  sortOrder: 0,
  status: "PUBLISHED"
};

function toForm(item: GalleryItem): GalleryForm {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt ?? "",
    sortOrder: item.sortOrder,
    status: item.status
  };
}

export function GalleryAdmin({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<GalleryForm>(blankForm);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const sortedItems = useMemo(() => [...items].sort((a, b) => a.sortOrder - b.sortOrder), [items]);

  function updateForm<K extends keyof GalleryForm>(key: K, value: GalleryForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankForm);
    setOpen(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const endpoint = form.id ? `/api/gallery-items/${form.id}` : "/api/gallery-items";
    const method = form.id ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = (await response.json()) as ApiResponse<GalleryItem>;

      if (!result.success || !result.data) throw new Error(result.error || "Unable to save gallery item");
      const savedItem = result.data;

      setItems((current) => {
        if (form.id) return current.map((item) => (item.id === savedItem.id ? savedItem : item));
        return [savedItem, ...current];
      });
      toast.success(result.message || "Gallery item saved.");
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save gallery item");
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(item: GalleryItem) {
    if (!window.confirm(`Delete "${item.title}" from Life @ Unique Mentors?`)) return;

    try {
      const response = await fetch(`/api/gallery-items/${item.id}`, { method: "DELETE" });
      const result = (await response.json()) as ApiResponse<{ id: string }>;
      if (!result.success) throw new Error(result.error || "Unable to delete gallery item");
      setItems((current) => current.filter((galleryItem) => galleryItem.id !== item.id));
      toast.success(result.message || "Gallery item deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete gallery item");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Life @ Unique Mentors</h2>
          <p className="text-sm text-slate-500">Manage gallery photos, titles and bottom-edge overlay descriptions.</p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setForm(blankForm);
            setOpen((current) => !current);
          }}
        >
          <Icon name={open ? "X" : "Plus"} className="h-4 w-4" />
          {open ? "Close" : "Add Gallery Item"}
        </Button>
      </div>

      {open ? (
        <form onSubmit={submit} className="surface grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="gallery-title">Title</Label>
              <Input id="gallery-title" value={form.title} onChange={(event) => updateForm("title", event.target.value)} className="mt-2" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="gallery-description">Description</Label>
              <Textarea
                id="gallery-description"
                value={form.description}
                onChange={(event) => updateForm("description", event.target.value)}
                className="mt-2"
                rows={4}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="gallery-image">Image path or URL</Label>
              <Input
                id="gallery-image"
                value={form.image}
                onChange={(event) => updateForm("image", event.target.value)}
                placeholder="/images/life-at-unique-mentors/team-outing.jpg"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="gallery-alt">Alt text</Label>
              <Input id="gallery-alt" value={form.imageAlt} onChange={(event) => updateForm("imageAlt", event.target.value)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="gallery-order">Display order</Label>
              <Input
                id="gallery-order"
                type="number"
                min={0}
                value={form.sortOrder}
                onChange={(event) => updateForm("sortOrder", Number(event.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="gallery-status">Status</Label>
              <select
                id="gallery-status"
                value={form.status}
                onChange={(event) => updateForm("status", event.target.value as GalleryForm["status"])}
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" disabled={saving}>
                <Icon name={saving ? "Loader2" : "Save"} className={saving ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                {saving ? "Saving" : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <ImageUpload value={form.image} onChange={(url) => updateForm("image", url)} />
            <GalleryPreview item={form} />
          </div>
        </form>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sortedItems.map((item) => (
          <article key={item.id} className="surface overflow-hidden p-0">
            <GalleryPreview item={item} />
            <div className="flex items-center justify-between gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">Order {item.sortOrder}</p>
                <p className="text-xs text-slate-500">{item.status === "PUBLISHED" ? "Published" : "Draft"}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setForm(toForm(item));
                    setOpen(true);
                  }}
                >
                  <Icon name="Edit" className="h-4 w-4" />
                  Edit
                </Button>
                <Button type="button" variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => removeItem(item)}>
                  <Icon name="Trash2" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function GalleryPreview({ item }: { item: Pick<GalleryItem, "title" | "description" | "image" | "imageAlt"> }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-brand-navy">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.imageAlt || item.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-white/70">
          <Icon name="Images" className="h-10 w-10" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-display text-2xl font-bold leading-tight">{item.title || "Gallery title"}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/85">{item.description || "Short gallery description appears here."}</p>
      </div>
    </div>
  );
}
