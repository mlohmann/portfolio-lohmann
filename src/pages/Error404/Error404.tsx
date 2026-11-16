import { Link } from "@tanstack/react-router";
import styled from "styled-components";

import { ContentWrapper, Paragraph, Spacer } from "@/components";
import { ProjectTitle } from "../Project/ProjectTypography";
import { colors, effects, sizes, typography } from "@/style";
import Seo from "@/seo";

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-family: ${typography.font.nav};
  font-size: ${typography.sizing.link};
  color: ${colors.white};
  background: ${colors.actionBackground};
  padding: ${sizes.spacing.xs}px ${sizes.spacing.md}px;
  text-decoration: none;
  cursor: pointer;
  margin-right: ${sizes.spacing.sm}px;
  ${effects.focus}
`;

/** Fallback page shown when the router cannot match the requested path. */
const Error404 = () => (
  <ContentWrapper>
    <Seo title="Page Not Found" path="/404" />
    <Spacer size="xl" />
    <ProjectTitle tabIndex={-1}>Error404</ProjectTitle>
    <Paragraph>
      The page you are looking for does not exist or may have been moved.
    </Paragraph>
    <Spacer size="md" />
    <HomeLink to="/">Return Home</HomeLink>
    <HomeLink to="/portfolio">View Portfolio</HomeLink>
    <Spacer size="xxl" />
  </ContentWrapper>
);

export default Error404;
