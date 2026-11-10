import styled from "styled-components";

import { colors, typography } from "@/style";

/** External article link styling used in the press listing. */
const PressLink = styled.a`
  font-family: ${typography.font.body};
  font-size: ${typography.sizing.h5};
  color: ${colors.textHighlight};
  margin-top: -2px;
  margin-bottom: -2px;

  &:visited {
    color: ${colors.textHighlight};
  }
`;

export { PressLink };
