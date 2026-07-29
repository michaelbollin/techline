import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { TimelineEventDetail } from "./timeline-event-detail";

describe("TimelineEventDetail", () => {
  it("shows hovered event details", () => {
    const event = makePlottedEvent({
      title: "React released",
      summary: "Open-sourced at JSConf.",
      dateLabel: "May 2013",
    });

    render(<TimelineEventDetail event={event} top={120} />);

    expect(screen.getByText("May 2013")).toBeInTheDocument();
    expect(screen.getByText("React released")).toBeInTheDocument();
    expect(screen.getByText("Open-sourced at JSConf.")).toBeInTheDocument();
  });

  it("shows cover image between border and title when available", () => {
    const event = makePlottedEvent({
      title: "Amazon EC2 beta launched",
      imageUrl: "/media/timeline/amazon-ec2-launched.svg",
      imageCaption: "Amazon Web Services LLC, Public domain, via Wikimedia Commons",
    });

    render(<TimelineEventDetail event={event} top={120} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", "/media/timeline/amazon-ec2-launched.svg");
    expect(
      screen.getByText("Amazon Web Services LLC, Public domain, via Wikimedia Commons"),
    ).toBeInTheDocument();
  });
});
