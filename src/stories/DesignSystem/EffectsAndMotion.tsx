import styled from "styled-components";
import { colors, sizes, typography, effects, animation } from "@/style";

const Container = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: ${sizes.spacing.lg}px ${sizes.spacing.md}px;
  color: ${colors.white};
  font-family: ${typography.font.small};
`;

const Header = styled.header`
  margin-bottom: ${sizes.spacing.lg}px;
  border-bottom: 2px solid ${colors.highlight};
  padding-bottom: ${sizes.spacing.md}px;
`;

const Title = styled.h1`
  font-family: ${typography.font.header};
  font-size: ${typography.sizing.h3};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${sizes.spacing.xs}px;
`;

const Subtitle = styled.p`
  font-family: ${typography.font.body};
  font-size: ${typography.sizing.p};
  color: ${colors.fadedWhite};
`;

const Section = styled.section`
  margin-bottom: ${sizes.spacing.xl}px;
`;

const SectionTitle = styled.h2`
  font-family: ${typography.font.header};
  font-size: ${typography.sizing.h5};
  text-transform: uppercase;
  margin-bottom: ${sizes.spacing.md}px;
  color: ${colors.highlight};
`;

const DemoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sizes.spacing.md}px;
  margin-bottom: ${sizes.spacing.lg}px;
`;

const InteractiveCard = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  padding: ${sizes.spacing.md}px;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  gap: ${sizes.spacing.sm}px;
`;

const DemoButton = styled.button`
  font-family: ${typography.font.nav};
  font-size: ${typography.sizing.h6};
  color: ${colors.white};
  background: ${colors.actionBackground};
  border: 0;
  min-height: 44px;
  padding: 10px 24px;
  cursor: pointer;
  align-self: flex-start;
  ${effects.focus}
`;

const UnstyledDemoButton = styled.button`
  font-family: ${typography.font.nav};
  font-size: ${typography.sizing.h6};
  color: ${colors.white};
  background: transparent;
  border: 1px solid ${colors.subtleBorder};
  min-height: 44px;
  padding: 10px 24px;
  cursor: pointer;
  align-self: flex-start;
`;

const DemoLink = styled.a`
  font-family: ${typography.font.header};
  font-size: ${typography.sizing.h5};
  color: ${colors.white};
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  align-self: flex-start;
  padding: 4px 0;

  &:after {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${colors.highlight};
    ${effects.beforeAfter}
  }

  &:hover:after {
    ${effects.activeHover}
  }

  ${effects.focus}
