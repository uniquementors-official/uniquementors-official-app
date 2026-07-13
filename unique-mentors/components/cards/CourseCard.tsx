import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import type { Course } from "@/types";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  course: Course;
  compact?: boolean;
};

const examStyles: Record<string, string> = {
  MOH: "from-sky-500 to-blue-700",
  DHA: "from-violet-500 to-purple-700",
  HAAD: "from-emerald-500 to-teal-700",
  CORU: "from-amber-400 to-orange-600",
  CANADA: "from-rose-500 to-red-700",
  AUSTRALIA: "from-cyan-500 to-blue-600",
  WESTERN: "from-slate-600 to-slate-900"
};

const professionIcons: Record<string, string> = {
  "Lab Technician / Technologist": "Microscope",
  Microbiologist: "FlaskConical",
  Radiographer: "Scan",
  Pharmacist: "Pill",
  "General Practitioner": "Stethoscope",
  "General Dentist": "Smile",
  "Ayush Physician": "Leaf",
  Physiotherapist: "Activity",
  Nurse: "HeartPulse"
};

export function CourseCard({ course, compact = false }: CourseCardProps) {
  const gradient = examStyles[course.examType] ?? examStyles.WESTERN;
  const icon = professionIcons[course.profession] ?? "BookOpen";

  return (
    <article className="group surface flex h-full min-h-[560px] flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link
        href={`/courses/${course.slug}`}
        className="relative block h-52 overflow-hidden bg-brand-navy"
        aria-label={`View ${course.title}`}
        data-analytics-event="course_clicked"
        data-analytics-label={course.title}
        data-analytics-location="course_card_image"
      >
        <Image
          src={course.coverImage}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center opacity-90 saturate-[0.72] contrast-[1.05] brightness-[0.92] transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/55 via-primary/18 to-secondary/34 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:32px_32px] opacity-35" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
        <Badge className={cn("absolute right-3 top-3 border-0 bg-gradient-to-r text-white shadow-sm", gradient)}>{course.examType}</Badge>
        <div className="absolute bottom-3 left-3 rounded-md bg-white/92 p-3 text-primary shadow-lg ring-1 ring-white/70 backdrop-blur">
          <Icon name={icon} className="h-6 w-6" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex min-h-[2rem] flex-wrap items-center gap-2">
          <Badge variant="outline">{course.profession}</Badge>
          <Badge variant="muted">{course.country}</Badge>
        </div>
        <h3 className="line-clamp-2 min-h-[3.35rem] font-display text-xl font-bold leading-snug text-brand-ink dark:text-white">
          <Link
            href={`/courses/${course.slug}`}
            className="hover:text-primary"
            data-analytics-event="course_clicked"
            data-analytics-label={course.title}
            data-analytics-location="course_card_title"
          >
            {course.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600 dark:text-slate-300">{course.excerpt}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="flex min-w-0 items-center gap-2">
            <Icon name="Clock" className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{course.duration}</span>
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <Icon name="Globe" className="h-4 w-4 shrink-0 text-secondary" />
            <span className="truncate">{course.country}</span>
          </span>
        </div>
        <div className={cn("mt-auto pt-5", compact && "pt-5")}>
          <Button asChild variant="outline" className="w-full">
            <Link
              href="/contact#contact-form"
              data-analytics-event="course_enroll_clicked"
              data-analytics-label={course.title}
              data-analytics-location="course_card_button"
            >
              Enroll Now
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
