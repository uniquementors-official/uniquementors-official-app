import { Icon } from "@/components/common/Icon";
import ThumbnailButton from "@/components/ui/thumbnail-button-video-player";

export function AboutMediaSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(22,87,194,0.35),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(15,159,143,0.22),transparent_40%)]" />
      <div className="container relative z-10 grid min-h-screen items-center gap-10 py-16 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="max-w-xl">
          <span className="section-tag border-white/15 bg-white/10 text-blue-100">Inside Unique Mentors</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-normal md:text-5xl">
            The journey of preparation to success
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100/80">
            Step inside the training environment where counselling, exam preparation, documentation support and finishing-school readiness come together for global healthcare careers.
          </p>
          <div className="mt-7">
            <ThumbnailButton
              youtubeId="sd2qJC1L3sQ"
              thumbnailUrl="/images/image copy.png"
              title="Watch YouTube journey video"
            />
          </div>
        </div>

        <div className="relative">
          <div className="rounded-t-[2rem] border border-white/[0.12] bg-slate-950 p-3 shadow-[0_40px_130px_rgba(0,0,0,0.62)]">
            <div className="flex h-8 items-center gap-2 px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-black">
              <video
                className="h-full w-full object-cover"
                src="/images/videos/about_video.mp4"
                poster="/images/image.png"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/58 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/10 bg-black/28 p-4 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/75">Inside the centre</p>
                <p className="mt-2 text-lg font-semibold tracking-normal text-white">Training, counselling and global career readiness in motion.</p>
              </div>
            </div>
          </div>
          <div className="mx-auto h-5 w-[88%] rounded-b-[2rem] bg-gradient-to-b from-slate-700 to-slate-950 shadow-[0_28px_70px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <div className="container relative z-10 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Exam coaching", "MOH, DHA, HAAD and CORU preparation with structured study plans."],
            ["Licensing support", "Dataflow, documentation and medical license processing guidance."],
            ["Finishing school", "Communication, interview readiness and workplace professionalism."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-emerald-200">
                <Icon name="CheckCircle2" className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100/72">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
