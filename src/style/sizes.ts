/** Width and column measurements for one responsive layout breakpoint. */
export type GridUnit = {
  maxWidth: number | string;
  gutter: number;
  columns: number;
  columnWidth: number;
};

/** Named breakpoints used to index responsive grid measurements. */
export type Devices = "mobile" | "tablet" | "desktop" | "largeDesktop";
/** Grid measurements keyed by every supported device breakpoint. */
export type Grids = Record<Devices, GridUnit>;
/** Semantic text-size choices accepted by link and display components. */
export type DisplaySize = "xs" | "sm" | "md" | "lg" | "xl";
/** Optional semantic size override for display components. */
export type DisplaySizeType = { size?: DisplaySize };

const device = {
  mobile: { width: 719, margin: 12 },
  tablet: { width: 720, margin: 24 },
  touch: { width: 959 },
  desktop: { width: 960 },
  largeDesktop: { width: 1400 },
};

// Keep total grid width within the viewport while retaining fixed column metrics.
const desktopHorizontalPadding = 200;

const grid: Grids = {
  mobile: {
    maxWidth: `calc(100% - ${device.mobile.margin * 2}px)`,
    gutter: 16,
    columns: 2,
    columnWidth: 310,
  },
  tablet: {
    maxWidth: `calc(100% - ${device.tablet.margin * 2}px)`,
    gutter: 16,
    columns: 2,
    columnWidth: 310,
  },
  desktop: {
    maxWidth: device.desktop.width - desktopHorizontalPadding,
    gutter: 16,
    columns: 12,
    columnWidth: 48.5,
  },
  largeDesktop: {
    maxWidth: device.largeDesktop.width - desktopHorizontalPadding,
    gutter: 16,
    columns: 12,
    columnWidth: 85.25,
  },
};

const spacing = {
  xs: 8,
  sm: 16,
  md: 32,
  lg: 48,
  xl: 96,
  xxl: 182,
};

const spacingMobile: Record<keyof typeof spacing, number> = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 64,
  xxl: 120,
};

/** Shared breakpoints, grids, visibility queries, and spacing tokens. */
const sizes = {
  device,
  grid,
  spacing,
  spacingMobile,
  mobileTitleInset: device.mobile.margin,
  touchHeaderHeight: 100,
  drawerWidth: 300,
  projectNavThumb: 100,
  navControl: {
    fontSize: "1.5em",
    margin: "1em",
    marginMobile: `${device.mobile.margin}px`,
    width: "2.5em",
    height: "2.25em",
    desktopOffset: 15,
    maxTitleOffset: 132,
    maxTitleOffsetMobile: 96,
  },
  zIndex: {
    base: 1,
    nav: 1000,
    drawer: 1001,
    modal: 9999,
  },
  contentTop: 50,
  footer: 50,
  footerIconSpacing: 20,
  query: {
    mobile: `@media (max-width: ${device.mobile.width}px)`,
    tablet: `@media (min-width: ${device.tablet.width}px)`,
    touch: `@media (max-width: ${device.touch.width}px)`,
    desktop: `@media (min-width: ${device.desktop.width}px)`,
    largeDesktop: `@media (min-width: ${device.largeDesktop.width}px)`,
  },
  toggle: {
    showMobile: `@media (max-width: ${device.mobile.width}px){display:block;}`,
    hideMobile: `@media (max-width: ${device.mobile.width}px){display:none;}`,
    showTouch: `@media (max-width: ${device.touch.width}px){display:block;}`,
    hideTouch: `@media (max-width: ${device.touch.width}px){display:none;}`,
    showDesktop: `@media (min-width: ${device.desktop.width}px){display:block;}`,
    hideDesktop: `@media (min-width: ${device.desktop.width}px){display:none;}`,
  },
};

export default sizes;
