/** Smoke coverage for rendering the application through its real route tree. */
import { render, screen } from "@testing-library/react";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "../RouteTree";

describe("all pages", () => {
  it("renders without crashing", async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText(/Hi, I'm Matt\. I'm a Senior Frontend Engineer/),
    ).toBeTruthy();
  });
});
