import { memo } from "react";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";

import { imageUrl } from "@/data/images";
import config from "@/data/config";
import type { LayoutType } from "@/types";
import {
  AnimatedOnScroll,
  Column,
  Spacer,
  ColumnAlignEnd,
  RowFullHeight,
  HideTouch,
  HideDesktop,
  FullWidth,
  LazyImage,
} from "@/components";
import type { ProjectType } from "../Project";
import { ProjectDescription } from "../Project/ProjectTypography";
import { ProjectTitle, ProjectHeading } from "./PortfolioTypography";
import LearnMore from "./LearnMore";
import PreviewRow from "./PreviewRow";
import ImageWrapper from "@/components/ImageWrapper";
import HorizontalSpacerWrapper from "./HorizontalSpacerWrapper";

const PreviewImageLink = styled(Link)`
  display: block;
`;

/** Optional card position and description-side selection for a portfolio preview. */
type PreviewProps = ProjectType &
  LayoutType & {
    /** Zero-based card position controlling lead-image priority and divider visibility. */
    index?: number;
  };

/** Project card shared by the portfolio list, with responsive layout variants. */
const Preview = ({
  id,
  title,
  summary,
  preview,
  index = 0,
  displayLayout = "left",
}: PreviewProps) => {
  const projectLink = `/portfolio/project/${id}`;

  return (
    <PreviewRow displayLayout={displayLayout}>
      {/* Description and divider column; PreviewRow controls its visual side. */}
      <Column $largeDesktop={6} $desktop={6}>
        <RowFullHeight>
          <HideTouch>
            <Column $largeDesktop="1-6" $desktop="1-6" />
          </HideTouch>
          <ColumnAlignEnd $largeDesktop="1-6" $desktop="1-6">
            <FullWidth>
              {index > 0 ? (
                <HorizontalSpacerWrapper />
              ) : (
                <HideTouch>
                  <HorizontalSpacerWrapper />
                </HideTouch>
              )}
            </FullWidth>
          </ColumnAlignEnd>
          <Column $largeDesktop="4-6" $desktop="4-6">
            <AnimatedOnScroll animationIn="fadeInUpMedium">
              <>
                <HideDesktop>
                  <Spacer size="lg" />
                </HideDesktop>
                <ProjectHeading>
                  <ProjectTitle to={projectLink}>
                    {title}
                  </ProjectTitle>
                </ProjectHeading>
                <Spacer size="md" />
                <ProjectDescription>{summary}</ProjectDescription>
                <HideTouch>
                  <Spacer size="md" />
                  <LearnMore title={title} url={`/portfolio/project/${id}`} />
                </HideTouch>
                <HideDesktop>
                  <Spacer size="lg" />
                </HideDesktop>
              </>
            </AnimatedOnScroll>
          </Column>
        </RowFullHeight>
      </Column>
      {/* Artwork column; the first card loads eagerly as the lead portfolio image. */}
      <Column $largeDesktop={6} $desktop={6}>
        <AnimatedOnScroll animationIn="fadeInUpMedium">
          <ImageWrapper>
            <PreviewImageLink to={projectLink}>
              <LazyImage
                src={imageUrl(preview.src, config.screenPath)}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                alt={title}
                width={preview.width}
                height={preview.height}
              />
            </PreviewImageLink>
          </ImageWrapper>
          <HideDesktop>
            <Spacer size="md" />
            <LearnMore
              title={title}
              url={`/portfolio/project/${id}`}
              size="lg"
            />
          </HideDesktop>
        </AnimatedOnScroll>
      </Column>
    </PreviewRow>
  );
};

export default memo(Preview);

export type { LayoutType };
