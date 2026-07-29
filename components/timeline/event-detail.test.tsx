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

  it("renders quote block on page variant", () => {
    const event = makeTimelineEvent({
      category: "quote",
      quoteText: "To be or not to be.",
    });

    render(<EventDetail event={event} variant="page" />);
    expect(screen.getByText("“To be or not to be.”")).toBeInTheDocument();
  });
});
