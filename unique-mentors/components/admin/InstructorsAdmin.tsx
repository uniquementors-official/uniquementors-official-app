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
import type { Instructor } from "@/types";

type InstructorForm = {
  id?: string;
  name: string;
  slug: string;
  designation: string;
  bio: string;
  image: string;
  imageAlt: string;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

const blankForm: InstructorForm = {
  name: "",
  slug: "",
  designation: "",
  bio: "",
  image: "",
  imageAlt: "",
  sortOrder: 0,
  status: "PUBLISHED"
};

function toForm(item: Instructor): InstructorForm {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    designation: item.designation ?? "",
    bio: item.bio ?? "",
    image: item.image ?? "",
    imageAlt: item.imageAlt ?? "",
    sortOrder: item.sortOrder,
    status: item.status
  };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function InstructorsAdmin({ initialItems }: { initialItems: Instructor[] }) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<InstructorForm>(blankForm);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const sortedItems = useMemo(() => [...items].sort((a, b) => a.sortOrder - b.sortOrder), [items]);

  function updateForm<K extends keyof InstructorForm>(key: K, value: InstructorForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankForm);
    setOpen(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const endpoint = form.id ? `/api/instructors/${form.id}` : "/api/instructors";
    const method = form.id ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = (await response.json()) as ApiResponse<Instructor>;

      if (!result.success || !result.data) throw new Error(result.error || "Unable to save instructor");
      const savedInstructor = result.data;

      setItems((current) => {
        if (form.id) return current.map((item) => (item.id === savedInstructor.id ? savedInstructor : item));
        return [savedInstructor, ...current];
      });
      toast.success(result.message || "Instructor saved.");
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save instructor");
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(item: Instructor) {
    if (!window.confirm(`Delete "${item.name}" from instructors?`)) return;

    try {
      const response = await fetch(`/api/instructors/${item.id}`, { method: "DELETE" });
      const result = (await response.json()) as ApiResponse<{ id: string }>;
      if (!result.success) throw new Error(result.error || "Unable to delete instructor");
      setItems((current) => current.filter((instructor) => instructor.id !== item.id));
      toast.success(result.message || "Instructor deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete instructor");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Instructors</h2>
          <p className="text-sm text-slate-500">Manage instructor names, roles, bios and profile images.</p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setForm(blankForm);
            setOpen((current) => !current);
          }}
        >
          <Icon name={open ? "X" : "Plus"} className="h-4 w-4" />
          {open ? "Close" : "Add Instructor"}
        </Button>
      </div>

      {open ? (
        <form onSubmit={submit} className="surface grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="instructor-name">Name</Label>
              <Input id="instructor-name" value={form.name} onChange={(event) => updateForm("name", event.target.value)} className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="instructor-slug">Slug</Label>
              <Input id="instructor-slug" value={form.slug} onChange={(event) => updateForm("slug", event.target.value)} placeholder="auto-generated if blank" className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="instructor-designation">Designation</Label>
              <Input id="instructor-designation" value={form.designation} onChange={(event) => updateForm("designation", event.target.value)} className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="instructor-bio">Bio</Label>
              <Textarea id="instructor-bio" value={form.bio} onChange={(event) => updateForm("bio", event.target.value)} className="mt-2" rows={4} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="instructor-image">Image path or URL</Label>
              <Input
                id="instructor-image"
                value={form.image}
                onChange={(event) => updateForm("image", event.target.value)}
                placeholder="/images/instructors/mini-s-thomas.png"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="instructor-alt">Alt text</Label>
              <Input id="instructor-alt" value={form.imageAlt} onChange={(event) => updateForm("imageAlt", event.target.value)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="instructor-order">Display order</Label>
              <Input
                id="instructor-order"
                type="number"
                min={0}
                value={form.sortOrder}
                onChange={(event) => updateForm("sortOrder", Number(event.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="instructor-status">Status</Label>
              <select
                id="instructor-status"
                value={form.status}
                onChange={(event) => updateForm("status", event.target.value as InstructorForm["status"])}
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
            <InstructorPreview item={form} />
          </div>
        </form>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {sortedItems.map((item) => (
          <article key={item.id} className="surface overflow-hidden p-0">
            <InstructorPreview item={item} />
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

function InstructorPreview({ item }: { item: Pick<Instructor, "name" | "designation" | "bio" | "image" | "imageAlt"> }) {
  return (
    <div className="bg-white">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt || item.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
              {initials(item.name || "UM")}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-brand-ink">{item.name || "Instructor name"}</h3>
        <p className="mt-1 text-sm font-semibold text-primary">{item.designation || "Instructor"}</p>
        {item.bio ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.bio}</p> : null}
      </div>
    </div>
  );
}
