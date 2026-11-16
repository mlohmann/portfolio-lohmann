import styled from "styled-components";

import colors from "@/style/colors";
import { sizes } from "@/style";
import type { LayoutType } from "@/types";

/** Timeline entry content panel with layout-dependent marker spacing. */
const AboutCardWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "displayLayout",
})<LayoutType>`
  color: ${colors.textSecondary};
  background: ${colors.backgroundSecondary};
  padding: ${sizes.spacing.md}px;

  &:before {
    content: " ";
    height: 0;
    position: absolute;
    top: 24px;
    width: 0;
    border: medium solid ${colors.white};
  }

  ${sizes.query.desktop} {
    width: calc(100% - 23px);

    ${({ displayLayout = "left" }) => {
      const isLeft = displayLayout === "left";
      const leftValue = isLeft ? "0" : "23px";

      return `
        left: ${leftValue};

        &:before {
          left: ${isLeft ? "initial" : "-10px"};
          right: ${isLeft ? "-10px" : "initial"};
          border-width: ${isLeft ? "10px 0 10px 10px" : "10px 10px 10px 0"};
          border-color: ${
            isLeft
              ? `transparent transparent transparent ${colors.white}`
              : `transparent ${colors.white} transparent transparent`
          };
        }
      `;
    }}
  }

  ${sizes.query.touch} {
    margin-left: 30px;

    &:before {
      left: -10px;
      right: initial;
      border-width: 10px 10px 10px 0;
      border-color: transparent ${colors.white} transparent transparent;
    }
  }
`;

export default AboutCardWrapper;
