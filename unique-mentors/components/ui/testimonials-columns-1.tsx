"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ColumnTestimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10
}: {
  className?: string;
  testimonials: ColumnTestimonial[];
  duration?: number;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
        className="flex flex-col gap-6 bg-background pb-6"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, itemIndex) => (
              <article
                className="w-full max-w-xs rounded-lg border border-border bg-card p-8 shadow-lg shadow-primary/10"
                key={`${name}-${itemIndex}`}
              >
                <p className="text-sm leading-7 text-card-foreground">{text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <Image width={40} height={40} src={image} alt={name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="min-w-0">
                    <h3 className="truncate font-medium leading-5 tracking-normal">{name}</h3>
                    <p className="truncate text-sm leading-5 text-muted-foreground">{role}</p>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
