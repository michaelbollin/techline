import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SITE_BMC_URL } from "@/lib/site";

import { BuyMeACoffeeButton } from "./buy-me-a-coffee";

vi.mock("@/hooks/use-media-query", () => ({
  TIMELINE_DESKTOP_MEDIA_QUERY: "(min-width: 768px)",
  useMediaQuery: vi.fn(),
}));

const { useMediaQuery } = await import("@/hooks/use-media-query");

describe("BuyMeACoffeeButton", () => {
  it("links to Buy Me a Coffee on mobile", () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    render(<BuyMeACoffeeButton />);

    const link = screen.getByRole("link", { name: "Buy me a coffee!" });
    expect(link).toHaveAttribute("href", SITE_BMC_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("opens the widget from a button on desktop", () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(<BuyMeACoffeeButton />);

    expect(screen.getByRole("button", { name: "Buy me a coffee!" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Buy me a coffee!" })).not.toBeInTheDocument();
  });
});
