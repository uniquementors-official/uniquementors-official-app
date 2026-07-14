"use client";

import { useState } from "react";
import Link from "next/link";
import { APP_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=uniquementors#lrd=0x3b0872b056b763a7:0xc8f58c36b4233897,1,,,,";

async function trackAndDownloadBrochure(): Promise<void> {
  const res = await fetch("/api/brochure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      region: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: navigator.userAgent,
    }),
  });
  const data = await res.json();
  if (data.url) {
    window.open(data.url, "_blank");
  } else {
    alert("Brochure not available right now. Please contact us.");
  }
}
export function CTASection() {
  const [downloading, setDownloading] = useState(false);
  const message = encodeURIComponent("Hello Unique Mentors, I want to talk to an expert about overseas medical licensing.");

  const handleBrochure = async () => {
    setDownloading(true);
    try {
      await trackAndDownloadBrochure();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-slate-950 via-brand-navy to-slate-900 text-white">
      <div className="container text-center">
        <span className="section-tag border-white/20 bg-white/10 text-white">We are happy to help you</span>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          Ready to Start Your Global Healthcare Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-200">
          Join 5000+ healthcare professionals who transformed their careers with Unique Mentors.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact" data-analytics-event="cta_clicked" data-analytics-label="Book Free Counselling" data-analytics-location="cta_section">
              Book Free Counselling
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy">
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${message}`} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_clicked" data-analytics-label="WhatsApp Us">
              <Icon name="MessageCircle" className="h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <Link href="/contact" data-analytics-event="cta_clicked" data-analytics-label="Check Eligibility">
              Check Eligibility
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleBrochure}
            disabled={downloading}
            className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy disabled:opacity-60"
          >
            <Icon name="Download" className="h-4 w-4" />
            {downloading ? "Preparing…" : "Download Brochure"}
          </Button>
        </div>

        {/* Social proof + mock exam */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>500+ Google Reviews</span>
            <span className="flex gap-0.5 text-yellow-400">★★★★★</span>
          </a>
          <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy">
            <Link href="/contact" data-analytics-event="cta_clicked" data-analytics-label="Attend Mock Exam">
              <Icon name="ClipboardList" className="h-4 w-4" />
              Attend Mock Exam
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <AppStoreButton href={APP_LINKS.appStore} variant="light" />
          <PlayStoreButton href={APP_LINKS.playStore} variant="light" />
        </div>
      </div>
    </section>
  );
}
