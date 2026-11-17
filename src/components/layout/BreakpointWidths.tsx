import styled from "styled-components";

import { sizes } from "@/style";

const { query, grid } = sizes;

/** Centers content and caps its width to the active responsive grid. */
const BreakpointWidths = styled.div`
  margin: auto;

  ${query.desktop} {
    max-width: ${grid.desktop.maxWidth}px;
  }
  ${query.largeDesktop} {
    max-width: ${grid.largeDesktop.maxWidth}px;
  }
  ${query.touch} {
    max-width: ${grid.tablet.maxWidth};
  }
  ${query.mobile} {
    max-width: ${grid.mobile.maxWidth};
  }
`;

export default BreakpointWidths;
