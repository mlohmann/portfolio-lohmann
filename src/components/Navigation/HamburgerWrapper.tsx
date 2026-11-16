import styled from "styled-components";

import { colors, sizes } from "@/style";

/** Fixed header layer that provides contrast behind the touch menu button. */
const HamburgerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  ${sizes.query.touch} {
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: ${sizes.touchHeaderHeight}px;
      background-color: ${colors.primary};
      position: absolute;
      top: 0;
      left: 0;
      border-bottom: 1px solid ${colors.subtleBorder};
    }
  }
`;
export default HamburgerWrapper;
