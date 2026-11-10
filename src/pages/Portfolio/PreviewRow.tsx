import styled from "styled-components";
import { Row } from "@/components";
import { LayoutType } from "./Preview";
import { sizes } from "@/style";

/** Flex row that mirrors project previews according to their alternating layout. */
const PreviewRow = styled(Row).withConfig({
  shouldForwardProp: (prop) => prop !== "displayLayout",
})<LayoutType>`
  flex-direction: ${({ displayLayout = "left" }) =>
    displayLayout === "left" ? "row" : "row-reverse"};

  ${sizes.query.touch} {
    flex-direction: column;
  }
`;

export default PreviewRow;
