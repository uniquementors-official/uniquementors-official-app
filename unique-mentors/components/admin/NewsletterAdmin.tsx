"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  subscribed: boolean;
  createdAt: string;
  unsubscribedAt?: string | null;
};

type NewsletterAdminProps = {
  subscribers: NewsletterSubscriberRow[];
  activeCount: number;
  unsubscribedCount: number;
};

export function NewsletterAdmin({ subscribers, activeCount, unsubscribedCount }: NewsletterAdminProps) {
  const [rows, setRows] = useState(subscribers);
  const [sending, setSending] = useState(false);
  const activeRows = useMemo(() => rows.filter((row) => row.subscribed), [rows]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const subject = String(formData.get("subject") || "");
    const content = String(formData.get("content") || "");

    setSending(true);
    try {
      const response = await fetch("/api/newsletter/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content })
      });
      const result = (await response.json()) as { success: boolean; message?: string; error?: string; data?: { sent: number } };
      if (!result.success) throw new Error(result.error || "Unable to send campaign");
      toast.success(result.message || `Newsletter sent to ${result.data?.sent ?? activeRows.length} subscribers.`);
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setSending(false);
    }
  }

  async function unsubscribe(email: string) {
    const response = await fetch("/api/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const result = (await response.json()) as { success: boolean; error?: string };
    if (!result.success) {
      toast.error(result.error || "Unable to unsubscribe");
      return;
    }
    setRows((current) =>
      current.map((row) => (row.email === email ? { ...row, subscribed: false, unsubscribedAt: new Date().toISOString() } : row))
    );
    toast.success("Subscriber unsubscribed.");
  }

  function exportCsv() {
    const csv = [
      "Email,Subscribed,Created At,Unsubscribed At",
      ...rows.map((row) =>
        [row.email, row.subscribed ? "Yes" : "No", row.createdAt, row.unsubscribedAt || ""]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "unique-mentors-newsletter-subscribers.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="surface space-y-5 p-5">
        <div>
          <h2 className="font-display text-2xl font-bold">Newsletter Campaign</h2>
          <p className="mt-2 text-sm text-slate-500">Send a campaign to active subscribers only.</p>
        </div>
        <div>
          <Label htmlFor="newsletter-subject">Subject</Label>
          <Input id="newsletter-subject" name="subject" className="mt-2" required minLength={4} maxLength={140} />
        </div>
        <div>
          <Label htmlFor="newsletter-content">Content</Label>
          <Textarea id="newsletter-content" name="content" className="mt-2 min-h-[260px]" required minLength={10} maxLength={5000} />
        </div>
        <Button type="submit" disabled={sending || activeRows.length === 0}>
          {sending ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Send" className="h-4 w-4" />}
          Send Campaign
        </Button>
      </form>

      <aside className="space-y-5">
        <div className="surface p-5">
          <h2 className="font-display text-2xl font-bold">Subscribers</h2>
          <p className="mt-3 font-display text-4xl font-bold text-primary">{activeRows.length}</p>
          <p className="mt-2 text-sm text-slate-500">Active newsletter subscribers</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-900">
              <p className="text-xs text-slate-500">Initial active</p>
              <p className="font-display text-2xl font-bold">{activeCount}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-900">
              <p className="text-xs text-slate-500">Unsubscribed</p>
              <p className="font-display text-2xl font-bold">{unsubscribedCount}</p>
            </div>
          </div>
          <Button className="mt-5 w-full" variant="outline" onClick={exportCsv}>
            <Icon name="Download" className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </aside>

      <section className="surface overflow-hidden xl:col-span-2">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div>
            <h2 className="font-display text-2xl font-bold">Subscriber List</h2>
            <p className="text-sm text-slate-500">Latest newsletter subscribers from the database.</p>
          </div>
          <Badge>{rows.length} total</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-900">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Subscribed On</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-5 py-3 font-semibold">{row.email}</td>
                  <td className="px-5 py-3">
                    <Badge variant={row.subscribed ? "success" : "outline"}>{row.subscribed ? "Active" : "Unsubscribed"}</Badge>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{row.createdAt}</td>
                  <td className="px-5 py-3">
                    <Button size="sm" variant="outline" disabled={!row.subscribed} onClick={() => unsubscribe(row.email)}>
                      Unsubscribe
                    </Button>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-slate-500">No newsletter subscribers yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
