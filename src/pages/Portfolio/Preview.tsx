import { imageUrl } from "@/data/images";
import { memo } from "react";
import { Link } from "@tanstack/react-router";

import {
  AnimatedOnScroll,
  Column,
  Spacer,
  ColumnAlignEnd,
  RowFullHeight,
  HideTouch,
  HideDesktop,
  FullWidth,
} from "@/components";

import { ProjectType } from "../Project";
import { ProjectDescription } from "@/pages/Project/ProjectTypography";
import {
  ProjectTitle,
  ProjectHeading,
} from "@/pages/Portfolio/PortfolioTypography";
import LearnMore from "./LearnMore";
import PreviewRow from "./PreviewRow";
import ImageWrapper from "@/components/ImageWrapper";
import LazyImage from "@/components/LazyImage/LazyImage";
import HorizontalSpacerWrapper from "./HorizontalSpacerWrapper";

/** Optional card position and description-side selection for a portfolio preview. */
export type LayoutType = {
  /** Zero-based card position controlling lead-image priority and divider visibility. */
  index?: number;
  /** Which side of the preview row contains the project description. */
  displayLayout?: "left" | "right";
};

/** Project card shared by the portfolio list, with responsive layout variants. */
const Preview = ({
  id,
  title,
  summary,
  preview,
  index = 0,
  displayLayout = "left",
}: ProjectType & LayoutType) => {
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
                  <ProjectTitle from="/" to={projectLink}>
                    {title}
                  </ProjectTitle>
                </ProjectHeading>
                <Spacer size="md" />
                <ProjectDescription>{summary}</ProjectDescription>
                <HideTouch>
                  <Spacer size="md" />
                  <LearnMore url={`/portfolio/project/${id}`} />
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
            <Link from="/" to={projectLink}>
              <LazyImage
                src={imageUrl(preview.src, "/screens/")}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                alt={title}
                width={preview.width}
                height={preview.height}
              />
            </Link>
          </ImageWrapper>
          <HideDesktop>
            <Spacer size="md" />
            <LearnMore url={`/portfolio/project/${id}`} size="lg" />
          </HideDesktop>
        </AnimatedOnScroll>
      </Column>
    </PreviewRow>
  );
};

export default memo(Preview);
