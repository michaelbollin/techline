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
  "iphone-intro": {
    videoSrc: "/media/timeline/steve-jobs-iphone-introduced.mp4",
    posterSrc: "/media/timeline/steve-jobs-iphone-introduced.jpg",
  },
  "macintosh-intro": {
    videoSrc: "/media/timeline/macintosh-128k-released.mp4",
    posterSrc: "/media/timeline/macintosh-128k-released.jpg",
  },
  "mosaic-demo": {
    videoSrc: "/media/timeline/mosaic-1-0-released.mp4",
    posterSrc: "/media/timeline/mosaic-1-0-released.png",
  },
  "android-intro": {
    videoSrc: "/media/timeline/android-announced.mp4",
    posterSrc: "/media/timeline/android-announced.jpg",
  },
  "windows-95-welcome": {
    videoSrc: "/media/timeline/windows-95-released.mp4",
    posterSrc: "/media/timeline/windows-95-released.jpg",
  },
} as const satisfies Record<string, QuoteClipConfig>;

export type QuoteClipAnimationId = keyof typeof QUOTE_CLIP_CONFIGS;

export function isQuoteClipAnimationId(id: string): id is QuoteClipAnimationId {
  return id in QUOTE_CLIP_CONFIGS;
}

export function getQuoteClipConfig(id: QuoteClipAnimationId): QuoteClipConfig {
  return QUOTE_CLIP_CONFIGS[id];
}
