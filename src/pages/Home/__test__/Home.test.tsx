/** Verifies homepage introduction content and the external contact destination. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";

describe("Home", () => {
  it("renders Home without crashing", async () => {
    renderRoute("/");

    expect(
      await screen.findByText(/Hi, I'm Matt\. I'm a Senior Frontend Engineer/),
    ).toBeTruthy();
    const linkedIn = await screen.findByRole("link", {
      name: "Connect on LinkedIn",
    });

    expect(linkedIn.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/matt-lohmann/",
    );
  });
});
