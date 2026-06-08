import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReadingProgress } from "@/components/common/ReadingProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { SITE_CONFIG } from "@/lib/constants";
import { formatDate, slugify, stripHtml } from "@/lib/utils";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true }
  });
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug }
  });
  if (!event) return { title: "Event | Unique Mentors" };
  return generateSEOMetadata({
    title: `${event.title} | Unique Mentors Events`,
    description: event.excerpt,
    path: `/events/${event.slug}`,
    image: event.coverImage || undefined
  });
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug }
  });
  if (!event) notFound();

  const eventUrl = `${SITE_CONFIG.url}/events/${event.slug}`;
  const headings = Array.from(event.content.matchAll(/<h([23])>(.*?)<\/h\1>/g)).map((match) => {
    const text = stripHtml(match[2] ?? "");
    return { text, id: slugify(text) };
  });
  const html = event.content.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level: string, text: string) => {
    const id = slugify(stripHtml(text));
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  const dbRelated = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: event.id }
    },
    take: 3
  });

  const now = new Date();
  const isUpcoming = new Date(event.eventDate) >= now;

  return (
    <>
      <ReadingProgress />
      <PageHeader
        title={event.title}
        subtitle={event.excerpt}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Events", href: "/events" },
          { name: event.title, href: `/events/${event.slug}` }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[1fr_320px]">
          <article>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={event.coverImage || "/images/blog/default.jpg"} alt={event.title} fill priority sizes="(min-width: 1024px) 780px, 100vw" className="object-cover" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-semibold">
              <Badge variant={isUpcoming ? "default" : "secondary"}>
                {isUpcoming ? "Upcoming Event" : "Past Event"}
              </Badge>
              <span className="flex items-center gap-1">
                <Icon name="Calendar" className="h-4 w-4 text-primary" />
                {formatDate(event.eventDate.toISOString())}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="MapPin" className="h-4 w-4 text-secondary" />
                {event.location}
              </span>
            </div>
            <div className="prose-article mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          </article>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-max">
            {headings.length > 0 && (
              <div className="surface p-5">
                <h2 className="font-display text-xl font-bold">Table of Contents</h2>
                <div className="mt-4 space-y-2">
                  {headings.map((heading) => (
                    <a key={heading.id} href={`#${heading.id}`} className="block text-sm text-slate-600 hover:text-primary dark:text-slate-300">
                      {heading.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="surface p-5">
              <h2 className="font-display text-xl font-bold">Location Details</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                This event takes place at:
              </p>
              <p className="mt-2 text-sm font-semibold flex items-center gap-2">
                <Icon name="MapPin" className="h-4 w-4 text-secondary" />
                {event.location}
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href="/contact">Inquire about events</Link>
              </Button>
            </div>
            {dbRelated.length > 0 ? (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Other Events</h2>
                {dbRelated.map((item) => (
                  <Link key={item.slug} href={`/events/${item.slug}`} className="surface p-4 block hover:shadow-soft transition group">
                    <p className="text-xs font-semibold text-primary">{formatDate(item.eventDate.toISOString())}</p>
                    <h3 className="mt-1 font-bold text-slate-900 group-hover:text-primary dark:text-white line-clamp-2">{item.title}</h3>
                  </Link>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
