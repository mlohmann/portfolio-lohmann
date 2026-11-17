import { Link } from "@tanstack/react-router";
import styled from "styled-components";

import { colors, effects, sizes, typography } from "@/style";
import { H4Style } from "../Typography";

const { beforeAfter, activeHover, focus } = effects;
const { sizing, font, weight } = typography;

/** Styled route link with active, hover, and keyboard-focus treatments. */
const NavLink = styled(Link)`
  font-family: ${font.nav};
  font-size: ${sizing.nav};
  font-weight: ${weight.bold};
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
      left: ${sizes.markerDash.desktop.offset}px;
      height: ${sizes.markerDash.desktop.height}px;
      width: ${sizes.markerDash.desktop.width}px;
      top: 11px;
      background: ${colors.white};
      ${beforeAfter}
    }

    &:after {
      bottom: -2px;
      left: 0;
      width: 100%;
      height: ${sizes.markerDash.desktop.height}px;
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
        left: ${sizes.markerDash.touch.offset}px;
        height: ${sizes.markerDash.touch.height}px;
        width: ${sizes.markerDash.touch.width}px;
      }

      &:before,
      &:after {
        height: ${sizes.markerDash.touch.height}px;
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
