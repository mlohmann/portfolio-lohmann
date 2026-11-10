import { Link } from "@tanstack/react-router";
import styled, { css } from "styled-components";

import { colors, typography, effects, sizes } from "@/style";
import { IntroStyle } from "@/components";

const { focus } = effects;

/** Shared underline reveal for nested link text, including keyboard-focus states. */
const spanEffects = css`
  span {
    display: inline-block;
    position: relative;
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1;
  }

  span::after {
    content: attr(data-text) / "";
    position: absolute;
    inset: 0;
    color: transparent;
    pointer-events: none;
    text-decoration-line: underline;
    text-decoration-color: ${colors.textHighlight};
    text-decoration-thickness: 3px;
    text-underline-offset: 0.06em;
    text-decoration-skip-ink: auto;
    clip-path: inset(-0.2em 100% -0.3em 0);
    transition: clip-path 0.3s cubic-bezier(0.2, 1, 0.3, 1);
  }

  &:hover span::after,
  &:focus-visible span::after {
    clip-path: inset(-0.2em 0 -0.3em 0);
    transition-duration: 0.7s;
  }

  @media (prefers-reduced-motion: reduce) {
    span::after {
      transition: none;
    }
  }
`;

/** Introductory type treatment shared by homepage prose and inline links. */
const introCommonStyles = css`
  ${IntroStyle}
  font-weight: 100;
`;

/** Homepage introduction copy; callers choose heading semantics with the as prop. */
const IntroBody = styled.p`
  ${introCommonStyles}
  color: ${colors.textPrimary};

  &:focus {
    outline: none;
  }
`;

/** Inline route link that retains the introduction text sizing. */
const IntroLink = styled(Link)`
  ${introCommonStyles}
  font-style: italic;
  color: ${colors.textHighlight};
  text-decoration: none;

  ${spanEffects}

  ${focus}
`;

/** Shared responsive styling for homepage call-to-action links. */
const introCTAStyles = css`
  font-family: ${typography.font.nav};
  font-size: ${typography.sizing.h5};
  color: ${colors.textHighlight};
  text-decoration: none;
  text-transform: uppercase;
  margin-top: -${sizes.spacing.xs}px;
  margin-bottom: -4px;
  display: inline-block;

  ${spanEffects}

  ${sizes.query.mobile} {
    font-size: ${typography.sizing.h6};
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  ${focus}
`;

/** External contact link using the shared call-to-action treatment. */
const LinkedInCTA = styled.a`
  ${introCTAStyles}
`;

/** Internal route link using the shared call-to-action treatment. */
const IntroCTA = styled(Link)`
  ${introCTAStyles}
`;

/** Keeps short phrases together when surrounding introduction text wraps. */
const NoWrap = styled.span`
  white-space: nowrap;
`;

export { IntroBody, IntroLink, IntroCTA, LinkedInCTA, NoWrap };
