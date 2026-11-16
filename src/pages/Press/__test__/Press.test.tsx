/** Smoke coverage for the press route and its loaded article headings. */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoute } from "@/__tests__/TestWrapper";
import press from "@/data/press.json";

describe("Press", () => {
  it("renders Press without crashing", async () => {
    renderRoute("/press");

    expect(await screen.findByText("EJI's New Legacy Museum")).toBeTruthy();
  });

  it("renders the supplied descriptions and transcripts beside each video", async () => {
    renderRoute("/press");

    await screen.findByText("EJI's New Legacy Museum");
    for (const article of press.articles) {
      for (const detail of article.videoDetails ?? []) {
        expect(screen.getByTitle(detail.title)).toBeTruthy();
        expect(screen.getByText(detail.audioDescription)).toBeTruthy();
        expect(screen.getByText(detail.transcript)).toBeTruthy();
      }
    }
  });
});
