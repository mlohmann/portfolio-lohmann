/** Verifies local, external, and Storage image reference resolution. */
import { afterEach, expect, it, vi } from "vitest";
import { imageUrl } from "../images";

afterEach(() => vi.unstubAllEnvs());

it("resolves Storage references and encodes filenames", () => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co/");
  expect(
    imageUrl("storage://portfolio-images/screens/my image.jpg", "/screens/"),
  ).toBe(
    "https://example.supabase.co/storage/v1/object/public/portfolio-images/screens/my%20image.jpg",
  );
});

it("preserves local filenames, absolute paths, and external URLs", () => {
  expect(imageUrl("image.jpg", "/screens/")).toBe("/screens/image.jpg");
  expect(imageUrl("/logos/logo.png", "/screens/")).toBe("/logos/logo.png");
  expect(imageUrl("https://example.com/image.jpg", "/screens/")).toBe(
    "https://example.com/image.jpg",
  );
});

it("rejects missing configuration and invalid Storage paths", () => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
  expect(() =>
    imageUrl("storage://portfolio-images/image.jpg", "/screens/"),
  ).toThrow("Supabase URL is required");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  expect(() =>
    imageUrl("storage://portfolio-images/../image.jpg", "/screens/"),
  ).toThrow("Invalid Storage image reference");
});
