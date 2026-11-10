import styled from "styled-components";

import { colors } from "@/style";
import { H4Style, ParagraphStyle } from "@/components";

/** Primary heading styling for the About page introduction. */
const IntroTitle = styled.h1`
  ${H4Style}
  color: ${colors.textHighlight};
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`;

/** Compact body typography used inside timeline cards. */
const AboutCardParagraph = styled.p`
  ${ParagraphStyle}
  color: ${colors.textSecondary};
`;

export { AboutCardParagraph, IntroTitle };
