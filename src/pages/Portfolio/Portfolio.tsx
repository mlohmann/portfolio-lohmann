import { memo, useMemo } from "react";
import { useContent } from "@/hooks";
import Seo from "@/seo";
import config from "@/data/config";
import { ProjectType } from "@/pages/Project";
import Preview from "./Preview";

import {
  ContentWrapper,
  HideDesktop,
  HideMobile,
  Loading,
  OverflowHidden,
  Spacer,
  VisuallyHidden,
} from "@/components";

/** Lists projects, moving configured featured entries to the top. */
const Portfolio = () => {
  const { data, isLoading } = useContent<{ projects: ProjectType[] }>(
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
          <OverflowHidden>
            <Preview {...project} displayLayout={displayLayout} index={idx} />
          </OverflowHidden>
          <HideMobile>
            <Spacer size="xl" />
          </HideMobile>
        </div>
      );
    });
  }, [data]);

  if (isLoading || !data) {
    return <Loading />;
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
