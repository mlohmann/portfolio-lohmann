import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import { animation, colors, effects, sizes } from "@/style";
import { CloseX } from "@/icons";

const { focus } = effects;

/** Accessible close button that preserves native button behavior and ref access. */
const StyledClose = styled.button`
  position: absolute;
  right: 1.25em;
  top: 1.25em;
  width: 1.75em;
  height: 1.75em;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transform-origin: center center;
  transition: all ${animation.transition};

  svg {
    width: 100%;
    height: 100%;
    transform-origin: center center;
  }

  path {
    fill: ${colors.white};
    transition: all ${animation.transition};
  }

  &:hover {
    transform: scale(1.08);
    path {
      fill: ${colors.tertiary};
    }
  }

  ${focus}

  ${sizes.query.touch} {
    right: 0;
    top: 0;
    margin: ${sizes.navControl.margin};
    width: ${sizes.navControl.width};
    height: ${sizes.navControl.height};
    font-size: ${sizes.navControl.fontSize};

    svg {
      width: 1.25em;
      height: 1.25em;
    }
  }

  ${sizes.query.mobile} {
    margin: ${sizes.navControl.margin} ${sizes.navControl.marginMobile}
      ${sizes.navControl.margin} 0;
  }
`;

/** Close-menu button that forwards its ref for dialog focus management. */
const MenuCloseX = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <StyledClose type="button" {...props} ref={ref}>
    <CloseX aria-hidden="true" focusable="false" />
  </StyledClose>
));
MenuCloseX.displayName = "MenuCloseX";

export { MenuCloseX };
