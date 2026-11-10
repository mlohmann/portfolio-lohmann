import styled from "styled-components";
import { colors } from "@/style";

/** Decorative right-pointing arrow adjacent to a Learn More link. */
const ArrowRight = styled.div`
  background: ${colors.white};
  height: 1px;
  width: 20px;
  margin-left: 5px;
  cursor: pointer;
  position: relative;

  &:before,
  &:after {
    content: "";
    background: ${colors.white};
    position: absolute;
    height: 1px;
    width: 3px;
    right: 0;
  }

  &:before {
    bottom: -2px;
    transform: rotate(-45deg);
  }

  &:after {
    top: -2px;
    transform: rotate(45deg);
  }
`;

export default ArrowRight;
