import styled from "styled-components";

/** Horizontal rule with an optional opacity override. */
const Divider = styled.hr<{ opacity?: number }>`
  opacity: ${({ opacity }) => (opacity === undefined ? 1 : opacity)};
`;

export default Divider;
