import { describe, expect, it } from "vitest";

import { youtubeEmbedUrl } from "./youtube-embed";

describe("youtubeEmbedUrl", () => {
  it("converts watch URLs", () => {
    expect(youtubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    );
  });

  it("converts youtu.be URLs", () => {
    expect(youtubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    );
  });

  it("preserves start offsets from watch URLs", () => {
    expect(youtubeEmbedUrl("https://www.youtube.com/watch?v=fbS5j9mTGpg&t=33")).toBe(
      "https://www.youtube.com/embed/fbS5j9mTGpg?start=33",
    );
  });

  it("returns null for non-youtube URLs", () => {
    expect(youtubeEmbedUrl("https://example.com/video")).toBeNull();
    expect(youtubeEmbedUrl("not-a-url")).toBeNull();
  });
});
