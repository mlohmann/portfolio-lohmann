import styled from "styled-components";
import { typography, sizes } from "@/style";

/** Fixed mobile site label aligned with the menu control; it adds no heading level. */
const MobileTitle = styled.div`
  position: fixed;
  z-index: ${sizes.zIndex.nav};
  top: 0;
  left: 0;
  margin: ${sizes.navControl.margin};
  padding: 0;
  font-size: ${sizes.navControl.fontSize};
  height: ${sizes.navControl.height};
  max-width: calc(100% - ${sizes.navControl.maxTitleOffset}px);
  pointer-events: none;
  display: flex;
  align-items: center;

  ${sizes.query.desktop} {
    display: none;
  }

  ${sizes.query.mobile} {
    margin: ${sizes.navControl.margin} 0 ${sizes.navControl.margin}
      ${sizes.navControl.marginMobile};
    max-width: calc(100% - ${sizes.navControl.maxTitleOffsetMobile}px);
  }

  > span {
    display: flex;
    align-items: center;
    height: 100%;
  }

  p {
    margin: 0;
    font-size: clamp(${typography.sizing.h5}, 8vw, ${typography.sizing.h4});
    line-height: 1;
    white-space: nowrap;
  }
`;

export { MobileTitle };
