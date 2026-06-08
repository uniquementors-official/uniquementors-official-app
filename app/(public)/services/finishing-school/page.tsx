import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Finishing School for Healthcare Professionals - Kochi",
  description: "Professional finishing school in Kochi for healthcare candidates: communication, leadership, cultural awareness, etiquette, interviews and CV preparation.",
  path: "/services/finishing-school"
});

const modules = [
  { title: "Communication Skills", icon: "MessageCircle" },
  { title: "Leadership Development", icon: "Trophy" },
  { title: "Cultural Awareness", icon: "Globe2" },
  { title: "Professional Etiquette", icon: "BadgeCheck" },
  { title: "Interview Preparation", icon: "Users" },
  { title: "CV & Portfolio Building", icon: "FileText" }
];

export default function FinishingSchoolPage() {
  return (
    <>
      <PageHeader
        title="Finishing School for Healthcare Professionals - Kochi"
        subtitle="Build the communication, confidence and workplace readiness needed for a successful global healthcare career."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Finishing School", href: "/services/finishing-school" }
        ]}
        primaryCta={{ label: "Apply Now", href: "/apply" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ title, icon }) => (
              <article key={title} className="surface p-6">
                <Icon name={icon} className="h-8 w-8 text-primary" />
                <h2 className="mt-5 font-display text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  Practical sessions, mentoring and exercises that help healthcare professionals present themselves with clarity and confidence.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
