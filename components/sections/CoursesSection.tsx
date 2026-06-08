"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import type { Course } from "@/types";

const tabs = ["All", "MOH", "DHA", "HAAD", "CORU", "Western"];

type CoursesSectionProps = {
  initialCourses: Course[];
};

export function CoursesSection({ initialCourses }: CoursesSectionProps) {
  const [active, setActive] = useState("All");

  const visibleCourses = useMemo(() => {
    const filtered =
      active === "All"
        ? initialCourses
        : active === "Western"
          ? initialCourses.filter((course) => course.examTypes.includes("WESTERN" as any) || ["CANADA", "AUSTRALIA"].includes(course.examType))
          : initialCourses.filter((course) => course.examTypes.includes(active as any));

    return filtered.slice(0, 8);
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
                className={active === tab ? "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white" : "rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"}
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCourses.map((course) => (
            <CourseCard key={course.slug} course={course} compact />
          ))}
        </div>
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
