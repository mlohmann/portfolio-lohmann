import { memo, useState, useEffect, useRef, useCallback } from "react";
import type { ImgHTMLAttributes } from "react";

import { imagePresentation } from "@/data/imagePresentation";
import LazyImageBackground from "./LazyImageBackground";
import StyledLazyImage from "./StyledLazyImage";

type Props = ImgHTMLAttributes<HTMLImageElement>;

/**
 * Render a native lazy-loaded image and expose its loaded state to the styling.
 * Known dimensions reserve layout space while offscreen sources are withheld.
 * Eager images and images without dimensions keep normal browser loading behavior.
 * An absent alt value is rendered as empty text for decorative images. */
function LazyImage({
  className,
  src,
  alt,
  loading = "lazy",
  width,
  height,
  fetchPriority,
  onLoad,
  onError,
  ...rest
}: Props) {
  const presentation = imagePresentation(src || "", width, height);
  const [nearViewport, setNearViewport] = useState(
    () => loading === "eager" || typeof IntersectionObserver === "undefined",
  );
  // Without dimensions there is no reliable offscreen box for the observer to watch.
  const shouldLoad =
    loading === "eager" ||
    nearViewport ||
    !presentation.width ||
    !presentation.height;
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Cached requests can finish before handlers attach. Failed images also need
    // to become visible so the browser can display their alternative text.
    const image = imgRef.current;
    setLoaded(
      Boolean(
        image?.complete && (image.currentSrc || image.getAttribute("src")),
      ),
    );
  }, [src, shouldLoad]);

  useEffect(() => {
    if (shouldLoad || !imgRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <LazyImageBackground>
      <StyledLazyImage
        {...presentation}
        srcSet={shouldLoad ? presentation.srcSet : undefined}
        {...rest}
        loading={loading}
        {...(fetchPriority && fetchPriority !== "auto"
          ? { fetchpriority: fetchPriority }
          : {})}
        $loaded={loaded}
        src={shouldLoad ? src : undefined}
        style={{
          aspectRatio:
            presentation.width && presentation.height
              ? `auto ${presentation.width} / ${presentation.height}`
              : undefined,
          ...rest.style,
        }}
        alt={alt || ""}
        ref={imgRef}
        onLoad={(event) => {
          handleLoad();
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
        className={className ?? ""}
      />
    </LazyImageBackground>
  );
}

export default memo(LazyImage);
