/** Shared test cleanup so each render starts with an empty document body. */
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);
