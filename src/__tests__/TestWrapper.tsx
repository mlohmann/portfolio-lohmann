import { render } from "@testing-library/react";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "../RouteTree";

/**
 * Renders a route with isolated memory history while 
 * retaining the shared application providers.
 */
const renderRoute = (path: string) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });

  return render(<RouterProvider router={router} />);
};

export { renderRoute };
