import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/sections/CTASection";
import { AboutMediaSection } from "@/components/sections/AboutMediaSection";
import { MetroPillarShowcase } from "@/components/sections/MetroPillarShowcase";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsSection } from "@/components/sections/StatsSection";
import { Icon } from "@/components/common/Icon";
import AboutSection3 from "@/components/ui/about-section";
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
    image: "/images/founders/Dr.%20Deepa%20Seira%20Babu.png"
  },
  {
    name: "Dr. Praveena Prathapachandran",
    role: "Co-Founder",
    bio: "Career counselling, licensing roadmap planning and professional development support for healthcare candidates.",
    image: "/images/founders/Dr.%20Praveena%20Prathapachandran.png"
  }
];

const teamMembers = [
  {
    name: "Ms. Kavitha R Nair",
    role: "Academic Head",
    image: "/images/team/Ms.%20Kavitha%20R%20Nair.png"
  },
  {
    name: "Ms. Amritha Santhosh",
    role: "Business Development Manager",
    image: "/images/team/Ms.%20Amritha%20Santhosh.png"
  },
  {
    name: "Ms. Abhirami Suresh",
    role: "Senior Executive - Marketing & Sales",
    image: "/images/team/Ms.%20Abhirami%20Suresh.png"
  },
  {
    name: "Ms. Linu Sukumaran",
    role: "Senior Executive - Marketing & Sales",
    image: "/images/team/Ms.%20Linu%20Sukumaran.png"
  },
  {
    name: "Ms. Linu Roy",
    role: "Senior Executive - Operations",
    image: "/images/team/Ms.%20Linu%20Roy.png"
  },
  {
    name: "Ms. Jomol Benny",
    role: "Senior Executive - Operations",
    image: "/images/team/Ms.%20Jomol%20Benny.png"
  },
  {
    name: "Ms. Aiswarya A",
    role: "Junior Executive - Marketing & Sales",
    image: "/images/team/Ms.%20Aiswarya%20A.png"
  },
  {
    name: "Ms. Aiswarya Binu",
    role: "Junior Executive - Operations",
    image: "/images/team/Ms.%20Aiswarya%20Binu.png"
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
      <AboutSection3 />

      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-2">
          {founders.map(({ name, role, bio, image }) => (
            <article key={name} className="surface p-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 to-secondary/20 sm:aspect-[4/5]">
                <Image
                  src={image}
                  alt={`${name}, ${role} at Unique Mentors`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
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
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-tag mx-auto">Team</span>
            <h2 className="heading-lg mt-4">Academic Mentors and Support Team</h2>
            <p className="body-lead mt-5">
              Meet the team supporting exam training, licensing guidance, documentation, operations and student success.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(({ name, role, image }) => (
              <article key={name} className="surface overflow-hidden p-0">
                <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Image
                    src={image}
                    alt={`${name}, ${role} at Unique Mentors`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold">{name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{role}</p>
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
