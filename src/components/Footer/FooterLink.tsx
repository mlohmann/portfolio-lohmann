import styled from "styled-components";
import { colors, animation } from "@/style";

/** Shared focusable link styling for footer social destinations. */
const FooterLink = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
  padding: 2px;
  transition: box-shadow ${animation.focus} ${animation.ease.standard};

  &:focus-visible {
    outline: none;
    border-color: transparent;
    box-shadow: ${colors.white} 0 0 0 4px;
  }
`;

export { FooterLink };
