import styled from "styled-components";
import { Link } from "@tanstack/react-router";

import { SmallStyle } from "@/components";
import { colors, effects, sizes, typography } from "@/style";
import type { DisplaySizeType } from "@/style/sizes";
import ArrowRight from "./ArrowRight";

const { activeHover, beforeAfter, focus } = effects;

/** Styled project-detail link with optional responsive text sizing. */
const LearnMoreLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "size",
})<DisplaySizeType>`
  ${SmallStyle}
  color: ${colors.secondary};
  font-weight: ${typography.weight.semibold};
  text-decoration: none;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: ${sizes.spacing.xs}px;
  min-height: 44px;
  padding: 10px ${sizes.spacing.xs}px;
  margin: 0 0 0 -${sizes.spacing.xs}px;
  font-size: ${typography.sizing.link};
  position: relative;
  cursor: pointer;

  ${({ size }: DisplaySizeType) =>
    size === "lg" && `font-size: ${typography.sizing.p};`};

  span {
    position: relative;
    display: inline-block;

    &:after {
      width: 100%;
      border-bottom: 1px ${colors.highlight} solid;
      bottom: -3px;
      left: 0;
      ${beforeAfter}
    }
  }

  &:hover span:after,
  &:focus-visible span:after {
    ${activeHover}
  }

  &:hover ${ArrowRight},
  &:focus-visible ${ArrowRight} {
    transform: translateX(4px);
  }

  ${focus}
`;

export default LearnMoreLink;
