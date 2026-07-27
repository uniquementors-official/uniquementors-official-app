"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_LINKS, NAV_ITEMS, PHONE_DISPLAY, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar({ hasBanner = false }: { hasBanner?: boolean }) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
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
          isScrolled
            ? "bg-white/92 shadow-soft backdrop-blur-xl dark:bg-slate-950/85"
            : "bg-brand-navy/82 shadow-[0_16px_50px_rgba(2,6,23,0.28)] backdrop-blur-xl"
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center" aria-label="Unique Mentors home">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex h-10 items-center overflow-hidden rounded-xl bg-white px-3 transition duration-300 sm:h-11",
                isScrolled
                  ? "shadow-sm ring-1 ring-slate-200 dark:bg-white dark:ring-white/10"
                  : "shadow-[0_12px_34px_rgba(2,6,23,0.26)] ring-1 ring-white/70"
              )}
            >
              <span className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" aria-hidden="true" />
              <Image
                src="/logo.svg"
                alt="Unique Mentors"
                width={150}
                height={52}
                priority
                className="relative h-7 w-auto sm:h-8 md:h-9"
              />
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const active = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href));
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
              <a
                href={APP_LINKS.login}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="login_clicked"
                data-analytics-label="Admin app login"
                data-analytics-location="navbar"
              >
                Login
              </a>
            </Button>
            <Button asChild size="sm">
              <Link
                href="/contact#contact-form"
                data-analytics-event="signup_clicked"
                data-analytics-label="Contact form signup"
                data-analytics-location="navbar"
              >
                Sign up
              </Link>
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
