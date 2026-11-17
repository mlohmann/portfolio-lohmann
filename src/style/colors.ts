// Base palette primitives (canonical 6-digit hex for all solid surfaces and brand colors).
const $white = "#ffffff";
const $black = "#000000";
const $almostBlack = "#222222";
const $imperialRed = "#e63746";
const $crimson = "#cf2636";

// Overlays and alpha-blended tokens (canonical rgba with normalized decimals).
const $fadedWhite = "rgba(255, 255, 255, 0.5)";

// Semantic interface colors.
const $primary = $black;
const $secondary = $white;
const $tertiary = $imperialRed;

// Surface colors.
const $backgroundPrimary = $black;
const $backgroundSecondary = $white;
const $backgroundTertiary = $imperialRed;

// Text colors.
const $textPrimary = $white;
const $textSecondary = $black;
const $textTertiary = $black;
const $textHighlight = $imperialRed;

/** Shared palette and semantic color aliases for components and global styles. */
const colors = {
  black: $black,
  almostBlack: $almostBlack,
  loading: "#333333",
  timelineMarker: "#808080",
  actionBackground: $crimson,
  footerBackground: $crimson,
  errorBackground: "rgba(207, 38, 54, 0.1)",
  menuScrim: "rgba(0, 0, 0, 0.85)",
  subtleBorder: "rgba(255, 255, 255, 0.25)",
  white: $white,
  fadedWhite: $fadedWhite,
  highlight: $imperialRed,
  primary: $primary,
  secondary: $secondary,
  tertiary: $tertiary,
  backgroundPrimary: $backgroundPrimary,
  backgroundSecondary: $backgroundSecondary,
  backgroundTertiary: $backgroundTertiary,
  textPrimary: $textPrimary,
  textPrimaryHover: $textPrimary,
  textSecondary: $textSecondary,
  textTertiary: $textTertiary,
  textHighlight: $textHighlight,
};

export default colors;
