"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { trackAnalyticsEvent } from "@/lib/analytics-client";
import type { Course } from "@/types";

const tabs = ["All", "MOH", "DHA", "HAAD", "CORU", "Western"] as const;
const westernExamTypes = new Set(["WESTERN", "CANADA", "AUSTRALIA", "APC", "AMC", "USMLE", "PLAB", "ADC", "HCPC"]);

function getFilteredCourses(courses: Course[], tab: string) {
  if (tab === "All") return courses;

  if (tab === "Western") {
    return courses.filter((course) => westernExamTypes.has(course.examType));
  }

  return courses.filter((course) => course.examType === tab);
}

type CoursesSectionProps = {
  initialCourses: Course[];
};

export function CoursesSection({ initialCourses }: CoursesSectionProps) {
  const [active, setActive] = useState("All");

  const filterCounts = useMemo(() => {
    return tabs.reduce<Record<string, number>>((counts, tab) => {
      counts[tab] = getFilteredCourses(initialCourses, tab).length;
      return counts;
    }, {});
  }, [initialCourses]);

  const visibleCourses = useMemo(() => {
    return getFilteredCourses(initialCourses, active).slice(0, 8);
  }, [active, initialCourses]);

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="section-tag">Explore courses</span>
            <h2 className="heading-lg mt-4">Overseas Licensing Exam Programs</h2>
            <p className="body-lead mt-4">
              Filter by licensing authority and explore profession-specific preparation paths.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Course exam filters">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active === tab}
                disabled={filterCounts[tab] === 0}
                className={
                  active === tab
                    ? "inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm"
                    : "inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                }
                onClick={() => {
                  const nextCount = getFilteredCourses(initialCourses, tab).length;
                  setActive(tab);
                  trackAnalyticsEvent("course_filter_selected", {
                    filter: tab,
                    visibleCount: nextCount
                  });
                }}
              >
                <span>{tab}</span>
                <span className={active === tab ? "text-white/75" : "text-slate-400"}>{filterCounts[tab]}</span>
              </button>
            ))}
          </div>
        </div>
        {visibleCourses.length ? (
          <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCourses.map((course) => (
              <CourseCard key={course.slug} course={course} compact />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            No courses are available for this filter yet.
          </div>
        )}
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/courses">
              View All Courses
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
