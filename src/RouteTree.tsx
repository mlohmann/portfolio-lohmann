import { lazy, Suspense } from "react";
import {
  createRootRoute,
  createRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GlobalStyle } from "@/style";
import {
  Footer,
  Navigation,
  Loading,
  ErrorBoundary,
  RouteAnnouncer,
  RouteFocusHandler,
} from "@/components";
import AppWrapper from "./AppWrapper";
import Content from "./Content";
import Main from "./Main";
import AppStore from "./AppStore";
import Seo from "./seo";

// Build-time rendering needs the homepage synchronously; other routes stay lazy.
import Home from "@/pages/Home";
const About = lazy(() => import("@/pages/About"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Press = lazy(() => import("@/pages/Press"));
const Project = lazy(() => import("@/pages/Project"));
const Error404 = lazy(() => import("@/pages/Error404"));

// Reuse one client so route-level queries share cache and retry policy.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/** Renders the common shell and the active route inside shared providers. */
function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Seo title="Matt Lohmann" />
      <AppStore>
        <AppWrapper>
          <GlobalStyle />
          <Content>
            <Main id="main">
              <RouteFocusHandler pathname={pathname}>
                <ErrorBoundary key={pathname}>
                  <Suspense fallback={<Loading />}>
                    <Outlet />
                    <Footer />
                  </Suspense>
                </ErrorBoundary>
              </RouteFocusHandler>
            </Main>
            <Navigation />
            <RouteAnnouncer />
          </Content>
        </AppWrapper>
      </AppStore>
    </QueryClientProvider>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: Error404,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: Portfolio,
});

const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio/project/$project",
  component: Project,
});

const pressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/press",
  component: Press,
});

/** Route definitions shared by browser navigation, tests, and homepage prerendering. */
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  portfolioRoute,
  projectRoute,
  pressRoute,
]);

export { routeTree };
