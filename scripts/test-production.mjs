/** Builds and tests production behavior with bundled JSON and synthetic media. */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Empty public configuration overrides .env.local for a deterministic JSON-only
// production build. Browser tests replace excluded media with synthetic fixtures.
const cwd = fileURLToPath(new URL("../", import.meta.url));
const env = {
  ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: "",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
};
for (const args of [
  ["node_modules/vite/bin/vite.js", "build"],
  ["scripts/prerender.mjs"],
  ["--test", "tests/production.test.mjs"],
]) {
  const result = spawnSync(process.execPath, args, {
    cwd,
    env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
