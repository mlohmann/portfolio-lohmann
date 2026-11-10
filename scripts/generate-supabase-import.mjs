/** Generates local schema/import SQL and the image manifest from bundled content. */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Generate the Supabase schema, content import, and image manifest from the
// checked-in JSON content; these generated files bridge local and CMS content.
const assets = new Set();

/** Record a public Storage object and return the frontend reference to it. */
const storageRef = (directory, filename) => {
  const objectPath = `${directory}/${filename}`;
  assets.add(objectPath);
  return `storage://portfolio-images/${objectPath}`;
};

const root = fileURLToPath(new URL("../", import.meta.url));

/** Read one JSON content file relative to `src/data`. */
const read = async (name) =>
  JSON.parse(
    await readFile(path.join(root, "src/data", `${name}.json`), "utf8"),
  );
const imageColumns = {
  preview_src: "text not null",
  preview_width: "integer",
  preview_height: "integer",
  thumbnail_src: "text not null",
  thumbnail_width: "integer",
  thumbnail_height: "integer",
};
const projectColumns = {
  title: "text not null",
  summary: "text not null",
  rank: "integer not null",
  ...imageColumns,
};
const tables = {
  projects: {
    columns: { id: "text primary key", ...projectColumns },
    rows: [],
  },
  project_details: {
    columns: {
      id: "text primary key references public.projects(id)",
      ...projectColumns,
      text: "text not null",
      client: "text not null",
      project_date: "integer",
      project_type: "text",
      active: "boolean",
      fwa: "boolean",
      duties: "text[] not null default '{}'",
      launch_urls: "text[]",
    },
    rows: [],
    parent: "projects",
    parentKey: "id",
  },
  project_images: {
    columns: {
      project_id: "text not null references public.project_details(id)",
      sort_order: "integer not null",
      src: "text not null",
      width: "integer",
      height: "integer",
      alt: "text",
    },
    primary: "project_id, sort_order",
    rows: [],
    parent: "project_details",
    parentKey: "project_id",
  },
  bio: {
    columns: {
      id: "text primary key",
      years: "text not null",
      location: "text not null",
      text: "text not null",
    },
    rows: [],
  },
  work: {
    columns: {
      id: "text primary key",
      years: "text not null",
      company: "text not null",
      title: "text not null",
    },
    rows: [],
  },
  skills: {
    columns: { id: "text primary key", skill: "text not null" },
    rows: [],
  },
  clients: {
    columns: {
      id: "text primary key",
      url: "text not null",
      image: "text not null",
      alt: "text not null",
    },
    rows: [],
  },
  press: {
    columns: {
      id: "text primary key",
      title: "text not null",
      client: "text not null",
      body: "text",
      images: "text[]",
      videos: "text[]",
      image_alt: "text",
    },
    rows: [],
  },
  press_links: {
    columns: {
      press_id: "text not null references public.press(id)",
      sort_order: "integer not null",
      url: "text not null",
      title: "text not null",
      source: "text not null",
    },
    primary: "press_id, sort_order",
    rows: [],
    parent: "press",
    parentKey: "press_id",
  },
  press_video_details: {
    columns: {
      press_id: "text not null references public.press(id)",
      sort_order: "integer not null",
      title: "text not null",
      audio_description: "text not null",
      transcript: "text not null",
    },
    primary: "press_id, sort_order",
    rows: [],
    parent: "press",
    parentKey: "press_id",
  },
};
// Database rows store image fields as scalar columns; the app consumes nested objects.
const flatten = ({ preview, thumbnail, ...rest }) => ({
  ...rest,
  preview_src: storageRef("screens", preview.src),
  preview_width: preview.width,
  preview_height: preview.height,
  thumbnail_src: storageRef("screens", thumbnail.src),
  thumbnail_width: thumbnail.width,
  thumbnail_height: thumbnail.height,
});
const projects = (await read("projects")).projects;
projects.forEach((p, sort_order) =>
  tables.projects.rows.push({ ...flatten(p), sort_order, published: true }),
);
for (const filename of (await readdir(path.join(root, "src/data/projects")))
  .filter((f) => f.endsWith(".json"))
  .sort()) {
  const id = filename.slice(0, -5);
  if (!projects.some((p) => p.id === id))
    throw new Error(`Project detail has no list entry: ${id}`);
  const p = await read(`projects/${id}`);
  tables.project_details.rows.push({
    ...flatten(p),
    id,
    project_date: p.projectDate,
    project_type: p.projectType,
    launch_urls: p.launchURL,
    published: true,
  });
  p.images.forEach((image, sort_order) =>
    tables.project_images.rows.push({
      project_id: id,
      ...image,
      src: storageRef("screens", image.src),
      sort_order,
    }),
  );
}
for (const name of ["bio", "work", "skills", "clients"]) {
  (await read(name))[name].forEach((row, sort_order) =>
    tables[name].rows.push({
      ...row,
      ...(name === "clients" ? { image: storageRef("logos", row.image) } : {}),
      id: `${name}-${sort_order + 1}`,
      sort_order,
      published: true,
    }),
  );
}
(await read("press")).articles.forEach(
  ({ links, videoDetails, ...row }, sort_order) => {
    const id = `press-${sort_order + 1}`;
    tables.press.rows.push({
      ...row,
      image_alt: row.imageAlt ?? null,
      images: row.images?.map((image) => storageRef("press-images", image)),
      id,
      sort_order,
      published: true,
    });
    links.forEach((link, lSort) =>
      tables.press_links.rows.push({
        ...link,
        press_id: id,
        sort_order: lSort,
      }),
    );
    videoDetails?.forEach((vd, vSort) =>
      tables.press_video_details.rows.push({
        press_id: id,
        sort_order: vSort,
        title: vd.title,
        audio_description: vd.audioDescription,
        transcript: vd.transcript,
      }),
    );
  },
);
const quote = (value) => "'" + value.replaceAll("'", "''") + "'";
const literal = (value) => {
  if (value == null) return "null";
  if (Array.isArray(value) && value.every((v) => typeof v === "string"))
    return `array[${value.map(quote).join(", ")}]::text[]`;
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string") return quote(value);
  throw new Error(`Unsupported SQL value: ${typeof value}`);
};
let schema =
  "-- Structured portfolio content. The legacy content_entries table is preserved.\n";
