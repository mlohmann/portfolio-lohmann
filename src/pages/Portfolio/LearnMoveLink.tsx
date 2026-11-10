import styled from "styled-components";
import { Link } from "@tanstack/react-router";
import { SmallStyle } from "@/components";
import { colors, effects } from "@/style";
import { DisplaySizeType } from "@/style/sizes";

/** Styled project-detail link with optional responsive text sizing. */
const LearnMoveLink = styled(Link)<DisplaySizeType>`
  ${SmallStyle}
  color: ${colors.secondary};
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;

  ${({ size }: DisplaySizeType) => size === "lg" && `font-size: 1.2rem;`};

  ${effects.focus}
`;

export default LearnMoveLink;
