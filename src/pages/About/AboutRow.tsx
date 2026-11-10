import styled from "styled-components";

import { Row } from "@/components";
import type { LayoutType } from "@/types";
import { sizes } from "@/style";

/** Responsive timeline row whose direction alternates across the center rail. */
const AboutRow = styled(Row).withConfig({
  shouldForwardProp: (prop) => prop !== "displayLayout",
})<LayoutType>`
  flex-direction: ${({ displayLayout = "left" }) =>
    displayLayout === "left" ? "row" : "row-reverse"};

  ${sizes.query.touch} {
    flex-direction: row;
  }
`;

export default AboutRow;
