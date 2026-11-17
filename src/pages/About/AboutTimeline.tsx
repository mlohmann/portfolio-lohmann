import styled from "styled-components";

import { sizes, colors } from "@/style";

/** Shared timeline rail positioning for work and personal history entries. */
const AboutTimeline = styled.div`
  width: 100%;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 6px;
    background-color: ${colors.white};
    top: 30px;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }

  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${colors.white};
    bottom: -10px;
    border-radius: 50%;
    left: 50%;
    margin-left: -10px;
  }

  ${sizes.query.touch} {
    &:before {
      left: 5px;
      margin-left: 0;
    }
    &:after {
      left: 10px;
      width: 16px;
      height: 16px;
    }
  }
`;

export default AboutTimeline;
