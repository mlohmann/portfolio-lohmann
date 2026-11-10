import { sizes } from "@/style";
import styled from "styled-components";

/** Hides its children at mobile widths. */
const HideMobile = styled.span`
  ${sizes.toggle.hideMobile}
`;

/** Hides its children below the desktop breakpoint. */
const HideTouch = styled.span`
  ${sizes.toggle.hideTouch}
`;

/** Hides its children at desktop widths. */
const HideDesktop = styled.span`
  ${sizes.toggle.hideDesktop}
`;

export { HideMobile, HideTouch, HideDesktop };
