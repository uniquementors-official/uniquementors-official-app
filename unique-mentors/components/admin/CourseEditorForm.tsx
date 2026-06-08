"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import type { Course } from "@/types";
import { COUNTRIES_SERVED, PROFESSIONS } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SEOPreview } from "@/components/admin/SEOPreview";
import { Icon } from "@/components/common/Icon";

export function CourseEditorForm({ course }: { course?: Course }) {
  const [title, setTitle] = useState(course?.title ?? "");
  const [slug, setSlug] = useState(course?.slug ?? "");
  const [examType, setExamType] = useState(course?.examType ?? "MOH");
  const [profession, setProfession] = useState(course?.profession ?? "");
  const [country, setCountry] = useState(course?.country ?? "UAE");
  const [duration, setDuration] = useState(course?.duration ?? "");
  const [fees, setFees] = useState(course?.fees ?? "");
  const [mode, setMode] = useState(course?.mode ?? "Hybrid");
  const [shortDescription, setShortDescription] = useState(course?.excerpt ?? "");
  const [description, setDescription] = useState(course?.description ?? "<p></p>");
  const [eligibility, setEligibility] = useState((course?.eligibility ?? [""]).join("\n"));
  const [highlights, setHighlights] = useState((course?.highlights ?? [""]).join("\n"));
  const [syllabus, setSyllabus] = useState((course?.syllabus ?? []).join("\n"));
  const [coverImage, setCoverImage] = useState(course?.coverImage ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(course?.status === "published" ? "PUBLISHED" : "DRAFT");
  const [featured, setFeatured] = useState(Boolean(course?.featured));
  const [saving, setSaving] = useState(false);

  const previewSlug = useMemo(() => slug || slugify(title), [slug, title]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(course ? `/api/courses/${course.id}` : "/api/courses", {
        method: course ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: previewSlug,
          examType,
          profession,
          country,
          duration,
          fees,
          mode,
          shortDescription,
          description,
          eligibility: eligibility.split("\n").map((item) => item.trim()).filter(Boolean),
          highlights: highlights.split("\n").map((item) => item.trim()).filter(Boolean),
          syllabus,
          coverImage,
          status,
          featured
        })
      });
      const result = (await response.json()) as { success: boolean; error?: string };
      if (!result.success) throw new Error(result.error || "Save failed");
      toast.success(course ? "Course updated." : "Course created.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save course.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div className="surface grid gap-4 p-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="course-title">Title</Label>
            <Input id="course-title" className="mt-2 text-lg font-semibold" value={title} onChange={(event) => setTitle(event.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="course-slug">Slug</Label>
            <Input id="course-slug" className="mt-2" value={previewSlug} onChange={(event) => setSlug(event.target.value)} />
          </div>
          <Field label="Exam Type">
            <select className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={examType} onChange={(event) => setExamType(event.target.value as never)}>
              {["MOH", "DHA", "HAAD", "CORU", "CANADA", "AUSTRALIA", "WESTERN"].map((exam) => (
                <option key={exam}>{exam}</option>
              ))}
            </select>
          </Field>
          <Field label="Profession">
            <select className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={profession} onChange={(event) => setProfession(event.target.value)}>
              <option value="">Select profession</option>
              {PROFESSIONS.map((item) => (
                <option key={item.label}>{item.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Country">
            <select className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={country} onChange={(event) => setCountry(event.target.value)}>
              {COUNTRIES_SERVED.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Duration">
            <Input value={duration} onChange={(event) => setDuration(event.target.value)} />
          </Field>
          <Field label="Fees">
            <Input value={fees} onChange={(event) => setFees(event.target.value)} />
          </Field>
          <Field label="Mode">
            <select className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={mode} onChange={(event) => setMode(event.target.value as never)}>
              {["Online", "Offline", "Hybrid"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Label htmlFor="course-short">Short Description</Label>
            <Textarea id="course-short" className="mt-2" value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} />
          </div>
        </div>
        <div className="surface p-5">
          <Label>Full Description</Label>
          <div className="mt-2">
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
        </div>
        <div className="surface grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Eligibility">
            <Textarea value={eligibility} onChange={(event) => setEligibility(event.target.value)} />
          </Field>
          <Field label="Highlights">
            <Textarea value={highlights} onChange={(event) => setHighlights(event.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Label htmlFor="course-syllabus">Syllabus</Label>
            <Textarea id="course-syllabus" className="mt-2" value={syllabus} onChange={(event) => setSyllabus(event.target.value)} />
          </div>
        </div>
      </div>
      <aside className="space-y-5 xl:sticky xl:top-24 xl:h-max">
        <div className="surface p-5">
          <h2 className="font-display text-xl font-bold">Publish</h2>
          <div className="mt-4 space-y-4">
            <select className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value as "DRAFT" | "PUBLISHED")}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
              Featured course
            </label>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Save" className="h-4 w-4" />}
              Save Course
            </Button>
          </div>
        </div>
        <div className="surface p-5">
          <h2 className="mb-4 font-display text-xl font-bold">Cover Image</h2>
          <ImageUpload value={coverImage} onChange={setCoverImage} />
        </div>
        <div className="surface p-5">
          <h2 className="font-display text-xl font-bold">SEO Preview</h2>
          <div className="mt-4">
            <SEOPreview title={title} description={shortDescription} slug={`courses/${previewSlug}`} />
          </div>
        </div>
      </aside>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
