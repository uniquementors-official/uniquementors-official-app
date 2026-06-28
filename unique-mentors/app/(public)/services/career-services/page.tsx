import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Career Services for Healthcare Professionals - Kochi",
  description: "Comprehensive career services in Kochi for healthcare candidates: Resume Building, CV Creation, LinkedIn Profile Assistance, Career Guidance, and Interview Preparation.",
  path: "/services/career-services"
});

const modules = [
  { title: "Resume Building", icon: "FileText" },
  { title: "CV Creation", icon: "FileEdit" },
  { title: "LinkedIn Profile Assistance", icon: "Linkedin" },
  { title: "Career Guidance", icon: "Compass" },
  { title: "Interview Preparation", icon: "MessageCircle" }
];

export default function CareerServicesPage() {
  return (
    <>
      <PageHeader
        title="Career Services for Healthcare Professionals - Kochi"
        subtitle="Build a strong professional profile and gain the confidence needed for a successful global healthcare career."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Career Services", href: "/services/career-services" }
        ]}
        primaryCta={{ label: "Book Free Counselling", href: "/contact" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ title, icon }) => (
              <article key={title} className="surface p-6">
                <Icon name={icon} className="h-8 w-8 text-primary" />
                <h2 className="mt-5 font-display text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  Practical mentoring and exercises that help healthcare professionals present themselves with clarity and confidence.
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
