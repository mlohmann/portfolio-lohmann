/** Validates the asset manifest and optionally uploads missing public Storage objects. */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

// Validate the complete manifest before the first network request, so a missing
// local asset cannot leave the bucket only partially uploaded.
const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  await readFile(path.join(root, "supabase/image-manifest.json"), "utf8"),
);
const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};
const files = [];
const missing = [];
for (const objectPath of manifest.files) {
  const localPath = path.resolve(root, "public", objectPath);
  if (!localPath.startsWith(path.join(root, "public") + path.sep))
    throw new Error("Invalid image path");
  const contentType = mimeTypes[path.extname(objectPath).toLowerCase()];
  if (!contentType) throw new Error(`Unsupported image: ${objectPath}`);
  try {
    const info = await stat(localPath);
    if (!info.isFile()) throw new Error("Not a file");
    files.push({ objectPath, localPath, contentType, size: info.size });
  } catch {
    missing.push(objectPath);
  }
}
if (missing.length)
  throw new Error(
    `Missing local images (nothing uploaded):\n${missing.join("\n")}`,
  );
console.log(
  `Validated ${files.length} images (${(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(1)} MB).`,
);
if (!process.argv.includes("--dry-run")) {
  const env = loadEnv("development", root, [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SECRET_KEY",
  ]);
  const base = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = env.SUPABASE_SECRET_KEY;
  if (!base) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL in .env.local.");
  if (!key?.startsWith("sb_secret_"))
    throw new Error(
      "Set SUPABASE_SECRET_KEY=sb_secret_... in .env.local or your terminal environment. Use the server-only secret key from Supabase Settings > API Keys; never prefix it with NEXT_PUBLIC_ or VITE_.",
    );
  let uploaded = 0;
  let preserved = 0;
  for (const file of files) {
    const object = [manifest.bucket, ...file.objectPath.split("/")]
      .map(encodeURIComponent)
      .join("/");
    const response = await fetch(`${base}/storage/v1/object/${object}`, {
      method: "POST",
      headers: {
        apikey: key,
        "Content-Type": file.contentType,
        "x-upsert": "false",
      },
      body: await readFile(file.localPath),
      signal: AbortSignal.timeout(60000),
    });
    if (response.ok) uploaded++;
    else {
      const error = await response.json();
      // Existing objects are intentionally preserved rather than overwritten.
      if (
        error.statusCode === "409" ||
        error.statusCode === 409 ||
        error.error === "Duplicate"
      )
        preserved++;
      else
        throw new Error(
          `Upload failed for ${file.objectPath}: HTTP ${response.status} ${error.message || error.error || ""}`,
        );
    }
    const check = await fetch(`${base}/storage/v1/object/public/${object}`, {
      method: "HEAD",
      signal: AbortSignal.timeout(30000),
    });
    if (!check.ok || !check.headers.get("content-type")?.startsWith("image/"))
      throw new Error(`Public image verification failed: ${file.objectPath}`);
  }
  console.log(
    `Uploaded ${uploaded}; preserved ${preserved} existing files. Public image URLs verified.`,
  );
}
