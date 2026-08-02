import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TimelineHelpTrigger } from "./timeline-help-trigger";

const matchMediaMock = vi.fn();

beforeEach(() => {
  matchMediaMock.mockImplementation((query: string) => ({
    matches: query === "(min-width: 768px)",
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal("matchMedia", matchMediaMock);
});

describe("TimelineHelpTrigger", () => {
  it("opens desktop tips when clicked", async () => {
    const user = userEvent.setup();

    render(<TimelineHelpTrigger />);
    await user.click(screen.getByRole("button", { name: "How to use the timeline" }));

    expect(screen.getByText("Scroll to zoom in and out")).toBeInTheDocument();
    expect(screen.getByText("Arrow keys to pan and zoom")).toBeInTheDocument();
  });

  it("shows mobile tips on narrow viewports", async () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const user = userEvent.setup();
    render(<TimelineHelpTrigger />);
    await user.click(screen.getByRole("button", { name: "How to use the timeline" }));

    expect(screen.getByText("Pinch to zoom in and out")).toBeInTheDocument();
    expect(screen.queryByText("Arrow keys to pan and zoom")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();

    render(<TimelineHelpTrigger />);
    await user.click(screen.getByRole("button", { name: "How to use the timeline" }));
    expect(screen.getByText("Drag to pan left and right")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Drag to pan left and right")).not.toBeInTheDocument();
  });
});
