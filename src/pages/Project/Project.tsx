import { memo, useMemo } from "react";
import { getRouteApi } from "@tanstack/react-router";

import { imageUrl } from "@/data/images";
import { useContent } from "@/hooks";
import config from "@/data/config";
import { AnimatedOnScroll } from "@/components";
import {
  Row,
  Column,
  ContentWrapper,
  Paragraph,
  Spacer,
  GrowOne,
  AdditionalInfo,
  Divider,
  HideDesktop,
  HideMobile,
  HideTouch,
  Loading,
  OverflowHidden,
  LazyImage,
} from "@/components";
import {
  ProjectLink,
  ProjectTitle,
  ProjectDuties,
  ProjectDate,
  ProjectNonSite,
} from "./ProjectTypography";
import ThumbPreview from "./ThumbPreview";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import Error404 from "../Error404";
import PrevNextNav from "./PrevNextNav";
import Seo from "@/seo";

/** Image metadata used by project preview and screenshot rendering. */
type Image = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
};

/**
 * Content contract shared by project-list entries and individual project pages.
 * Some presentation fields are optional at runtime because legacy records vary. */
type ProjectType = {
  /** Whether the external project destination is still active. */
  active?: boolean;
  /** Stable project identifier used in the detail route. */
  id: string;
  title: string;
  /** Long-form description displayed on the project detail page. */
  text: string;
  /** Short description displayed in portfolio cards. */
  summary: string;
  /** Artwork used by the portfolio listing card. */
  preview: Image;
  /** Compact artwork used by adjacent-project navigation. */
  thumbnail: Image;
  /** Ordered project screenshots; the first image is the lead visual. */
  images: Image[];
  duties: string[];
  /** One or more external launch URLs; may be empty for offline projects. */
  launchURL?: string | string[];
  subtitle: string;
  layout: string;
  modalId: string;
  date: string;
  alt: string;
  /** Project year; legacy records may omit this value at runtime. */
  projectDate: number;
  /** Optional category used to label non-website work. */
  projectType?: "website" | "kiosk" | "app";
  /** Client or organization associated with the work. */
  client: string;
  /** Legacy ordering metadata retained with project records. */
  rank: number;
};

const projectRouteApi = getRouteApi("/portfolio/project/$project");

