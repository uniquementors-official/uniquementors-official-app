"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { APP_LINKS, NAV_ITEMS, PHONE_DISPLAY, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-brand-navy text-white lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <Link href="/" className="flex items-center rounded-md bg-white px-2 py-1 shadow-soft" aria-label="Unique Mentors home">
              <Image
                src="/logo.svg"
                alt="Unique Mentors"
                width={140}
                height={48}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20"
            >
              <Icon name="X" />
            </button>
          </div>
          <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
            <div className="space-y-3">
              {NAV_ITEMS.map((item) =>
                item.items?.length ? (
                  <details key={item.label} className="rounded-md border border-white/10 bg-white/5">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold">
                      {item.label}
                      <Icon name="ChevronDown" className="h-4 w-4" />
                    </summary>
                    <div className="border-t border-white/10 px-4 py-3">
                      <Link href={item.href} className="mb-3 block text-sm font-semibold text-white/90">
                        View all {item.label}
                      </Link>
                      <div className="space-y-3">
                        {item.items.map((child) => (
                          <Link
                            key={`${child.group ?? item.label}-${child.label}`}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                          >
                            {child.group ? <span className="mb-1 block text-xs uppercase tracking-[0.16em] text-brand-gold">{child.group}</span> : null}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </details>
                ) : (
                  <Link key={item.label} href={item.href} className="block rounded-md border border-white/10 px-4 py-3 font-semibold hover:bg-white/10">
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <div className="mt-8 grid gap-3">
              <Button asChild variant="secondary" size="lg">
                <a href={APP_LINKS.login} target="_blank" rel="noopener noreferrer">
                  Login
                </a>
              </Button>
              <Button asChild variant="light" size="lg">
                <Link href="/contact#contact-form">Sign up</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy">
                <a href={`tel:${SITE_CONFIG.phone}`} aria-label={`Call Unique Mentors at ${PHONE_DISPLAY}`}>
                  <Icon name="PhoneCall" className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                <AppStoreButton href={APP_LINKS.appStore} variant="light" className="w-full" />
                <PlayStoreButton href={APP_LINKS.playStore} variant="light" className="w-full" />
              </div>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
