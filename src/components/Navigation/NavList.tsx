import styled, { css } from "styled-components";

import { animation } from "@/style";

/** Animated list of primary route links inside the navigation surface. */
const NavList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== "showmenu",
})<{ showmenu?: boolean }>`
  height: 100%;
  transform: translate3d(0, 100%, 0);
  transition: transform 0s ${animation.normal};
  transition-timing-function: ${animation.ease.drawer};

  ${({ showmenu }) =>
    showmenu &&
    css`
      transform: translate3d(0, 0, 0);
      transition: transform ${animation.drawer};
      transition-timing-function: ${animation.ease.drawer};
    `}
`;
export default NavList;
