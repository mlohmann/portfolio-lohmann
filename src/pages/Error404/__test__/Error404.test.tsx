/** Verifies that an unmatched route displays the not-found view. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";

describe("Error404", () => {
  it("renders Error404 without crashing", async () => {
    renderRoute("/does-not-exist");

    expect(await screen.findByText("Error404")).toBeTruthy();
  });
});
