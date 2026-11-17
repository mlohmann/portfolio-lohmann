/** Optional layout direction used by responsive display components. */
type LayoutType = { displayLayout?: "left" | "right" };
/** Destination URL required by link-oriented components. */
type LinkType = { url: string };
/** Direction relative to the current project in the previous/next navigation. */
type Direction = { direction: "next" | "prev" };

export type { LayoutType, LinkType, Direction };
