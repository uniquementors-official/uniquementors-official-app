import type { Metadata } from "next";
import { COUNTRIES_SERVED } from "@/lib/constants";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "GCC & Western Country Medical License Processing - Unique Mentors",
  description: "Medical license processing, Dataflow support and documentation guidance for UAE, Saudi, Qatar, Ireland, Canada, Australia and other destinations.",
  path: "/services/gcc-western-license-processing"
});

export default function LicenseProcessingPage() {
  return (
    <>
      <PageHeader
        title="GCC & Western Country Medical License Processing - Unique Mentors"
        subtitle="Eligibility review, Dataflow, documentation checklists and country-specific licensing support for healthcare professionals."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "License Processing", href: "/services/gcc-western-license-processing" }
        ]}
        primaryCta={{ label: "Start Documentation Review", href: "/contact" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="heading-lg">Dataflow and license processing explained</h2>
            <p className="body-lead mt-4">
              Our team helps candidates organize academic certificates, registration records, experience letters, good
              standing documents and authority-specific application milestones.
            </p>
            <div className="mt-8 space-y-3">
              {["Eligibility screening", "Document checklist", "Dataflow submission support", "Application tracking", "Career counselling"].map((item) => (
                <p key={item} className="flex gap-3 font-medium">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-secondary" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {COUNTRIES_SERVED.map((country) => (
              <div key={country} className="surface p-4">
                <Icon name="Globe" className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{country}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
