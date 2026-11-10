import styled from "styled-components";

/** Wrapping flex row; `pretty` opts into balanced text wrapping for its content. */
const Row = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "pretty",
})<{ pretty?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ pretty }) => pretty && `text-wrap: pretty;`}
`;

export default Row;
