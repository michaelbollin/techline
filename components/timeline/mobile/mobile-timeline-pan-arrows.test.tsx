import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MobileTimelinePanArrows } from "./mobile-timeline-pan-arrows";

describe("MobileTimelinePanArrows", () => {
  it("renders nothing when panning is unavailable", () => {
    const { container } = render(
      <MobileTimelinePanArrows
        canPanEarlier={false}
        canPanLater={false}
        onPanEarlier={() => {}}
        onPanLater={() => {}}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("calls pan handlers", async () => {
    const user = userEvent.setup();
    const onPanEarlier = vi.fn();
    const onPanLater = vi.fn();

    render(
      <MobileTimelinePanArrows
        canPanEarlier
        canPanLater
        onPanEarlier={onPanEarlier}
        onPanLater={onPanLater}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show earlier events" }));
    await user.click(screen.getByRole("button", { name: "Show later events" }));

    expect(onPanEarlier).toHaveBeenCalledTimes(1);
    expect(onPanLater).toHaveBeenCalledTimes(1);
  });
});
