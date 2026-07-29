import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CategoryBadge } from "./category-badge";

describe("CategoryBadge", () => {
  it("renders category text", () => {
    render(<CategoryBadge category="software" />);
    expect(screen.getByText("software")).toBeInTheDocument();
  });
});
