import styled from "styled-components";
import { Direction } from "@/types";
import { colors } from "@/style";

/** Direction-aware SVG container for the project navigation chevron. */
const SVGWrapper = styled.svg<Direction>`
  position: relative;
  top: 50%;
  transition: all 0.3s; 
  fill: ${colors.secondary};
 
  transform: ${({ direction }) =>
    direction === "next"
      ? "translate(18px, -50%) scaleX(-1);"
      : "translate(18px,-50%);"}

  a.active:hover & {
    fill: ${colors.tertiary};

    transform: ${({ direction }) =>
      direction === "next"
        ? "translate(36px, -50%) scaleX(-1);"
        : "translate(0,-50%);"}}
  }
`;
export default SVGWrapper;
