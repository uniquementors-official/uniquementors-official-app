import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/sections/CTASection";
import { AboutMediaSection } from "@/components/sections/AboutMediaSection";
import { MetroPillarShowcase } from "@/components/sections/MetroPillarShowcase";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsSection } from "@/components/sections/StatsSection";
import { Icon } from "@/components/common/Icon";
import { FounderStoryTimeline } from "@/components/ui/polaroid-flick-through";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Unique Mentors | Founded by Dr. Deepa & Dr. Praveena - Kochi",
  description:
    "Learn about Unique Mentors, a Kochi-based overseas medical licensing exam training centre founded by Dr. Deepa Seira Babu and Dr. Praveena Prathapachandran.",
  path: "/about"
});

const values = [
  { value: "Excellence", icon: "Trophy" },
  { value: "Integrity", icon: "ShieldCheck" },
  { value: "Innovation", icon: "Sparkles" },
  { value: "Compassion", icon: "HeartPulse" },
  { value: "Global Vision", icon: "Globe2" },
  { value: "Student First", icon: "Users" }
];

const founders = [
  {
    name: "Dr. Deepa Seira Babu",
    role: "Co-Founder",
    bio: "Academic mentoring, candidate guidance and structured exam preparation for overseas medical licensing pathways.",
    image: "/images/image.png"
  },
  {
    name: "Dr. Praveena Prathapachandran",
    role: "Co-Founder",
    bio: "Career counselling, licensing roadmap planning and professional development support for healthcare candidates.",
    image: "/images/image copy.png"
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Unique Mentors - A One-of-a-Kind Initiative"
        subtitle="Founder-led mentoring for healthcare professionals preparing for global licensing exams, documentation and career readiness."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-2">
          {founders.map(({ name, role, bio, image }) => (
            <article key={name} className="surface p-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 to-secondary/20">
                <Image
                  src={image}
                  alt={`${name} mentoring visual`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                <Icon name="Users2" className="absolute bottom-5 left-5 h-10 w-10 text-white" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{name}</h2>
              <p className="mt-1 font-semibold text-primary">{role}</p>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{bio}</p>
            </article>
          ))}
        </div>
      </section>
      <FounderStoryTimeline />
      <AboutMediaSection />
      <MetroPillarShowcase />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-2">
          <article className="surface p-6">
            <h2 className="font-display text-2xl font-bold">Mission</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              To make overseas medical licensing clear, ethical and achievable for healthcare professionals through expert
              training, transparent counselling and disciplined support.
            </p>
          </article>
          <article className="surface p-6">
            <h2 className="font-display text-2xl font-bold">Vision</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              To become India&apos;s most trusted mentoring centre for global healthcare careers across GCC and Western countries.
            </p>
          </article>
        </div>
        <div className="container mt-10">
          <h2 className="heading-lg text-center">Core Values</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ value, icon }) => (
              <div key={value} className="surface p-5">
                <Icon name={icon} className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-display text-xl font-bold">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <StatsSection />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="heading-lg text-center">Academic Mentors and Support Team</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Exam Faculty", "Licensing Counsellors", "Dataflow Specialists", "Student Success Team"].map((role) => (
              <div key={role} className="surface p-5 text-center">
                <Icon name="User" className="mx-auto h-8 w-8 text-secondary" />
                <h3 className="mt-3 font-semibold">{role}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
