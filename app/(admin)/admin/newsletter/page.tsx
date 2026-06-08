"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";

export default function NewsletterAdminPage() {
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSending(false);
    toast.success("Newsletter draft saved for review.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <form onSubmit={submit} className="surface space-y-5 p-5">
        <h2 className="font-display text-2xl font-bold">Newsletter Campaign</h2>
        <div>
          <Label htmlFor="newsletter-subject">Subject</Label>
          <Input id="newsletter-subject" className="mt-2" required />
        </div>
        <div>
          <Label htmlFor="newsletter-content">Content</Label>
          <Textarea id="newsletter-content" className="mt-2 min-h-[260px]" required />
        </div>
        <Button type="submit" disabled={sending}>
          {sending ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Send" className="h-4 w-4" />}
          Save Campaign
        </Button>
      </form>
      <aside className="surface p-5">
        <h2 className="font-display text-2xl font-bold">Subscribers</h2>
        <p className="mt-3 font-display text-4xl font-bold text-primary">842</p>
        <p className="mt-2 text-sm text-slate-500">Active newsletter subscribers</p>
      </aside>
    </div>
  );
}
