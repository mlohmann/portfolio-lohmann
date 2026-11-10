# Supabase CMS setup

The frontend uses `useContent` (`src/hooks/useContent.ts`) to load content from structured Supabase tables when both variables are present:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

Run `npm run supabase:prepare`, then run the generated `supabase/import-content.sql`
in your project's SQL Editor. It creates the schema, access policies, and imports
all current JSON content in one transaction. Applying the import updates matching
rows from bundled JSON and can replace CMS edits. Review the generated SQL and
back up live content before applying it. Seed IDs for ordered lists are positional;
use this as an initial import, rather than a synchronization tool after rearranging
the source JSON.

| Table               | Content                                                               |
| ------------------- | --------------------------------------------------------------------- |
| projects            | Portfolio list, with image paths and dimensions in typed columns      |
| project_details     | Individual project copy, client, date, duties and launch URLs         |
| project_images      | Ordered gallery images belonging to project details (with `alt` text) |
| bio                 | Biography timeline entries                                            |
| work                | Employment entries                                                    |
| skills              | Individual skills                                                     |
| clients             | Client links, logos, and `alt` text                                   |
| press               | Articles with `image_alt` and media embed lists                       |
| press_links         | Ordered source links belonging to articles                            |
| press_video_details | Ordered video titles, transcripts, and audio descriptions             |

No table uses JSON or JSONB columns. All entities use strict relational tables
with foreign keys, typed scalar columns, and native Postgres `text[]` arrays.

## Updating content and alt text

To update an existing Supabase database with the latest content, alt image text, and video transcripts:

1. **Via SQL Editor (Recommended)**:
   Run `supabase/update-alt-text.sql` in your Supabase SQL Editor. It creates the `press_video_details` table, adds the new `alt` and `image_alt` columns, and updates all records in one transaction.

2. **Via Node script**:
   Ensure `SUPABASE_SECRET_KEY` is configured in `.env.local`, then run:
   ```bash
   npm run supabase:upload-data
   ```
   Pass `--dry-run` to validate content locally without sending network requests:
   ```bash
   npm run supabase:upload-data -- --dry-run
   ```

`schema.sql` contains the schema alone. The old `content_entries` migration is
retained for history; its table is not read by the updated frontend and is not
deleted by the import. If you edited the old table, export those edits before
switching: this import uses the local JSON as its source.

Public reads expose only published content. Detail and child rows also require
a published parent. Assign `app_metadata.role = 'admin'` to an administrator to
allow authenticated editing. Never put a secret or service-role key in the frontend.

Configured content becomes stale after one minute and React Query refreshes it on
mount, window focus or reconnect. Without configuration, bundled JSON is used.
Configured API errors are surfaced rather than falling back to local content.

## Storage-backed images

Image fields contain object references, for example
`storage://portfolio-images/screens/lp_preview.jpg`. The frontend resolves these
using the configured project URL. Local filenames and full HTTPS URLs still work.
The bucket is public: files remain downloadable even if a content row is unpublished.
Only portfolio imagery intended for public display belongs here.

1. Run `npm run supabase:prepare` to regenerate the import and image manifest.
2. Run `supabase/storage.sql` in the SQL Editor to create the public
   `portfolio-images` bucket and administrator write policy. If this bucket already
   exists, ensure it is public; the script preserves existing bucket configuration.
3. Set `SUPABASE_SECRET_KEY` in `.env.local` or your terminal environment using your project's
   server-only secret key, then run `npm run supabase:upload-images`.
   Never give this variable a `NEXT_PUBLIC_` or `VITE_` prefix. The script checks all
   local files before uploading, preserves existing objects, and verifies public URLs.
   `npm run supabase:upload-images -- --dry-run` checks files without credentials
   or network requests.
4. For a new database, run `supabase/import-content.sql`. For an already imported
   database, run `supabase/storage-references.sql` after uploading. This changes
   unchanged local filenames to Storage references and preserves custom paths/URLs.

Alternatively, upload files in the dashboard using the same folder structure:
`screens/`, `logos/`, and `press-images/`. `image-manifest.json` lists the exact files.
Upload bytes through Storage; SQL only creates the bucket and stores references.

## Versioned sources and generated files

The import generator is the source of the current relational schema. This README,
`storage.sql`, and migration history are versioned. `schema.sql`,
`import-content.sql`, `storage-references.sql`, `update-alt-text.sql`, and
`image-manifest.json` are generated by `npm run supabase:prepare` and remain
ignored. Generation writes local files only; it never applies SQL or uploads data.

The CMS and upload commands are available after a fresh checkout because their
implementations are versioned under `scripts/`. Use `--dry-run` on both upload
commands to validate without remote writes. Project/news originals are excluded
from Git; see the root README for image provisioning and responsive variants.
CI uses synthetic fixtures and never needs a Supabase secret or live project.
