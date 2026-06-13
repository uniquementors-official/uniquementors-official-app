"use client";

import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Icon } from "@/components/common/Icon";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const message = encodeURIComponent("Hello Unique Mentors, I would like free counselling for overseas medical licensing exam training.");
  const phone = SITE_CONFIG.whatsapp.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Unique Mentors on WhatsApp"
      data-analytics-event="whatsapp_clicked"
      data-analytics-label="Floating WhatsApp"
      data-analytics-location="floating"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-glow"
    >
      <span className="absolute inset-0 rounded-full bg-secondary/60 animate-pulse-ring" aria-hidden="true" />
      <Icon name="MessageCircle" className="relative h-6 w-6" />
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max rounded-md bg-brand-navy px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
