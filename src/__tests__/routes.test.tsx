/** Route coverage for direct project entry and unmatched-path handling. */
import { render, screen } from "@testing-library/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/RouteTree";

/**
 * Renders a route with isolated memory history while retaining
 * the shared application providers. */
const renderRoute = (path: string) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });

  return render(<RouterProvider router={router} />);
};

describe("application routes", () => {
  it("loads a project when opened directly", async () => {
    renderRoute("/portfolio/project/lp");

    expect(
      await screen.findByRole("heading", {
        name: "Local Projects Official Website",
      }),
    ).toBeTruthy();
  });

  it("renders the fallback for an unknown route", async () => {
    renderRoute("/does-not-exist");

    expect(await screen.findByText("Error404")).toBeTruthy();
  });
});
