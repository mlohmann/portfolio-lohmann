/**
 * Resolve a Storage reference, absolute URL, root-relative URL, or local filename.
 *
 * Storage references use `storage://bucket/path`; their URL path segments are
 * encoded individually to preserve separators while escaping special characters.
 *
 * @param source - Image reference from content data.
 * @param localDirectory - Public directory prefix for legacy filenames.
 * @returns A URL suitable for an image source.
 * @throws If a Storage reference is malformed or Supabase is not configured. */
export function imageUrl(source: string, localDirectory: string): string {
  if (source.startsWith("storage://")) {
    const base = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) throw new Error("Supabase URL is required for Storage images");
    const object = source.slice("storage://".length);
    const segments = object.split("/");
    if (
      segments.length < 2 ||
      segments.some((part) => !part || part === "." || part === "..")
    ) {
      throw new Error("Invalid Storage image reference");
    }
    return `${base.replace(/\/$/, "")}/storage/v1/object/public/${segments.map(encodeURIComponent).join("/")}`;
  }
  if (/^https?:\/\//i.test(source) || source.startsWith("/")) return source;
  return `${localDirectory}${source}`;
}
