import { Link } from "@tanstack/react-router";
import styled from "styled-components";

import { colors, effects, sizes, typography } from "@/style";
import { H4Style } from "@/components/Typography";

const { beforeAfter, activeHover, focus } = effects;
const { sizing, font } = typography;

/** Styled route link with active, hover, and keyboard-focus treatments. */
const NavLink = styled(Link)`
  font-family: ${font.nav};
  font-size: ${sizing.nav};
  font-weight: 700;
  color: ${colors.textHighlight};
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  margin-top: -29px;
  margin-bottom: -16px;

  &[data-active] span:before {
    ${activeHover}
  }

  ${focus}

  span {
    position: relative;

    &:before {
      left: -20px;
      height: 3px;
      width: 10px;
      top: 11px;
      background: ${colors.white};
      ${beforeAfter}
    }

    &:after {
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${colors.textHighlight};
      z-index: -1;
      ${beforeAfter}
    }

    &:hover:after {
      ${activeHover}
    }

    ${sizes.query.touch} {
      font-size: ${sizing.mobile.nav};

      &:before {
        top: 16px;
        left: -34px;
        height: 6px;
        width: 23px;
      }

      &:before,
      &:after {
        height: 6px;
      }
    }
  }
  ${sizes.query.touch} {
    width: 100%;
  }
`;

/** Mobile site label with heading-sized styling and paragraph semantics. */
const MobileTitleText = styled.p`
  ${H4Style};
  margin: 0;
  color: ${colors.white};
  text-transform: uppercase;
`;

export { NavLink, MobileTitleText };
