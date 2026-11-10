/** Verifies published-content requests and normalization with mocked REST responses. */
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  // The adapter captures environment values on import, so each test needs a fresh module.
  vi.resetModules();
});

/**
 * Imports the CMS adapter after setting the environment values read during module

 * initialization.
 */
async function client() {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
  return import("../supabase");
}

describe("Supabase content", () => {
  it("wraps biography rows in the existing frontend shape", async () => {
    const bio = [{ years: "2026", location: "Seattle", text: "Hello" }];
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => bio });
    vi.stubGlobal("fetch", fetchMock);
    const { fetchSupabaseContent } = await client();
    expect(await fetchSupabaseContent("bio", "bio")).toEqual({ bio });
    expect(new URL(fetchMock.mock.calls[0][0]).pathname).toBe("/rest/v1/bio");
  });

  it("orders embedded press links and omits nullable fields", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            title: "Article",
            body: null,
            image_alt: "Article photo",
            links: [
              { sort_order: 1, title: "Second" },
              { sort_order: 0, title: "First" },
            ],
            video_details: [
              {
                sort_order: 0,
                title: "Video",
                audio_description: "Audio desc",
                transcript: "Transcript",
              },
            ],
          },
        ],
      }),
    );
    const { fetchSupabaseContent } = await client();
    expect(await fetchSupabaseContent("press", "press")).toEqual({
      articles: [
        {
          title: "Article",
          imageAlt: "Article photo",
          videoDetails: [
            {
              title: "Video",
              audioDescription: "Audio desc",
              transcript: "Transcript",
            },
          ],
          links: [{ title: "First" }, { title: "Second" }],
        },
      ],
    });
  });

  it("maps project details and orders gallery images", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            title: "Project",
            preview_src: "preview.jpg",
            thumbnail_src: "thumb.jpg",
            preview_width: null,
            project_date: 2015,
            project_type: "website",
            active: false,
            launch_urls: ["https://example.com"],
            images: [
              {
                src: "second.jpg",
                sort_order: 1,
                width: null,
                alt: "Second screenshot",
              },
              {
                src: "first.jpg",
                sort_order: 0,
                width: 100,
                alt: "First screenshot",
              },
            ],
          },
        ],
      }),
    );
    const { fetchSupabaseContent } = await client();
    expect(await fetchSupabaseContent("projects", "lp")).toEqual({
      title: "Project",
      preview: { src: "preview.jpg" },
      thumbnail: { src: "thumb.jpg" },
      projectDate: 2015,
      projectType: "website",
      active: false,
      launchURL: ["https://example.com"],
      images: [
        { src: "first.jpg", width: 100, alt: "First screenshot" },
        { src: "second.jpg", alt: "Second screenshot" },
      ],
    });
  });

  it("reads the published document using only the API-key header", async () => {
    const content = {
      id: "lp",
      title: "Project",
      preview: { src: "preview.jpg" },
      thumbnail: { src: "thumb.jpg" },
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: "lp",
          title: "Project",
          preview_src: "preview.jpg",
          thumbnail_src: "thumb.jpg",
        },
      ],
    });
    vi.stubGlobal("fetch", fetchMock);
    const { fetchSupabaseContent } = await client();

    expect(await fetchSupabaseContent("projects", "lp")).toEqual(content);
    const [url, options] = fetchMock.mock.calls[0];
    const params = new URL(url).searchParams;
    expect(new URL(url).pathname).toBe("/rest/v1/project_details");
    expect(params.get("id")).toBe("eq.lp");
    expect(params.get("published")).toBe("eq.true");
    expect(options.headers).toEqual({ apikey: "sb_publishable_test" });
  });

  it("reports a missing published document", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => [] }),
    );
    const { fetchSupabaseContent } = await client();
    await expect(fetchSupabaseContent("projects", "missing")).rejects.toThrow(
      "Published CMS entry not found: projects/missing",
    );
  });

  it("reports API failures", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403 }),
    );
    const { fetchSupabaseContent } = await client();
    await expect(fetchSupabaseContent("bio", "bio")).rejects.toThrow(
      "Supabase CMS request failed (403)",
    );
  });
});
