import styled from "styled-components";

import { sizes } from "@/style";

type Size = keyof typeof sizes.spacing;
type SizingType = { size?: Size };

/** Responsive-layout spacer using one of the shared vertical spacing tokens. */
const Spacer = styled.div<SizingType>`
  height: ${({ size = "md" }: SizingType) => sizes?.spacing[size] + "px"};
  width: 100%;

  ${sizes.query.mobile} {
    height: ${({ size = "md" }: SizingType) =>
      (sizes?.spacingMobile?.[size] ?? sizes?.spacing[size]) + "px"};
  }
`;

export default Spacer;
