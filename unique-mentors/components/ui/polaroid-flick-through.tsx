"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageData = {
  src: string;
  alt: string;
  id: string;
  caption?: string;
};

type ScatterPosition = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

export type ImageStackRef = {
  reshuffle: () => void;
};

type ImageStackProps = {
  images?: ImageData[];
  maxRotation?: number;
  scatterRadius?: number;
  seed?: number;
  className?: string;
  onReshuffle?: () => void;
};

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  range(min: number, max: number) {
    return min + this.next() * (max - min);
  }
}

const defaultImages: ImageData[] = [
  { id: "founder-1", src: "/images/samples/WhatsApp_Image_2026-07-21_at_14.45.40.jpeg", alt: "Unique Mentors founder story visual", caption: "Founder-led mentoring" },
  { id: "founder-2", src: "/images/samples/WhatsApp_Image_2026-07-21_at_14.45.47.jpeg", alt: "Unique Mentors classroom and campaign visual", caption: "Kochi to global careers" },
  {
    id: "founder-3",
    src: "/images/samples/WhatsApp_Image_2026-07-21_at_14.45.57.jpeg",
    alt: "Healthcare mentoring session",
    caption: "Student-first counselling"
  },
  {
    id: "founder-4",
    src: "/images/samples/WhatsApp_Image_2026-07-21_at_14.46.05.jpeg",
    alt: "Medical professional preparing a licensing roadmap",
    caption: "Structured exam preparation"
  },
  {
    id: "founder-5",
    src: "/images/samples/WhatsApp_Image_2026-07-21_at_14.46.10.jpeg",
    alt: "Laboratory professional training for licensing",
    caption: "Profession-specific support"
  }
];

function generateScatterPositions(images: ImageData[], seed: number, scatterRadius: number, maxRotation: number) {
  const rng = new SeededRandom(seed);

  return images.map((_, index) => {
    const drift = index % 2 === 0 ? -1 : 1;

    return {
      x: rng.range(-scatterRadius * 1.8, scatterRadius * 1.6) + drift * 18,
      y: rng.range(-scatterRadius, scatterRadius),
      rotation: rng.range(-maxRotation, maxRotation),
      scale: rng.range(0.96, 1.04)
    };
  });
}

