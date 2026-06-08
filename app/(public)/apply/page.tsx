import type { Metadata } from "next";
import { ApplicationForm } from "@/components/common/ApplicationForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Apply for Medical Licensing Exam Training - Unique Mentors",
  description: "Apply for MOH, DHA, HAAD, CORU and overseas medical licensing exam training at Unique Mentors Kochi.",
  path: "/apply"
});

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        title="Apply for Medical Licensing Exam Training - Unique Mentors"
        subtitle="Complete a short application and our team will guide you through eligibility, course selection and documentation."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Apply", href: "/apply" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container max-w-4xl">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