/** Loads the selected project, supporting project data, and adjacent navigation. */
const Project = () => {
  const { project } = projectRouteApi.useParams();
  const { data, isLoading, error } = useContent<ProjectType>(
    `${config.projectsPath}${project}`,
  );
  const {
    data: projectsData,
    isLoading: projectIsLoading,
    error: projectError,
  } = useContent<{ projects: ProjectType[] }>("projects");

  const { next, prev, launchURLs, projectData } = useMemo(() => {
    if (!data || !projectsData) {
      return { next: null, prev: null, launchURLs: [], projectData: null };
    }

    const {
      active,
      title,
      text,
      images,
      duties,
      launchURL,
      alt,
      projectDate,
      projectType,
      client,
    } = data;

    const urls = (Array.isArray(launchURL) ? launchURL : [launchURL]).filter(
      (url): url is string => typeof url === "string" && url.trim().length > 0,
    );
    const projects = projectsData.projects || [];
    // Match by ID first with title fallback for older records.
    const index = projects.findIndex(
      (proj) => proj.id === project || proj.title === title,
    );
    const hasMultiple = projects.length > 1;
    const nextProject =
      hasMultiple && index !== -1
        ? projects[(index + 1) % projects.length]
        : null;
    const prevProject =
      hasMultiple && index !== -1
        ? projects[(index - 1 + projects.length) % projects.length]
        : null;

    return {
      next: nextProject,
      prev: prevProject,
      launchURLs: urls,
      projectData: {
        active,
        title,
        text,
        images,
        duties,
        alt,
        projectDate,
        projectType,
        client,
      },
    };
  }, [data, projectsData, project]);

  // Inactive destinations remain readable metadata instead of clickable links.
  const launchURLSection = projectData ? (
    <>
      <AnimatedOnScroll animationIn="fadeInUpMedium">
        <AdditionalInfo as="h2">Address</AdditionalInfo>
        <Spacer />
      </AnimatedOnScroll>
      {launchURLs?.length
        ? launchURLs.map((url, idx) => {
            const displayURL = url ? url.replace(/(^\w+:|^)\/\//, "") : "";

            return (
              <AnimatedOnScroll
                animationIn="fadeInUpMedium"
                key={`link-${idx}`}
              >
                {projectData.active === false ? (
                  <ProjectNonSite>{displayURL} (inactive)</ProjectNonSite>
                ) : (
                  <ProjectLink
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {displayURL}
                  </ProjectLink>
                )}
              </AnimatedOnScroll>
            );
          })
        : null}
      <HideDesktop>
        <Spacer size="lg" />
      </HideDesktop>
    </>
  ) : null;

  const projectDateSection = projectData?.projectDate ? (
    <>
      <AnimatedOnScroll animationIn="fadeInUpMedium">
        <AdditionalInfo as="h2">Date</AdditionalInfo>
        <Spacer />
      </AnimatedOnScroll>
      <AnimatedOnScroll animationIn="fadeInUpMedium">
        <ProjectDate>{projectData.projectDate}</ProjectDate>
        <HideDesktop>
          <Spacer size="xl" />
        </HideDesktop>
        <HideMobile>
          <Spacer />
        </HideMobile>
      </AnimatedOnScroll>
    </>
  ) : null;

  const kioskSection = (
    <AnimatedOnScroll animationIn="fadeInUpMedium">
      <ProjectNonSite>on site kiosk</ProjectNonSite>
      <HideDesktop>
        <Spacer size="lg" />
      </HideDesktop>
    </AnimatedOnScroll>
  );

  const dutiesSection = projectData?.duties?.length ? (
    <Row>
      <Column $desktop={4} $largeDesktop={4}>
        <AnimatedOnScroll animationIn="fadeInUpMedium">
          <AdditionalInfo as="h2">Roles</AdditionalInfo>
        </AnimatedOnScroll>
      </Column>
      <Column $desktop={8} $largeDesktop={8}>
        <AnimatedOnScroll animationIn="fadeInUpMedium">
          <HideDesktop>
            <Spacer />
          </HideDesktop>
          <ProjectDuties>{projectData.duties.join(", ")}</ProjectDuties>
        </AnimatedOnScroll>
      </Column>
    </Row>
  ) : null;

  // The lead image appears beside the overview; this section starts with the second image.
  const imagesSection = projectData?.images?.length ? (
    <Row>
      <Column $desktop={4} $largeDesktop={4}>
        <AnimatedOnScroll animationIn="fadeInUpMedium">
          <AdditionalInfo as="h2">Additional Screenshots</AdditionalInfo>
          <HideDesktop>
            <Spacer />
          </HideDesktop>
        </AnimatedOnScroll>
      </Column>
      <Column $desktop={8} $largeDesktop={8}>
        {projectData.images.slice(1).map((image, idx) => (
          <OverflowHidden key={image.src || `${projectData.title}-${idx}`}>
            <AnimatedOnScroll animationIn="fadeInUpMedium">
              <LazyImage
                src={imageUrl(image.src, config.screenPath)}
                alt={
                  image.alt ||
                  `${projectData.title} interface detail ${idx + 1}`
                }
                width={image.width}
                height={image.height}
              />
            </AnimatedOnScroll>
            <Spacer />
          </OverflowHidden>
        ))}
      </Column>
    </Row>
  ) : null;

  if (error || projectError) {
    const isNotFound =
      error instanceof Error &&
      error.message.includes("JSON data file not found");
    if (isNotFound) {
      return <Error404 />;
    }
    return (
      <ContentWrapper>
        <Seo
          title="Project"
          path={`/portfolio/project/${project}`}
          type="article"
        />
        <ErrorDisplay>
          {error?.toString() || projectError?.toString()}
        </ErrorDisplay>
      </ContentWrapper>
    );
  }

  if (isLoading || projectIsLoading || !data || !projectsData || !projectData) {
    return (
      <>
        <Seo
          title="Project"
          path={`/portfolio/project/${project}`}
          type="article"
        />
        <Loading />
      </>
    );
  }

  const { title, text, images, duties, alt, projectType, client } = projectData;

  return (
    <>
      <ContentWrapper key={title}>
        <Seo
          title={title}
          description={text}
          path={`/portfolio/project/${project}`}
          type="article"
        />
        <Row>
          <Column $desktop={5} $largeDesktop={5}>
            <GrowOne>
              <AnimatedOnScroll animationIn="fadeInUpMedium">
                <HideDesktop>
                  <Spacer size="xl" />
                </HideDesktop>
                <ProjectTitle tabIndex={-1}>{title}</ProjectTitle>
                <ProjectNonSite>{client}</ProjectNonSite>
                <Spacer />
              </AnimatedOnScroll>
              <AnimatedOnScroll animationIn="fadeInUpMedium">
                <Paragraph>{text}</Paragraph>
                <HideDesktop>
                  <Spacer size="xl" />
                </HideDesktop>
                <HideMobile>
                  <Spacer />
                </HideMobile>
              </AnimatedOnScroll>
            </GrowOne>
            <div>
              <Row>
                <Column $desktop="4-5" $largeDesktop="4-5">
                  {launchURLs.length ? launchURLSection : null}
                  {projectType === "kiosk" && kioskSection}
                </Column>
                <Column $desktop="1-5" $largeDesktop="1-5">
                  {projectDateSection}
                </Column>
              </Row>
            </div>
          </Column>
          {images?.[0]?.src && (
            <Column $desktop={7} $largeDesktop={7}>
              <OverflowHidden>
                <AnimatedOnScroll animationIn="fadeInUpMedium">
                  <LazyImage
                    src={imageUrl(images[0].src, config.screenPath)}
                    loading="eager"
                    fetchPriority="high"
                    alt={
                      images[0].alt || `${alt || title} main interface overview`
                    }
                    width={images[0].width}
                    height={images[0].height}
                  />
                </AnimatedOnScroll>
              </OverflowHidden>
            </Column>
          )}
        </Row>
        <Spacer size="lg" />
        <AnimatedOnScroll animationIn="fadeInScaleX">
          <Divider />
        </AnimatedOnScroll>
        <Spacer size="xl" />
        {duties.length ? (
          <>
            {dutiesSection}
            <Spacer size="xl" />
          </>
        ) : null}
        {images.length > 1 && imagesSection}
        <Spacer size="xxl" />
      </ContentWrapper>
      <HideTouch>
        <PrevNextNav key={`nav-${title}`}>
          {prev && <ThumbPreview {...prev} direction="prev" />}
          {next && <ThumbPreview {...next} direction="next" />}
        </PrevNextNav>
      </HideTouch>
    </>
  );
};

export default memo(Project);

export type { ProjectType };