schema +=
  "alter table if exists public.project_images add column if not exists alt text;\n";
schema +=
  "alter table if exists public.press add column if not exists image_alt text;\n";
schema +=
  "alter table if exists public.press drop column if exists video_details;\n";
let inserts = "";
const storageSchema = await readFile(
  path.join(root, "supabase/storage.sql"),
  "utf8",
);

for (const [name, table] of Object.entries(tables)) {
  const columns = { ...table.columns };
  if (!("sort_order" in columns))
    columns.sort_order = "integer not null default 0";
  if (!table.primary) columns.published = "boolean not null default false";
  const definitions = Object.entries(columns).map(
    ([key, type]) => `  ${key} ${type}`,
  );
  if (table.primary) definitions.push(`  primary key (${table.primary})`);
  schema += `\ncreate table if not exists public.${name} (\n${definitions.join(",\n")}\n);\n`;
  schema += `alter table public.${name} enable row level security;\nrevoke all on public.${name} from anon, authenticated;\ngrant select on public.${name} to anon, authenticated;\ngrant insert, update, delete on public.${name} to authenticated;\n`;
  const parentRead = table.parent
    ? `exists (select 1 from public.${table.parent} p where p.id = ${name}.${table.parentKey} and p.published = true)`
    : "true";
  const publicRead = table.primary
    ? parentRead
    : `published = true and (${parentRead})`;
  const admin = "(select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'";
  schema += `drop policy if exists public_read on public.${name};\ncreate policy public_read on public.${name} for select to anon, authenticated using (${publicRead});\ndrop policy if exists admin_manage on public.${name};\ncreate policy admin_manage on public.${name} for all to authenticated using (${admin}) with check (${admin});\n`;
  const keys = Object.keys(columns);
  const conflictTarget = table.primary || "id";
  const conflictCols = conflictTarget.split(",").map((c) => c.trim());
  const updateCols = keys.filter((k) => !conflictCols.includes(k));
  const onConflict = updateCols.length
    ? `on conflict (${conflictTarget}) do update set ${updateCols.map((k) => `${k} = excluded.${k}`).join(", ")}`
    : `on conflict (${conflictTarget}) do nothing`;
  inserts += `\ninsert into public.${name} (${keys.join(", ")}) values\n${table.rows.map((row) => `(${keys.map((key) => literal(row[key] ?? (key === "sort_order" ? 0 : null))).join(", ")})`).join(",\n")}\n${onConflict};\n`;
}
await writeFile(path.join(root, "supabase/schema.sql"), schema);
await writeFile(
  path.join(root, "supabase/import-content.sql"),
  `-- Generated by npm run supabase:prepare. Existing rows are updated.\nbegin;\n${schema}${storageSchema}${inserts}\nnotify pgrst, 'reload schema';\ncommit;\n`,
);

