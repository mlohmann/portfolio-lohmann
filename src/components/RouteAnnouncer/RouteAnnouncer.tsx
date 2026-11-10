import { useEffect, useRef, useState, ReactNode } from "react";
import { VisuallyHidden } from "@/components/Typography";

let listeners: Array<(text: string) => void> = [];

/** Programmatically triggers a polite route change announcement for assistive technologies. */
export function announceRoute(text: string) {
  listeners.forEach((listener) => listener(text));
}

/** Accessible live region that announces page title changes after client-side navigation. */
export const RouteAnnouncer = () => {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const handler = (text: string) => {
      // Clear briefly first so consecutive identical titles still announce reliably.
      setAnnouncement("");
      requestAnimationFrame(() => {
        setAnnouncement(text ? `Navigated to ${text}` : "");
      });
    };
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  return (
    <VisuallyHidden
      as="div"
      id="route-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {announcement}
    </VisuallyHidden>
  );
};

/**
 * Manages focus placement and route announcements across page transitions.
 * Orients keyboard and screen-reader users to the top heading or main content. */
export function RouteFocusHandler({
  pathname,
  children,
}: {
  pathname: string;
  children: ReactNode;
}) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    let observer: MutationObserver | null = null;

    const focusTarget = () => {
      const heading = document.querySelector<HTMLElement>("main h1");
      if (heading) {
        if (!heading.hasAttribute("tabindex")) {
          heading.setAttribute("tabindex", "-1");
        }
        heading.focus({ preventScroll: false });
        announceRoute(document.title);
        return true;
      }
      return false;
    };

    // Attempt immediate focus once the route component renders.
    const focused = focusTarget();

    if (!focused) {
      // Fall back to focusing the main container while async route content resolves.
      const main = document.getElementById("main");
      main?.focus({ preventScroll: false });

      // Observe main until the primary h1 mounts from an asynchronous fetch or suspense boundary.
      if (main && typeof MutationObserver !== "undefined") {
        observer = new MutationObserver(() => {
          if (focusTarget()) {
            observer?.disconnect();
            observer = null;
          }
        });
        observer.observe(main, { childList: true, subtree: true });
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
