/** Verifies reserved image geometry and deferred source loading near the viewport. */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import LazyImage from "../LazyImage";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

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

it("reveals failed images, resets on source changes, and preserves image event callbacks", () => {
  const onLoad = vi.fn();
  const onError = vi.fn();
  const { rerender } = render(
    <LazyImage
      src="/broken.jpg"
      alt="Project artwork"
      loading="eager"
      onLoad={onLoad}
      onError={onError}
    />,
  );
  const image = screen.getByRole("img", { name: "Project artwork" });
  fireEvent.error(image);
  expect(getComputedStyle(image).opacity).toBe("1");
  expect(onError).toHaveBeenCalledOnce();

  rerender(
    <LazyImage
      src="/replacement.jpg"
      alt="Project artwork"
      loading="eager"
      onLoad={onLoad}
      onError={onError}
    />,
  );
  expect(getComputedStyle(image).opacity).toBe("0");
  fireEvent.load(image);
  expect(getComputedStyle(image).opacity).toBe("1");
  expect(onLoad).toHaveBeenCalledOnce();
});

it("reveals cached failures when the request finished before event handlers attached", () => {
  vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
  render(
    <LazyImage
      src="/cached-failure.jpg"
      alt="Unavailable artwork"
      loading="eager"
    />,
  );
  expect(
    getComputedStyle(screen.getByRole("img", { name: "Unavailable artwork" }))
      .opacity,
  ).toBe("1");
});
