import { act, renderHook } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { useContainerSize } from "./use-container-size";

describe("useContainerSize", () => {
  it("observes element size", () => {
    const element = document.createElement("div");
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
      width: 640,
      height: 480,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 480,
      right: 640,
      toJSON: () => ({}),
    });

    const ref = createRef<HTMLDivElement>();
    (ref as { current: HTMLDivElement }).current = element;

    const { result } = renderHook(() => useContainerSize(ref));

    act(() => {
      element.getBoundingClientRect();
    });

    expect(result.current.width).toBe(640);
    expect(result.current.height).toBe(480);
  });
});
