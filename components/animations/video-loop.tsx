"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

type VideoLoopProps = {
  src: string;
  poster: string;
  className?: string;
};

export function VideoLoop({ src, poster, className }: VideoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled) {
        return;
      }

      void video.play().catch(() => {
        if (cancelled) {
          return;
        }

        window.addEventListener("pointerdown", resumeOnGesture, { once: true });
        window.addEventListener("keydown", resumeOnGesture, { once: true });
      });
    };

    const resumeOnGesture = () => {
      tryPlay();
    };

    const onCanPlay = () => {
      tryPlay();
    };

    video.addEventListener("canplay", onCanPlay);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", onCanPlay);
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      video.pause();
    };
  }, [src]);

  return (
    <video
      key={src}
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={cn("h-full w-full object-cover opacity-80", className)}
    />
  );
}
