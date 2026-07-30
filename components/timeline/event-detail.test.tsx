import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { EventDetail } from "./event-detail";

describe("EventDetail", () => {
  it("renders modal sections from event copy", () => {
    const event = makeTimelineEvent({
      about: "About the event.",
      narrative: {
        whyChosen: "Chosen",
        whyImportant: "Important",
        problemSolved: "Problem solved.",
      },
      sources: [
        { title: "Overview", url: "https://example.com/overview", role: "overview" },
      ],
    });

    render(<EventDetail event={event} variant="modal" />);

    expect(screen.getByRole("heading", { name: "What it is" })).toBeInTheDocument();
    expect(screen.getByText("About the event.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "https://example.com/overview",
    );
  });

  it("renders modal image in a right aside when media is present", () => {
    const event = makeTimelineEvent({
      media: [
        {
          type: "image",
          url: "/media/timeline/amazon-ec2-launched.svg",
          title: "Amazon EC2",
          caption: "Amazon Web Services LLC",
        },
      ],
    });

    const { container } = render(<EventDetail event={event} variant="modal" />);

    expect(container.querySelector("img")).toHaveAttribute("src", "/media/timeline/amazon-ec2-launched.svg");
    expect(screen.getByText("Amazon Web Services LLC")).toBeInTheDocument();
    expect(container.querySelector("aside")).toBeInTheDocument();
  });

  it("renders youtube media in the modal body", () => {
    const event = makeTimelineEvent({
      media: [
        {
          type: "youtube",
          url: "https://www.youtube.com/watch?v=XxbJw8PrIkc",
          title: "Steve Ballmer — Developers chant",
        },
        {
          type: "image",
          url: "/media/timeline/ballmer-developers-chant.jpg",
          title: "Steve Ballmer",
        },
      ],
    });

    render(<EventDetail event={event} variant="modal" />);

    expect(screen.getByTitle("Steve Ballmer — Developers chant")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/XxbJw8PrIkc",
    );
  });

  it("renders quote block on page variant", () => {
    const event = makeTimelineEvent({
      category: "quote",
      quoteText: "To be or not to be.",
    });

    render(<EventDetail event={event} variant="page" />);
    expect(screen.getByText("“To be or not to be.”")).toBeInTheDocument();
  });
});
