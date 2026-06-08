"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ThumbnailButtonProps = {
  videoUrl?: string;
  youtubeId?: string;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
};

const defaultVideoFallbackUrl = "/images/videos/about_video.mp4";
const defaultVideoThumbnail = "/images/image.png";

function getYouTubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function getYouTubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

export default function ThumbnailButton({
  videoUrl,
  youtubeId,
  thumbnailUrl,
  title = "Play Video",
  className
}: ThumbnailButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isYouTube = Boolean(youtubeId);
  const finalThumbnail = thumbnailUrl || (youtubeId ? getYouTubeThumbnail(youtubeId) : defaultVideoThumbnail);
  const finalVideoUrl = youtubeId ? getYouTubeEmbedUrl(youtubeId) : videoUrl || defaultVideoFallbackUrl;

  const handleOpenModal = () => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const getTransformOrigin = () => {
    if (!buttonRect) return "center center";

    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    return `${centerX}px ${centerY}px`;
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenModal}
        className={cn(
          "group relative w-max overflow-hidden rounded-lg border border-white/15 bg-white/10 p-2 text-white shadow-sm backdrop-blur transition-all duration-200 hover:bg-white/15 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50",
          className
        )}
        aria-label={title}
      >
        <div className="flex items-center">
          <div className="relative h-[42px] w-[70px] flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image src={finalThumbnail} alt="Video thumbnail" fill className="object-cover" sizes="70px" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-white/20 bg-black/60 p-1.5 shadow-sm backdrop-blur">
                <Play size={11} className="ml-0.5 fill-white text-white" />
              </div>
            </div>
            {isYouTube ? (
              <div className="absolute bottom-1 right-1 rounded bg-red-600 px-1 py-0.5 text-[8px] font-bold text-white">
                YT
              </div>
            ) : null}
          </div>
          <p className="px-3 text-left text-sm font-semibold md:text-base">{title}</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Video modal"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
              style={{ transformOrigin: getTransformOrigin() }}
            >
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/35 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/55"
                aria-label="Close video"
              >
                <X size={20} />
              </button>

              {isYouTube ? (
                <iframe
                  src={finalVideoUrl}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title={title}
                />
              ) : (
                <video src={finalVideoUrl} controls autoPlay className="h-full w-full bg-black" />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
