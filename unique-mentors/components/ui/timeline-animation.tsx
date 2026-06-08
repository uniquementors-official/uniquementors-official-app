"use client";

import React, { type ElementType, useMemo } from "react";
import { motion, type Variants } from "framer-motion";

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)"
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.12,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

type TimelineContentProps = {
  as?: ElementType;
  animationNum?: number;
  customVariants?: Variants;
  timelineRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
} & Record<string, unknown>;

export function TimelineContent({
  as = "div",
  animationNum = 0,
  customVariants,
  timelineRef: _timelineRef,
  children,
  ...props
}: TimelineContentProps) {
  const MotionComponent = useMemo(() => motion.create(as), [as]);

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={customVariants ?? defaultVariants}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
