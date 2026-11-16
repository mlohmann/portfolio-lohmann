import styled from "styled-components";

import { animation, colors } from "@/style";

/** Image presentation whose opacity reflects the parent's load state. */
const StyledLazyImage = styled.img<{ $loaded: boolean }>`
  display: block;
  transition: opacity ${animation.transition} ${animation.ease.inOut};
  width: 100%;
  max-width: 100%;
  height: auto;
  color: ${colors.textPrimary};
  opacity: ${({ $loaded }) => ($loaded ? "1" : "0")};
`;

export default StyledLazyImage;
