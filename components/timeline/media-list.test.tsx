import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MediaList } from "./media-list";

describe("MediaList", () => {
  it("embeds youtube videos", () => {
    render(
      <MediaList
        media={[
          {
            type: "youtube",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "Demo",
          },
        ]}
      />,
    );

    expect(screen.getByTitle("Demo")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    );
  });

  it("renders external link for non-embeddable media", () => {
    render(
      <MediaList
        media={[
          {
            type: "link",
            url: "https://example.com/article",
            title: "Article",
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Open link" })).toHaveAttribute(
      "href",
      "https://example.com/article",
    );
  });
});
