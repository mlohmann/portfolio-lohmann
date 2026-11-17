import styled from "styled-components";

import type { Direction } from "@/types";

/** Positions the previous/next thumbnail at the corresponding viewport edge. */
const PreviewWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "direction",
})<Direction>`
  position: absolute;
  pointer-events: auto;
  ${({ direction }) => (direction === "next" ? "right: 0;" : "left: 0;")}
`;
export default PreviewWrapper;
