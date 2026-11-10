/** Verifies reserved image geometry and deferred source loading near the viewport. */
import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import LazyImage from "../LazyImage";

afterEach(() => vi.unstubAllGlobals());

it("reserves offscreen image space without requesting it until near the viewport", () => {
  let reveal: IntersectionObserverCallback;
  const disconnect = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        reveal = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  render(
    <LazyImage
      src="/screens/lp-1.jpg"
      width={1314}
      height={731}
      alt="Gallery"
    />,
  );
  const image = screen.getByRole("img", { name: "Gallery" });
  expect(image.getAttribute("width")).toBe("1314");
  expect(image.getAttribute("height")).toBe("731");
  expect(image.getAttribute("src")).toBeNull();
  expect(image.getAttribute("srcset")).toBeNull();
  act(() =>
    reveal(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  expect(image.getAttribute("src")).toBe("/screens/lp-1.jpg");
  expect(image.getAttribute("srcset")).toContain("480w");
  expect(disconnect).toHaveBeenCalled();
});
