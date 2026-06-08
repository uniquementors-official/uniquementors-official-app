import Image from "next/image";

export function MetroPillarShowcase() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 py-10 text-white">
      <Image
        src="/images/metro-pillar-candidate.png"
        alt="Healthcare licensing candidate ready for a global career"
        fill
        sizes="100vw"
        className="object-cover opacity-30 blur-2xl scale-110"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/45 to-slate-950" aria-hidden="true" />

      <div className="container relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="max-w-xl">
          <span className="section-tag border-white/15 bg-white/10 text-blue-100">Candidate confidence</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-normal md:text-5xl">
            From application steps to international readiness
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100/80">
            Unique Mentors helps candidates move from eligibility checks and documentation to exam preparation, licensing applications and professional confidence for global healthcare workplaces.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-[620px] overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <Image
              src="/images/metro-pillar-candidate.png"
              alt="Unique Mentors candidate holding documents with confidence"
              fill
              sizes="(min-width: 1024px) 620px, 92vw"
              className="scale-110 object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
