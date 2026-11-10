/** Verifies that a direct project route loads the requested detail heading. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";

describe("Project", () => {
  it("renders Project without crashing", async () => {
    renderRoute("/portfolio/project/lp");

    expect(
      await screen.findByRole("heading", {
        name: "Local Projects Official Website",
      }),
    ).toBeTruthy();
  });
});