// Fast standalone update script for existing databases to backfill alt text and video descriptions.
let altUpdates = `-- Fast update script for alt image text and media descriptions.
-- Run in Supabase SQL Editor to update existing rows with alt text.
begin;
alter table if exists public.project_images add column if not exists alt text;
alter table if exists public.press add column if not exists image_alt text;
alter table if exists public.press drop column if exists video_details;

create table if not exists public.press_video_details (
  press_id text not null references public.press(id),
  sort_order integer not null default 0,
  title text not null,
  audio_description text not null,
  transcript text not null,
  published boolean not null default true,
  primary key (press_id, sort_order)
);
alter table public.press_video_details enable row level security;
revoke all on public.press_video_details from anon, authenticated;
grant select on public.press_video_details to anon, authenticated;
grant insert, update, delete on public.press_video_details to authenticated;
drop policy if exists public_read on public.press_video_details;
create policy public_read on public.press_video_details for select to anon, authenticated using (exists (select 1 from public.press p where p.id = press_video_details.press_id and p.published = true));
drop policy if exists admin_manage on public.press_video_details;
create policy admin_manage on public.press_video_details for all to authenticated using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
`;

for (const row of tables.project_images.rows) {
  if (row.alt) {
    altUpdates += `\nupdate public.project_images set alt = ${literal(row.alt)} where project_id = ${quote(row.project_id)} and sort_order = ${row.sort_order};`;
  }
}
for (const row of tables.press.rows) {
  if (row.image_alt) {
    altUpdates += `\nupdate public.press set image_alt = ${literal(row.image_alt)} where id = ${quote(row.id)};`;
  }
}
for (const row of tables.press_video_details.rows) {
  altUpdates += `\ninsert into public.press_video_details (press_id, sort_order, title, audio_description, transcript, published) values (${quote(row.press_id)}, ${row.sort_order}, ${literal(row.title)}, ${literal(row.audio_description)}, ${literal(row.transcript)}, true)\non conflict (press_id, sort_order) do update set title = excluded.title, audio_description = excluded.audio_description, transcript = excluded.transcript, published = true;`;
}
altUpdates += `\n\nnotify pgrst, 'reload schema';\ncommit;\n`;
await writeFile(path.join(root, "supabase/update-alt-text.sql"), altUpdates);

console.log(
  `Prepared ${Object.keys(tables).length} structured tables, ${Object.values(tables).reduce((sum, t) => sum + t.rows.length, 0)} rows, and generated update-alt-text.sql.`,
);

await writeFile(
  path.join(root, "supabase/image-manifest.json"),
  JSON.stringify(
    { bucket: "portfolio-images", files: [...assets].sort() },
    null,
    2,
  ) + "\n",
);

// Convert only unchanged legacy filenames; preserve custom paths and URLs.
let references = storageSchema;
for (const [name, table] of Object.entries(tables)) {
  for (const row of table.rows) {
    const identity = table.primary
      ? `${table.parentKey} = ${quote(row[table.parentKey])} and sort_order = ${row.sort_order}`
      : `id = ${quote(row.id)}`;
    for (const column of ["preview_src", "thumbnail_src", "src", "image"]) {
      const value = row[column];
      if (typeof value !== "string" || !value.startsWith("storage://"))
        continue;
      const filename = value.split("/").at(-1);
      references += `\nupdate public.${name} set ${column} = ${quote(value)} where ${identity} and ${column} = ${quote(filename)};\n`;
    }
    if (name === "press") {
      for (const value of row.images || []) {
        references += `\nupdate public.press set images = array_replace(images, ${quote(value.split("/").at(-1))}, ${quote(value)}) where ${identity};\n`;
      }
    }
  }
}
await writeFile(
  path.join(root, "supabase/storage-references.sql"),
  `-- Apply after uploading the files. Preserves custom image references.\nbegin;\n${references}\ncommit;\n`,
);
