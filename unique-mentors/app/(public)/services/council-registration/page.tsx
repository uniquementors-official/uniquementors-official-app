import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Medical Council Registration Support - Unique Mentors Kochi",
  description: "Expert assistance with medical council and regulatory body registration for healthcare professionals — NMC, GMC, AHPRA, NMBI and more.",
  path: "/services/council-registration"
});

const councils = [
  { name: "NMC – Nursing and Midwifery Council (UK)", icon: "BadgeCheck" },
  { name: "GMC – General Medical Council (UK)", icon: "BadgeCheck" },
  { name: "AHPRA – Australian Health Practitioner Regulation Agency", icon: "BadgeCheck" },
  { name: "NMBI – Nursing & Midwifery Board of Ireland", icon: "BadgeCheck" },
  { name: "CORU – Health & Social Care Professionals Council (Ireland)", icon: "BadgeCheck" },
  { name: "DHA / MOH / HAAD – UAE Health Authorities", icon: "BadgeCheck" },
  { name: "SCFHS – Saudi Commission for Health Specialties", icon: "BadgeCheck" },
  { name: "QCHP – Qatar Council for Healthcare Practitioners", icon: "BadgeCheck" }
];

const services = [
  { title: "Eligibility Assessment", icon: "ClipboardCheck", description: "We review your qualification and professional background against the target council's registration requirements." },
  { title: "Document Verification", icon: "FileText", description: "We help organize and verify all required documents — academic, professional registration and experience records." },
  { title: "Application Assistance", icon: "Send", description: "Our team guides you through every form, fee and submission step of the registration application process." },
  { title: "Status Follow-up", icon: "Activity", description: "We track your registration status and help resolve any queries raised by the council or authority." }
];

export default function CouncilRegistrationPage() {
  return (
    <>
      <PageHeader
        title="Medical Council Registration Support"
        subtitle="Expert guidance for healthcare professional registration with medical councils and regulatory bodies worldwide."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Medical Council Registration", href: "/services/council-registration" }
        ]}
        primaryCta={{ label: "Book Free Counselling", href: "/contact" }}
        secondaryCta={{ label: "WhatsApp Us", href: "https://wa.me/919526060607" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-lg">Councils & Authorities We Support</h2>
            <p className="body-lead mt-4">We guide healthcare professionals through registration with leading medical councils and regulatory authorities across the world.</p>
            <ul className="mt-8 space-y-3">
              {councils.map(({ name, icon }) => (
                <li key={name} className="flex items-start gap-3">
                  <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-6">{name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 content-start">
            {services.map(({ title, icon, description }) => (
              <article key={title} className="surface p-5 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={icon} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
