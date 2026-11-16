import styled, { css } from "styled-components";

import { colors, sizes } from "@/style";
import { H4Style, Paragraph, H6Style } from "@/components";

/** Semantic text styles for project descriptions, metadata, and external links. */
const commonStyles = css`
  margin-top: -2px;
  margin-bottom: -2px;
`;

/** External project address link. */
const ProjectLink = styled.a`
  color: ${colors.textPrimary};
  ${commonStyles}
  overflow-wrap: anywhere;
  word-break: break-word;

  &:visited {
    color: ${colors.textHighlight};
  }
`;

/** Project metadata text for work without an active external destination. */
const ProjectNonSite = styled.span`
  color: ${colors.fadedWhite};
  ${commonStyles}
  overflow-wrap: anywhere;
  word-break: break-word;
`;

const sharedTextStyles = css`
  color: ${colors.textPrimary};
`;

/** Project-detail page title. */
const ProjectTitle = styled.h1`
  ${H4Style}
  color: ${colors.textHighlight};
  text-transform: uppercase;
  margin-bottom: ${sizes.spacing.xs}px;
  overflow-wrap: break-word;
  word-break: break-word;

  &:focus {
    outline: none;
  }
`;

const sharedTextStylesWithPadding = css`
  ${sharedTextStyles}
  padding-right: 1em;
`;

/** Long-form project overview text. */
const ProjectDescription = styled(Paragraph)`
  ${sharedTextStylesWithPadding}
  overflow-wrap: break-word;
`;

/** Comma-separated responsibilities for the project. */
const ProjectDuties = styled(Paragraph)`
  ${H6Style}
  ${sharedTextStyles}
  overflow-wrap: break-word;
  word-break: break-word;
`;

/** Date or year value displayed in project metadata. */
const ProjectDate = styled(Paragraph)`
  ${H6Style}
  ${sharedTextStyles}
`;

export {
  ProjectTitle,
  ProjectLink,
  ProjectNonSite,
  ProjectDescription,
  ProjectDuties,
  ProjectDate,
};
