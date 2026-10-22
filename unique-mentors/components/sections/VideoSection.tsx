import ThumbnailButton from "@/components/ui/thumbnail-button-video-player";

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
        <div className="mx-auto mt-10 flex max-w-4xl justify-center">
          <ThumbnailButton
            youtubeId="sd2qJC1L3sQ"
            title="Watch our journey"
            className="bg-white/10"
          />
        </div>
      </div>
    </section>
  );
}
