import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  timeout: 90000,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    channel:
      process.env.PLAYWRIGHT_CHANNEL ||
      (process.platform === "darwin" && !process.env.CI ? "chrome" : undefined),
    baseURL: "http://127.0.0.1:4173",
    reducedMotion: "reduce",
    colorScheme: "dark",
    locale: "en-US",
    timezoneId: "UTC",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    timeout: 120000,
    env: { NEXT_PUBLIC_SUPABASE_URL: "", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "" },
  },
});
