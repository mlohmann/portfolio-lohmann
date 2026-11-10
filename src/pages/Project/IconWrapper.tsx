import styled from "styled-components";
import { Direction } from "@/types";
import { animation, colors, sizes } from "@/style";

/** Positions the directional icon within the project-preview link. */
const IconWrapper = styled.span<Direction>`
  display: block;
  width: ${sizes.projectNavThumb}px;
  height: ${sizes.projectNavThumb}px;
  background-color: ${colors.tertiary};
  transition: background-color ${animation.normal};

  a.active:hover & {
    background-color: ${colors.secondary};
  }
`;
export default IconWrapper;
