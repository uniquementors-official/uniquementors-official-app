import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { getGalleryItems } from "@/lib/life-content";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Life @ Unique Mentors - Gallery",
  description: "Explore Life @ Unique Mentors through team moments, counselling activities, student support and training highlights from our Kochi centre.",
  path: "/gallery",
  keywords: ["Life at Unique Mentors", "Unique Mentors gallery", "Unique Mentors Kochi photos"]
});

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHeader
        title="Life @ Unique Mentors"
        subtitle="A closer look at the people, moments and everyday mentoring culture behind Unique Mentors."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" }
        ]}
      />
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-navy shadow-soft">
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h2 className="font-display text-2xl font-bold leading-tight">{item.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/85">{item.description}</p>
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
