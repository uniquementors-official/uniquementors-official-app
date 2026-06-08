import { Icon } from "@/components/common/Icon";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="surface relative h-full p-6">
      <Icon name="MessageCircle" className="absolute right-5 top-5 h-10 w-10 text-primary/15" />
      <div className="mb-4 flex items-center gap-1 text-amber-500" aria-label={`${testimonial.rating} out of 5 rating`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Icon key={index} name="Star" className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="min-h-[108px] text-sm leading-6 text-slate-600 dark:text-slate-300">“{testimonial.review}”</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-brand-ink dark:text-white">{testimonial.name}</h3>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {testimonial.profession} · {testimonial.examType} · {testimonial.country}
          </p>
        </div>
      </div>
    </article>
  );
}
