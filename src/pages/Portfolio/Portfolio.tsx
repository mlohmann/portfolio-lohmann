import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { memo, useMemo } from "react";

import { colors, effects, sizes, typography } from "@/style";
import { useContent } from "@/hooks";
import Seo from "@/seo";
import config from "@/data/config";
import type { ProjectType } from "../Project";
import Preview from "./Preview";
import {
  ContentWrapper,
  HideDesktop,
  HideMobile,
  Loading,
  Spacer,
  VisuallyHidden,
  H1,
  Paragraph,
} from "@/components";

const Status = styled.section`
  padding-block: ${sizes.spacing.xl}px;
  color: ${colors.white};
  min-height: 70vh;
  h1 {
    font-size: ${typography.sizing.h4};
    white-space: normal;
    margin: 0 0 ${sizes.spacing.md}px;
  }
  p {
    margin: 0 0 ${sizes.spacing.md}px;
  }
  a {
    color: ${colors.white};
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
`;

const RetryButton = styled.button`
  font-family: ${typography.font.nav};
  font-size: ${typography.sizing.link};
  color: ${colors.white};
  background: ${colors.actionBackground};
  border: 0;
  min-height: 44px;
  padding: ${sizes.spacing.xs}px ${sizes.spacing.md}px;
  margin-right: ${sizes.spacing.sm}px;
  cursor: pointer;
  ${effects.focus}
`;

/** Lists projects, moving configured featured entries to the top. */
const Portfolio = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useContent<{ projects: ProjectType[] }>(
    "projects",
  );

  const items = useMemo(() => {
    if (!data?.projects) return null;

    // Preserve the query cache order while applying the curated featured order.
    const projects = [...data.projects].sort((a, b) => {
      const aFeatured = config.featuredProjectIds.indexOf(a.id);
      const bFeatured = config.featuredProjectIds.indexOf(b.id);

      if (aFeatured === -1 && bFeatured === -1) return 0;
      if (aFeatured === -1) return 1;
      if (bFeatured === -1) return -1;
      return aFeatured - bFeatured;
    });

    return projects.map((project: ProjectType, idx: number) => {
      const displayLayout = idx % 2 === 0 ? "right" : "left";

      return (
        <div key={project.id || project.title}>
          <HideDesktop>
            <Spacer size="xl" />
          </HideDesktop>
          <Preview {...project} displayLayout={displayLayout} index={idx} />
          <HideMobile>
            <Spacer size="xl" />
          </HideMobile>
        </div>
      );
    });
  }, [data]);

  if (
    error ||
    (!isLoading && !data?.projects) ||
    data?.projects?.length === 0
  ) {
    const failed = Boolean(error || !data?.projects);
    return (
      <ContentWrapper>
        <Seo title="Portfolio" path="/portfolio" />
        <Status aria-labelledby="portfolio-status-title">
          <H1 id="portfolio-status-title" tabIndex={-1}>
            {failed ? "Work could not be loaded" : "No projects to show yet"}
          </H1>
          <Paragraph role={failed ? "alert" : "status"}>
            {failed
              ? "Please try again, or connect with me on LinkedIn."
              : "You can connect with me on LinkedIn to learn more about my work."}
          </Paragraph>
          {failed && (
            <RetryButton
              onClick={() => {
                void queryClient.resetQueries({
                  queryKey: ["json", "projects"],
                  exact: true,
                });
              }}
            >
              Try again
            </RetryButton>
          )}
          <a
            href={config.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
        </Status>
      </ContentWrapper>
    );
  }

  if (isLoading || !data) {
    return (
      <>
        <Seo
          title="Portfolio"
          description="Explore selected interactive websites and digital experiences created by Matt Lohmann."
          path="/portfolio"
        />
        <Loading />
      </>
    );
  }

  return (
    <ContentWrapper>
      <Seo
        title="Portfolio"
        description="Explore selected interactive websites and digital experiences created by Matt Lohmann."
        path="/portfolio"
      />
      <VisuallyHidden as="h1" tabIndex={-1}>
        Portfolio
      </VisuallyHidden>
      {items}
      <HideDesktop>
        <Spacer size="xxl" />
      </HideDesktop>
    </ContentWrapper>
  );
};

export default memo(Portfolio);
