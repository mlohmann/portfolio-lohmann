import { Fragment } from "react";

import { imageUrl } from "@/data/images";
import { imagePresentation } from "@/data/imagePresentation";
import { useContent } from "@/hooks";
import config from "@/data/config";
import {
  AnimatedOnScroll,
  Row,
  Column,
  ContentWrapper,
  Paragraph,
  Spacer,
  Divider,
  GrowOne,
  AdditionalInfo,
  HideDesktop,
  Loading,
  VisuallyHidden,
} from "@/components";
import { PressLink } from "./PressTypography";
import PressTitle from "./PressTitle";
import VideoContainer from "./VideoContainer";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import Seo from "@/seo";
import styled from "styled-components";
import { colors, effects, sizes, typography } from "@/style";

/** Visible, keyboard-accessible collapsible details for video transcript and description. */
const TranscriptDetails = styled.details`
  margin-top: ${sizes.spacing.sm}px;
  color: ${colors.textPrimary};

  summary {
    cursor: pointer;
    font-size: ${typography.sizing.small};
    color: ${colors.fadedWhite};
    user-select: none;
    padding: 4px 0;
    ${effects.focus}

    &:hover {
      color: ${colors.highlight};
    }
  }
`;

/** External article destination and publication label for a press entry. */
type SiteLink = {
  /** Article headline displayed as the link text. */
  title: string;
  url: string;
  /** Publication or source label shown below the article link. */
  source: string;
};

/** Text alternatives supplied alongside a video, in the same order as its embed. */
type VideoDetail = {
  title?: string;
  audioDescription?: string;
  transcript?: string;
};

/** Optional media and metadata attached to each press article. */
type Article = {
  title: string;
  body?: string;
  client?: string;
  images?: string[];
  imageAlt?: string;
  imageAlts?: string[];
  videos?: string[];
  videoDetails?: VideoDetail[];
  links: SiteLink[];
  date?: string;
};

/**
 * Extract the first HTTPS embed iframe only when its host is on the allowlist.
 * Returns null for malformed or unsupported markup so it is never embedded.
 *
 * @param markup - Legacy HTML string containing an iframe.
 * @returns An allowlisted HTTPS iframe URL, or null when the source is rejected. */
const getVideoSource = (markup: string) => {
  let source: string | null | undefined = null;
  if (typeof DOMParser !== "undefined") {
    const iframe = new DOMParser()
      .parseFromString(markup, "text/html")
      .querySelector("iframe");
    source = iframe?.getAttribute("src");
  } else {
    const match = markup.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
    source = match?.[1];
  }

  if (!source) return null;

  try {
    const url = new URL(source);
    const allowedHosts = ["www.youtube.com", "youtube.com", "player.vimeo.com"];

    return url.protocol === "https:" && allowedHosts.includes(url.hostname)
      ? url.toString()
      : null;
  } catch {
    return null;
  }
};

