import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import { routeTree } from "./RouteTree";
import config from "./data/config";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo";

/**
 * Renders the static homepage and captures its component styles and metadata.
 *
 * @returns HTML markup, styled-components style tags, and a JSON-LD script tag. */
export async function render() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  await router.load();
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(
      sheet.collectStyles(<RouterProvider router={router} />),
    );
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Matt Lohmann | Senior Frontend Engineer",
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      about: {
        "@type": "Person",
        name: SITE_NAME,
        jobTitle: "Senior Frontend Engineer",
        url: SITE_URL,
        sameAs: [config.linkedInUrl, "https://github.com/mlohmann"],
      },
    };
    // Escape markup delimiters before embedding JSON inside a script element.
    const metadata = `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(
      structuredData,
    ).replace(/</g, "\\u003c")}</script>`;
    return { html, styles: sheet.getStyleTags(), metadata };
  } finally {
    // Release the collector even if rendering or metadata serialization fails.
    sheet.seal();
  }
}
