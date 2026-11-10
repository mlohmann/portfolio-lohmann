import { imageUrl } from "@/data/images";
import { Fragment } from "react";
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

/** External article destination and publication label for a press entry. */
type SiteLink = {
  /** Article headline displayed as the link text. */
  title: string;
  url: string;
  /** Publication or source label shown below the article link. */
  source: string;
};

/** Optional media and metadata attached to each press article. */
type Article = {
  title: string;
  body?: string;
  client?: string;
  images?: string[];
  imageAlt?: string;
  videos?: string[];
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
  const iframe = new DOMParser()
    .parseFromString(markup, "text/html")
    .querySelector("iframe");
  const source = iframe?.getAttribute("src");

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

  if (error) return <ErrorDisplay>{error.toString()}</ErrorDisplay>;
  if (data === null || isLoading) return <Loading />;

  const { articles } = data;

  /** Renders supplemental press images after the lead image shown in the article row. */
  const renderImagesSection = (images: string[]) => (
    <Row>
      <Column $desktop={5} $largeDesktop={5} />
      <Column $desktop={7} $largeDesktop={7}>
        <div>
          {images.slice(1).map((image, idx) => (
            <AnimatedOnScroll key={idx} animationIn="fadeInUpMedium">
              <img
                {...imagePresentation(imageUrl(image, config.pressPath))}
                loading="lazy"
                style={{ height: "auto" }}
                src={imageUrl(image, config.pressPath)}
                alt={`Screenshot ${idx + 1}`}
              />
            </AnimatedOnScroll>
          ))}
        </div>
      </Column>
    </Row>
  );

  /** Renders only allowlisted embeds and labels each video with its article title. */
  const renderVideosSection = (articleTitle: string, videos: string[]) => (
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
              return source ? (
                <Fragment key={idx}>
                  <VideoContainer>
                    <iframe
                      loading="lazy"
                      src={source}
                      title={`${articleTitle} video ${idx + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoContainer>
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
          {links.map(({ url, title, source }, idx) => (
            <Fragment key={idx}>
              <Row pretty={true}>
                <AnimatedOnScroll animationIn="fadeInUpMedium">
                  <PressLink href={url} target="_blank">
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
      <Seo
        title="Press"
        description="Press coverage and articles featuring Matt Lohmann's interactive work and digital experiences."
        path="/press"
      />
      <VisuallyHidden as="h1" tabIndex={-1}>
        Press Coverage
      </VisuallyHidden>
      <HideDesktop>
        <Spacer size="xl" />
      </HideDesktop>
      {articles.map(
        ({ title, client, images, imageAlt, videos, links }, index) => (
          <div key={index}>
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
                      {...{ fetchpriority: index === 0 ? "high" : "auto" }}
                      src={imageUrl(images[0], config.pressPath)}
                      alt={imageAlt || `${title} exhibition`}
                    />
                  </AnimatedOnScroll>
                </Column>
              )}
            </Row>
            <Spacer />
            <AnimatedOnScroll animationIn="fadeInScaleX">
              <Spacer />
            </AnimatedOnScroll>
            {images && images.length > 1 && renderImagesSection(images)}
            {videos && videos.length > 0 && renderVideosSection(title, videos)}
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
