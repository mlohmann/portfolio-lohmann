const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = import.meta.env
  .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** True when both public CMS connection values are available at build time. */
const isSupabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey,
);

type Row = Record<string, unknown>;
type ImageRow = {
  src: string;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  sort_order?: number;
};
const collections: Record<
  string,
  { table: string; select: string; key: string }
> = {
  bio: { table: "bio", select: "years,location,text", key: "bio" },
  work: { table: "work", select: "years,company,title", key: "work" },
  skills: { table: "skills", select: "skill", key: "skills" },
  clients: { table: "clients", select: "url,image,alt", key: "clients" },
  press: {
    table: "press",
    select:
      "title,client,body,images,image_alt,videos,links:press_links(url,title,source,sort_order),video_details:press_video_details(title,audio_description,transcript,sort_order)",
    key: "articles",
  },
};
const projectFields =
  "id,title,summary,rank,preview_src,preview_width,preview_height,thumbnail_src,thumbnail_width,thumbnail_height";

/** Remove absent database values so the returned shape matches local JSON. */
const withoutNulls = (row: Row) =>
  Object.fromEntries(Object.entries(row).filter(([, value]) => value != null));

/** Sort child records without mutating the response array. */
const ordered = <T extends { sort_order?: number }>(rows: T[]) =>
  [...rows].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

/** Adapt the flattened Supabase project row to the frontend's nested schema. */
function project(row: Row) {
  const {
    preview_src,
    preview_width,
    preview_height,
    thumbnail_src,
    thumbnail_width,
    thumbnail_height,
    project_date,
    project_type,
    launch_urls,
    images,
    ...rest
  } = row;
  return withoutNulls({
    ...rest,
    preview: withoutNulls({
      src: preview_src,
      width: preview_width,
      height: preview_height,
    }),
    thumbnail: withoutNulls({
      src: thumbnail_src,
      width: thumbnail_width,
      height: thumbnail_height,
    }),
    projectDate: project_date,
    projectType: project_type,
    launchURL: launch_urls,
    images:
      images == null
        ? undefined
        : ordered(images as ImageRow[]).map(
            ({ sort_order: _order, ...image }) => withoutNulls(image),
          ),
  });
}

/**
 * Fetch a published content collection or project detail and normalize its rows
 * to the same nested data shape used by the static JSON fallback.
 *
 * @typeParam T - Expected frontend data shape.
 * @param collection - Supported collection name, such as `projects` or `press`.
 * @param slug - Project identifier for a detail request; ignored for collections.
 * @returns Normalized data for a collection or the requested project.
 * @throws When CMS configuration, collection name, HTTP response, or record is invalid. */
async function fetchSupabaseContent<T>(
  collection: string,
  slug: string,
): Promise<T> {
  if (!supabaseUrl || !supabasePublishableKey)
    throw new Error("Supabase CMS is not configured");
  const detail = collection === "projects" && slug !== "projects";
  const config =
    collection === "projects"
      ? {
          table: detail ? "project_details" : "projects",
          select:
            projectFields +
            (detail
              ? ",text,client,project_date,project_type,active,fwa,duties,launch_urls,images:project_images(src,width,height,alt,sort_order)"
              : ""),
          key: "projects",
        }
      : collections[collection];
  if (!config) throw new Error(`Unknown CMS collection: ${collection}`);
  // Request only published rows and the fields needed by this collection.
  // Detail requests additionally filter by project ID and return at most one row.
  const params = new URLSearchParams({
    select: config.select,
    published: "eq.true",
    order: "sort_order.asc",
  });
  if (detail) {
    params.set("id", `eq.${slug}`);
    params.set("limit", "1");
  }
  // Read from the Supabase REST API using the browser's public publishable key.
  const response = await fetch(
    `${supabaseUrl}/rest/v1/${config.table}?${params}`,
    {
      headers: { apikey: supabasePublishableKey },
    },
  );
  // Surface HTTP failures to React Query before parsing and normalizing the rows.
  if (!response.ok)
    throw new Error(`Supabase CMS request failed (${response.status})`);
  const rows = (await response.json()) as Row[];
  if (detail) {
    if (!rows[0])
      throw new Error(`Published CMS entry not found: ${collection}/${slug}`);
    return project(rows[0]) as T;
  }
  const content = rows.map((row) => {
    if (collection === "projects") return project(row);
    if (collection === "press") {
      const { links, image_alt, video_details, ...rest } = row;
      const videos = video_details as
        | (Row & { sort_order?: number; audio_description?: string })[]
        | undefined;
      return withoutNulls({
        ...rest,
        imageAlt: image_alt,
        videoDetails: videos?.length
          ? ordered(videos).map(
              ({ sort_order: _order, audio_description, ...vd }) =>
                withoutNulls({
                  ...vd,
                  audioDescription: audio_description,
                }),
            )
          : undefined,
        links: ordered(links as (Row & { sort_order: number })[]).map(
          ({ sort_order: _order, ...link }) => link,
        ),
      });
    }
    return withoutNulls(row);
  });
  return { [config.key]: content } as T;
}

export { isSupabaseConfigured, fetchSupabaseContent };
