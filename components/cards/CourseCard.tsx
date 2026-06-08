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
    <article className="group surface flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/courses/${course.slug}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={`View ${course.title}`}>
        <Image
          src={course.coverImage}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", gradient)} />
        <Badge className="absolute right-3 top-3 shadow-sm">{course.examType}</Badge>
        <div className={cn("absolute bottom-3 left-3 rounded-md bg-gradient-to-br p-3 text-white shadow-lg", gradient)}>
          <Icon name={icon} className="h-6 w-6" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{course.profession}</Badge>
          <Badge variant="muted">{course.country}</Badge>
        </div>
        <h3 className="font-display text-xl font-bold leading-snug text-brand-ink dark:text-white">
          <Link href={`/courses/${course.slug}`} className="hover:text-primary">
            {course.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{course.excerpt}</p>
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
        <Button asChild variant="outline" className={cn("mt-5 w-full", compact && "mt-4")}>
          <Link href={`/courses/${course.slug}`}>
            View Course Details
            <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
