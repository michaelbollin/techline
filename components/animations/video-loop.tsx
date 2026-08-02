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

    return () => {
      if (!video) {
        return;
      }

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className={cn("h-full w-full object-cover opacity-80", className)}
    />
  );
}
