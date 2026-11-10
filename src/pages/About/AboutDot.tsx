import styled from "styled-components";
import { sizes, colors } from "@/style";
import type { LayoutType } from "@/types";

/** Timeline marker positioned to match the entry's left/right alignment. */
const AboutDot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "displayLayout",
})<LayoutType>`
  position: absolute;
  width: ${sizes.spacing.sm}px;
  height: ${sizes.spacing.sm}px;
  background-color: ${colors.timelineMarker};
  border: 3px solid ${colors.white};
  top: 26px;
  border-radius: 50%;
  z-index: ${sizes.zIndex.base};

  ${sizes.query.desktop} {
    ${({ displayLayout = "left" }) =>
      displayLayout === "left"
        ? `right: -${sizes.spacing.sm}px;`
        : `left: -${sizes.spacing.sm}px;`}
  }
  ${sizes.query.touch} {
    left: 0;
  }
`;
export default AboutDot;
