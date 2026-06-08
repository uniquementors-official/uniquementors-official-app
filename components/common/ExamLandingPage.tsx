import { COURSES } from "@/lib/content";
import { CourseCard } from "@/components/cards/CourseCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";

type ExamLandingPageProps = {
  exam: string;
  title: string;
  subtitle: string;
};

export function ExamLandingPage({ exam, title, subtitle }: ExamLandingPageProps) {
  const courses = COURSES.filter((course) => course.examTypes.includes(exam as never) || course.examType === exam);

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Courses", href: "/courses" },
          { name: exam, href: `/courses/${exam.toLowerCase()}-exam-training` }
        ]}
        primaryCta={{ label: "Apply Now", href: "/apply" }}
        secondaryCta={{ label: "Talk to Counsellor", href: "/contact" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
