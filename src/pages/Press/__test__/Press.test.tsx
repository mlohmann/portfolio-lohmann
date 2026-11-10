/** Smoke coverage for the press route and its loaded article headings. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";

describe("Press", () => {
  it("renders Press without crashing", async () => {
    renderRoute("/press");

    expect(await screen.findByText("EJI's New Legacy Museum")).toBeTruthy();
  });
});
