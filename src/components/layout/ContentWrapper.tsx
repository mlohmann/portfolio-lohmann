import { sizes } from "@/style";
import styled from "styled-components";
import BreakpointWidths from "./BreakpointWidths";

/** Page-level container reserving vertical space for the fixed site footer. */
const ContentWrapper = styled(BreakpointWidths)`
  margin: auto;
  min-height: 100vh;
  width: 100%;
  padding-top: ${sizes.contentTop}px;
  padding-bottom: ${sizes.footer}px;
`;

export default ContentWrapper;
