"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Speaker = {
  name: string;
  role: string;
  src: string;
};

type ScrollPortraitWallProps = {
  title?: React.ReactNode;
  date?: React.ReactNode;
  hint?: React.ReactNode;
  speakers?: Speaker[];
  columns?: number;
  showCaptions?: boolean;
  className?: string;
};

function buildLayout(count: number, cols: number) {
  const rows: number[][] = [];
  let i = 0;
  let r = 0;

  while (i < count) {
    const row = new Array<number>(cols).fill(-1);
    const firstColumn = (r * 2 + (r % 2)) % cols;
    row[firstColumn] = i;
    i += 1;

    if (r % 3 === 0 && i < count) {
      let secondColumn = (firstColumn + 2) % cols;
      if (secondColumn === firstColumn) {
        secondColumn = (firstColumn + 1) % cols;
      }
      row[secondColumn] = i;
      i += 1;
    }

    rows.push(row);
    r += 1;
  }

  return rows;
}

function useResponsiveColumns(desired: number) {
  const [columns, setColumns] = React.useState(desired);

  React.useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (lg.matches) {
        setColumns(desired);
      } else if (sm.matches) {
        setColumns(Math.min(desired, 3));
      } else {
        setColumns(Math.min(desired, 2));
      }
    };

    update();
    sm.addEventListener("change", update);
    lg.addEventListener("change", update);

    return () => {
      sm.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, [desired]);

  return columns;
}

export function ScrollPortraitWall({
  title = "What We Offer",
  date = "Unique Mentors",
  hint = "scroll to explore",
  speakers = [],
  columns = 4,
  showCaptions = true,
  className
}: ScrollPortraitWallProps) {
  const root = React.useRef<HTMLElement | null>(null);
  const hintRef = React.useRef<HTMLDivElement | null>(null);
  const cols = useResponsiveColumns(Math.max(1, columns));
  const layout = React.useMemo(() => buildLayout(speakers.length, cols), [cols, speakers.length]);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = gsap.utils.toArray<HTMLElement>(".spw-item");

      if (reduce) {
        gsap.set(items, { scale: 1 });
        return;
      }

      gsap.to(hintRef.current, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=40%",
          scrub: true
        }
      });

      items.forEach((element) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          })
          .fromTo(element, { scale: 0 }, { scale: 1, ease: "power2.out", duration: 0.5 })
          .to(element, { scale: 0, ease: "power2.in", duration: 0.5 });
      });
    }, root);

    return () => ctx.revert();
  }, [cols, speakers.length]);

  return (
    <section
      ref={root}
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("relative w-full overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white", className)}
    >
      <div
        ref={hintRef}
        className="pointer-events-none absolute left-1/2 top-[58vh] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center"
      >
        <span className="relative max-w-[12ch] text-xs font-bold uppercase leading-tight text-slate-500 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-slate-400/70 after:content-[''] dark:text-slate-400">
          {hint}
        </span>
      </div>

      <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center text-white mix-blend-exclusion">
        <h2 className="font-display text-5xl font-semibold tracking-normal sm:text-7xl md:text-8xl lg:text-9xl">
          {title}
        </h2>
        {date ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60 sm:text-sm">{date}</p> : null}
      </div>

      <div className="relative z-0 mb-[46vh] mt-[46vh]">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full">
            {row.map((speakerIndex, columnIndex) => {
              const speaker = speakerIndex >= 0 ? speakers[speakerIndex] : undefined;

              if (!speaker) {
                return <div key={columnIndex} className="aspect-square flex-1" />;
              }

              const origin = columnIndex < cols / 2 ? "right bottom" : "left bottom";

              return (
                <div key={`${speaker.name}-${columnIndex}`} className="aspect-square flex-1 p-1 md:p-2">
                  <div
                    className="spw-item relative h-full w-full overflow-hidden rounded-lg bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:bg-slate-900"
                    style={{ transformOrigin: origin, transform: "scale(0)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={speaker.src}
                      alt={speaker.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-95"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-4 text-white">
                      <h3 className="truncate font-display text-lg font-bold tracking-normal">{speaker.name}</h3>
                      {showCaptions ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/76">{speaker.role}</p> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScrollPortraitWall;
