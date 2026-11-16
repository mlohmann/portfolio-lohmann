import styled from "styled-components";
import { Link } from "@tanstack/react-router";

import type { Direction } from "@/types";

/** Project-detail link with interaction styles that depend on its direction. */
const LinkWrapper = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "direction",
})<Direction>`
  display: block;
  perspective: 1000px;

  perspective-origin: ${({ direction }) =>
    direction === "next" ? "0% 50%" : "100% 50%"};
`;
export default LinkWrapper;
