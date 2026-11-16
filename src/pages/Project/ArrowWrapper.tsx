import styled, { css, keyframes } from "styled-components";

import type { Direction } from "@/types";
import { animation } from "@/style";

/** Builds entrance keyframes that slide a project preview in from its viewport edge. */
const fadeInAnimation = (translateX: string) => keyframes`
  from {
    opacity: 0;
    transform: translateX(${translateX});
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

/** Animated entry surface for the previous/next project preview. */
const ArrowWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "direction",
})<Direction & { $active: boolean }>`
  opacity: 1;

  ${({ direction, $active }) => {
    if ($active) return;
    const translateX = direction === "next" ? "100%" : "-100%";
    return css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${fadeInAnimation(translateX)} ${animation.normal} ease-in 3s
          both;
      }
    `;
  }};
`;

export default ArrowWrapper;
