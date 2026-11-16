import { css } from "styled-components";

import colors from "./colors";
import animation from "./animation";

/** Underline transition state used by interactive links. */
const activeHover = css`
  opacity: 1;
  transform: scaleX(1);
  transform-origin: 0 50%;
  transition:
    transform ${animation.transition} ${animation.ease.standard},
    opacity ${animation.shortTransition} linear;
`;

/** Initial pseudo-element styling for the animated underline effect. */
const beforeAfter = css`
  content: " ";
  position: absolute;
  opacity: 0;
  transform: scale3d(0.001, 1, 1);
  transform-origin: 100% 50%;
  transition:
    transform ${animation.transition} ${animation.ease.inOut},
    opacity ${animation.shortTransition} ${animation.normal} linear;
`;

/** Retains focus indication when forced colors suppress box shadows. */
const forcedColorsFocus = `
  @media (forced-colors: active) {
    &:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 4px;
    }
  }
`;

/** Consistent visible keyboard focus indicator for interactive controls. */
const focus = `
  outline: none;
  transition: box-shadow ${animation.focus} ${animation.ease.standard};

  &:focus-visible {
    outline-style: none;  
    border-color: transparent;
    box-shadow: ${colors.highlight} 0px 0px 0px 4px;
  }

  ${forcedColorsFocus}
`;

export { activeHover, beforeAfter, focus, forcedColorsFocus };
