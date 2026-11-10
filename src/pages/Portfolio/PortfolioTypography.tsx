import { H4Style } from "@/components";
import { Link } from "@tanstack/react-router";
import { colors } from "@/style";
import styled from "styled-components";

/** Portfolio card title that links to the corresponding project detail route. */
const ProjectTitle = styled(Link)`
  ${H4Style}
  color: ${colors.textHighlight};
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 600;
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
