"use client";

import { STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Icon } from "@/components/common/Icon";

function StatCard({ value, suffix, label, icon }: (typeof STATS)[number]) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();
  const count = useCountUp(value, 1600, isIntersecting);

  return (
    <div ref={ref} className="relative px-5 py-7 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <p className="font-display text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium leading-5 text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-10 dark:from-slate-950 dark:to-slate-900" aria-label="Unique Mentors achievements">
      <div className="container">
        <div className="surface grid divide-y divide-slate-200 overflow-hidden sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {STATS.slice(0, 4).map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
