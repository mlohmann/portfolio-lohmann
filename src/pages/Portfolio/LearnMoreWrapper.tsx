import styled from "styled-components";
import { colors, effects } from "@/style";

const { activeHover, beforeAfter, focus } = effects;

/** Aligns the Learn More route link and its adjacent arrow decoration. */
const LearnMoreWrapper = styled.div`
  display: flex;
  align-items: center;

  ${focus}

  &:after {
    width: 57px;
    border-bottom: 1px ${colors.highlight} solid;
    bottom: -5px;

    ${beforeAfter}
  }

  &:hover:after {
    ${activeHover}
  }
`;

export default LearnMoreWrapper;
