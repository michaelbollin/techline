import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
} from "@/lib/site";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders author name, email, and site link", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: SITE_AUTHOR_NAME })).toHaveAttribute(
      "href",
      SITE_AUTHOR_URL,
    );
    expect(screen.getByText("Missing event? Send it to:")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: SITE_AUTHOR_EMAIL })).toHaveAttribute(
      "href",
      `mailto:${SITE_AUTHOR_EMAIL}`,
    );
    expect(screen.getByRole("button", { name: "Buy me a coffee!" })).toBeInTheDocument();
  });
});
