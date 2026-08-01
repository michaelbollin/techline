import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { testResizeObserver } from "@/test/setup";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { TimelineEventDetail } from "./timeline-event-detail";

let offsetHeightMocked = false;

function mockOffsetHeight(height: number) {
  offsetHeightMocked = true;
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    get: () => height,
  });
}

function restoreOffsetHeight() {
  if (!offsetHeightMocked) {
    return;
  }

  Reflect.deleteProperty(HTMLElement.prototype, "offsetHeight");
  offsetHeightMocked = false;
}

describe("TimelineEventDetail", () => {
  afterEach(() => {
    testResizeObserver.fireOnObserve = false;
    restoreOffsetHeight();
  });

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
    mockOffsetHeight(120);

    const event = makePlottedEvent({
      title: "Amazon EC2 beta launched",
      imageUrl: "/media/timeline/amazon-ec2-launched.svg",
      imageCaption: "Amazon Web Services LLC, Public domain, via Wikimedia Commons",
    });

    const { container } = render(<TimelineEventDetail event={event} top={120} />);

    expect(container.querySelector("img")).toHaveAttribute("src", "/media/timeline/amazon-ec2-launched.svg");
    expect(
      screen.getByText("Amazon Web Services LLC, Public domain, via Wikimedia Commons"),
    ).toBeInTheDocument();
  });

  it("hides detail when content exceeds maxHeight", () => {
    testResizeObserver.fireOnObserve = true;
    mockOffsetHeight(200);

    const event = makePlottedEvent({
      title: "Long title",
      summary: "Summary that would need more vertical space than allowed.",
    });

    const { container } = render(<TimelineEventDetail event={event} top={120} maxHeight={50} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows detail when content fits within maxHeight", () => {
    testResizeObserver.fireOnObserve = true;
    mockOffsetHeight(80);

    const event = makePlottedEvent({
      title: "Short",
      summary: "Brief summary.",
      dateLabel: "Jan 2000",
    });

    render(<TimelineEventDetail event={event} top={120} maxHeight={120} />);

    expect(screen.getByText("Jan 2000")).toBeInTheDocument();
    expect(screen.getByText("Short")).toBeInTheDocument();
  });
});
