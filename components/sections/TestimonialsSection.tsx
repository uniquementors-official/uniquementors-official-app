"use client";

import { motion } from "motion/react";
import { TESTIMONIALS } from "@/lib/content";
import { TestimonialsColumn, type ColumnTestimonial } from "@/components/ui/testimonials-columns-1";
import { Icon } from "@/components/common/Icon";

const portraitImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
];

const testimonials: ColumnTestimonial[] = TESTIMONIALS.map((testimonial, index) => ({
  text: testimonial.review,
  image: portraitImages[index % portraitImages.length] ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  name: testimonial.name,
  role: `${testimonial.profession} · ${testimonial.examType} · ${testimonial.country}`
}));

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="relative bg-background py-20">
      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[620px] flex-col items-center justify-center text-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border border-border px-4 py-1 text-sm font-semibold text-primary">Success Stories</div>
          </div>

          <h2 className="mt-5 font-display text-3xl font-bold tracking-normal text-foreground sm:text-4xl lg:text-5xl">
            What Our Students Say
          </h2>
          <p className="mt-5 text-center leading-7 text-muted-foreground">
            Real outcomes from healthcare professionals who prepared for MOH, DHA, HAAD, CORU and global licensing pathways with Unique Mentors.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
            <span className="flex text-amber-500" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon key={index} name="Star" className="h-4 w-4 fill-current" />
              ))}
            </span>
            4.9/5 from 500+ reviews
          </div>
        </motion.div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn.length ? thirdColumn : testimonials.slice(0, 3)} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
