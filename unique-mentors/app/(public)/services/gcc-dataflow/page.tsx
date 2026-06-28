import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "GCC DataFlow & Exam Registration - Unique Mentors Kochi",
  description: "End-to-end GCC DataFlow processing, exam registration, eligibility review and licensing documentation support for healthcare professionals.",
  path: "/services/gcc-dataflow"
});

const steps = [
  { title: "Eligibility Review", icon: "ClipboardCheck", description: "We assess your qualification, registration and experience against the target country's requirements before you begin." },
  { title: "Document Preparation", icon: "FileText", description: "Our team helps you organize and verify all required documents — academic certificates, registration, experience letters and more." },
  { title: "DataFlow Submission", icon: "Upload", description: "We guide you through the DataFlow primary source verification process and submission for GCC countries." },
  { title: "Exam Registration", icon: "PenTool", description: "We assist with exam slot booking, application forms and all required authority submissions." },
  { title: "Status Tracking", icon: "Activity", description: "We monitor your application status and keep you updated at every stage until your license is issued." }
];

const countries = [
  { name: "UAE (MOH / DHA / HAAD)", icon: "Globe2" },
  { name: "Qatar (QCHP)", icon: "Globe2" },
  { name: "Saudi Arabia (SCFHS)", icon: "Globe2" },
  { name: "Oman (OMSB)", icon: "Globe2" },
  { name: "Bahrain (NHRA)", icon: "Globe2" },
  { name: "Kuwait", icon: "Globe2" }
];

export default function GCCDataFlowPage() {
  return (
    <>
      <PageHeader
        title="GCC DataFlow & Exam Registration"
        subtitle="Complete DataFlow processing, document verification and exam registration support for GCC healthcare licensing."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "GCC DataFlow & Exam Registration", href: "/services/gcc-dataflow" }
        ]}
        primaryCta={{ label: "Book Free Counselling", href: "/contact" }}
        secondaryCta={{ label: "WhatsApp Us", href: "https://wa.me/919526060607" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="heading-lg text-center">Step-by-Step Process</h2>
          <p className="body-lead mt-4 text-center mx-auto max-w-2xl">
            From document review to license issuance — we handle every step of your GCC DataFlow and registration journey.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ title, icon, description }, i) => (
              <article key={title} className="surface p-6 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">{i + 1}</div>
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="heading-lg text-center">GCC Countries We Cover</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map(({ name, icon }) => (
              <div key={name} className="surface flex items-center gap-3 p-4">
                <Icon name={icon} className="h-5 w-5 text-primary" />
                <span className="font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
