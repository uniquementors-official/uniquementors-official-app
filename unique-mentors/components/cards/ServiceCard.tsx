import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";
import type { ServiceItem } from "@/types";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group surface relative flex h-full flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-70 transition group-hover:opacity-100" />
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-white shadow-soft transition group-hover:scale-105">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl font-bold leading-snug text-brand-ink dark:text-white">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {service.features.map((feature) => (
          <Badge key={feature} variant="muted">
            {feature}
          </Badge>
        ))}
      </div>
      <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary">
        Learn More
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}
