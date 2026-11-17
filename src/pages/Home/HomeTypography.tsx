import { Link } from "@tanstack/react-router";
import styled, { css } from "styled-components";

import { animation, colors, typography, effects, sizes } from "@/style";
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
    transition: clip-path ${animation.fast} ${animation.ease.standard};
  }

  &:hover span::after,
  &:focus-visible span::after {
    clip-path: inset(-0.2em 0 -0.3em 0);
    transition-duration: ${animation.slow};
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
  font-weight: ${typography.weight.regular};
`;

/** Homepage introduction copy; callers choose heading semantics with the as prop. */
const IntroBody = styled.p`
  ${introCommonStyles}
  color: ${colors.textPrimary};
  font-size: clamp(${typography.sizing.h5}, 4.7vw, ${typography.sizing.h3});

  &:focus {
    outline: none;
  }
`;

/** Inline route link that retains the introduction text sizing. */
const IntroLink = styled(Link)`
  font: inherit;
  font-style: italic;
  color: ${colors.white};
  text-decoration: underline;
  text-decoration-color: ${colors.textHighlight};
  text-underline-offset: 0.15em;

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

/** Supporting prose stays subordinate to the introduction and main action. */
const IntroSupport = styled.p`
  font-family: ${typography.font.intro};
  font-size: clamp(${typography.sizing.p}, 2.5vw, 2rem);
  line-height: 1.5;
  color: ${colors.white};
  max-width: 65ch;
`;

/** Inline links and dividers wrap naturally with the available width. */
const HomeActions = styled.div`
  line-height: 1.8;
`;

export {
  IntroBody,
  IntroLink,
  IntroCTA,
  LinkedInCTA,
  NoWrap,
  IntroSupport,
  HomeActions,
};
