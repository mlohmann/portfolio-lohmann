import styled from "styled-components";
import { sizes } from "@/style";

/** Unstyled horizontal list for social media icon links. */
const StyledIconWrappers = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    margin-left: ${sizes.footerIconSpacing}px;
  }
`;

export default StyledIconWrappers;
