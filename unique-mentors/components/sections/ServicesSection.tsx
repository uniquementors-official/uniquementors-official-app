"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { Marquee } from "@/components/ui/3d-testimonails";

const appScreenCards = [
  {
    title: "Student Dashboard",
    icon: "LayoutDashboard",
    description: "Live class count, enquiries, payments and quick actions in one calm student view.",
    href: "/contact",
    image: "/images/app screenshots/image copy 8.png",
    features: ["Dashboard", "Updates"]
  },
  {
    title: "Live Class Library",
    icon: "Monitor",
    description: "Recorded classes and batch videos stay organised for revision before exams.",
    href: "/courses",
    image: "/images/app screenshots/image copy 10.png",
    features: ["Classes", "Revision"]
  },
  {
    title: "Mock Test Results",
    icon: "BarChart3",
    description: "Score, duration, accuracy and detailed question review after every practice test.",
    href: "/courses",
    image: "/images/app screenshots/image copy 2.png",
    features: ["Scores", "Analysis"]
  },
  {
    title: "Study Materials",
    icon: "FileText",
    description: "Course PDFs, downloads and material previews available inside the app.",
    href: "/courses",
    image: "/images/app screenshots/image copy 12.png",
    features: ["PDF", "Preview"]
  },
  {
    title: "Student Profile",
    icon: "User",
    description: "Students can keep their learning profile and contact details updated.",
    href: "/contact",
    image: "/images/app screenshots/image copy 13.png",
    features: ["Profile", "Support"]
  },
  {
    title: "Ask a Question",
    icon: "MessageCircle",
    description: "Support, enquiries and doubt clarification remain easy to access.",
    href: "/contact",
    image: "/images/app screenshots/image copy 15.png",
    features: ["Support", "Enquiry"]
  },
  {
    title: "App Access",
    icon: "Lock",
    description: "Secure app sign-in for enrolled students and active batches.",
    href: "/contact",
    image: "/images/app screenshots/image.png",
    features: ["Login", "Students"]
  },
  {
    title: "Healthcare Learning",
    icon: "Stethoscope",
    description: "A mobile learning experience built for healthcare exam preparation.",
    href: "/services/overseas-licensing-exam",
    image: "/images/app screenshots/image copy 14.png",
    features: ["Healthcare", "Career"]
  }
];

const journeySteps = [
  { label: "Counselling", icon: "MessageCircle" },
  { label: "Training", icon: "BookOpen" },
  { label: "Mock Prep", icon: "ClipboardList" },
  { label: "License", icon: "BadgeCheck" }
];

function LicensingRoadmapSvg() {
  return (
    <svg viewBox="0 0 560 420" className="h-full w-full" role="img" aria-label="Medical licensing roadmap visualization">
      <defs>
        <linearGradient id="roadmap-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1657c2" />
          <stop offset="52%" stopColor="#061733" />
          <stop offset="100%" stopColor="#0f9f8f" />
        </linearGradient>
        <linearGradient id="roadmap-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="roadmap-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="560" height="420" rx="28" fill="url(#roadmap-bg)" />
      <g opacity="0.22">
        {Array.from({ length: 10 }).map((_, index) => (
          <path key={`grid-x-${index}`} d={`M ${20 + index * 56} 0 V 420`} stroke="#ffffff" strokeWidth="1" />
        ))}
        {Array.from({ length: 7 }).map((_, index) => (
          <path key={`grid-y-${index}`} d={`M 0 ${30 + index * 58} H 560`} stroke="#ffffff" strokeWidth="1" />
        ))}
      </g>
      <path
        d="M 80 300 C 140 170, 190 155, 250 230 S 360 320, 430 152"
        fill="none"
        stroke="url(#roadmap-line)"
        strokeWidth="12"
        strokeLinecap="round"
        filter="url(#roadmap-glow)"
      />
      {[
        ["Eligibility", 84, 300, "#60a5fa"],
        ["Training", 220, 210, "#10b981"],
        ["Mock Tests", 340, 290, "#38bdf8"],
        ["License", 406, 152, "#f59e0b"]
      ].map(([label, x, y, color]) => (
        <g key={label}>
          <circle cx={Number(x)} cy={Number(y)} r="30" fill="#020617" stroke={String(color)} strokeWidth="4" />
          <circle cx={Number(x)} cy={Number(y)} r="9" fill={String(color)} />
          <text x={Number(x)} y={Number(y) + 54} fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="700">
            {label}
          </text>
        </g>
      ))}
      <g transform="translate(54 48)">
        <text fill="#dbeafe" fontSize="18" fontWeight="700" letterSpacing="3">
          Your
        </text>
        <text y="42" fill="#ffffff" fontSize="40" fontWeight="800">
          Licensing Pathway
        </text>
        <text y="76" fill="#bfdbfe" fontSize="18">
          One roadmap from documents to license readiness.
        </text>
      </g>
    </svg>
  );
}

function LicensingRoadmapVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-brand-navy">
      <LicensingRoadmapSvg />
      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {journeySteps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/12 px-2 py-2 text-white backdrop-blur">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/15">
              <Icon name={step.icon} className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppScreenCard({ screen }: { screen: typeof appScreenCards[number] }) {
  return (
    <Link
      href={screen.href}
      className="group flex w-[250px] shrink-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-[350px] overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 p-4 dark:from-slate-900 dark:to-brand-navy">
        <div className="relative mx-auto h-full w-[154px] overflow-hidden rounded-[1.45rem] border-[5px] border-slate-950 bg-white shadow-2xl">
          <Image
            src={screen.image}
            alt={screen.title}
            fill
            sizes="154px"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            quality={82}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-navy/92 via-brand-navy/45 to-transparent" />
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-white">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/15 backdrop-blur">
            <Icon name={screen.icon} className="h-4 w-4" />
          </div>
          <h3 className="font-display text-lg font-bold leading-tight tracking-normal">{screen.title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{screen.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {screen.features.map((feature) => (
            <span key={feature} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary dark:bg-primary/15">
              {feature}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-secondary group-hover:underline">
            Learn More <Icon name="ArrowRight" className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function AppScreensShowcase() {
  return (
    <>
      <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-inner dark:border-slate-800 dark:bg-slate-950 md:hidden">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <span className="section-tag">Student app</span>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Real app screens for classes, mock tests, materials and student support.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
          {appScreenCards.slice(0, 6).map((screen) => (
            <div key={screen.title} className="snap-start">
              <AppScreenCard screen={screen} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-12 hidden h-[650px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-inner [perspective:1200px] dark:border-slate-800 dark:bg-slate-950 md:flex">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform: "translateX(-40px) translateY(-20px) translateZ(-100px) rotateX(15deg) rotateY(-10deg) rotateZ(10deg)"
          }}
        >
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:38s]">
            {appScreenCards.map((screen) => (
              <AppScreenCard key={`app-col1-${screen.title}`} screen={screen} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:42s]">
            {appScreenCards.map((screen) => (
              <AppScreenCard key={`app-col2-${screen.title}`} screen={screen} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:34s]">
            {appScreenCards.map((screen) => (
              <AppScreenCard key={`app-col3-${screen.title}`} screen={screen} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:46s]">
            {appScreenCards.map((screen) => (
              <AppScreenCard key={`app-col4-${screen.title}`} screen={screen} />
            ))}
          </Marquee>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-white dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-white dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-slate-950" />
      </div>
    </>
  );
}

export function ServicesSection() {
  return (
    <section className="section-padding overflow-hidden bg-white dark:bg-slate-950">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="lg:self-center">
            <span className="section-tag">What we offer</span>
            <h2 className="heading-lg mt-4">Our Core Medical Training Services</h2>
            <p className="body-lead mt-4">
              Training, licensing support and career mentoring arranged as clear service paths for every stage of the global healthcare journey.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-glow">
            <LicensingRoadmapVisual />
          </div>
        </div>

        <AppScreensShowcase />
      </div>
    </section>
  );
}
