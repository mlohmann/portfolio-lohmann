/**
 * Regression coverage for semantic headings, live regions, and shared accessibility
 * components. */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loading, ErrorDisplay, RouteAnnouncer, Footer } from "@/components";
import { renderRoute } from "./TestWrapper";

describe("Accessibility enhancements", () => {
  it("renders Loading with accessible status semantics and visually hidden text", () => {
    render(<Loading message="Loading test content..." />);

    const status = screen.getByRole("status");
    expect(status).toBeTruthy();
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(screen.getByText("Loading test content...")).toBeTruthy();
  });

  it("renders ErrorDisplay with assertive alert semantics", () => {
    render(<ErrorDisplay>Failed to load data</ErrorDisplay>);

    const alert = screen.getByRole("alert");
    expect(alert).toBeTruthy();
    expect(alert.getAttribute("aria-live")).toBe("assertive");
    expect(alert.getAttribute("aria-atomic")).toBe("true");
    expect(screen.getByText("Failed to load data")).toBeTruthy();
  });

  it("renders RouteAnnouncer as a polite live region", () => {
    render(<RouteAnnouncer />);

    const announcer = document.getElementById("route-announcer");
    expect(announcer).toBeTruthy();
    expect(announcer?.getAttribute("role")).toBe("status");
    expect(announcer?.getAttribute("aria-live")).toBe("polite");
    expect(announcer?.getAttribute("aria-atomic")).toBe("true");
  });

  it("renders Footer copyright text without exposing a heading element", () => {
    render(<Footer />);

    const copyright = screen.getByText(/© Matt Lohmann/);
    expect(copyright.tagName.toLowerCase()).toBe("p");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });

  it("provides an h1 heading on the Home route", async () => {
    renderRoute("/");

    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading.textContent).toContain(
      "Hi, I'm Matt. I'm a Senior Frontend Engineer",
    );
    expect(heading.getAttribute("tabindex")).toBe("-1");
    expect(screen.getByText("Matt Lohmann").tagName.toLowerCase()).toBe("p");
  });

  it("provides an h1 and h2 project headings on the Portfolio route", async () => {
    renderRoute("/portfolio");

    const h1 = await screen.findByRole("heading", {
      level: 1,
      name: "Portfolio",
    });
    expect(h1).toBeTruthy();

    const h2Headings = await screen.findAllByRole("heading", { level: 2 });
    expect(h2Headings.length).toBeGreaterThan(0);
    expect(
      h2Headings.some((h) =>
        h.textContent?.includes("Equal Justice Initiative"),
      ),
    ).toBe(true);
  });

  it("provides a proper heading hierarchy (h1 -> h2 -> h3) on the About route", async () => {
    renderRoute("/about");

    const h1 = await screen.findByRole("heading", {
      level: 1,
      name: "Welcome To My Site!",
    });
    expect(h1).toBeTruthy();

    const h2Headings = await screen.findAllByRole("heading", { level: 2 });
    expect(
      h2Headings.some((h) => h.textContent === "Professional Timeline"),
    ).toBe(true);
    expect(h2Headings.some((h) => h.textContent === "Skills")).toBe(true);

    const h3Headings = await screen.findAllByRole("heading", { level: 3 });
    expect(h3Headings.length).toBeGreaterThan(0);
  });

  it("provides a proper heading hierarchy (h1 -> h2 -> h3) on the Press route", async () => {
    renderRoute("/press");

    const h1 = await screen.findByRole("heading", {
      level: 1,
      name: "Press Coverage",
    });
    expect(h1).toBeTruthy();

    const articleHeadings = await screen.findAllByRole("heading", { level: 2 });
    expect(
      articleHeadings.some((h) =>
        h.textContent?.includes("EJI's New Legacy Museum"),
      ),
    ).toBe(true);

    const subsectionHeadings = await screen.findAllByRole("heading", {
      level: 3,
    });
    expect(subsectionHeadings.some((h) => h.textContent === "Videos")).toBe(
      true,
    );
    expect(subsectionHeadings.some((h) => h.textContent === "Articles")).toBe(
      true,
    );
  });

  it("provides an h1 heading and h2 subsection headings on the Project detail route", async () => {
    renderRoute("/portfolio/project/eji");

    const h1 = await screen.findByRole("heading", {
      level: 1,
      name: "Equal Justice Initiative",
    });
    expect(h1).toBeTruthy();

    const h2Headings = await screen.findAllByRole("heading", { level: 2 });
    expect(h2Headings.some((h) => h.textContent === "Roles")).toBe(true);
  });
});
