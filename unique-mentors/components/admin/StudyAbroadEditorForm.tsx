"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import type { StudyAbroadPost } from "@/types";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SEOPreview } from "@/components/admin/SEOPreview";
import { Icon } from "@/components/common/Icon";

export function StudyAbroadEditorForm({ post }: { post?: StudyAbroadPost }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "<p></p>");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [country, setCountry] = useState(post?.country ?? "");
  const [service, setService] = useState(post?.service ?? "Study Abroad Counselling");
  const [intake, setIntake] = useState(post?.intake ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.title ?? "");
  const [metaDesc, setMetaDesc] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(post?.status === "published" ? "PUBLISHED" : "DRAFT");
  const [featured, setFeatured] = useState(Boolean(post?.featured));
  const [saving, setSaving] = useState(false);

  const previewSlug = useMemo(() => slug || slugify(title), [slug, title]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(post ? `/api/study-abroad/${post.id}` : "/api/study-abroad", {
        method: post ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: previewSlug,
          content,
          excerpt,
          country,
          service,
          intake,
          tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          coverImage,
          metaTitle,
          metaDesc,
          status,
          featured,
          publishedAt: status === "PUBLISHED" ? new Date().toISOString() : undefined
        })
      });
      const result = (await response.json()) as { success: boolean; error?: string };
      if (!result.success) throw new Error(result.error || "Save failed");
      toast.success(post ? "Study abroad post updated." : "Study abroad post created.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save study abroad post.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div className="surface p-5">
          <Label htmlFor="study-abroad-title">Title</Label>
          <Input id="study-abroad-title" className="mt-2 text-lg font-semibold" value={title} onChange={(event) => setTitle(event.target.value)} required />
          <Label htmlFor="study-abroad-slug" className="mt-5 block">Slug</Label>
          <Input id="study-abroad-slug" className="mt-2" value={previewSlug} onChange={(event) => setSlug(event.target.value)} />
          <p className="mt-2 text-xs text-slate-500">Preview URL: /study-abroad/{previewSlug}</p>
        </div>
        <div className="surface p-5">
          <Label>Guide content</Label>
          <div className="mt-2"><RichTextEditor value={content} onChange={setContent} /></div>
        </div>
        <div className="surface p-5">
          <Label htmlFor="study-abroad-excerpt">Summary</Label>
          <Textarea id="study-abroad-excerpt" className="mt-2" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="Short overview shown on the public page" />
        </div>
      </div>
      <aside className="space-y-5 xl:sticky xl:top-24 xl:h-max">
        <div className="surface p-5">
          <h2 className="font-display text-xl font-bold">Publish</h2>
          <div className="mt-4 space-y-4">
            <label className="flex items-center justify-between gap-3 text-sm font-semibold">
              Status
              <select className="rounded-md border border-input bg-background px-3 py-2" value={status} onChange={(event) => setStatus(event.target.value as "DRAFT" | "PUBLISHED")}>
                <option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option>
              </select>
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /> Featured guide</label>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Save" className="h-4 w-4" />}
              {status === "PUBLISHED" ? "Publish Guide" : "Save Draft"}
            </Button>
          </div>
        </div>
        <div className="surface space-y-4 p-5">
          <div><Label htmlFor="study-abroad-country">Destination country</Label><Input id="study-abroad-country" className="mt-2" value={country} onChange={(event) => setCountry(event.target.value)} placeholder="Canada" required /></div>
          <div><Label htmlFor="study-abroad-service">Service focus</Label><Input id="study-abroad-service" className="mt-2" value={service} onChange={(event) => setService(event.target.value)} placeholder="Visa guidance" required /></div>
          <div><Label htmlFor="study-abroad-intake">Intake</Label><Input id="study-abroad-intake" className="mt-2" value={intake} onChange={(event) => setIntake(event.target.value)} placeholder="September 2027" /></div>
          <div><Label htmlFor="study-abroad-tags">Tags</Label><Input id="study-abroad-tags" className="mt-2" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="comma, separated, tags" /></div>
        </div>
        <div className="surface p-5"><h2 className="mb-4 font-display text-xl font-bold">Cover Image</h2><ImageUpload value={coverImage} onChange={setCoverImage} /></div>
        <div className="surface p-5">
          <h2 className="font-display text-xl font-bold">SEO</h2>
          <Label htmlFor="study-abroad-meta-title" className="mt-4 block">SEO Title</Label>
          <Input id="study-abroad-meta-title" className="mt-2" value={metaTitle} onChange={(event) => setMetaTitle(event.target.value)} />
          <Label htmlFor="study-abroad-meta-desc" className="mt-4 block">SEO Description</Label>
          <Textarea id="study-abroad-meta-desc" className="mt-2" value={metaDesc} onChange={(event) => setMetaDesc(event.target.value)} />
          <div className="mt-4"><SEOPreview title={metaTitle} description={metaDesc} slug={`study-abroad/${previewSlug}`} /></div>
        </div>
      </aside>
    </form>
  );
}
