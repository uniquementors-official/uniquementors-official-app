import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CourseCard } from "@/components/cards/CourseCard";
import { CourseDetailTabs } from "@/components/common/CourseDetailTabs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { CourseSchema, FAQSchema, generateCourseMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import type { Course } from "@/types";

export const dynamic = "force-dynamic";

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



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug }
  });
  if (!course) return { title: "Course | Unique Mentors" };
  return generateCourseMetadata(mapDbCourseToCourse(course));
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug }
  });
  if (!course) notFound();

  const mappedCourse = mapDbCourseToCourse(course);

  // Fetch related courses
  const dbAllCourses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: mappedCourse.id }
    }
  });
  const allCourses = dbAllCourses.map(mapDbCourseToCourse);
  const related = allCourses
    .filter((item) => item.examTypes.some((exam) => mappedCourse.examTypes.includes(exam)))
    .slice(0, 3);

  return (
    <>
      <SchemaMarkup schema={[CourseSchema(mappedCourse), FAQSchema(mappedCourse.faqs)]} />
      <PageHeader
        title={mappedCourse.title}
        subtitle={mappedCourse.excerpt}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Courses", href: "/courses" },
          { name: mappedCourse.title, href: `/courses/${mappedCourse.slug}` }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[1fr_340px]">
          <article className="space-y-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={mappedCourse.coverImage} alt={mappedCourse.imageAlt} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
            </div>
            <CourseDetailTabs course={mappedCourse} />
            <div>
              <h2 className="heading-lg">Frequently Asked Questions</h2>
              <div className="mt-6">
                <FAQAccordion faqs={mappedCourse.faqs} />
              </div>
            </div>
          </article>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-max">
            <div className="surface p-5">
              <Badge>{mappedCourse.examType}</Badge>
              <h2 className="mt-4 font-display text-2xl font-bold">Course Information</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {[
                  { icon: "Clock", label: "Duration", value: mappedCourse.duration },
                  { icon: "Monitor", label: "Mode", value: mappedCourse.mode },
                  { icon: "IndianRupee", label: "Fees", value: mappedCourse.fees },
                  { icon: "Calendar", label: "Next Batch", value: mappedCourse.nextBatch },
                  { icon: "Globe", label: "Country", value: mappedCourse.country }
                ].map(({ icon, label, value }) => (
                  <p key={label} className="flex items-center gap-3">
                    <Icon name={icon} className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-slate-900 dark:text-white">{label}:</span> {value}
                  </p>
                ))}
              </div>
              <div className="mt-6 grid gap-3">
                <Button asChild size="lg">
                  <Link href="/apply">Enroll Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageCircle" className="h-4 w-4" />
                    WhatsApp Enquiry
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold">Related Courses</h2>
              {related.map((item) => (
                <CourseCard key={item.slug} course={item} compact />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
