import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TIMELINE_PINCH_HINT_STORAGE_KEY } from "@/lib/timeline/pinch-hint-storage";

import { MobileTimelinePinchHint } from "./mobile-timeline-pinch-hint";

describe("MobileTimelinePinchHint", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] ?? null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("shows on first visit when the chart is ready", async () => {
    const svgRef = createRef<SVGSVGElement>();

    render(<MobileTimelinePinchHint svgRef={svgRef} chartReady />);

    await waitFor(() => {
      expect(screen.getByText("Pinch to zoom the timeline")).toBeInTheDocument();
    });
  });

  it("does not show when the hint was already dismissed", () => {
    localStorage.setItem(TIMELINE_PINCH_HINT_STORAGE_KEY, "1");
    const svgRef = createRef<SVGSVGElement>();

    render(<MobileTimelinePinchHint svgRef={svgRef} chartReady />);

    expect(screen.queryByText("Pinch to zoom the timeline")).not.toBeInTheDocument();
  });

  it("dismisses when the button is tapped", async () => {
    const user = userEvent.setup();
    const svgRef = createRef<SVGSVGElement>();

    render(<MobileTimelinePinchHint svgRef={svgRef} chartReady />);

    await user.click(await screen.findByRole("button", { name: "Dismiss pinch to zoom hint" }));

    expect(localStorage.getItem(TIMELINE_PINCH_HINT_STORAGE_KEY)).toBe("1");
    await waitFor(() => {
      expect(screen.queryByText("Pinch to zoom the timeline")).not.toBeInTheDocument();
    });
  });
});
