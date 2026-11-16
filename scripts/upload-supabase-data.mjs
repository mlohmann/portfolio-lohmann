/** Validates bundled content and optionally uploads it to the configured CMS. */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));

/** Record a public Storage object reference. */
const storageRef = (directory, filename) =>
  `storage://portfolio-images/${directory}/${filename}`;

/** Read one JSON content file relative to src/data. */
const read = async (name) =>
  JSON.parse(
    await readFile(path.join(root, "src/data", `${name}.json`), "utf8"),
  );

const isDryRun = process.argv.includes("--dry-run");

// 1. Prepare table data from local JSON
const tables = {
  projects: [],
  project_details: [],
  project_images: [],
  bio: [],
  work: [],
  skills: [],
  clients: [],
  press: [],
  press_links: [],
  press_video_details: [],
};

const flatten = ({
  preview,
  thumbnail,
  images,
  projectDate,
  projectType,
  launchURL,
  ...rest
}) => ({
  ...rest,
  preview_src: storageRef("screens", preview.src),
  preview_width: preview.width ?? null,
  preview_height: preview.height ?? null,
  thumbnail_src: storageRef("screens", thumbnail.src),
  thumbnail_width: thumbnail.width ?? null,
  thumbnail_height: thumbnail.height ?? null,
});

const projects = (await read("projects")).projects;
projects.forEach((p, sort_order) =>
  tables.projects.push({ ...flatten(p), sort_order, published: true }),
);

const projectFiles = (await readdir(path.join(root, "src/data/projects")))
  .filter((f) => f.endsWith(".json"))
  .sort();
for (const filename of projectFiles) {
  const id = filename.slice(0, -5);
  const p = await read(`projects/${id}`);
  tables.project_details.push({
    ...flatten(p),
    id,
    project_date: p.projectDate ?? null,
    project_type: p.projectType ?? null,
    launch_urls: p.launchURL ?? null,
    published: true,
  });
  p.images.forEach((image, sort_order) =>
    tables.project_images.push({
      project_id: id,
      sort_order,
      src: storageRef("screens", image.src),
      width: image.width ?? null,
      height: image.height ?? null,
      alt: image.alt ?? null,
    }),
  );
}

for (const name of ["bio", "work", "skills", "clients"]) {
  (await read(name))[name].forEach((row, sort_order) => {
    tables[name].push({
      ...row,
      ...(name === "clients" ? { image: storageRef("logos", row.image) } : {}),
      id: `${name}-${sort_order + 1}`,
      sort_order,
      published: true,
    });
  });
}

(await read("press")).articles.forEach(
  ({ links, videoDetails, imageAlt, ...row }, sort_order) => {
    const id = `press-${sort_order + 1}`;
    tables.press.push({
      ...row,
      image_alt: imageAlt ?? null,
      images:
        row.images?.map((image) => storageRef("press-images", image)) ?? null,
      id,
      sort_order,
      published: true,
    });
    links.forEach((link, lSort) =>
      tables.press_links.push({ ...link, press_id: id, sort_order: lSort }),
    );
    videoDetails?.forEach((vd, vSort) =>
      tables.press_video_details.push({
        press_id: id,
        sort_order: vSort,
        title: vd.title,
        audio_description: vd.audioDescription,
        transcript: vd.transcript,
      }),
    );
  },
);

const totalRows = Object.values(tables).reduce(
  (sum, rows) => sum + rows.length,
  0,
);
const imagesWithAlt = tables.project_images.filter((img) =>
  Boolean(img.alt),
).length;
const clientsWithAlt = tables.clients.filter((c) => Boolean(c.alt)).length;
const pressWithAlt = tables.press.filter((p) => Boolean(p.image_alt)).length;

console.log(
  `Validated ${totalRows} rows across ${Object.keys(tables).length} tables:`,
);
console.log(
  `  - Projects: ${tables.projects.length} list items, ${tables.project_details.length} details`,
);
console.log(
  `  - Project images: ${tables.project_images.length} (${imagesWithAlt} with descriptive alt text)`,
);
console.log(
  `  - Clients: ${tables.clients.length} (${clientsWithAlt} with alt text)`,
);
console.log(
  `  - Press articles: ${tables.press.length} (${pressWithAlt} with imageAlt)`,
);
console.log(
  `  - Press video transcripts: ${tables.press_video_details.length} entries`,
);
console.log(`  - Press links: ${tables.press_links.length}`);

if (isDryRun) {
  console.log("\n[DRY RUN] Data validation passed. No network requests sent.");
  process.exit(0);
}

// 2. Upload via Supabase REST API
const env = loadEnv("development", root, [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SECRET_KEY",
]);
const base = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = env.SUPABASE_SECRET_KEY;

if (!base) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL in .env.local.");
if (!key?.startsWith("sb_secret_")) {
  throw new Error(
    "Set SUPABASE_SECRET_KEY=sb_secret_... in .env.local or your environment. Use the service/secret key from Supabase Settings > API Keys.",
  );
}

console.log(`\nUploading structured content to Supabase at ${base}...`);

// Insert tables in dependency order
const order = [
  "projects",
  "project_details",
  "project_images",
  "bio",
  "work",
  "skills",
  "clients",
  "press",
  "press_links",
  "press_video_details",
];

const normalizeRows = (rows) => {
  if (!rows.length) return rows;
  const allKeys = Array.from(new Set(rows.flatMap(Object.keys)));
  return rows.map((row) => {
    const normalized = {};
    for (const key of allKeys) {
      normalized[key] = row[key] ?? null;
    }
    return normalized;
  });
};

for (const tableName of order) {
  const rows = normalizeRows(tables[tableName]);
  if (!rows.length) continue;

  const url = `${base}/rest/v1/${tableName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(rows),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(errorBody);
    } catch {
      // Fall back to the raw response text when the error body is not JSON.
    }
    const msg = parsed?.message || parsed?.error || errorBody;

    if (
      response.status === 400 &&
      (msg.includes("column") || msg.includes("schema cache"))
    ) {
      console.error(`\n[ERROR] Schema mismatch on '${tableName}': ${msg}`);
      console.error(
        "Tip: Run supabase/update-alt-text.sql in your Supabase SQL Editor to add the 'alt', 'image_alt', and 'video_details' columns first, then re-run this script.\n",
      );
    }
    throw new Error(
      `Failed to upload ${tableName} (HTTP ${response.status}): ${msg}`,
    );
  }

  console.log(`  ✓ ${tableName}: synced ${rows.length} rows`);
}

console.log(
  "\nAll portfolio content and alt image texts successfully synced to Supabase!",
);