export const ImageStack = React.forwardRef<ImageStackRef, ImageStackProps>(
  (
    {
      images = defaultImages,
      maxRotation = 14,
      scatterRadius = 46,
      seed = 12345,
      className,
      onReshuffle
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [imagesLoaded, setImagesLoaded] = React.useState(false);
    const [currentSeed, setCurrentSeed] = React.useState(seed);
    const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());
    const containerRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const scatterPositions = React.useMemo(
      () => generateScatterPositions(images, currentSeed, scatterRadius, maxRotation),
      [currentSeed, images, maxRotation, scatterRadius]
    );

    const reshuffle = React.useCallback(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSeed((prev) => prev + 1);
        setIsVisible(true);
        onReshuffle?.();
      }, prefersReducedMotion ? 0 : 260);
    }, [onReshuffle, prefersReducedMotion]);

    React.useImperativeHandle(ref, () => ({ reshuffle }), [reshuffle]);

    React.useEffect(() => {
      let cancelled = false;

      const preloadImages = async () => {
        const loadPromises = images.map((image) => {
          return new Promise<string>((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              setLoadedImages((prev) => new Set(prev).add(image.id));
              resolve(image.id);
            };
            img.onerror = () => resolve(image.id);
            img.src = image.src;
          });
        });

        await Promise.all(loadPromises);
        if (!cancelled) {
          setImagesLoaded(true);
        }
      };

      preloadImages();

      return () => {
        cancelled = true;
      };
    }, [images]);

    React.useEffect(() => {
      const node = containerRef.current;
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && imagesLoaded) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, [imagesLoaded]);

    const transition: Transition = prefersReducedMotion
      ? { duration: 0 }
      : { type: "spring", stiffness: 70, damping: 18, mass: 1.1 };

    return (
      <div
        ref={containerRef}
        className={cn("relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center", className)}
        aria-label="Founder story photo stack"
      >
        <motion.div className="relative h-72 w-56 sm:h-80 sm:w-64" initial={false}>
          {images.map((image, index) => {
            const position = scatterPositions[index] ?? { x: 0, y: 0, rotation: 0, scale: 1 };
            const zIndex = images.length - index;

            return (
              <motion.figure
                key={image.id}
                initial={false}
                animate={
                  isVisible
                    ? {
                        x: position.x,
                        y: position.y,
                        rotate: position.rotation,
                        scale: position.scale,
                        zIndex
                      }
                    : { x: 0, y: 0, rotate: 0, scale: 1, zIndex }
                }
                transition={{ ...transition, delay: prefersReducedMotion ? 0 : index * 0.12 }}
                className="absolute inset-0 overflow-hidden rounded-lg border border-white bg-white p-2 shadow-[0_28px_60px_rgba(15,23,42,0.18)]"
              >
                <div className="relative h-[calc(100%-2.25rem)] overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 260px, 220px"
                    className="object-cover"
                    priority={index < 2}
                  />
                  {!loadedImages.has(image.id) ? <div className="absolute inset-0 animate-pulse bg-slate-200" /> : null}
                </div>
                <figcaption className="flex h-9 items-center justify-center truncate px-2 text-center text-xs font-semibold text-slate-700">
                  {image.caption ?? image.alt}
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>
    );
  }
);
ImageStack.displayName = "ImageStack";

const founderStory = [
  {
    year: "2015",
    title: "Unique Mentors Sharpening Skills!!",
    text: "Debuts with GCC Exam Training for Allied Health Sciences"
  },
  {
    year: "2016",
    title: "STRETCHING BOUNDARIES:",
    text: "PSC & Govt. Exam Training Expands Opportunities"
  },
  {
    year: "2017",
    title: "EXPERTISE ELEVATED:",
    text: "Physician Category Training Sets New Standards"
  },
  {
    year: "2018",
    title: "A CENTURY OF EXCELLENCE:",
    text: "100 Batches of Unparalleled Success"
  },
  {
    year: "2019",
    title: "GLOBAL IMPACT:",
    text: "+2000 Students Placed Worldwide, Dreams Realized"
  },
  {
    year: "2020",
    title: "LEARNING REVOLUTIONIZED:",
    text: "Online Trainings and Western Licensure Unlocked"
  },
  {
    year: "2021",
    title: "CULTURAL CONNECTIONS:",
    text: "Language Trainings Bridge Global Gaps"
  },
  {
    year: "2023",
    title: "INTERNATIONAL ACCREDITATION:",
    text: "HCPC, CORU Western Processing Achieved"
  },
  {
    year: "2024",
    title: "INNOVATION UNLEASHED:",
    text: "Mobile App, Office, and Advanced LMS Transform Learning"
  },
  {
    year: "2026",
    title: "Australian Licensure - ADC. APC",
    text: "Exam trainings and Assessment"
  }
];

export function FounderStoryTimeline() {
  const stackRef = React.useRef<ImageStackRef>(null);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-900">
      <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="section-tag">About page - founder story</span>
          <h2 className="heading-lg mt-4">Our Journey</h2>
          <p className="body-lead mt-4">
            A founder-led story of academic care, documentation clarity and global career mentoring from Kochi.
          </p>
          <Button
            type="button"
            className="mt-6 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 text-slate-900 shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5 transition duration-200 border-0 rounded-full px-6 font-semibold"
            onClick={() => stackRef.current?.reshuffle()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Shuffle story cards
          </Button>
        </div>
        <div className="relative min-h-[460px]">
          <ImageStack ref={stackRef} />
        </div>
      </div>
      <div className="container mt-8">
        <div className="grid gap-4 md:grid-cols-4">
          {founderStory.map((item) => (
            <article key={item.year} className="surface p-5">
              <p className="font-display text-2xl font-bold text-primary">{item.year}</p>
              <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
