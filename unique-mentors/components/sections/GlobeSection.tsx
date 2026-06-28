"use client";

import { Globe } from "@/components/ui/cobe-globe";

const GCC_MARKERS = [
  { id: "kochi",   location: [9.9312,  76.2673] as [number, number], label: "Kochi (HQ)" },
  { id: "dubai",   location: [25.2048, 55.2708] as [number, number], label: "Dubai, UAE" },
  { id: "riyadh",  location: [24.6877, 46.7219] as [number, number], label: "Riyadh, KSA" },
  { id: "doha",    location: [25.2854, 51.5310] as [number, number], label: "Doha, Qatar" },
  { id: "muscat",  location: [23.5880, 58.3829] as [number, number], label: "Muscat, Oman" },
  { id: "manama",  location: [26.2285, 50.5860] as [number, number], label: "Manama, Bahrain" },
  { id: "london",  location: [51.5074, -0.1278] as [number, number], label: "London, UK" },
  { id: "sydney",  location: [-33.8688, 151.2093] as [number, number], label: "Sydney, AUS" },
  { id: "toronto", location: [43.6532, -79.3832] as [number, number], label: "Toronto, Canada" },
  { id: "newyork", location: [40.7128, -74.0060] as [number, number], label: "New York, USA" },
];

const COUNTRIES = [
  { flag: "🇦🇪", name: "UAE", desc: "MOH · DHA · HAAD" },
  { flag: "🇶🇦", name: "Qatar", desc: "QCHP" },
  { flag: "🇸🇦", name: "Saudi Arabia", desc: "SCFHS" },
  { flag: "🇴🇲", name: "Oman", desc: "OMSB" },
  { flag: "🇧🇭", name: "Bahrain", desc: "NHRA" },
  { flag: "🇰🇼", name: "Kuwait", desc: "MOH Kuwait" },
  { flag: "🇬🇧", name: "United Kingdom", desc: "PLAB · HCPC" },
  { flag: "🇦🇺", name: "Australia", desc: "AMC · ADC · APC" },
  { flag: "🇨🇦", name: "Canada", desc: "MCCQE" },
  { flag: "🇺🇸", name: "USA", desc: "USMLE" },
  { flag: "🇮🇪", name: "Ireland", desc: "CORU · NMBI" },
];

export function GlobeSection() {
  return (
    <section className="section-padding overflow-hidden bg-slate-950" aria-label="Countries served by Unique Mentors">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-tag bg-primary/10 text-primary">Global Reach</span>
          <h2 className="heading-lg mt-4 text-white">
            Healthcare Professionals Trained Across 11+ Countries
          </h2>
          <p className="body-lead mt-4 text-slate-300">
            From Kochi, Kerala — we have guided candidates to successful healthcare careers across GCC, Western and Asia-Pacific destinations.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Interactive Globe */}
          <div className="flex justify-center">
            <Globe
              markers={GCC_MARKERS}
              className="w-full max-w-md"
              markerColor={[0.28, 0.53, 0.95]}
              baseColor={[0.06, 0.09, 0.2]}
              glowColor={[0.1, 0.25, 0.6]}
              dark={1}
              mapBrightness={4}
              markerSize={0.05}
              speed={0.004}
              theta={0.25}
            />
          </div>

          {/* Country grid */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-400">Destination Countries</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COUNTRIES.map(({ flag, name, desc }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-3 backdrop-blur transition hover:border-primary/30 hover:bg-white/8"
                >
                  <span className="text-2xl leading-none">{flag}</span>
                  <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
