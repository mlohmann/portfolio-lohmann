import styled, { css, keyframes } from "styled-components";
import { Direction } from "@/types";

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
const ArrowWrapper = styled.div<Direction>`
  ${({ direction }) => {
    const translateX = direction === "next" ? "100%" : "-100%";
    return css`
      animation: ${fadeInAnimation(translateX)} ease-in 0.4s;
    `;
  }};
  opacity: 0;
  animation-fill-mode: forwards;
  animation-delay: 3s;
`;

export default ArrowWrapper;
