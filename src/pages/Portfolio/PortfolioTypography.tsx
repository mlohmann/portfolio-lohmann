import { Link } from "@tanstack/react-router";
import styled from "styled-components";

import { H4Style } from "@/components";
import { colors, typography } from "@/style";

/** Portfolio card title that links to the corresponding project detail route. */
const ProjectTitle = styled(Link)`
  ${H4Style}
  color: ${colors.textHighlight};
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  font-weight: ${typography.weight.semibold};
  overflow-wrap: break-word;
  word-break: break-word;
`;

/** Level-two heading container for portfolio project cards. */
const ProjectHeading = styled.h2`
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
`;

export { ProjectTitle, ProjectHeading };
