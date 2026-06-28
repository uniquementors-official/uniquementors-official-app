"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=uniquementors#lrd=0x3b0872b056b763a7:0xc8f58c36b4233897,1,,,,";

async function downloadBrochure() {
  try {
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
      alert("Brochure download failed. Please contact us.");
    }
  } catch {
    alert("Brochure download failed. Please contact us.");
  }
}

export function CTAPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const onScroll = useCallback(() => {
    if (dismissed) return;
    // Show after ~2 viewport heights of scrolling
    if (window.scrollY > window.innerHeight * 1.8) {
      setVisible(true);
    }
  }, [dismissed]);

  useEffect(() => {
    // Don't show if user already dismissed in this session
    if (sessionStorage.getItem("cta_popup_dismissed")) {
      setDismissed(true);
      return;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("cta_popup_dismissed", "1");
  };

  const handleBrochure = async () => {
    setDownloading(true);
    await downloadBrochure();
    setDownloading(false);
  };

  const message = encodeURIComponent(
    "Hello Unique Mentors, I want to talk to an expert about overseas medical licensing."
  );

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 animate-in slide-in-from-bottom-8 fade-in duration-500"
      role="dialog"
      aria-label="Book free counselling"
    >
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-brand-navy to-slate-900 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse at top right, rgba(22,87,194,0.25) 0%, transparent 60%)" }} />

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 hover:bg-white/20 transition"
          aria-label="Close"
        >
          <Icon name="X" className="h-3.5 w-3.5" />
        </button>

        <div className="p-5 pt-4">
          <div className="mb-1 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Icon name="GraduationCap" className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary/90">Unique Mentors</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold leading-snug">
            Ready to Start Your Global Healthcare Journey?
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            Join 5000+ professionals. Book a free counselling call today.
          </p>

          {/* Stars */}
          <div className="mt-3 flex items-center gap-2">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-slate-300">500+ Reviews</span>
            </a>
          </div>

          {/* CTAs */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/contact"
              onClick={dismiss}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-brand-navy shadow-lg transition hover:-translate-y-0.5 active:scale-95"
            >
              <Icon name="CalendarDays" className="h-3.5 w-3.5" />
              Book Counselling
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2.5 text-xs font-bold text-white shadow-lg transition hover:-translate-y-0.5 active:scale-95"
            >
              <Icon name="MessageCircle" className="h-3.5 w-3.5" />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              onClick={dismiss}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95"
            >
              <Icon name="CheckCircle" className="h-3.5 w-3.5 text-emerald-400" />
              Check Eligibility
            </Link>
            <button
              onClick={handleBrochure}
              disabled={downloading}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95 disabled:opacity-60"
            >
              <Icon name="Download" className="h-3.5 w-3.5 text-sky-400" />
              {downloading ? "Preparing…" : "Download Brochure"}
            </button>
            <Link
              href="/contact"
              onClick={dismiss}
              className="col-span-2 flex items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-primary/25 active:scale-95"
            >
              <Icon name="ClipboardList" className="h-3.5 w-3.5 text-primary" />
              Attend Mock Exam
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
