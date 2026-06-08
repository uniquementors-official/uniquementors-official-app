"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { TESTIMONIALS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Icon } from "@/components/common/Icon";
import type { Testimonial } from "@/types";

export function TestimonialAdmin() {
  const [items, setItems] = useState<Testimonial[]>(TESTIMONIALS);
  const [open, setOpen] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name")),
      profession: String(formData.get("profession")),
      examType: String(formData.get("examType")),
      country: String(formData.get("country")),
      rating: Number(formData.get("rating")),
      review: String(formData.get("review")),
      visible: Boolean(formData.get("visible")),
      featured: Boolean(formData.get("featured"))
    };
    const response = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = (await response.json()) as { success: boolean; error?: string };
    if (!result.success) {
      toast.error(result.error || "Unable to add testimonial");
      return;
    }
    setItems((current) => [
      {
        id: `testimonial-${current.length + 1}`,
        initials: payload.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        ...payload
      },
      ...current
    ]);
    setOpen(false);
    toast.success("Testimonial added.");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Testimonials</h2>
          <p className="text-sm text-slate-500">Add, approve and feature student reviews.</p>
        </div>
        <Button onClick={() => setOpen((current) => !current)}>
          <Icon name="Plus" className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>
      {open ? (
        <form onSubmit={submit} className="surface grid gap-4 p-5 sm:grid-cols-2">
          {["name", "profession", "examType", "country"].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field.replace(/([A-Z])/g, " $1")}</Label>
              <Input id={field} name={field} className="mt-2" required />
            </div>
          ))}
          <div>
            <Label htmlFor="rating">Rating</Label>
            <select id="rating" name="rating" className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue="5">
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="visible" defaultChecked />
              Visible
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="featured" />
              Featured
            </label>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="review">Review</Label>
            <Textarea id="review" name="review" className="mt-2" required />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Save Testimonial</Button>
          </div>
        </form>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
