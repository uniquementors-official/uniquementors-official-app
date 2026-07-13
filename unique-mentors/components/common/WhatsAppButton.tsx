"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Icon } from "@/components/common/Icon";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const message = encodeURIComponent("Hello Unique Mentors, I would like free counselling for overseas medical licensing exam training.");
  const phone = SITE_CONFIG.whatsapp.replace(/\D/g, "");

  return (
    <>
      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Unique Mentors on WhatsApp"
        data-analytics-event="whatsapp_clicked"
        data-analytics-label="Floating WhatsApp"
        data-analytics-location="floating_desktop"
        className="group fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-white p-1.5 shadow-glow ring-1 ring-emerald-500/20 lg:inline-flex"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500/30" aria-hidden="true" />
        <Image src="/whatsapp.png" alt="" width={44} height={44} className="relative h-11 w-11" />
        <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max rounded-md bg-brand-navy px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
          Chat with us on WhatsApp
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200/80 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            aria-label={`Call Unique Mentors at ${SITE_CONFIG.phone}`}
            data-analytics-event="phone_clicked"
            data-analytics-label="Mobile sticky call"
            data-analytics-location="mobile_sticky_footer"
            className="flex h-12 flex-col items-center justify-center rounded-md bg-primary px-2 text-center text-[11px] font-bold text-white shadow-sm transition active:scale-[0.98]"
          >
            <Icon name="PhoneCall" className="mb-0.5 h-4 w-4" />
            Call
          </a>
          <a
            href="/contact#contact-form"
            aria-label="Open enquiry form"
            data-analytics-event="form_cta_clicked"
            data-analytics-label="Mobile sticky enquiry"
            data-analytics-location="mobile_sticky_footer"
            className="flex h-12 flex-col items-center justify-center rounded-md bg-brand-navy px-2 text-center text-[11px] font-bold text-white shadow-sm transition active:scale-[0.98]"
          >
            <Icon name="ClipboardList" className="mb-0.5 h-4 w-4" />
            Enquire
          </a>
          <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Unique Mentors"
            data-analytics-event="whatsapp_clicked"
            data-analytics-label="Mobile sticky WhatsApp"
            data-analytics-location="mobile_sticky_footer"
            className="flex h-12 flex-col items-center justify-center rounded-md bg-emerald-600 px-2 text-center text-[11px] font-bold text-white shadow-sm transition active:scale-[0.98]"
          >
            <Image src="/whatsapp.png" alt="" width={20} height={20} className="mb-0.5 h-5 w-5 rounded-full" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
