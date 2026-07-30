import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TimelineHoverEffectsLayer } from "./timeline-hover-effects-layer";

describe("TimelineHoverEffectsLayer", () => {
  it("renders nothing when no event is hovered", () => {
    const { container } = render(<TimelineHoverEffectsLayer eventId={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the CD-ROM effect layer for the CD-ROM event", () => {
    const { container } = render(<TimelineHoverEffectsLayer eventId="cd-rom-introduced" />);

    expect(container.querySelector(".timeline-hover-prismatic-sweep, canvas")).toBeTruthy();
  });
});
