"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";
import { ShuffleGrid } from "@/components/ui/shuffle-grid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const injectedStyles = `
  .gsap-reveal { visibility: hidden; }
  .transform-style-3d { transform-style: preserve-3d; }
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.045; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }
  .bg-grid-theme {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  .text-3d-matte {
    color: #ffffff;
    text-shadow: 0 20px 45px rgba(0,0,0,0.38), 0 2px 4px rgba(0,0,0,0.2);
  }
  .text-silver-matte {
    background: linear-gradient(180deg, #ffffff 0%, #9cc8ff 54%, #10b981 115%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0 18px 28px rgba(0,0,0,0.28));
  }
  .text-card-silver-matte {
    background: linear-gradient(180deg, #ffffff 0%, #a8c6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0 12px 24px rgba(0,0,0,0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.55));
  }
  .premium-depth-card {
    background: linear-gradient(145deg, #1657c2 0%, #061733 52%, #05101f 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.84),
      0 20px 40px -20px rgba(0,0,0,0.76),
      inset 0 1px 2px rgba(255,255,255,0.2),
      inset 0 -2px 4px rgba(0,0,0,0.74);
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
  }
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08) 0%, transparent 42%);
    mix-blend-mode: screen;
  }
  .iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525b,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }
  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }
  .screen-glare { background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%); }
  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.11), 0 25px 50px -12px rgba(0,0,0,0.75), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5);
  }
  .btn-modern-light, .btn-modern-dark { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
  .btn-modern-light {
    background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
    color: #0f172a;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 12px 24px -4px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover { transform: translateY(-3px); }
  .btn-modern-dark {
    background: linear-gradient(180deg, #0f9f8f 0%, #0a706a 100%);
    color: #ffffff;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 12px 24px -4px rgba(0,0,0,0.72), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.45);
  }
  .btn-modern-dark:hover { transform: translateY(-3px); }
  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 62;
    stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export function CinematicHero({
  brandName = "Unique Mentors",
  tagline1 = "Overseas Medical Licensing",
  tagline2 = "Exam Training Centre in Kochi, Kerala",
  cardHeading = "Global licensing, guided.",
  cardDescription = (
    <>
      Prepare for <span className="font-semibold text-white">MOH, DHA, HAAD and CORU</span> with structured training,
      documentation support and career mentoring from Kochi.
    </>
  ),
  metricValue = 5000,
  metricLabel = "Professionals Trained",
  ctaHeading = "Start your global healthcare journey.",
  ctaDescription = "Get expert counselling for your exam, country, profession and licensing timeline.",
  primaryHref = "/apply",
  secondaryHref = "/courses",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;

        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);

        const xVal = (event.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (event.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, {
          rotationY: xVal * 10,
          rotationX: -yVal * 10,
          ease: "power3.out",
          duration: 1.1
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 160, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.86, filter: "blur(28px)" });

      const introTl = gsap.timeline({ delay: 0.25 });
      introTl
        .to(".text-track", { duration: 1.5, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.25, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.85");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1
        }
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.08, filter: "blur(16px)", opacity: 0.2, ease: "power2.inOut", duration: 1.7 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.65 }, 0)
        .fromTo(".card-right-text", { x: 46, autoAlpha: 0, scale: 0.88 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.25 }, 0.55)
        .fromTo(".card-left-text", { x: -46, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, 0.65)
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 220, z: -380, rotationX: 36, rotationY: -20, autoAlpha: 0, scale: 0.66 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.3 },
          0.68
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.35 }, 1.02)
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.8, ease: "expo.out" }, 1.08)
        .fromTo(".floating-badge", { y: 90, autoAlpha: 0, scale: 0.75, rotationZ: -8 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.35, stagger: 0.2 }, 1.2)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.35 }, 1.45)
        .to({}, { duration: 0.25 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.96,
          y: -18,
          z: -80,
          autoAlpha: 0.8,
          ease: "power3.in",
          duration: 0.45,
          stagger: 0.05
        })
        .to(".main-card", { y: -window.innerHeight - 260, ease: "power3.in", duration: 0.85 }, "-=0.15");
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn("relative mt-20 flex h-screen w-full items-center justify-center overflow-hidden bg-brand-navy text-white antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: injectedStyles }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-70" aria-hidden="true" />

      <div className="hero-text-wrapper transform-style-3d absolute z-10 flex w-full items-center justify-center px-4 will-change-transform">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="text-left">
            <h1 className="text-track gsap-reveal text-3d-matte mb-4 font-display text-5xl font-bold tracking-normal md:text-7xl lg:text-[5.8rem]">
              {tagline1}
              <span className="text-days gsap-reveal text-silver-matte block font-extrabold tracking-normal">{tagline2}</span>
            </h1>
            <p className="text-track gsap-reveal max-w-2xl text-base font-medium leading-7 text-blue-100/80 md:text-xl">
              MOH, DHA, HAAD, CORU, Dataflow and overseas medical licensing support for healthcare professionals ready to move with confidence.
            </p>
            <div className="text-track gsap-reveal mt-5 flex flex-wrap items-center gap-3 lg:hidden">
              <Link
                href={primaryHref}
                data-analytics-event="cta_clicked"
                data-analytics-label="Mobile Hero Enroll Now"
                data-analytics-location="hero_mobile"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-extrabold text-brand-navy shadow-[0_16px_36px_rgba(0,0,0,0.3)] transition active:scale-[0.98]"
              >
                <Icon name="Rocket" className="h-4 w-4" />
                Enroll Now
              </Link>
              <span className="inline-flex h-12 items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-100 backdrop-blur">
                <Icon name="GraduationCap" className="h-4 w-4" />
                Free counselling
              </span>
            </div>
          </div>
          <div className="text-track gsap-reveal hidden justify-end lg:flex">
            <ShuffleGrid />
          </div>
        </div>
      </div>

      <div className="cta-wrapper gsap-reveal pointer-events-auto absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform">
        <h2 className="text-silver-matte mb-6 font-display text-4xl font-bold tracking-normal md:text-6xl lg:text-7xl">{ctaHeading}</h2>
        <p className="mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-blue-100 md:text-xl">{ctaDescription}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href={primaryHref} className="btn-modern-light flex items-center justify-center gap-3 rounded-lg px-8 py-4 font-bold">
            <Icon name="Rocket" className="h-5 w-5" />
            Apply Now
          </Link>
          <Link href={secondaryHref} className="btn-modern-dark flex items-center justify-center gap-3 rounded-lg px-8 py-4 font-bold">
            <Icon name="BookOpen" className="h-5 w-5" />
            Explore Courses
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[90vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
            <div className="card-right-text gsap-reveal order-1 z-20 flex w-full justify-center lg:order-3 lg:justify-end">
              <h2 className="text-card-silver-matte font-display text-5xl font-black uppercase tracking-normal md:text-[5.5rem] lg:text-[7rem]">
                {brandName}
              </h2>
            </div>

            <div className="mockup-scroll-wrapper order-2 relative z-10 flex h-[380px] w-full items-center justify-center lg:order-2 lg:h-[600px]" style={{ perspective: "1000px" }}>
              <div className="relative flex h-full w-full scale-[0.65] items-center justify-center md:scale-[0.85] lg:scale-100">
                <div ref={mockupRef} className="iphone-bezel transform-style-3d relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform">
                  <div className="hardware-btn absolute -left-[3px] top-[120px] z-0 h-[25px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[160px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[220px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -right-[3px] top-[170px] z-0 h-[70px] w-[3px] scale-x-[-1] rounded-r-md" aria-hidden="true" />

                  <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <div className="screen-glare pointer-events-none absolute inset-0 z-40" aria-hidden="true" />
                    <div className="absolute left-1/2 top-[5px] z-50 flex h-[28px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>

                    <div className="relative flex h-full w-full flex-col px-5 pb-8 pt-12">
                      <div className="phone-widget mb-8 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Today</span>
                          <span className="text-xl font-bold tracking-normal text-white drop-shadow-md">Licensing Plan</span>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-neutral-200 shadow-lg shadow-black/50">
                          UM
                        </div>
                      </div>

                      <div className="phone-widget relative mx-auto mb-8 flex h-44 w-44 items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#10B981" strokeWidth="12" />
                        </svg>
                        <div className="z-10 flex flex-col items-center text-center">
                          <span className="counter-val text-4xl font-extrabold tracking-normal text-white">0</span>
                          <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-emerald-100/60">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { label: "MOH / DHA / HAAD", sub: "Exam plan ready", color: "blue", icon: "FileCheck" },
                          { label: "Dataflow Support", sub: "Documents reviewed", color: "emerald", icon: "ShieldCheck" }
                        ].map((item) => (
                          <div key={item.label} className="phone-widget widget-depth flex items-center rounded-lg p-3">
                            <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-lg border shadow-inner ${item.color === "blue" ? "border-blue-400/20 bg-blue-500/15 text-blue-300" : "border-emerald-400/20 bg-emerald-500/15 text-emerald-300"}`}>
                              <Icon name={item.icon} className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold text-neutral-100">{item.label}</p>
                              <p className="mt-1 truncate text-[10px] font-medium text-neutral-400">{item.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="absolute bottom-2 left-1/2 h-[4px] w-[120px] -translate-x-1/2 rounded-full bg-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute left-[-15px] top-6 z-30 flex items-center gap-3 rounded-lg p-3 lg:left-[-80px] lg:top-12 lg:gap-4 lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-blue-200 shadow-inner lg:h-10 lg:w-10">
                    <Icon name="Award" className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-normal text-white lg:text-sm">95% Pass Rate</p>
                    <p className="text-[10px] font-medium text-blue-100/55 lg:text-xs">Mock-led preparation</p>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute bottom-12 right-[-15px] z-30 flex items-center gap-3 rounded-lg p-3 lg:bottom-20 lg:right-[-80px] lg:gap-4 lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-emerald-200 shadow-inner lg:h-10 lg:w-10">
                    <Icon name="Handshake" className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-normal text-white lg:text-sm">Free Counselling</p>
                    <p className="text-[10px] font-medium text-blue-100/55 lg:text-xs">Personal roadmap</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 z-20 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:px-0 lg:text-left">
              <h3 className="mb-0 font-display text-2xl font-bold tracking-normal text-white md:text-3xl lg:mb-5 lg:text-4xl">{cardHeading}</h3>
              <p className="mx-auto hidden max-w-sm text-sm font-normal leading-relaxed text-blue-100/75 md:block md:text-base lg:mx-0 lg:max-w-none lg:text-lg">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
