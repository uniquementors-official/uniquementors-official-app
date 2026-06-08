import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { formatDate } from "@/lib/utils";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Unique Mentors Events - Quizzes, Seminars & Finishing School News",
  description: "Explore the latest event updates, collaborative quiz competitions with The Hindu, finishing school seminars, and news from Unique Mentors.",
  path: "/events"
});

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "desc" }
  });

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.eventDate) >= now);
  const pastEvents = events.filter((e) => new Date(e.eventDate) < now);

  return (
    <>
      <PageHeader
        title="Unique Mentors Events"
        subtitle="Stay updated with our seminars, quizzes, finishing school activities, and institutional collaborations."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Events", href: "/events" }
        ]}
      />
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="container space-y-12">
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="CalendarCheck" className="h-6 w-6 text-primary" />
                Upcoming Events
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} isUpcoming={true} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="History" className="h-6 w-6 text-slate-500" />
              Past Events & Highlights
            </h2>
            {pastEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isUpcoming={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 surface">
                <Icon name="Calendar" className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-2 text-slate-500">No past events recorded yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({ event, isUpcoming }: { event: any; isUpcoming: boolean }) {
  return (
    <article className="group surface flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/events/${event.slug}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={`View ${event.title}`}>
        <Image
          src={event.coverImage || "/images/blog/default.jpg"}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <Badge className="absolute right-3 top-3 shadow-sm" variant={isUpcoming ? "default" : "secondary"}>
          {isUpcoming ? "Upcoming" : "Past Event"}
        </Badge>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
          <span className="flex items-center gap-1">
            <Icon name="Calendar" className="h-3.5 w-3.5 text-primary" />
            {formatDate(event.eventDate.toISOString())}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="MapPin" className="h-3.5 w-3.5 text-secondary" />
            {event.location}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-brand-ink dark:text-white">
          <Link href={`/events/${event.slug}`} className="hover:text-primary">
            {event.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{event.excerpt}</p>
        <Button asChild variant="outline" size="sm" className="mt-5 w-full">
          <Link href={`/events/${event.slug}`}>
            Read More
            <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
