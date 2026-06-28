"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEOS = [
  "/vidoeos/Healthcare_professional_enters_a\u2026_202606281922.mp4",
  "/vidoeos/Healthcare_professionals_global_\u2026_202606281933.mp4", // sound-enabled
  "/vidoeos/Medical_academy_students_and_staff_202606281923.mp4",
];

export function ScrollableVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isVideo2Active, setIsVideo2Active] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track when video 2 is visible (~25%–66% of scroll)
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setIsVideo2Active(v >= 0.25 && v <= 0.66);
    });
  }, [scrollYProgress]);

  // Sync mute state directly on the video element
  useEffect(() => {
    if (video2Ref.current) {
      video2Ref.current.muted = muted;
    }
  }, [muted]);

  // Auto-mute when video 2 scrolls out of view
  useEffect(() => {
    if (!isVideo2Active) setMuted(true);
  }, [isVideo2Active]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.58, 0.66, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-slate-950">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div style={{ scale }} className="relative h-full w-full">

          {/* Video 1 – always muted */}
          <motion.video
            style={{ opacity: opacity1 }}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEOS[0]}
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Video 2 – sound-enabled, controlled via ref */}
          <motion.video
            ref={video2Ref}
            style={{ opacity: opacity2 }}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEOS[1]}
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Video 3 – always muted */}
          <motion.video
            style={{ opacity: opacity3 }}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEOS[2]}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Sound toggle – visible only while video 2 is active */}
          {isVideo2Active && (
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute bottom-8 right-8 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {muted ? (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                  Unmute
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  Mute
                </>
              )}
            </button>
          )}

          {/* Centered overlay text */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white"
          >
            <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide backdrop-blur-md">
              A Global Standard
            </span>
            <h2 className="font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              World-Class <br /> Medical Training
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-2xl font-light">
              Experience our state-of-the-art facilities and immersive learning environment designed for healthcare professionals.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
