import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";

const features = [
  "Founder-led mentoring for global healthcare careers",
  "Exam preparation aligned with MOH, DHA, HAAD and CORU pathways",
  "Documentation, Dataflow and application support",
  "Finishing school training for communication and workplace readiness"
];

const founders = [
  {
    name: "Dr. Deepa Seira Babu",
    role: "Co-Founder and Mentor",
    bio: "Guides candidates with academic structure, professional clarity and compassionate mentorship."
  },
  {
    name: "Dr. Praveena Prathapachandran",
    role: "Co-Founder and Mentor",
    bio: "Leads career counselling, licensing pathway planning and student success initiatives."
  }
];

export function AboutSection() {
  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="section-tag">About us</span>
          <h2 className="heading-lg mt-4">Empowering Global Healthcare Careers</h2>
          <p className="body-lead mt-5">
            At Unique Mentors, our name reflects our essence: a one-of-a-kind initiative founded by two visionary women,
            Dr. Deepa Seira Babu and Dr. Praveena Prathapachandran. With a shared passion for healthcare education and
            professional mentoring, we help Indian healthcare professionals prepare for overseas medical licensing exams,
            choose the right GCC or Western pathway and build the confidence required for international practice.
          </p>
          <div className="mt-6 space-y-3">
            {features.map((feature) => (
              <p key={feature} className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                {feature}
              </p>
            ))}
          </div>
          <Button asChild className="mt-8">
            <Link href="/about">
              Meet Our Founders
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative grid gap-5 sm:grid-cols-2">
          {founders.map((founder) => (
            <article key={founder.name} className="surface p-5">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-secondary/20">
                <Icon name="Users2" className="h-16 w-16 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{founder.name}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{founder.role}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{founder.bio}</p>
            </article>
          ))}
          <div className="sm:col-span-2 grid gap-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-5 sm:grid-cols-2">
            <p className="flex items-center gap-2 font-semibold text-brand-ink dark:text-white">
              <Icon name="Calendar" className="h-5 w-5 text-primary" />
              Established 2020
            </p>
            <p className="flex items-center gap-2 font-semibold text-brand-ink dark:text-white">
              <Icon name="MapPin" className="h-5 w-5 text-secondary" />
              Kochi, Kerala
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
