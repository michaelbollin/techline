import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimationLayer } from "./animation-layer";

describe("AnimationLayer", () => {
  it("renders nothing when no animation is active", () => {
    const { container } = render(<AnimationLayer animationId={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the CD-ROM animation layer", () => {
    const { container } = render(<AnimationLayer animationId="cd-rom" variant="fullscreen" />);

    expect(container.querySelector(".cd-rom-prismatic-sweep, canvas")).toBeTruthy();
    expect(container.firstElementChild).toHaveClass("fixed");
  });
});
