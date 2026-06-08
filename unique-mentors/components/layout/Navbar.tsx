"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS, PHONE_DISPLAY, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar({ hasBanner = false }: { hasBanner?: boolean }) {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const courseItems = useMemo(() => NAV_ITEMS.find((item) => item.label === "Courses")?.items ?? [], []);
  const courseGroups = useMemo(() => {
    return courseItems.reduce<Record<string, typeof courseItems>>((groups, item) => {
      const key = item.group ?? "Courses";
      groups[key] = [...(groups[key] ?? []), item];
      return groups;
    }, {});
  }, [courseItems]);

  const isScrolled = scrollY > 24;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300",
          hasBanner ? (isScrolled ? "top-0" : "top-10") : "top-0",
          isScrolled ? "border-b border-slate-200/80 bg-white/90 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85" : "bg-transparent"
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Unique Mentors home">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white shadow-soft">
              UM
            </span>
            <span className={cn("font-display text-lg font-bold", isScrolled ? "text-brand-ink dark:text-white" : "text-white")}>Unique Mentors</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              if (!item.items?.length) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-semibold transition",
                      active ? "bg-primary/10 text-primary" : isScrolled ? "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900" : "text-white/90 hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.label)} onMouseLeave={() => setOpenMenu(null)}>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition",
                      active ? "bg-primary/10 text-primary" : isScrolled ? "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900" : "text-white/90 hover:bg-white/10"
                    )}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                    onFocus={() => setOpenMenu(item.label)}
                  >
                    {item.label}
                    <Icon name="ChevronDown" className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {openMenu === item.label ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className={cn(
                          "absolute left-0 top-full mt-3 rounded-lg border border-slate-200 bg-white p-3 text-slate-900 shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:text-white",
                          item.label === "Courses" ? "w-[680px]" : "w-80"
                        )}
                      >
                        {item.label === "Courses" ? (
                          <div className="grid grid-cols-3 gap-3">
                            {Object.entries(courseGroups).map(([group, links]) => (
                              <div key={group}>
                                <p className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">{group}</p>
                                <div className="space-y-1">
                                  {links.map((child) => (
                                    <Link key={child.label} href={child.href} className="block rounded-md px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-900">
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {item.items.map((child) => (
                              <Link key={child.label} href={child.href} className="block rounded-md p-3 hover:bg-slate-100 dark:hover:bg-slate-900">
                                <span className="font-semibold">{child.label}</span>
                                {child.description ? <span className="mt-1 block text-sm leading-5 text-slate-500 dark:text-slate-400">{child.description}</span> : null}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant={isScrolled ? "outline" : "light"} size="sm">
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Unique Mentors on WhatsApp">
                <Icon name="MessageCircle" className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild size="sm">
              <Link href="/apply">Enroll Now</Link>
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden",
              isScrolled ? "border-slate-200 text-brand-ink dark:border-slate-800 dark:text-white" : "border-white/30 text-white"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Icon name="Menu" />
          </button>
        </div>
        <a href={`tel:${SITE_CONFIG.phone}`} className="sr-only">
          Call Unique Mentors at {PHONE_DISPLAY}
        </a>
      </header>
      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
