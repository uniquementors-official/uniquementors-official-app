"use client";

import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { Icon } from "@/components/common/Icon";
import { Marquee } from "@/components/ui/3d-testimonails";

const offerImages = [
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80", // Overseas Licensing: Indian doctor with tablet
  "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=900&q=80", // GCC & Western: Flat-lay desk with stethoscope, papers, and travel feel
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80", // Finishing School: Professional development
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80", // Career Mentorship: Guidance & counselling
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80", // Dataflow: Documentation flat-lay
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=900&q=80", // Mock Test: Online study and preparation
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80", // Interview Readiness: Smiling professional
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80"  // Eligibility Roadmap: Global career planning
];

const extraOffers = [
  {
    title: "Dataflow Documentation",
    icon: "FileCheck2",
    description: "Document review, verification sequencing and licensing application support.",
    href: "/services/gcc-western-license-processing",
    features: ["Dataflow", "Documents"]
  },
  {
    title: "Mock Test Practice",
    icon: "ClipboardList",
    description: "Timed practice, score review and exam strategy before the final test.",
    href: "/courses",
    features: ["Mocks", "Review"]
  },
  {
    title: "Interview Readiness",
    icon: "MessageCircle",
    description: "Communication, workplace etiquette and professional confidence for global roles.",
    href: "/services/finishing-school",
    features: ["Interview", "Workplace"]
  },
  {
    title: "Eligibility Roadmap",
    icon: "Workflow",
    description: "Country, profession and timeline planning before the candidate starts applying.",
    href: "/contact",
    features: ["Counselling", "Roadmap"]
  }
];

const offerCards = [
  ...SERVICES.map((service) => ({
    title: service.title,
    icon: service.icon,
    description: service.description,
    href: service.href,
    features: service.features
  })),
  ...extraOffers
].map((offer, index) => ({
  ...offer,
  image: offerImages[index] ?? "/images/image.png"
}));

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
          <path
            key={`grid-x-${index}`}
            d={`M ${20 + index * 56} 0 V 420`}
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 7 }).map((_, index) => (
          <path
            key={`grid-y-${index}`}
            d={`M 0 ${30 + index * 58} H 560`}
            stroke="#ffffff"
            strokeWidth="1"
          />
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
        ["License", 430, 152, "#f59e0b"]
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
          UNIQUE MENTORS
        </text>
        <text y="42" fill="#ffffff" fontSize="40" fontWeight="800">
          Licensing Pathway
        </text>
        <text y="76" fill="#bfdbfe" fontSize="18">
          One roadmap from documents to global healthcare readiness.
        </text>
      </g>
      <g transform="translate(392 318)">
        <rect width="112" height="44" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)" />
        <text x="56" y="28" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="700">
          5000+ trained
        </text>
      </g>
    </svg>
  );
}

function ServiceCard({ offer, index }: { offer: typeof offerCards[number]; index: number }) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900 w-[260px] shrink-0"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="260px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/86 via-brand-navy/24 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15 backdrop-blur">
            <Icon name={offer.icon} className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-bold leading-tight tracking-normal">{offer.title}</h3>
        </div>
      </div>
      <Link href={offer.href} className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{offer.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {offer.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary dark:bg-primary/15"
            >
              {feature}
            </span>
          ))}
          <span className="ml-auto text-xs font-semibold text-primary group-hover:text-secondary group-hover:underline flex items-center gap-1">
            Learn More <Icon name="ArrowRight" className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="section-padding overflow-hidden bg-white dark:bg-slate-950">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <span className="section-tag">What we offer</span>
            <h2 className="heading-lg mt-4">Our Core Medical Training Services</h2>
            <p className="body-lead mt-4">
              Training, licensing support and career mentoring arranged as clear service paths for every stage of the global healthcare journey.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-glow">
            <LicensingRoadmapSvg />
          </div>
        </div>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl relative flex h-[650px] w-full items-center justify-center overflow-hidden gap-1.5 [perspective:1200px] bg-slate-50 dark:bg-slate-950 p-6 mt-12 shadow-inner">
          <div
            className="flex flex-row items-center gap-4"
            style={{
              transform:
                'translateX(-40px) translateY(-20px) translateZ(-100px) rotateX(15deg) rotateY(-10deg) rotateZ(10deg)',
            }}
          >
            {/* Column 1 (downwards) */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s]">
              {offerCards.map((offer, idx) => (
                <ServiceCard key={`col1-${offer.title}-${idx}`} offer={offer} index={idx} />
              ))}
            </Marquee>
            {/* Column 2 (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
              {offerCards.map((offer, idx) => (
                <ServiceCard key={`col2-${offer.title}-${idx}`} offer={offer} index={idx} />
              ))}
            </Marquee>
            {/* Column 3 (downwards) */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:30s]">
              {offerCards.map((offer, idx) => (
                <ServiceCard key={`col3-${offer.title}-${idx}`} offer={offer} index={idx} />
              ))}
            </Marquee>
            {/* Column 4 (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:45s]">
              {offerCards.map((offer, idx) => (
                <ServiceCard key={`col4-${offer.title}-${idx}`} offer={offer} index={idx} />
              ))}
            </Marquee>
          </div>
          {/* Gradient overlays for vertical marquee */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-white dark:from-slate-950"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-white dark:from-slate-950"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-slate-950"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-slate-950"></div>
        </div>
      </div>
    </section>
  );
}
