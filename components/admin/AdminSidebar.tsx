"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen bg-brand-navy p-4 text-white lg:block">
      <Link href="/admin" className="flex items-center gap-3 rounded-md px-3 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white font-display text-sm font-bold text-brand-navy">UM</span>
        <span>
          <span className="block font-display text-lg font-bold">Unique Mentors</span>
          <span className="text-xs text-slate-300">Admin Panel</span>
        </span>
      </Link>
      <nav className="mt-8 space-y-1" aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold transition",
                active ? "bg-white text-brand-navy" : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </span>
              {item.label === "Leads" ? <span className="rounded-full bg-brand-rose px-2 py-0.5 text-xs text-white">4</span> : null}
            </Link>
          );
        })}
      </nav>
      <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-bold">A</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Admin</p>
            <p className="truncate text-xs text-slate-300">admin@uniquementors.com</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <Icon name="Lock" className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
