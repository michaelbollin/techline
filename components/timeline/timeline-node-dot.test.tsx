import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { axisYAt } from "@/lib/timeline/axis-path";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { TimelineNodeDot } from "./timeline-node-dot";

describe("TimelineNodeDot", () => {
  const event = makePlottedEvent({ title: "Ada Lovelace", dateLabel: "1843" });
  const xScale = () => 200;
  const getAxisY = (x: number) => axisYAt(x, 320);

  it("exposes accessible label and handles interaction", async () => {
    const user = userEvent.setup();
    const onHoverEnter = vi.fn();
    const onHoverLeave = vi.fn();
    const onClick = vi.fn();

    render(
      <svg>
        <TimelineNodeDot
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          showLabel={false}
          isHovered={false}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
          onClick={onClick}
        />
      </svg>,
    );

    const button = screen.getByRole("button", { name: "Ada Lovelace, 1843" });
    await user.click(button);
    await user.hover(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onHoverEnter).toHaveBeenCalledWith(event);
  });

  it("shows a pulse ring while hovered", () => {
    const { container } = render(
      <svg>
        <TimelineNodeDot
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          showLabel={false}
          isHovered
          onHoverEnter={() => {}}
          onHoverLeave={() => {}}
          onClick={() => {}}
        />
      </svg>,
    );

    expect(container.querySelector(".animate-timeline-dot-pulse")).toBeTruthy();
  });

  it("shows a spinning ring while opening", () => {
    const { container } = render(
      <svg>
        <TimelineNodeDot
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          showLabel={false}
          isHovered
          isOpening
          onHoverEnter={() => {}}
          onHoverLeave={() => {}}
          onClick={() => {}}
        />
      </svg>,
    );

    expect(container.querySelector(".animate-timeline-dot-spin")).toBeTruthy();
    expect(container.querySelector(".animate-timeline-dot-pulse")).toBeFalsy();
  });
});
