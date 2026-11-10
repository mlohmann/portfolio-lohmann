import styled, { css } from "styled-components";
import { sizes } from "@/style";

type Props = {
  showmenu?: boolean;
  index?: number;
};

/** Navigation item with index-based entrance offsets; layout props stay out of HTML. */
const NavItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "showmenu" && prop !== "index",
})<Props>`
  display: block;
  padding: 0.8em;
  transform: translate3d(0, 500px, 0);
  transition: transform 0s 0.4s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

  ${({ index = 0 }) => css`
    transform: translate3d(0, ${250 * index + 250}px, 0);
  `}

  ${({ showmenu }) =>
    showmenu &&
    css`
      transform: translate3d(0, 0, 0);
      transition: transform 0.8s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
      transition-duration: 1.2s;
    `}
    
  ${sizes.query.touch} {
    padding: 1.6em;
  }
`;

export default NavItem;
