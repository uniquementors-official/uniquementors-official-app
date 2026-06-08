"use client";

import { useRef } from "react";
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { SITE_CONFIG } from "@/lib/constants";

const socialLinks = [
  { label: "Facebook", href: SITE_CONFIG.social.facebook, icon: Facebook },
  { label: "Instagram", href: SITE_CONFIG.social.instagram, icon: Instagram },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: Linkedin },
  { label: "YouTube", href: SITE_CONFIG.social.youtube, icon: Youtube }
];

const revealVariants = {
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.16,
      duration: 0.55
    }
  }),
  hidden: {
    filter: "blur(10px)",
    y: -20,
    opacity: 0
  }
};

const scaleVariants = {
  visible: (index: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.12,
      duration: 0.6
    }
  }),
  hidden: {
    filter: "blur(10px)",
    opacity: 0
  }
};

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#f9f9f9] px-4 py-12 text-brand-ink dark:bg-slate-950 dark:text-white" ref={heroRef}>
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="absolute -top-4 z-10 flex w-[92%] items-center justify-between sm:top-0 lg:top-4 lg:w-[85%]">
            <div className="flex items-center gap-2 text-xl">
              <span className="text-secondary">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300 sm:text-sm"
              >
                Who we are
              </TimelineContent>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map(({ label, href, icon: SocialIcon }, index) => (
                <TimelineContent
                  key={label}
                  as="a"
                  animationNum={index}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Unique Mentors on ${label}`}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:h-8 sm:w-8"
                >
                  <SocialIcon className="h-4 w-4" />
                </TimelineContent>
              ))}
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative overflow-hidden rounded-[1.4rem] bg-white shadow-soft dark:bg-slate-900"
          >
            <svg className="block w-full" viewBox="0 0 100 40" role="img" aria-label="Unique Mentors team">
              <defs>
                <clipPath id="unique-mentors-team-clip" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#unique-mentors-team-clip)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                href="/images/team/team.png"
              />
            </svg>
          </TimelineContent>

          <div className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-primary">5000+</span>
                <span className="text-slate-600 dark:text-slate-300">healthcare professionals trained</span>
                <span className="text-slate-300">|</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-primary">95%</span>
                <span className="text-slate-600 dark:text-slate-300">exam pass rate</span>
              </div>
            </TimelineContent>
            <div className="flex flex-row-reverse gap-4 lg:absolute lg:bottom-16 lg:right-0 lg:flex-col lg:gap-0">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl"
              >
                <span className="font-semibold text-secondary">11+</span>
                <span className="uppercase text-slate-600 dark:text-slate-300">countries</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 text-xs sm:text-base"
              >
                <span className="font-bold text-secondary">8+</span>
                <span className="text-slate-600 dark:text-slate-300">exam types covered</span>
                <span className="block text-slate-300 lg:hidden">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-8 text-2xl font-semibold leading-[110%] text-brand-ink dark:text-white sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.4
                }}
              >
                A founder-led team for confident global healthcare careers.
              </VerticalCutReveal>
            </h2>

            <TimelineContent
              as="div"
              animationNum={8}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid gap-8 text-slate-600 dark:text-slate-300 md:grid-cols-2"
            >
              <p className="text-sm leading-7 text-justify sm:text-base">
                Unique Mentors guides healthcare professionals through MOH, DHA, HAAD, CORU, Dataflow and international licensing pathways with structured training and practical counselling.
              </p>
              <p className="text-sm leading-7 text-justify sm:text-base">
                The team combines exam coaching, eligibility review, documentation support and finishing-school readiness so candidates prepare for both licensing success and global workplace confidence.
              </p>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-left md:text-right">
              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 text-2xl font-bold text-primary"
              >
                UNIQUE MENTORS
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-8 text-sm text-slate-600 dark:text-slate-300"
              >
                Overseas Medical Licensing Exam Training Centre
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6 font-medium text-brand-ink dark:text-white"
              >
                Ready to understand your exam, country and documentation path?
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="/apply"
                className="ml-0 flex w-fit gap-2 rounded-lg border border-brand-navy bg-brand-navy px-5 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:gap-4 hover:bg-brand-ink md:ml-auto"
              >
                Start Counselling <ArrowRight className="h-5 w-5" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
