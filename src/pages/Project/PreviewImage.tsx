import styled, { css } from "styled-components";

import type { Direction } from "@/types";
import { animation, sizes } from "@/style";

/** Thumbnail treatment for directional project navigation. */
const PreviewImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "direction",
})<Direction>`
  position: absolute;
  top: 0;
  width: ${sizes.projectNavThumb}px;
  height: ${sizes.projectNavThumb}px;
  transition: transform ${animation.fast};
  backface-visibility: hidden;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${({ direction }) => {
    const rotateValue = direction === "next" ? "-90deg" : "90deg";
    const transformOriginValue = direction === "next" ? "100% 50%" : "0% 50%";

    return css`
      right: ${direction === "next" ? "100%" : "auto"};
      left: ${direction === "prev" ? "100%" : "auto"};
      transform: rotateY(${rotateValue});
      transform-origin: ${transformOriginValue};

      a.active:hover &,
      a.active:focus-visible & {
        transform: rotateY(0deg);
      }
    `;
  }};
`;

export default PreviewImage;
