"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/common/Icon";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const result = (await response.json()) as { success: boolean; message?: string; error?: string };
      if (!result.success) throw new Error(result.error || "Unable to subscribe");
      setSuccess(true);
      setEmail("");
      toast.success(result.message || "Subscribed successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="newsletter" className="section-padding bg-brand-navy text-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-tag border-white/20 bg-white/10 text-white">Newsletter</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Sign up for our newsletter</h2>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            Get the latest exam tips, eligibility updates and career insights delivered to your inbox every week.
          </p>
          {success ? (
            <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/10 px-5 py-4">
              <Icon name="CheckCircle" className="h-6 w-6 text-brand-gold" />
              <span className="font-semibold">Thank you. You are on the list.</span>
            </div>
          ) : (
            <form onSubmit={subscribe} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-12 bg-white text-brand-ink"
                aria-label="Newsletter email address"
              />
              <Button type="submit" variant="secondary" size="lg" disabled={loading}>
                {loading ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : null}
                Subscribe
              </Button>
            </form>
          )}
          <p className="mt-3 text-sm text-slate-300">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
