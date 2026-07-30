import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useTimelineKeyboardNavigation } from "./use-timeline-keyboard-navigation";

describe("useTimelineKeyboardNavigation", () => {
  it("zooms in on ArrowUp", () => {
    const zoomIn = vi.fn();

    renderHook(() =>
      useTimelineKeyboardNavigation({
        enabled: true,
        zoomIn,
        zoomOut: vi.fn(),
        panEarlier: vi.fn(),
        panLater: vi.fn(),
        canPanEarlier: true,
        canPanLater: true,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    });

    expect(zoomIn).toHaveBeenCalledTimes(1);
  });

  it("pans later on ArrowRight when allowed", () => {
    const panLater = vi.fn();

    renderHook(() =>
      useTimelineKeyboardNavigation({
        enabled: true,
        zoomIn: vi.fn(),
        zoomOut: vi.fn(),
        panEarlier: vi.fn(),
        panLater,
        canPanEarlier: false,
        canPanLater: true,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    });

    expect(panLater).toHaveBeenCalledTimes(1);
  });

  it("ignores arrows while typing in an input", () => {
    const zoomIn = vi.fn();
    const input = document.createElement("input");

    renderHook(() =>
      useTimelineKeyboardNavigation({
        enabled: true,
        zoomIn,
        zoomOut: vi.fn(),
        panEarlier: vi.fn(),
        panLater: vi.fn(),
        canPanEarlier: true,
        canPanLater: true,
      }),
    );

    act(() => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    });

    expect(zoomIn).not.toHaveBeenCalled();
  });

  it("does nothing while disabled", () => {
    const zoomIn = vi.fn();

    renderHook(() =>
      useTimelineKeyboardNavigation({
        enabled: false,
        zoomIn,
        zoomOut: vi.fn(),
        panEarlier: vi.fn(),
        panLater: vi.fn(),
        canPanEarlier: true,
        canPanLater: true,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    });

    expect(zoomIn).not.toHaveBeenCalled();
  });
});
