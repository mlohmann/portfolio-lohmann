import { test, expect } from "@playwright/test";

// Match the existing production suite: excluded artwork uses a stable fixture.
// Fonts, backgrounds, logos, markup, and layout are rendered by the real build.
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-01-01T12:00:00Z"));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (/^\/(?:screens|press-images|optimized\/(?:screens|press-images))\//.test(url.pathname)) {
      await route.fulfill({ path: "tests/fixtures/image.svg", contentType: "image/svg+xml" });
    } else if (url.origin !== "http://127.0.0.1:4173" && /^https?:/.test(url.protocol)) {
      await route.fulfill({ contentType: "text/html", body: "<html><body>External media fixture</body></html>" });
    } else {
      await route.continue();
    }
  });
});

const pages = [
  { name: "home", path: "/", heading: "Hi, I'm Matt" },
  { name: "about", path: "/about", heading: "Welcome To My Site!" },
  { name: "portfolio", path: "/portfolio", heading: "Portfolio" },
  { name: "press", path: "/press", heading: "Press" },
  { name: "puma", path: "/portfolio/project/puma", heading: "PUMA Official Website" },
];

for (const entry of pages) {
  test(`${entry.name}: direct route, navigation, and visual layout`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(entry.path);
    await expect(page.locator("h1")).toContainText(entry.heading);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://mattlohmann.com${entry.path === "/" ? "" : entry.path}`);
    if (entry.name === "puma") {
      await expect(page.locator('main img[alt^="PUMA"], main img[alt^="Shoe customization"], main img[alt^="Completed custom"]')).toHaveCount(15);
      await expect(page.locator("main")).toContainText("Flash development");
    }
    // Visit every section so lazy images and intersection-driven entrances settle.
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll("img").forEach((image) => { image.loading = "eager"; });
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      await document.fonts.ready;
      await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => {})));
      window.scrollTo(0, 0);
    });
    await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
    await expect(page).toHaveScreenshot(`${entry.name}.png`, { fullPage: entry.name !== "home", animations: "disabled", maxDiffPixels: 100 });
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await expect(page.getByRole("button", { name: "Close menu", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const destination = entry.path === "/about" ? "/portfolio" : "/about";
    await page.locator(`#site-navigation a[href="${destination}"]`).click();
    await expect(page).toHaveURL(destination);
    await expect(page.locator("h1")).toHaveText(destination === "/about" ? "Welcome To My Site!" : "Portfolio");
    expect(errors).toEqual([]);
  });
}
