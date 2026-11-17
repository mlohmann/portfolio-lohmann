import {
  AnimatedOnScroll,
  VerticalSpacer,
  Spacer,
  HideDesktop,
  HideTouch,
  Column,
  ContentWrapper,
  Row,
} from "@/components";
import Background from "./Background";
import BackgroundImage from "./BackgroundImage";
import {
  IntroBody,
  IntroLink,
  IntroCTA,
  LinkedInCTA,
  NoWrap,
  IntroSupport,
  HomeActions,
} from "./HomeTypography";
import config from "@/data/config";
import Seo from "@/seo";

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
            <Spacer size="md" />
            <AnimatedOnScroll animationIn="fadeInUpMedium">
              <IntroSupport>
                I specialize in React, TypeScript, and interactive systems.
                I&apos;ve worked for{" "}
                <NoWrap>
                  <IntroLink to="/portfolio">
                    <span data-text="major companies">major companies</span>
                  </IntroLink>
                  ,
                </NoWrap>{" "}
                had{" "}
                <IntroLink to="/about">
                  <span data-text="high-profile clients">
                    high-profile clients
                  </span>
                </IntroLink>{" "}
                and had my projects covered by&nbsp;the{" "}
                <NoWrap>
                  <IntroLink to="/press">
                    <span data-text="international press">
                      international press
                    </span>
                  </IntroLink>
                  .
                </NoWrap>
              </IntroSupport>
            </AnimatedOnScroll>
            <Spacer size="lg" />
            <AnimatedOnScroll animationIn="fadeInUpMedium" delay={0.8}>
              <HomeActions>
                <IntroCTA to="/portfolio">
                  <span data-text="See My Work">See My Work</span>
                </IntroCTA>
                <VerticalSpacer aria-hidden="true" />
                <IntroCTA to="/about">
                  <span data-text="More About Me">More About Me</span>
                </IntroCTA>
                <VerticalSpacer aria-hidden="true" />
                <LinkedInCTA
                  href={config.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span data-text="Connect on LinkedIn">
                    Connect on LinkedIn
                  </span>
                </LinkedInCTA>
              </HomeActions>
            </AnimatedOnScroll>
            <Spacer size="xxl" />
          </Column>
        </Row>
      </ContentWrapper>
    </Background>
  </>
);

export default Home;
