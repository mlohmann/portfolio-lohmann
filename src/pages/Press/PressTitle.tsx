import styled from "styled-components";

import { H2, H4Style } from "@/components";
import { colors } from "@/style";

/** Heading treatment for an individual press article section. */
const PressTitle = styled(H2)`
  ${H4Style}
  color: ${colors.textHighlight};
  text-transform: uppercase;
`;

export default PressTitle;
