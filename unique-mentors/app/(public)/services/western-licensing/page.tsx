import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Western Licensing for Healthcare Professionals - Unique Mentors",
  description: "Healthcare licensing support for USA (USMLE), UK (PLAB / HCPC), Australia (AMC / ADC / APC) and Canada. Expert guidance from Kochi.",
  path: "/services/western-licensing"
});

const destinations = [
  {
    country: "USA",
    icon: "MapPin",
    exams: ["USMLE Step 1, 2 & 3"],
    description: "Structured USMLE preparation with step-by-step guidance, study planning and mock exams for medical professionals."
  },
  {
    country: "United Kingdom",
    icon: "MapPin",
    exams: ["PLAB 1 & 2", "HCPC (Allied Health)"],
    description: "PLAB coaching for General Practitioners and HCPC registration support for allied health professionals."
  },
  {
    country: "Australia",
    icon: "MapPin",
    exams: ["AMC (Doctors)", "ADC (Dentists)", "APC (Physiotherapists)"],
    description: "Australian licensing exam preparation and registration pathway support for medical, dental and allied health professionals."
  },
  {
    country: "Canada",
    icon: "MapPin",
    exams: ["MCCQE", "NDEB (Dentists)"],
    description: "Eligibility review, documentation planning and preparation guidance for Canadian healthcare licensing."
  }
];

export default function WesternLicensingPage() {
  return (
    <>
      <PageHeader
        title="Western Licensing for Healthcare Professionals"
        subtitle="Expert guidance for USA, UK, Australia and Canada healthcare licensing — from eligibility to exam to registration."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Western Licensing", href: "/services/western-licensing" }
        ]}
        primaryCta={{ label: "Check Eligibility", href: "/contact" }}
        secondaryCta={{ label: "WhatsApp Us", href: "https://wa.me/919526060607" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="heading-lg text-center">Destination Countries</h2>
          <p className="body-lead mt-4 text-center mx-auto max-w-2xl">
            We support healthcare professionals planning careers in top Western destinations with end-to-end licensing guidance.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {destinations.map(({ country, icon, exams, description }) => (
              <article key={country} className="surface p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{country}</h3>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {exams.map((exam) => (
                    <span key={exam} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                      {exam}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
