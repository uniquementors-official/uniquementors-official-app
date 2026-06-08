import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { COUNTRIES_SERVED, EXAM_TYPES, PROFESSIONS } from "@/lib/constants";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Course } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Medical Licensing Exam Training Courses - MOH DHA HAAD CORU",
  description:
    "Browse Unique Mentors courses for MOH, DHA, HAAD, CORU, Canada and Australia medical licensing exam training across healthcare professions.",
  path: "/courses"
});

type CoursesPageProps = {
  searchParams?: {
    examType?: string;
    profession?: string;
    country?: string;
    search?: string;
  };
};

function mapDbCourseToCourse(dbCourse: {
  id: string;
  title: string;
  slug: string;
  examType: string;
  examTypes: string[];
  profession: string;
  country: string;
  duration: string;
  mode: string;
  fees: string | null;
  nextBatch: string | null;
  shortDescription: string;
  description: string;
  eligibility: string[];
  highlights: string[];
  syllabus: string;
  faqs: any;
  featured: boolean;
  status: any;
  coverImage: string | null;
}): Course {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    slug: dbCourse.slug,
    examType: dbCourse.examType as any,
    examTypes: dbCourse.examTypes as any[],
    profession: dbCourse.profession,
    country: dbCourse.country,
    duration: dbCourse.duration,
    mode: dbCourse.mode as any,
    fees: dbCourse.fees || "",
    nextBatch: dbCourse.nextBatch || "",
    excerpt: dbCourse.shortDescription,
    description: dbCourse.description,
    eligibility: dbCourse.eligibility,
    highlights: dbCourse.highlights,
    syllabus: dbCourse.syllabus ? dbCourse.syllabus.split("\n") : [],
    faqs: (dbCourse.faqs as any) || [],
    featured: dbCourse.featured,
    status: dbCourse.status.toLowerCase() as any,
    coverImage: dbCourse.coverImage || "/images/metro-pillar-candidate.png",
    imageAlt: dbCourse.title
  };
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const examType = searchParams?.examType ?? "";
  const profession = searchParams?.profession ?? "";
  const country = searchParams?.country ?? "";
  const search = searchParams?.search?.toLowerCase() ?? "";

  const dbCourses = await prisma.course.findMany({
    where: { status: "PUBLISHED" }
  });

  const courses = dbCourses.map(mapDbCourseToCourse);

  const filtered = courses.filter((course) => {
    const matchesExam = !examType || course.examTypes.includes(examType as any) || course.examType === examType;
    const matchesProfession = !profession || course.profession.toLowerCase().includes(profession.toLowerCase());
    const matchesCountry = !country || course.country.toLowerCase().includes(country.toLowerCase());
    const matchesSearch = !search || `${course.title} ${course.excerpt} ${course.profession}`.toLowerCase().includes(search);
    return matchesExam && matchesProfession && matchesCountry && matchesSearch;
  });

  return (
    <>
      <PageHeader
        title="Medical Licensing Exam Training Courses - MOH, DHA, HAAD, CORU"
        subtitle="Filter by exam, profession and country to find the right training pathway."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Courses", href: "/courses" }
        ]}
        primaryCta={{ label: "Apply Now", href: "/apply" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="surface h-max p-5">
            <h2 className="font-display text-xl font-bold">Filters</h2>
            <div className="mt-5 space-y-6">
              <FilterGroup title="By Exam Type" items={[{ label: "All", href: "/courses" }, ...EXAM_TYPES.map((exam) => ({ label: exam.label, href: `/courses?examType=${exam.value}` }))]} />
              <FilterGroup
                title="By Profession"
                items={[{ label: "All", href: "/courses" }, ...PROFESSIONS.map((item) => ({ label: item.label, href: `/courses?profession=${encodeURIComponent(item.label)}` }))]}
              />
              <FilterGroup
                title="By Country"
                items={[{ label: "All", href: "/courses" }, ...COUNTRIES_SERVED.map((item) => ({ label: item, href: `/courses?country=${encodeURIComponent(item)}` }))]}
              />
            </div>
          </aside>
          <div>
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{filtered.length} courses found</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/courses">
                  <Icon name="RefreshCw" className="h-4 w-4" />
                  Reset
                </Link>
              </Button>
            </div>
            {filtered.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            ) : (
              <EmptyState title="No courses found" description="Try a different exam, profession or country filter." />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, items }: { title: string; items: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <Link key={`${title}-${item.label}`} href={item.href} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-900">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
