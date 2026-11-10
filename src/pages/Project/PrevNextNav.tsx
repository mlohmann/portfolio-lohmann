import styled from "styled-components";
import { sizes } from "@/style";

/** Fixed desktop layer that anchors previous and next project previews. */
const PrevNextNav = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  margin-top: -${sizes.projectNavThumb / 2}px;
  width: 100%;
  pointer-events: none;
`;
export default PrevNextNav;
