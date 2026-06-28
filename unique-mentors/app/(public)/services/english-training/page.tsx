import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/common/Icon";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "English Language Training - IELTS, OET, PTE - Unique Mentors",
  description: "Focused IELTS, OET and PTE preparation for healthcare professionals in Kochi. Build the language skills required for overseas licensing and visa applications.",
  path: "/services/english-training"
});

const programs = [
  {
    title: "IELTS Preparation",
    icon: "BookOpen",
    band: "Target: 7.0+",
    description: "Comprehensive IELTS Academic coaching with listening, reading, writing and speaking modules tailored for healthcare professionals."
  },
  {
    title: "OET Preparation",
    icon: "Stethoscope",
    band: "Target: Grade B",
    description: "Occupational English Test preparation designed specifically for medical and allied health professionals targeting UK, Australia and Ireland."
  },
  {
    title: "PTE Academic",
    icon: "Monitor",
    band: "Target: 65+",
    description: "Computer-based PTE preparation with practice tests, score strategies and targeted improvement for all four skills."
  }
];

const features = [
  { title: "Healthcare-Specific Content", icon: "HeartPulse" },
  { title: "Mock Tests & Score Review", icon: "ClipboardList" },
  { title: "Speaking & Writing Practice", icon: "MessageCircle" },
  { title: "Flexible Batch Timings", icon: "Clock" },
  { title: "Online & Offline Modes", icon: "Globe2" },
  { title: "Expert Faculty", icon: "GraduationCap" }
];

export default function EnglishTrainingPage() {
  return (
    <>
      <PageHeader
        title="English Language Training — IELTS, OET & PTE"
        subtitle="Language proficiency preparation for healthcare professionals planning overseas licensing and immigration."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "English Language Training", href: "/services/english-training" }
        ]}
        primaryCta={{ label: "Enquire Now", href: "/contact" }}
        secondaryCta={{ label: "WhatsApp Us", href: "https://wa.me/919526060607" }}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="heading-lg text-center">Programmes We Offer</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {programs.map(({ title, icon, band, description }) => (
              <article key={title} className="surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon name={icon} className="h-6 w-6" />
                </div>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {band}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="heading-lg text-center">Why Train With Us</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, icon }) => (
              <div key={title} className="surface flex items-center gap-3 p-4">
                <Icon name={icon} className="h-5 w-5 text-primary" />
                <span className="font-semibold">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
