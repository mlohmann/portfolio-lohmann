import {
  AnimatedOnScroll,
  Spacer,
  HideDesktop,
  HideTouch,
  Column,
  ContentWrapper,
  Row,
  VerticalSpacer,
} from "@/components";
import Background from "./Background";
import BackgroundImage from "./BackgroundImage";
import {
  IntroBody,
  IntroLink,
  IntroCTA,
  LinkedInCTA,
  NoWrap,
} from "./HomeTypography";
import config from "@/data/config";
import Seo from "@/seo";

const fadeInUpMediumAnimation = "fadeInUpMedium";

/** Landing page with the introduction, portfolio routes, and contact link. */
const Home = () => (
  <>
    <Seo title="Matt Lohmann | Senior Frontend Engineer" />
    <Background>
      <BackgroundImage />
      <ContentWrapper>
        <Row>
          <Column>
            <HideTouch>
              <Spacer size="xs" />
            </HideTouch>
            <HideDesktop>
              <Spacer size="xl" />
            </HideDesktop>
            <IntroBody as="h1" tabIndex={-1}>
              Hi, I&apos;m Matt. I&apos;m a Senior Frontend Engineer building
              resilient, accessible, and engaging digital experiences for{" "}
              <NoWrap>the web.</NoWrap>
            </IntroBody>
            <HideTouch>
              <Spacer size="xl" />
            </HideTouch>
            <HideDesktop>
              <Spacer size="lg" />
            </HideDesktop>
            <AnimatedOnScroll animationIn={fadeInUpMediumAnimation}>
              <IntroBody>
                I specialize in React, TypeScript, and interactive systems.
                I&apos;ve worked for{" "}
                <NoWrap>
                  <IntroLink to="/portfolio" tabIndex={0}>
                    <span data-text="major companies">major companies</span>
                  </IntroLink>
                  ,
                </NoWrap>{" "}
                had{" "}
                <IntroLink to="/about" tabIndex={0}>
                  <span data-text="high-profile clients">
                    high-profile clients
                  </span>
                </IntroLink>{" "}
                and had my projects covered by&nbsp;the{" "}
                <NoWrap>
                  <IntroLink to="/press" tabIndex={0}>
                    <span data-text="international press">
                      international press
                    </span>
                  </IntroLink>
                  .
                </NoWrap>
              </IntroBody>
            </AnimatedOnScroll>
            <Spacer size="xl" />
            <AnimatedOnScroll animationIn={fadeInUpMediumAnimation}>
              <IntroCTA to="/portfolio" tabIndex={0}>
                <span data-text="See My Work">See My Work</span>
              </IntroCTA>
              <VerticalSpacer />
              <IntroCTA to="/about" tabIndex={0}>
                <span data-text="More About Me">More About Me</span>
              </IntroCTA>
              <VerticalSpacer />
              <LinkedInCTA
                href={config.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-text="Connect on LinkedIn">Connect on LinkedIn</span>
              </LinkedInCTA>
            </AnimatedOnScroll>
            <Spacer size="xxl" />
          </Column>
        </Row>
      </ContentWrapper>
    </Background>
  </>
);

export default Home;
