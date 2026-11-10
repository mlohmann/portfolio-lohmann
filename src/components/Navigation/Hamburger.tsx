import styled from "styled-components";
import { animation, colors, effects, sizes } from "@/style";

const { focus } = effects;

/** Menu-opening control with consistent hover and keyboard-focus states. */
const Hamburger = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: ${sizes.zIndex.nav};
  margin: ${sizes.navControl.margin};
  padding: 0;
  width: ${sizes.navControl.width};
  height: ${sizes.navControl.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: ${sizes.navControl.fontSize};
  color: transparent;
  background: transparent;
  left: ${sizes.navControl.desktopOffset}px;
  top: ${sizes.navControl.desktopOffset}px;
  transform-origin: center center;
  transition: all ${animation.transition};

  ${sizes.query.touch} {
    left: initial;
    right: 0;
    top: 0;
  }

  ${sizes.query.mobile} {
    margin: ${sizes.navControl.margin} ${sizes.navControl.marginMobile}
      ${sizes.navControl.margin} 0;
  }

  path {
    fill: ${colors.white};
    transition: all ${animation.transition};
  }

  &:hover {
    transform: scale(1.05);
    path {
      fill: ${colors.tertiary};
    }
  }

  ${focus}

  svg {
    width: 100%;
    height: 100%;
    transform-origin: center center;
  }
`;

export default Hamburger;
