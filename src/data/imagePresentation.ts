import metadata from "./image-metadata.json";

/** Known source dimensions and optional generated local image variants. */
type Metadata = {
  width: number;
  height: number;
  variants?: { width: number; src: string }[];
};

/**
 * Resolves known image dimensions and responsive variants from bundled metadata.
 *
 * Local paths and this project's original Storage URLs may use known dimensions.
 * Only local paths receive bundled variants because Storage artwork can change.
 *
 * @param src - Resolved image URL or root-relative public asset path.
 * @param width - Explicit width override, except for reversed legacy dimensions.
 * @param height - Explicit height override, except for reversed legacy dimensions.
 * @returns Dimensions and optional local srcSet and sizes attributes. */
export function imagePresentation(
  src: string,
  width?: number | string,
  height?: number | string,
) {
  let key = src;
  const base = import.meta.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const prefix = base && `${base}/storage/v1/object/public/portfolio-images`;
  if (prefix && src.startsWith(`${prefix}/`)) {
    try {
      key = decodeURIComponent(src.slice(prefix.length));
    } catch {
      return { width, height };
    }
  }
  const image = (metadata as Record<string, Metadata>)[key];
  // Some legacy records stored landscape dimensions in portrait order.
  const transposed =
    image &&
    image.width !== image.height &&
    Number(width) === image.height &&
    Number(height) === image.width;
  return {
    width: transposed ? image.width : (width ?? image?.width),
    height: transposed ? image.height : (height ?? image?.height),
    // Storage objects can be replaced independently of this build. Keep their URL authoritative.
    srcSet: src.startsWith("/")
      ? image?.variants?.map((v) => `${v.src} ${v.width}w`).join(", ")
      : undefined,
    sizes:
      src.startsWith("/") && image?.variants
        ? "(max-width: 959px) 100vw, 700px"
        : undefined,
  };
}
