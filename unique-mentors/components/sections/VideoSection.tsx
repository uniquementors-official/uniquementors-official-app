export function VideoSection() {
  return (
    <section className="section-padding bg-slate-950" aria-label="Unique Mentors video testimonial">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-tag bg-primary/10 text-primary">Our Journey</span>
          <h2 className="heading-lg mt-4 text-white">
            From Preparation to Success
          </h2>
          <p className="body-lead mt-4 text-slate-300">
            Watch how Unique Mentors has helped 5000+ healthcare professionals achieve their dream of working abroad.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/sd2qJC1L3sQ"
              title="Unique Mentors Overseas Medical Licensure Exam Training: The Journey of Preparation to Success"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
