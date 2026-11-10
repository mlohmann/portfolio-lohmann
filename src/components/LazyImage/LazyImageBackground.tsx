import styled from "styled-components";
import { colors } from "@/style";

/** Dark placeholder behind lazy images while their content is loading. */
const LazyImageBackground = styled.div`
  background-color: ${colors.almostBlack};
`;

export default LazyImageBackground;
