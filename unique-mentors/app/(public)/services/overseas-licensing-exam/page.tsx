import type { Metadata } from "next";
import { COMMON_FAQS } from "@/lib/content";
import { EXAM_TYPES, PROFESSIONS } from "@/lib/constants";
import { PageHeader } from "@/components/layout/PageHeader";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { FAQSchema, generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Icon } from "@/components/common/Icon";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = generateSEOMetadata({
  title: "Overseas Medical Licensing Exam Training - MOH DHA HAAD CORU",
  description: "MOH, DHA, HAAD and CORU medical licensing exam training in Kochi for lab technicians, pharmacists, radiographers, doctors, dentists and nurses.",
  path: "/services/overseas-licensing-exam"
});

export default function OverseasLicensingPage() {
  return (
    <>
      <SchemaMarkup schema={FAQSchema(COMMON_FAQS)} />
      <PageHeader
        title="Overseas Medical Licensing Exam Training - MOH, DHA, HAAD, CORU"
        subtitle="Profession-specific coaching, mock exams, eligibility guidance and licensing support for healthcare candidates."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Overseas Licensing Exam", href: "/services/overseas-licensing-exam" }
        ]}
        primaryCta={{ label: "Explore Courses", href: "/courses" }}
        secondaryCta={{ label: "Apply Now", href: "/apply" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="heading-lg">Exam-focused training for global healthcare careers</h2>
            <p className="body-lead mt-4">
              Unique Mentors combines academic preparation with licensing pathway counselling so candidates can prepare for
              their target exam and manage application requirements with clarity.
            </p>
            <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="p-4">Exam</th>
                    <th className="p-4">Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {EXAM_TYPES.slice(0, 4).map((exam) => (
                    <tr key={exam.value}>
                      <td className="p-4 font-semibold">{exam.label}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{exam.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROFESSIONS.map((profession) => (
              <div key={profession.label} className="surface p-4">
                <Icon name={profession.icon} className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{profession.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="heading-lg text-center">Common Exam Questions</h2>
          <div className="mx-auto mt-8 max-w-3xl">
            <FAQAccordion faqs={COMMON_FAQS} />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
