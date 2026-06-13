"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { FOOTER_LINKS, PHONE_DISPLAY, SITE_CONFIG } from "@/lib/constants";
import { getAnalyticsContext, identifyAnalyticsUser, trackAnalyticsEvent } from "@/lib/analytics-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/common/Icon";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/common/SocialIcons";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { LocalBusinessSchema } from "@/lib/seo";

const socialLinks = [
  { label: "Follow Unique Mentors on Facebook", href: SITE_CONFIG.social.facebook, icon: FacebookIcon },
  { label: "Follow Unique Mentors on Instagram", href: SITE_CONFIG.social.instagram, icon: InstagramIcon },
  { label: "Subscribe to Unique Mentors on YouTube", href: SITE_CONFIG.social.youtube, icon: YoutubeIcon },
  { label: "Connect with Unique Mentors on LinkedIn", href: SITE_CONFIG.social.linkedin, icon: LinkedinIcon }
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    trackAnalyticsEvent("newsletter_submit_attempted", {
      location: "footer"
    });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, analytics: getAnalyticsContext() })
      });
      const result = (await response.json()) as { success: boolean; message?: string; error?: string };
      if (!result.success) throw new Error(result.error || "Subscription failed");
      identifyAnalyticsUser({
        email,
        source: "footer_newsletter"
      });
      trackAnalyticsEvent("newsletter_subscribed", {
        location: "footer",
        email
      });
      toast.success(result.message || "You are subscribed to Unique Mentors updates.");
      setEmail("");
    } catch (error) {
      trackAnalyticsEvent("newsletter_error", {
        location: "footer",
        error: error instanceof Error ? error.message : "Please try again."
      });
      toast.error(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-brand-navy text-white">
      <SchemaMarkup schema={LocalBusinessSchema()} />
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="Unique Mentors home">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white font-display text-sm font-bold text-brand-navy">UM</span>
            <span className="font-display text-xl font-bold">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-300">{SITE_CONFIG.description}</p>
          <div className="mt-5 flex gap-2">
            {socialLinks.map(({ label, href, icon: SocialIcon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white transition hover:bg-white hover:text-brand-navy"
              >
                <SocialIcon />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {FOOTER_LINKS.explore.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Our Services</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {FOOTER_LINKS.services.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Contact Info</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Unique Mentors address in Google Maps" className="flex gap-2 hover:text-white">
              <Icon name="MapPin" className="mt-1 h-4 w-4 shrink-0" />
              <span>{SITE_CONFIG.address.display}</span>
            </a>
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-white">
              <Icon name="Phone" className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-white">
              <Icon name="Mail" className="h-4 w-4" />
              {SITE_CONFIG.email}
            </a>
          </div>
          <form onSubmit={subscribe} className="mt-5 space-y-3">
            <label className="text-sm font-semibold" htmlFor="footer-newsletter">
              Newsletter
            </label>
            <div className="flex gap-2">
              <Input
                id="footer-newsletter"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                className="border-white/20 bg-white/10 text-white placeholder:text-slate-400"
              />
              <Button type="submit" variant="secondary" size="icon" aria-label="Subscribe to newsletter" disabled={loading}>
                <Icon name={loading ? "Loader2" : "Send"} className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-5 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Unique Mentors. All rights reserved.</p>
          <div className="flex gap-4">
            {FOOTER_LINKS.policies.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
