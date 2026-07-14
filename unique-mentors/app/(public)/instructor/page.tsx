import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/common/Icon";
import { getInstructors } from "@/lib/life-content";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Unique Mentors Instructors",
  description: "Meet the instructors and mentors guiding Unique Mentors students through licensing exam preparation, documentation support and career readiness.",
  path: "/instructor",
  keywords: ["Unique Mentors instructors", "Unique Mentors faculty", "medical licensing mentors Kochi"]
});

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function InstructorPage() {
  const instructors = await getInstructors();

  return (
    <>
      <PageHeader
        title="Our Instructors"
        subtitle="Meet the mentors supporting healthcare professionals with exam preparation, eligibility guidance and career-readiness training."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Instructors", href: "/instructor" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((instructor) => (
              <article key={instructor.id} className="surface overflow-hidden p-0">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10">
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.imageAlt || instructor.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
                        {initials(instructor.name)}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-primary shadow-soft">
                    <Icon name="GraduationCap" className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl font-bold text-brand-ink dark:text-white">{instructor.name}</h2>
                  {instructor.designation ? <p className="mt-1 text-sm font-semibold text-primary">{instructor.designation}</p> : null}
                  {instructor.bio ? <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{instructor.bio}</p> : null}
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
