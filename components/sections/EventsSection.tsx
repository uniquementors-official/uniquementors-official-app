import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type EventsSectionProps = {
  events: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    eventDate: string;
    location: string;
    coverImage?: string;
  }>;
};

export function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) return null;

  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div className="max-w-2xl">
            <span className="section-tag">Announcements & Updates</span>
            <h2 className="heading-lg mt-4">Events & Highlights</h2>
            <p className="body-lead mt-4">
              Explore quiz competitions, seminars, overseas licensing workshops, and finishing school events.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="self-start lg:self-auto">
            <Link href="/events">
              View All Events
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const isUpcoming = new Date(event.eventDate) >= new Date();
            return (
              <article key={event.id} className="group surface flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <Link href={`/events/${event.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={event.coverImage || "/images/blog/default.jpg"}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute right-3 top-3" variant={isUpcoming ? "default" : "secondary"}>
                    {isUpcoming ? "Upcoming" : "Past Event"}
                  </Badge>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" className="h-3.5 w-3.5 text-primary" />
                      {formatDate(event.eventDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" className="h-3.5 w-3.5 text-secondary" />
                      {event.location}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-brand-ink dark:text-white group-hover:text-primary">
                    <Link href={`/events/${event.slug}`}>
                      {event.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{event.excerpt}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
