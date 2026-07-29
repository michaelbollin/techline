import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { EventPageContent } from "./event-page-content";

describe("EventPageContent", () => {
  const event = makeTimelineEvent({
    title: "React released",
    slug: "react-released",
    summary: "Open-sourced at JSConf.",
  });

  it("renders page layout with back link and related events", () => {
    const related = [
      makeTimelineEvent({
        id: "related",
        slug: "related-event",
        title: "Related event",
        date: "2012-01-01",
      }),
    ];

    render(
      <EventPageContent event={event} related={related} filterPathKey="web" />,
    );

    expect(screen.getByRole("link", { name: "← Back to timeline" })).toHaveAttribute("href", "/web");
    expect(screen.getByRole("heading", { level: 1, name: "React released" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Related event" })).toHaveAttribute(
      "href",
      "/related-event?from=web",
    );
  });

  it("renders modal variant without back link", () => {
    render(<EventPageContent event={event} related={[]} variant="modal" showBackLink={false} />);

    expect(screen.queryByRole("link", { name: "← Back to timeline" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What it is" })).toBeInTheDocument();
  });
});
