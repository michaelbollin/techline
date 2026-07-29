import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { EventCard } from "./event-card";

describe("EventCard", () => {
  it("links to event page and shows summary", () => {
    const event = makeTimelineEvent({
      title: "React released",
      slug: "react-released",
      summary: "Facebook open-sources React.",
    });

    render(<EventCard event={event} />);

    expect(screen.getByRole("link", { name: "React released" })).toHaveAttribute(
      "href",
      "/react-released",
    );
    expect(screen.getByText("Facebook open-sources React.")).toBeInTheDocument();
  });

  it("shows quote text for quote events", () => {
    const event = makeTimelineEvent({
      category: "quote",
      quoteText: "Hello, world.",
      summary: "Summary fallback",
    });

    render(<EventCard event={event} />);
    expect(screen.getByText("“Hello, world.”")).toBeInTheDocument();
  });

  it("shows pillar badge for importance 0", () => {
    render(<EventCard event={makeTimelineEvent({ importance: 0 })} />);
    expect(screen.getByText("Pillar")).toBeInTheDocument();
  });
});
