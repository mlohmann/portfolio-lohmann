import styled, { css } from "styled-components";

/** Animated list of primary route links inside the navigation surface. */
const NavList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== "showmenu",
})<{ showmenu?: boolean }>`
  height: 100%;
  transform: translate3d(0, 100%, 0);
  transition: transform 0s 0.4s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

  ${({ showmenu }) =>
    showmenu &&
    css`
      transform: translate3d(0, 0, 0);
      transition: transform 0.8s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    `}
`;
export default NavList;
