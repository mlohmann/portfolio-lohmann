import styled from "styled-components";

import type { Direction } from "@/types";
import { animation, colors } from "@/style";

/** Direction-aware SVG container for the project navigation chevron. */
const SVGWrapper = styled.svg.withConfig({
  shouldForwardProp: (prop) => prop !== "direction",
})<Direction>`
  position: relative;
  top: 50%;
  transition: all ${animation.fast};
  fill: ${colors.secondary};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
 
  transform: ${({ direction }) =>
    direction === "next"
      ? "translate(18px, -50%) scaleX(-1);"
      : "translate(18px,-50%);"}

  a.active:hover &,
  a.active:focus-visible & {
    fill: ${colors.tertiary};

    transform: ${({ direction }) =>
      direction === "next"
        ? "translate(36px, -50%) scaleX(-1);"
        : "translate(0,-50%);"}
  }
`;
export default SVGWrapper;
