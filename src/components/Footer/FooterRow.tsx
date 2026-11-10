import styled from "styled-components";
import { BreakpointWidths } from "@/components";

/** Centered, responsive horizontal alignment for footer content. */
const FooterRow = styled(BreakpointWidths)`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0;

  > * {
    align-self: center;
  }
`;

export default FooterRow;
