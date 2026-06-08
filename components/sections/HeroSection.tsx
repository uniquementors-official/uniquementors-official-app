import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export function HeroSection() {
  return (
    <section className="overflow-x-hidden bg-brand-navy" aria-label="Unique Mentors hero">
      <CinematicHero
        brandName="Unique Mentors"
        tagline1="Overseas Medical Licensing"
        tagline2="Exam Training Centre in Kochi, Kerala"
        cardHeading="Your gateway to a global healthcare career."
        cardDescription={
          <>
            Expert training for <span className="font-semibold text-white">MOH, DHA, HAAD and CORU</span> licensing
            exams, GCC Dataflow documentation and finishing school programs for Indian healthcare professionals.
          </>
        }
        metricValue={5000}
        metricLabel="Professionals Trained"
        ctaHeading="Ready to start your global healthcare journey?"
        ctaDescription="Get expert guidance for your profession, target country, exam plan and licensing timeline."
        primaryHref="/apply"
        secondaryHref="/courses"
      />
    </section>
  );
}
