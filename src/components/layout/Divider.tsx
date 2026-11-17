import styled from "styled-components";

/** Horizontal rule with an optional opacity override. */
const Divider = styled.hr.withConfig({
  shouldForwardProp: (prop) => prop !== "opacity",
})<{ opacity?: number }>`
  opacity: ${({ opacity }) => (opacity === undefined ? 1 : opacity)};
`;

export default Divider;
