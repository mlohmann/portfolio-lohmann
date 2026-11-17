# Playwright browser and visual tests

Run `npm run test:e2e` to build the production site and check desktop and mobile
routes, metadata, menu keyboard behavior, navigation, and screenshots (fixed viewport for Home, full-page for longer pages).
Coverage includes Home, About, Portfolio, Press, and the PUMA project (15 images).

Install Chromium with `npx playwright install chromium`. On older macOS versions
unsupported by bundled Chromium, use installed Chrome:
`PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`.

Run `npm run test:visual:update` (with the same browser channel) to intentionally
regenerate baselines, then review the PNG changes before committing. Baselines
are platform-specific; use the same OS and browser for comparisons. Failures
produce screenshots, differences, and retained traces under `test-results`.

Artwork excluded from Git is replaced with the existing SVG fixture. These
snapshots cover layout and site styling rather than the original project photos.
External requests receive static fixtures and bundled JSON content is used. Fonts and site
backgrounds are real. Time, motion preference, locale, and viewport are fixed.
