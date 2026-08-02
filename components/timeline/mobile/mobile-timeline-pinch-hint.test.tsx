import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TIMELINE_PINCH_HINT_STORAGE_KEY } from "@/lib/timeline/pinch-hint-storage";

import { MobileTimelinePinchHint } from "./mobile-timeline-pinch-hint";

describe("MobileTimelinePinchHint", () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem(key: string) {
        return store[key] ?? null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows on first visit when the chart is ready", async () => {
    render(<MobileTimelinePinchHint chartReady zoomScale={1} />);

    await waitFor(() => {
      expect(screen.getByText("Pinch to zoom")).toBeInTheDocument();
    });
  });

  it("does not show when the hint was already dismissed", () => {
    localStorage.setItem(TIMELINE_PINCH_HINT_STORAGE_KEY, "1");

    render(<MobileTimelinePinchHint chartReady zoomScale={1} />);

    expect(screen.queryByText("Pinch to zoom")).not.toBeInTheDocument();
  });

  it("dismisses when the close button is tapped", async () => {
    const user = userEvent.setup();

    render(<MobileTimelinePinchHint chartReady zoomScale={1} />);

    await user.click(await screen.findByRole("button", { name: "Close pinch hint" }));

    expect(localStorage.getItem(TIMELINE_PINCH_HINT_STORAGE_KEY)).toBe("1");
    await waitFor(() => {
      expect(screen.queryByText("Pinch to zoom")).not.toBeInTheDocument();
    });
  });

  it("dismisses when the user zooms", async () => {
    const { rerender } = render(<MobileTimelinePinchHint chartReady zoomScale={1} />);

    await screen.findByText("Pinch to zoom");
    rerender(<MobileTimelinePinchHint chartReady zoomScale={1.4} />);

    await waitFor(() => {
      expect(screen.queryByText("Pinch to zoom")).not.toBeInTheDocument();
    });
    expect(localStorage.getItem(TIMELINE_PINCH_HINT_STORAGE_KEY)).toBe("1");
  });
});
