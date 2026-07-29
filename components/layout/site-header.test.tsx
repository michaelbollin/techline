import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("renders brand and timeline navigation", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /history of dev/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Timeline" })).toHaveAttribute("href", "/");
  });
});
