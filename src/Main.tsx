import { FC, ReactNode } from "react";
import styled, { css } from "styled-components";

import { sizes, colors, animation } from "@/style";
import { useAppStoreContext } from "@/hooks/useAppStoreContext";

/** Main-content surface whose pseudo-element dims the page while the menu is open. */
const StyledMain = styled.main.withConfig({
  shouldForwardProp: (prop) => prop !== "showmenu",
})<{ showmenu?: boolean }>`
  min-height: 100vh;

  &:before {
    content: "";
    width: 0;
    height: 0;
    background: ${colors.menuScrim};
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    transition: opacity ${animation.transition} linear;

    ${({ showmenu }) =>
      showmenu &&
      css`
        width: 100%;
        height: 100%;
        opacity: 1;
      `}
  }

  ${sizes.query.touch} {
    overflow-x: hidden;
  }

  &:focus {
    outline: none;
  }
`;

/** Children and optional landmark ID for the focusable main-content container. */
interface MainProps {
  children?: ReactNode;
  id?: string;
}

/** Main landmark with the shared menu scrim state applied to its backdrop. */
const Main: FC<MainProps> = ({ children, id }) => {
  const { showmenu } = useAppStoreContext();
  return (
    <StyledMain showmenu={showmenu || undefined} id={id} tabIndex={-1}>
      {children}
    </StyledMain>
  );
};

export default Main;
