export type QuoteClipConfig = {
  videoSrc: string;
  posterSrc: string;
};

/** Local MP4 background clips keyed by animation id (modal YouTube lives in event media). */
export const QUOTE_CLIP_CONFIGS = {
  "ballmer-web-developers": {
    videoSrc: "/media/timeline/ballmer-web-developers-chant.mp4",
    posterSrc: "/media/timeline/ballmer-web-developers-chant.jpg",
  },
  "altman-senate": {
    videoSrc: "/media/timeline/altman-ai-goes-wrong.mp4",
    posterSrc: "/media/timeline/altman-ai-goes-wrong.jpg",
  },
  "jobs-flash": {
    videoSrc: "/media/timeline/jobs-flash-closed-system.mp4",
    posterSrc: "/media/timeline/jobs-flash-closed-system.jpg",
  },
  "ballmer-linux-cancer": {
    videoSrc: "/media/timeline/ballmer-linux-cancer.mp4",
    posterSrc: "/media/timeline/ballmer-linux-cancer.jpg",
  },
} as const satisfies Record<string, QuoteClipConfig>;

export type QuoteClipAnimationId = keyof typeof QUOTE_CLIP_CONFIGS;

export function isQuoteClipAnimationId(id: string): id is QuoteClipAnimationId {
  return id in QUOTE_CLIP_CONFIGS;
}

export function getQuoteClipConfig(id: QuoteClipAnimationId): QuoteClipConfig {
  return QUOTE_CLIP_CONFIGS[id];
}
