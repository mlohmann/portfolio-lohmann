import styled from "styled-components";
import type { SVGProps } from "react";
import { animation, colors } from "@/style";

const ArrowSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  width: 22px;
  height: 10px;
  overflow: visible;
  transition: transform ${animation.fast} ${animation.ease.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  line,
  polyline {
    stroke: ${colors.white};
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

/** Crisp, scale-independent right-pointing arrow for Learn More links. */
const ArrowRight = styled(({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <ArrowSvg
    className={className}
    viewBox="0 0 22 10"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <line x1="0" y1="5" x2="20" y2="5" />
    <polyline points="15,1 20,5 15,9" />
  </ArrowSvg>
))``;

export default ArrowRight;
