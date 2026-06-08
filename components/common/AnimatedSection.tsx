"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
};

export function AnimatedSection({ children, delay = 0, direction = "up", className }: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();
  const offsets = {
    up: { y: 28, x: 0, scale: 1 },
    left: { y: 0, x: -28, scale: 1 },
    right: { y: 0, x: 28, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.96 }
  };

  const initial = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...initial }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
