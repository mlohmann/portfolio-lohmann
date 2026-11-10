// Base palette.
const $white = "hsla(355, 100%, 100%, 1)";
const $fadedWhite = "hsla(355, 100%, 100%, 0.5)";
const $black = "hsla(0, 0%, 0%, 1)";
const $almostBlack = "#222";
const $imperialRed = "hsla(355, 78%, 56%, 1)";

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
  loading: "#333",
  timelineMarker: "grey",
  footerBackground: "#cf2636",
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
