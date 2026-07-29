import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteBrand } from "./site-brand";
import { SITE_TAGLINE, SITE_WORDMARK } from "@/lib/site";

describe("SiteBrand", () => {
  it("links home with wordmark and tagline", () => {
    render(<SiteBrand />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    expect(screen.getByText(SITE_WORDMARK)).toBeInTheDocument();
    expect(screen.getByText(SITE_TAGLINE)).toBeInTheDocument();
  });
});
