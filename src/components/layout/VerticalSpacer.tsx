import styled from "styled-components";
import { colors, sizes } from "@/style";

/** Small inline divider used between adjacent call-to-action links. */
const VerticalSpacer = styled.div`
  display: inline-block;
  background: ${colors.white};
  width: 2px;
  height: 22px;
  margin: 0 10px;

  ${sizes.query.mobile} {
    height: 14px;
    margin: 0 8px;
    vertical-align: middle;
  }
`;

export default VerticalSpacer;
