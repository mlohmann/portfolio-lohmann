import styled from "styled-components";

import type { Direction } from "@/types";
import { animation, colors, sizes } from "@/style";

/** Positions the directional icon within the project-preview link. */
const IconWrapper = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "direction",
})<Direction>`
  display: block;
  width: ${sizes.projectNavThumb}px;
  height: ${sizes.projectNavThumb}px;
  background-color: ${colors.tertiary};
  transition: background-color ${animation.normal};

  a.active:hover &,
  a.active:focus-visible & {
    background-color: ${colors.secondary};
  }
`;
export default IconWrapper;
