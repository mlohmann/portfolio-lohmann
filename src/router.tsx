import { lazy, Suspense } from "react";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./RouteTree";
import { Loading } from "./components";

const Error404 = lazy(() => import("./pages/Error404"));

/** Application router with scroll restoration and an explicit not-found view. */
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => (
    <Suspense fallback={<Loading />}>
      <Error404 />
    </Suspense>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
