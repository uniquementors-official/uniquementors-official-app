import type { Metadata } from "next";
import { ApplicationForm } from "@/components/common/ApplicationForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";

export const metadata: Metadata = generateSEOMetadata({
  title: "Apply for Medical Licensing Exam Training & DataFlow - Unique Mentors Kochi",
  description: "Ready to transition your healthcare career overseas? Apply online for MOH, DHA, HAAD, Prometric training or DataFlow documentation support at Unique Mentors Kochi.",
  path: "/apply",
  keywords: ["apply medical exam coaching", "prometric training online application", "dataflow verification application"]
});

type ApplyPageProps = {
  searchParams?: { service?: string | string[] };
};

export const dynamic = "force-dynamic";

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const service = Array.isArray(searchParams?.service) ? searchParams?.service[0] : searchParams?.service;
  const isStudyAbroad = service === "study-abroad";
  const countries = isStudyAbroad
    ? await prisma.studyAbroad.findMany({
        where: { status: "PUBLISHED" },
        select: { country: true },
        distinct: ["country"],
        orderBy: { country: "asc" }
      })
    : [];

  return (
    <>
      <PageHeader
        title={isStudyAbroad ? "Apply for Study Abroad - Unique Mentors" : "Apply for Medical Licensing Exam Training - Unique Mentors"}
        subtitle={isStudyAbroad ? "Share your basic details, qualification and preferred destination. Our counselling team will guide your next step." : "Complete a short application and our team will guide you through eligibility, course selection and documentation."}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Apply", href: "/apply" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container max-w-4xl">
          <ApplicationForm mode={isStudyAbroad ? "study-abroad" : "medical"} studyAbroadCountries={countries.map((item) => item.country)} />
        </div>
      </section>
    </>
  );
}
