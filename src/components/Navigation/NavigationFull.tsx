import styled, { css } from "styled-components";

import { animation, colors, sizes } from "@/style";

/** Off-canvas navigation surface; its visibility state is controlled by Navigation. */
const NavigationFull = styled.div
  .withConfig({
    shouldForwardProp: (prop) => prop !== "showmenu",
  })
  .attrs<{ showmenu?: boolean; inert?: string }>(({ showmenu }) => ({
    // React 18 forwards an empty string as the native boolean attribute.
    inert: showmenu ? undefined : "",
  }))`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${sizes.zIndex.drawer};
  width: ${sizes.drawerWidth}px;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  background: ${colors.almostBlack};
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;

  transform: translate3d(-100%, 0, 0);
  transition: transform ${animation.normal};
  transition-timing-function: ${animation.ease.drawer};

  ${sizes.query.touch} {
    width: 100%;
  }

  ${({ showmenu }) =>
    showmenu &&
    css`
      transform: translate3d(0, 0, 0);
      transition: transform ${animation.drawer};
      transition-timing-function: ${animation.ease.drawer};
    `}
`;

export default NavigationFull;
