"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";

function titleFromPath(pathname: string) {
  if (pathname === "/admin") return "Dashboard";
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "Dashboard";
  if (segment === "new") return "Create New";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AdminHeader() {
  const pathname = usePathname();
  const title = titleFromPath(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="font-display text-xl font-bold">{title}</h1>
          <p className="text-xs text-slate-500">Admin / {title}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800" aria-label="View notifications">
            <Icon name="Bell" className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-rose" />
          </button>
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              <Icon name="ExternalLink" className="h-4 w-4" />
              View Site
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
