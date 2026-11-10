/** Verifies project destinations and eager loading of the lead portfolio image. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";

describe("Portfolio", () => {
  it("renders Portfolio without crashing", async () => {
    renderRoute("/portfolio");

    const links = await screen.findAllByRole("link", {
      name: "Equal Justice Initiative",
    });
    expect(
      links.every(
        (link) => link.getAttribute("href") === "/portfolio/project/eji",
      ),
    ).toBe(true);
    const lead = screen.getByRole("img", { name: "Equal Justice Initiative" });
    expect(lead.getAttribute("loading")).toBe("eager");
    expect(lead.getAttribute("fetchpriority")).toBe("high");
  });
});
