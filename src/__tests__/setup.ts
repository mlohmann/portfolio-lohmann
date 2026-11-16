/** Shared test cleanup so each render starts with an empty document body. */
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

if (typeof window !== "undefined") {
  window.scrollTo = () => {};
}

afterEach(cleanup);
