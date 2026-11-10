const $oswald = "'Oswald', sans-serif";
const $quattrocento = "'Quattrocento', serif";
const $sourceSans = "'Source Sans Pro', sans-serif";

const intro = $quattrocento;
const body = $quattrocento;
const nav = $oswald;
const header = $oswald;
const footer = $oswald;
const small = $sourceSans;
const link = $sourceSans;

/** Font families, semantic size tokens, and line heights used by the UI. */
const typography = {
  font: {
    intro,
    header,
    body,
    link,
    nav,
    small,
    footer,
  },
  sizing: {
    base: "16px",
    p: "1.25rem",
    h1: "10rem",
    h2: "7rem",
    h3: "4.25rem",
    h4: "2.75rem",
    h5: "1.75rem",
    h6: "1rem",
    nav: "1.75rem",
    small: "0.75rem",
    mobile: {
      nav: "2.75rem",
    },
  },
  lineHeight: {
    base: 1.3,
    header: 1.3,
  },
};

export default typography;
