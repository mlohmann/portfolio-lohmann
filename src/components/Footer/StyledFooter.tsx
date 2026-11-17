import styled from "styled-components";

import { sizes, colors } from "@/style";

/** Footer background region sized to match the page's reserved footer space. */
const StyledFooter = styled.footer`
  height: ${sizes.footer}px;
  margin-top: -${sizes.footer}px;
  width: 100%;
  background: ${colors.footerBackground};
`;
export default StyledFooter;
