import styled from "styled-components";
import { colors, sizes, typography } from "@/style";

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

const SpacingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sizes.spacing.sm}px;
`;

const SpacingRow = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  padding: ${sizes.spacing.sm}px;
  display: grid;
  grid-template-columns: 140px 100px 100px 1fr;
  align-items: center;
  gap: ${sizes.spacing.sm}px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SpacingBar = styled.div<{ $width: number }>`
  height: 24px;
  width: ${({ $width }) => Math.min($width, 360)}px;
  background: ${colors.highlight};
  border-radius: 2px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-family: monospace;
  font-size: 0.75rem;
  color: ${colors.white};
`;

const BreakpointGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${sizes.spacing.md}px;
`;

const BreakpointCard = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  padding: ${sizes.spacing.md}px;
`;

const BreakpointName = styled.h3`
  font-family: ${typography.font.header};
  font-size: ${typography.sizing.h6};
  text-transform: uppercase;
  color: ${colors.highlight};
  margin-bottom: 4px;
`;

const BreakpointMeta = styled.p`
  font-size: 0.85rem;
  color: ${colors.fadedWhite};
  line-height: 1.5;
`;

const spacingKeys: (keyof typeof sizes.spacing)[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

/** Living Storybook showcase component for spacing tokens and responsive grid system. */
const SpacingGrid = () => (
  <Container>
    <Header>
      <Title>Spacing & Layout System</Title>
      <Subtitle>
        Harmonic 8pt spacing rhythm with proportional mobile compression and responsive column architecture.
      </Subtitle>
    </Header>

    <Section>
      <SectionTitle>8-Point Spacing Scale</SectionTitle>
      <SpacingList>
        {spacingKeys.map((key) => {
          const desktopPx = sizes.spacing[key];
          const mobilePx = sizes.spacingMobile[key];
          return (
            <SpacingRow key={key}>
              <div>
                <strong style={{ color: colors.white }}>sizes.spacing.{key}</strong>
              </div>
              <div>Desktop: {desktopPx}px</div>
              <div>Mobile: {mobilePx}px</div>
              <div>
                <SpacingBar $width={desktopPx}>{desktopPx}px</SpacingBar>
              </div>
            </SpacingRow>
          );
        })}
      </SpacingList>
    </Section>

    <Section>
      <SectionTitle>Responsive Grid Breakpoints</SectionTitle>
      <BreakpointGrid>
        <BreakpointCard>
          <BreakpointName>Mobile</BreakpointName>
          <BreakpointMeta>
            <strong>Width:</strong> &le; {sizes.device.mobile.width}px<br />
            <strong>Columns:</strong> {sizes.grid.mobile.columns}<br />
            <strong>Margin:</strong> {sizes.device.mobile.margin}px<br />
            <strong>Gutter:</strong> {sizes.grid.mobile.gutter}px
          </BreakpointMeta>
        </BreakpointCard>
        <BreakpointCard>
          <BreakpointName>Tablet</BreakpointName>
          <BreakpointMeta>
            <strong>Width:</strong> &ge; {sizes.device.tablet.width}px<br />
            <strong>Columns:</strong> {sizes.grid.tablet.columns}<br />
            <strong>Margin:</strong> {sizes.device.tablet.margin}px<br />
            <strong>Gutter:</strong> {sizes.grid.tablet.gutter}px
          </BreakpointMeta>
        </BreakpointCard>
        <BreakpointCard>
          <BreakpointName>Desktop</BreakpointName>
          <BreakpointMeta>
            <strong>Width:</strong> &ge; {sizes.device.desktop.width}px<br />
            <strong>Columns:</strong> {sizes.grid.desktop.columns}<br />
            <strong>Col Width:</strong> {sizes.grid.desktop.columnWidth}px<br />
            <strong>Gutter:</strong> {sizes.grid.desktop.gutter}px
          </BreakpointMeta>
        </BreakpointCard>
        <BreakpointCard>
          <BreakpointName>Large Desktop</BreakpointName>
          <BreakpointMeta>
            <strong>Width:</strong> &ge; {sizes.device.largeDesktop.width}px<br />
            <strong>Columns:</strong> {sizes.grid.largeDesktop.columns}<br />
            <strong>Col Width:</strong> {sizes.grid.largeDesktop.columnWidth}px<br />
            <strong>Gutter:</strong> {sizes.grid.largeDesktop.gutter}px
          </BreakpointMeta>
        </BreakpointCard>
      </BreakpointGrid>
    </Section>
  </Container>
);

export { SpacingGrid };
