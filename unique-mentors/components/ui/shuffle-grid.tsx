"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SquareData = {
  id: number;
  src: string;
  alt: string;
  objectPosition?: string;
};

const squareData: SquareData[] = [
  {
    id: 1,
    src: "/images/herocarousel/image copy 18.png",
    alt: "Doctor counselling healthcare licensing candidates",
    objectPosition: "center"
  },
  {
    id: 2,
    src: "/images/herocarousel/image copy 14.png",
    alt: "Healthcare professional learning through digital classes",
    objectPosition: "center"
  },
  {
    id: 3,
    src: "/images/herocarousel/image copy 2.png",
    alt: "Healthcare exam coaching classroom",
    objectPosition: "center"
  },
  {
    id: 4,
    src: "/images/herocarousel/image copy.png",
    alt: "Laboratory professional preparing medical tests",
    objectPosition: "center"
  },
  {
    id: 5,
    src: "/images/herocarousel/image copy 12.png",
    alt: "Stethoscope and clinical learning material",
    objectPosition: "center"
  },
  {
    id: 6,
    src: "/images/herocarousel/image copy 13.png",
    alt: "Healthcare professional training session",
    objectPosition: "center"
  },
  {
    id: 7,
    src: "/images/herocarousel/image copy 15.png",
    alt: "Global healthcare licensing pathways",
    objectPosition: "center"
  },
  {
    id: 8,
    src: "/images/herocarousel/image copy 16.png",
    alt: "International healthcare registration support",
    objectPosition: "center"
  },
  {
    id: 9,
    src: "/images/herocarousel/image copy 17.png",
    alt: "Hospital and clinical service pathway",
    objectPosition: "center"
  },
  {
    id: 10,
    src: "/images/herocarousel/image copy 3.png",
    alt: "Dentistry licensing preparation",
    objectPosition: "center"
  },
  {
    id: 11,
    src: "/images/herocarousel/image copy 4.png",
    alt: "Doctor mentoring healthcare candidates",
    objectPosition: "center"
  },
  {
    id: 12,
    src: "/images/herocarousel/image copy 6.png",
    alt: "Doctor counselling a patient",
    objectPosition: "center"
  },
  {
    id: 13,
    src: "/images/herocarousel/image copy 7.png",
    alt: "Pharmacy and healthcare training environment",
    objectPosition: "center"
  },
  {
    id: 14,
    src: "/images/herocarousel/image copy 8.png",
    alt: "Radiography exam preparation environment",
    objectPosition: "center"
  },
  {
    id: 15,
    src: "/images/herocarousel/image.png",
    alt: "Medical laboratory training environment",
    objectPosition: "center"
  },
  {
    id: 16,
    src: "/images/herocarousel/image copy 18.png",
    alt: "Healthcare career counselling session",
    objectPosition: "center"
  }
];

function shuffle<T>(array: T[]) {
  const next = [...array];
  let currentIndex = next.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [next[currentIndex], next[randomIndex]] = [next[randomIndex] as T, next[currentIndex] as T];
  }

  return next;
}

export function ShuffleGrid({ className }: { className?: string }) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const data = useMemo(() => squareData, []);
  const [squares, setSquares] = useState(() => shuffle(data));
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.2 }
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const shuffleSquares = () => {
      setSquares(shuffle(data));
      timeoutRef.current = setTimeout(shuffleSquares, 3200);
    };

    timeoutRef.current = setTimeout(shuffleSquares, 800);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, isInView, shouldReduceMotion]);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid h-[360px] w-full max-w-[460px] grid-cols-4 grid-rows-4 gap-2 rounded-lg bg-white/[0.08] p-2 shadow-[0_32px_80px_rgba(0,0,0,0.3)] ring-1 ring-white/15 backdrop-blur-sm md:h-[430px]",
        className
      )}
    >
      {squares.map((square, index) => (
        <motion.div
          key={square.id}
          layout
          transition={{ duration: 1.45, type: "spring", bounce: 0.18 }}
          className="group relative h-full w-full overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
        >
          <Image
            src={square.src}
            alt={square.alt}
            fill
            sizes="(max-width: 1024px) 0px, 120px"
            quality={62}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: square.objectPosition ?? "center" }}
            loading={index < 4 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
}