`;

const TimingTable = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  overflow: hidden;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 200px 140px 1fr;
  padding: ${sizes.spacing.sm}px ${sizes.spacing.md}px;
  border-bottom: 1px solid ${colors.subtleBorder};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const RowHeader = styled(Row)`
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: ${colors.highlight};
`;

/** Living Storybook showcase component for effects, motion, and interaction tokens. */
const EffectsAndMotion = () => (
  <Container>
    <Header>
      <Title>Motion & Interactive Effects</Title>
      <Subtitle>
        Predictable interaction feedback, keyboard accessibility focus rings, and custom bezier transitions.
      </Subtitle>
    </Header>

    <Section>
      <SectionTitle>Interactive Micro-Interactions</SectionTitle>
      <DemoRow>
        <InteractiveCard>
          <h3 style={{ textTransform: "uppercase", color: colors.white }}>Focus Indicator (Explicit)</h3>
          <p style={{ color: colors.fadedWhite, fontSize: "0.85rem" }}>
            Tab or click this button to observe the 4px glowing halo ring (`effects.focus`), accompanied by Windows High Contrast (`forced-colors: active`) solid outlines.
          </p>
          <DemoButton>Focus Me (Tab / Click)</DemoButton>
        </InteractiveCard>

        <InteractiveCard>
          <h3 style={{ textTransform: "uppercase", color: colors.white }}>Unstyled Focus Ring (Global)</h3>
          <p style={{ color: colors.fadedWhite, fontSize: "0.85rem" }}>
            Tab to this unstyled control to observe the global design system fallback (`:focus-visible`) outline (2px solid Imperial Red with 4px offset).
          </p>
          <UnstyledDemoButton>Tab To Me</UnstyledDemoButton>
        </InteractiveCard>

        <InteractiveCard>
          <h3 style={{ textTransform: "uppercase", color: colors.white }}>Animated Underline</h3>
          <p style={{ color: colors.fadedWhite, fontSize: "0.85rem" }}>
            Hover or focus over the link below to view the directional scale transformation (`effects.beforeAfter` and `effects.activeHover`).
          </p>
          <DemoLink href="#hover-demo" onClick={(e) => e.preventDefault()}>
            Hover Over Me
          </DemoLink>
        </InteractiveCard>
      </DemoRow>
    </Section>

    <Section>
      <SectionTitle>Animation Durations & Easing</SectionTitle>
      <TimingTable>
        <RowHeader>
          <div>Token</div>
          <div>Value</div>
          <div>Purpose</div>
        </RowHeader>
        <Row>
          <div><code>animation.shortTransition</code></div>
          <div>{animation.shortTransition}</div>
          <div>Instantaneous state change (opacity, border)</div>
        </Row>
        <Row>
          <div><code>animation.fast</code></div>
          <div>{animation.fast}</div>
          <div>Fast micro-interaction and scale-in triggers</div>
        </Row>
        <Row>
          <div><code>animation.normal</code></div>
          <div>{animation.normal}</div>
          <div>Default component state transition</div>
        </Row>
        <Row>
          <div><code>animation.transition</code></div>
          <div>{animation.transition}</div>
          <div>Menu scrim fade and underline transition timing</div>
        </Row>
        <Row>
          <div><code>animation.slow</code></div>
          <div>{animation.slow}</div>
          <div>Deliberate editorial hover-out / unhover</div>
        </Row>
        <Row>
          <div><code>animation.drawer</code></div>
          <div>{animation.drawer}</div>
          <div>Full-screen navigation drawer expansion</div>
        </Row>
        <Row>
          <div><code>animation.focus</code></div>
          <div>{animation.focus}</div>
          <div>Focus halo pulse glow duration</div>
        </Row>
        <Row>
          <div><code>animation.ease.standard</code></div>
          <div><code>{animation.ease.standard}</code></div>
          <div>Custom cubic-bezier for natural editorial decel</div>
        </Row>
        <Row>
          <div><code>animation.ease.drawer</code></div>
          <div><code>{animation.ease.drawer}</code></div>
          <div>High-momentum cubic-bezier for drawer reveals</div>
        </Row>
        <Row>
          <div><code>animation.ease.inOut</code></div>
          <div><code>{animation.ease.inOut}</code></div>
          <div>Symmetric ease-in-out curve for hover-out underline collapse</div>
        </Row>
      </TimingTable>
    </Section>

    <Section>
      <SectionTitle>Layering & Elevation (z-index)</SectionTitle>
      <TimingTable>
        <RowHeader>
          <div>Layer Token</div>
          <div>z-index</div>
          <div>Component Role</div>
        </RowHeader>
        <Row>
          <div><code>sizes.zIndex.base</code></div>
          <div>{sizes.zIndex.base}</div>
          <div>Timeline markers, base interactive surfaces, and menu scrim</div>
        </Row>
        <Row>
          <div><code>sizes.zIndex.nav</code></div>
          <div>{sizes.zIndex.nav}</div>
          <div>Persistent hamburger trigger, mobile title header</div>
        </Row>
        <Row>
          <div><code>sizes.zIndex.drawer</code></div>
          <div>{sizes.zIndex.drawer}</div>
          <div>Full-screen navigation drawer and link overlay</div>
        </Row>
        <Row>
          <div><code>sizes.zIndex.modal</code></div>
          <div>{sizes.zIndex.modal}</div>
          <div>Global loading screen and top-level modal dialogs</div>
        </Row>
      </TimingTable>
    </Section>
  </Container>
);

export { EffectsAndMotion };
