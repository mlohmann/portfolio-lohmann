import { useEffect } from "react";
import config from "@/data/config";

/** Canonical origin shared by runtime metadata and homepage prerendering. */
export const SITE_URL = "https://mattlohmann.com";
/** Site name appended to route-specific document titles. */
export const SITE_NAME = "Matt Lohmann";
/** Default description used when a route does not provide its own summary. */
export const DEFAULT_DESCRIPTION =
  "Matt Lohmann is a Senior Frontend Engineer specializing in interactive websites and digital experiences.";

/** Route metadata overrides; paths are relative to the canonical site origin. */
type SeoProps = {
  title: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
};

/**
 * Creates or updates a named or Open Graph meta element without duplicating it.
 *
 * @param name - Metadata key to find or create.
 * @param content - Value assigned to the element content attribute.
 * @param property - Whether to match the property attribute instead of name. */
const setMeta = (name: string, content: string, property = false) => {
  const attribute = property ? "property" : "name";
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = content;
};

/** Synchronizes document metadata and structured data with the current route. */
const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
}: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", `${SITE_URL}/android-chrome-512x512.png`, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", `${SITE_URL}/android-chrome-512x512.png`);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.getElementById("site-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "site-structured-data";
      structuredData.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": type === "article" ? "CreativeWork" : "WebPage",
      name: fullTitle,
      description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      ...(path === "/"
        ? {
            about: {
              "@type": "Person",
              name: SITE_NAME,
              jobTitle: "Senior Frontend Engineer",
              url: SITE_URL,
              sameAs: [config.linkedInUrl, "https://github.com/mlohmann"],
            },
          }
        : {}),
      ...(type === "article"
        ? { author: { "@type": "Person", name: SITE_NAME } }
        : {}),
    });
  }, [description, path, title, type]);

  return null;
};

export default Seo;
