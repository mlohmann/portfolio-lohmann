import styled from "styled-components";

import { sizes } from "@/style";

/** Hides its children at mobile widths. */
const HideMobile = styled.div`
  ${sizes.toggle.hideMobile}
`;

/** Hides its children below the desktop breakpoint. */
const HideTouch = styled.div`
  ${sizes.toggle.hideTouch}
`;

/** Hides its children at desktop widths. */
const HideDesktop = styled.div`
  ${sizes.toggle.hideDesktop}
`;

export { HideMobile, HideTouch, HideDesktop };
