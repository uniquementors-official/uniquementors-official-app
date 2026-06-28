import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "BLS & ACLS Training Kochi - Unique Mentors",
  description: "Certified Basic Life Support (BLS) and Advanced Cardiovascular Life Support (ACLS) training in Kochi for healthcare professionals.",
  path: "/services/bls-acls"
});

const courses = [
  {
    title: "BLS – Basic Life Support",
    icon: "HeartPulse",
    duration: "1 Day",
    certification: "AHA / ILCOR Certified",
    points: [
      "Adult, child and infant CPR",
      "Automated External Defibrillator (AED) use",
      "Relief of choking",
      "Recognition of cardiac arrest and stroke",
      "Team dynamics in emergency response"
    ]
  },
  {
    title: "ACLS – Advanced Cardiovascular Life Support",
    icon: "Activity",
    duration: "2 Days",
    certification: "AHA Certified",
    points: [
      "Advanced airway management",
      "Cardiac arrest algorithms",
      "Acute coronary syndrome management",
      "Stroke management",
      "Pharmacology for cardiac emergencies",
      "Megacode simulation"
    ]
  }
];

export default function BLSACLSPage() {
  return (
    <>
      <PageHeader
        title="BLS & ACLS Training in Kochi"
        subtitle="Internationally recognized Basic Life Support and Advanced Cardiovascular Life Support certification courses for healthcare professionals."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "BLS & ACLS Training", href: "/services/bls-acls" }
        ]}
        primaryCta={{ label: "Enquire Now", href: "/contact" }}
        secondaryCta={{ label: "WhatsApp Us", href: "https://wa.me/919526060607" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="heading-lg text-center">Certification Programmes</h2>
          <p className="body-lead mt-4 text-center mx-auto max-w-2xl">
            BLS and ACLS certification is mandatory for most overseas healthcare licensing exams. Get certified with our expert-led training sessions.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {courses.map(({ title, icon, duration, certification, points }) => (
              <article key={title} className="surface p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{title}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{duration}</span>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{certification}</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Icon name="CheckCircle" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
