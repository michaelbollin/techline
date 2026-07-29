import { describe, expect, it } from "vitest";

import { getEventCoverImage, getEventCoverImageCaption, getEventCoverImageUrl } from "./event-image";
import type { MediaItem } from "./schema";

const imageMedia: MediaItem[] = [
  {
    type: "image",
    url: "/media/timeline/amazon-ec2-launched.svg",
    title: "Amazon EC2",
    caption: "Amazon Web Services LLC, Public domain, via Wikimedia Commons",
  },
];

describe("getEventCoverImage", () => {
  it("returns the first image attachment", () => {
    expect(getEventCoverImage(imageMedia)?.url).toBe("/media/timeline/amazon-ec2-launched.svg");
    expect(getEventCoverImageCaption(imageMedia)).toBe(
      "Amazon Web Services LLC, Public domain, via Wikimedia Commons",
    );
  });

  it("ignores non-image media", () => {
    const media: MediaItem[] = [{ type: "link", url: "https://example.com" }, ...imageMedia];
    expect(getEventCoverImage(media)?.url).toBe("/media/timeline/amazon-ec2-launched.svg");
  });

  it("returns null when no image exists", () => {
    expect(getEventCoverImage([])).toBeNull();
    expect(getEventCoverImageUrl([])).toBeNull();
    expect(getEventCoverImageCaption([])).toBeNull();
  });
});
