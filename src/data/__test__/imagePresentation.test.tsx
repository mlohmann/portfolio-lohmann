/** Verifies metadata lookup, legacy dimension correction, and local responsive variants. */
import { afterEach, expect, it, vi } from "vitest";

import { imagePresentation } from "../imagePresentation";

afterEach(() => vi.unstubAllEnvs());

it("reserves bundled image geometry and supplies responsive local variants", () => {
  const image = imagePresentation("/press-images/legacy.jpg");
  expect(image.width).toBeGreaterThan(0);
  expect(image.height).toBeGreaterThan(0);
  expect(image.srcSet).toContain("480w");
});

it("fills original Storage dimensions without substituting locally cached artwork", () => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  const image = imagePresentation(
    "https://example.supabase.co/storage/v1/object/public/portfolio-images/press-images/legacy.jpg",
  );
  expect(image.width).toBeGreaterThan(0);
  expect(image.srcSet).toBeUndefined();
});

it("preserves custom dimensions and leaves unknown images untouched", () => {
  expect(imagePresentation("https://custom.example/art.jpg", 640, 360)).toEqual(
    { width: 640, height: 360, srcSet: undefined, sizes: undefined },
  );
  expect(imagePresentation("/press-images/legacy.jpg", 100, 50).width).toBe(
    100,
  );
});

it("corrects reversed legacy dimensions using known artwork geometry", () => {
  const image = imagePresentation("/screens/bv_preview.jpg", 870, 1196);
  expect(image.width).toBe(1196);
  expect(image.height).toBe(870);
});
