import { AnimatedOnScroll } from "@/components";

import HorizontalSpacer from "./HorizontalSpacer";

/** Viewport-aware wrapper that positions the portfolio preview divider. */
const HorizontalSpacerWrapper = () => (
  <AnimatedOnScroll animationIn="fadeInScaleX">
    <HorizontalSpacer />
  </AnimatedOnScroll>
);

export default HorizontalSpacerWrapper;
