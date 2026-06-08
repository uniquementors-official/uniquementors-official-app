"use client";

import { useState } from "react";
import type { Course } from "@/types";
import { Icon } from "@/components/common/Icon";

const tabs = ["Overview", "Eligibility", "Syllabus", "How to Apply"];

export function CourseDetailTabs({ course }: { course: Course }) {
  const [active, setActive] = useState("Overview");

  return (
    <div className="surface overflow-hidden">
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={active === tab ? "min-w-max border-b-2 border-primary px-5 py-4 text-sm font-bold text-primary" : "min-w-max px-5 py-4 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300"}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6">
        {active === "Overview" ? <p className="leading-7 text-slate-600 dark:text-slate-300">{course.description}</p> : null}
        {active === "Eligibility" ? (
          <ul className="space-y-3">
            {course.eligibility.map((item) => (
              <li key={item} className="flex gap-3 text-slate-600 dark:text-slate-300">
                <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {active === "Syllabus" ? (
          <ul className="space-y-3">
            {course.syllabus.map((item) => (
              <li key={item} className="flex gap-3 text-slate-600 dark:text-slate-300">
                <Icon name="ClipboardList" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {active === "How to Apply" ? (
          <ol className="grid gap-3 sm:grid-cols-2">
            {["Book free counselling", "Confirm eligibility", "Join the right batch", "Prepare, apply and track progress"].map((item, index) => (
              <li key={item} className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <span className="text-sm font-bold text-primary">Step {index + 1}</span>
                <p className="mt-1 font-semibold">{item}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </div>
  );
}
