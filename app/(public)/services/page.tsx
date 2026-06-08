import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Our Medical Career Services - Unique Mentors Kochi",
  description: "Explore overseas licensing exam training, finishing school, GCC Dataflow and Western medical license processing services from Unique Mentors Kochi.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Medical Career Services - Unique Mentors Kochi"
        subtitle="Training, licensing support, documentation and career mentorship for healthcare professionals pursuing international careers."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" }
        ]}
        primaryCta={{ label: "Apply Now", href: "/apply" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="heading-lg text-center">How It Works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {["Free Counselling", "Course Enrollment", "Expert Training", "License & Career"].map((step, index) => (
              <div key={step} className="surface p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {index === 0
                    ? "Review your qualification, experience and target country."
                    : index === 1
                      ? "Choose the right program and batch schedule."
                      : index === 2
                        ? "Prepare with faculty, mocks and study planning."
                        : "Complete documentation, application and career transition steps."}
                </p>
                <Icon name="ArrowRight" className="mt-5 h-5 w-5 text-secondary" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
