/** Renders homepage HTML and critical styles while preserving a separate SPA fallback. */
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

// Reuse Vite's aliases and transforms to render the production landing page.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  ssr: { noExternal: ["styled-components"] },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/prerender.tsx");
  const { html, styles, metadata } = await render();
  if (!html.includes("<h1"))
    throw new Error("Prerender did not produce the homepage heading");
  if (html.includes("<template"))
    throw new Error("Prerender contains an incomplete suspense boundary");
  let template = await readFile("dist/index.html", "utf8");
  // The small global stylesheet is critical on every route. Inline it to avoid
  // another blocking network round trip before the prerendered text can paint.
  const stylesheet = template.match(
    /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
  );
  if (stylesheet) {
    const css = await readFile(`dist${stylesheet[1]}`, "utf8");
    template = template.replace(stylesheet[0], `<style>${css}</style>`);
  }
  // Keep the SPA shell separate: deep links must never receive homepage HTML
  // or its canonical metadata while the client application is loading.
  const fallback = template
    .replace(/\s*<link rel="canonical"[^>]*>/g, "")
    .replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      "<noscript><p>Enable JavaScript to view this page.</p></noscript>",
    );
  await writeFile("dist/spa.html", fallback);
  await writeFile(
    "dist/index.html",
    template
      // The rendered page already works without JavaScript; the old fallback
      // would otherwise expose a second main landmark and heading.
      .replace(/<noscript>[\s\S]*?<\/noscript>/, "")
      .replace("</head>", `${styles}${metadata}</head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root" data-prerendered="true">${html}</div>`,
      ),
  );
} finally {
  await server.close();
}
