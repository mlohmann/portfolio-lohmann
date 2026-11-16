/** Smoke and presentation coverage for the About route and timeline labels. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";

describe("About", () => {
  it("renders About without crashing", async () => {
    renderRoute("/about");

    expect(
      await screen.findByText(
        /I'm a Senior Frontend Engineer specializing in the web/,
        {},
        { timeout: 5000 },
      ),
    ).toBeTruthy();
  });

  it("renders supplied professional dates without changing personal timeline cards", async () => {
    renderRoute("/about");

    await screen.findByText(
      /I'm a Senior Frontend Engineer specializing in the web/,
      {},
      { timeout: 5000 },
    );

    expect(await screen.findByText("2018-2026")).toBeTruthy();
    expect(screen.queryByText(/1997-2001/)).toBeNull();
    expect(screen.queryByText(/2017-PRESENT/)).toBeNull();
  });
});