/** Lists press coverage and its associated images, video embeds, and links. */
const Press = () => {
  const { data, isLoading, error } = useContent<{ articles: Article[] }>(
    "press",
  );

  const seo = (
    <Seo
      title="Press"
      description="Press coverage and articles featuring Matt Lohmann's interactive work and digital experiences."
      path="/press"
    />
  );

  if (error) {
    return (
      <ContentWrapper>
        {seo}
        <ErrorDisplay>{error.toString()}</ErrorDisplay>
      </ContentWrapper>
    );
  }
  if (data === null || isLoading) {
    return (
      <>
        {seo}
        <Loading />
      </>
    );
  }

  const { articles } = data;

  /** Renders supplemental press images after the lead image shown in the article row. */
  const renderImagesSection = (
    title: string,
    images: string[],
    imageAlts?: string[],
  ) => (
    <Row>
      <Column $desktop={5} $largeDesktop={5} />
      <Column $desktop={7} $largeDesktop={7}>
        <div>
          {images.slice(1).map((image, idx) => (
            <AnimatedOnScroll key={image} animationIn="fadeInUpMedium">
              <img
                {...imagePresentation(imageUrl(image, config.pressPath))}
                loading="lazy"
                style={{ height: "auto" }}
                src={imageUrl(image, config.pressPath)}
                alt={
                  imageAlts?.[idx + 1] ??
                  `${title}: additional project image ${idx + 2}`
                }
              />
            </AnimatedOnScroll>
          ))}
        </div>
      </Column>
    </Row>
  );

  /** Renders only allowlisted embeds and labels each video with its article title. */
  const renderVideosSection = (
    articleTitle: string,
    videos: string[],
    videoDetails?: VideoDetail[],
  ) => (
    <Row>
      <Column $desktop={5} $largeDesktop={5}>
        <AnimatedOnScroll animationIn="fadeInUpMedium">
          <div>
            <AdditionalInfo as="h3">Videos</AdditionalInfo>
            <HideDesktop>
              <Spacer size="lg" />
            </HideDesktop>
          </div>
        </AnimatedOnScroll>
      </Column>
      <Column $desktop={7} $largeDesktop={7}>
        <AnimatedOnScroll animationIn="fadeIn">
          <div>
            {videos.map((video, idx) => {
              const source = getVideoSource(video);
              const detail = videoDetails?.[idx];
              return source ? (
                <Fragment key={source || `${articleTitle}-video-${idx}`}>
                  <VideoContainer>
                    <iframe
                      loading="lazy"
                      src={source}
                      title={
                        detail?.title || `${articleTitle} video ${idx + 1}`
                      }
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoContainer>
                  {detail?.audioDescription && (
                    <TranscriptDetails>
                      <summary>Video description</summary>
                      <Paragraph style={{ marginTop: "0.5rem" }}>
                        {detail.audioDescription}
                      </Paragraph>
                    </TranscriptDetails>
                  )}
                  {detail?.transcript && (
                    <TranscriptDetails>
                      <summary>Transcript</summary>
                      <Paragraph
                        style={{ whiteSpace: "pre-line", marginTop: "0.5rem" }}
                      >
                        {detail.transcript}
                      </Paragraph>
                    </TranscriptDetails>
                  )}
                  {idx < videos.length - 1 && <Spacer size="md" />}
                </Fragment>
              ) : null;
            })}
          </div>
          <Spacer size="lg" />
        </AnimatedOnScroll>
      </Column>
    </Row>
  );

  /** Renders external coverage links with their publication labels. */
  const renderLinksSection = (links: SiteLink[]) => {
    return (
      <Row>
        <Column $desktop={5} $largeDesktop={5}>
          <AnimatedOnScroll animationIn="fadeInUpMedium">
            <div>
              <AdditionalInfo as="h3">Articles</AdditionalInfo>
              <HideDesktop>
                <Spacer size="lg" />
              </HideDesktop>
            </div>
          </AnimatedOnScroll>
        </Column>
        <Column $desktop={7} $largeDesktop={7}>
          {links.map(({ url, title, source }) => (
            <Fragment key={url || title}>
              <Row pretty={true}>
                <AnimatedOnScroll animationIn="fadeInUpMedium">
                  <PressLink
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </PressLink>
                </AnimatedOnScroll>
              </Row>
              <Row>
                <AnimatedOnScroll animationIn="fadeInUpMedium">
                  <div>
                    <Spacer size="sm" />
                    {source && <Paragraph>{`- ${source}`}</Paragraph>}
                    <Spacer />
                  </div>
                </AnimatedOnScroll>
              </Row>
            </Fragment>
          ))}
        </Column>
      </Row>
    );
  };

  return (
    <ContentWrapper>
      {seo}
      <VisuallyHidden as="h1" tabIndex={-1}>
        Press Coverage
      </VisuallyHidden>
      <HideDesktop>
        <Spacer size="xl" />
      </HideDesktop>
      {articles.map(
        (
          {
            title,
            client,
            images,
            imageAlt,
            imageAlts,
            videos,
            videoDetails,
            links,
          },
          index,
        ) => (
          <div key={title}>
            <Row>
              <Column $desktop={5} $largeDesktop={5}>
                <GrowOne>
                  <AnimatedOnScroll animationIn="fadeInUpMedium">
                    <PressTitle>{title}</PressTitle>
                  </AnimatedOnScroll>
                </GrowOne>
                <HideDesktop>
                  <Spacer />
                </HideDesktop>
                {client && (
                  <div>
                    <Row>
                      <AnimatedOnScroll animationIn="fadeInUpMedium">
                        <GrowOne>
                          <Paragraph>Client: {client}</Paragraph>
                        </GrowOne>
                      </AnimatedOnScroll>
                    </Row>
                  </div>
                )}
                <HideDesktop>
                  <Spacer size="lg" />
                </HideDesktop>
              </Column>
              {images && images.length > 0 && (
                <Column $desktop={7} $largeDesktop={7}>
                  <AnimatedOnScroll animationIn="fadeInUpMedium">
                    <img
                      {...imagePresentation(
                        imageUrl(images[0], config.pressPath),
                      )}
                      style={{ width: "100%", height: "auto" }}
                      loading={index === 0 ? "eager" : "lazy"}
                      {...(index === 0 ? { fetchpriority: "high" } : {})}
                      src={imageUrl(images[0], config.pressPath)}
                      alt={imageAlts?.[0] ?? imageAlt ?? `${title} exhibition`}
                    />
                  </AnimatedOnScroll>
                </Column>
              )}
            </Row>
            <Spacer />
            <AnimatedOnScroll animationIn="fadeInScaleX">
              <Spacer />
            </AnimatedOnScroll>
            {images &&
              images.length > 1 &&
              renderImagesSection(title, images, imageAlts)}
            {videos &&
              videos.length > 0 &&
              renderVideosSection(title, videos, videoDetails)}
            {links && links.length > 0 && renderLinksSection(links)}
            {index < articles.length - 1 && (
              <>
                <Spacer size="xl" />
                <AnimatedOnScroll animationIn="fadeInScaleX">
                  <Divider />
                </AnimatedOnScroll>
                <Spacer size="lg" />
              </>
            )}
          </div>
        ),
      )}
      <Spacer size="xxl" />
    </ContentWrapper>
  );
};

export default Press;
