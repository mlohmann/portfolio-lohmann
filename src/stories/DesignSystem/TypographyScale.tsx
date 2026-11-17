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

const FontCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${sizes.spacing.md}px;
  margin-bottom: ${sizes.spacing.lg}px;
`;

const FontCard = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  padding: ${sizes.spacing.md}px;
`;

const SampleChar = styled.div<{ $font: string }>`
  font-family: ${({ $font }) => $font};
  font-size: 3.5rem;
  color: ${colors.highlight};
  line-height: 1;
  margin-bottom: ${sizes.spacing.sm}px;
`;

const FontName = styled.h3`
  font-family: ${typography.font.header};
  font-size: ${typography.sizing.h6};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const FontRole = styled.p`
  font-size: 0.85rem;
  color: ${colors.fadedWhite};
  line-height: 1.4;
`;

const ScaleTable = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  overflow: hidden;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 140px 100px 1fr;
  align-items: center;
  padding: ${sizes.spacing.sm}px ${sizes.spacing.md}px;
  border-bottom: 1px solid ${colors.subtleBorder};
  gap: ${sizes.spacing.sm}px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RowHeader = styled(Row)`
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: ${colors.highlight};
`;

const TokenName = styled.code`
  font-family: monospace;
  font-size: 0.85rem;
  color: ${colors.highlight};
`;

const SizeSpec = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  color: ${colors.fadedWhite};
`;

const LineHeightSpec = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  color: ${colors.fadedWhite};
`;

const SampleText = styled.div<{ $size?: string; $font?: string; $weight?: number }>`
  font-family: ${({ $font }) => $font || typography.font.header};
  font-size: ${({ $size }) => $size || "1.25rem"};
  font-weight: ${({ $weight }) => $weight || "normal"};
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const scaleItems = [
  { token: "sizing.h1", size: typography.sizing.h1, rem: "10rem", px: "160px", font: typography.font.header, sample: "Display H1" },
  { token: "sizing.h2", size: typography.sizing.h2, rem: "7rem", px: "112px", font: typography.font.header, sample: "Section H2" },
  { token: "sizing.h3", size: typography.sizing.h3, rem: "4.25rem", px: "68px", font: typography.font.header, sample: "Editorial Title H3" },
  { token: "sizing.h4", size: typography.sizing.h4, rem: "2.75rem", px: "44px", font: typography.font.header, sample: "Project Headline H4" },
  { token: "sizing.h5", size: typography.sizing.h5, rem: "1.75rem", px: "28px", font: typography.font.header, sample: "Card & Nav Title H5" },
  { token: "sizing.h6", size: typography.sizing.h6, rem: "1rem", px: "16px", font: typography.font.header, sample: "Subheader H6" },
  { token: "sizing.p", size: typography.sizing.p, rem: "1.25rem", px: "20px", font: typography.font.body, sample: "Prose narrative and storytelling paragraph text" },
  { token: "sizing.nav", size: typography.sizing.nav, rem: "1.75rem", px: "28px", font: typography.font.nav, sample: "NAVIGATION LINK" },
  { token: "sizing.small", size: typography.sizing.small, rem: "0.75rem", px: "12px", font: typography.font.small, sample: "Metadata, timestamp, and caption copy" },
];

/** Living Storybook showcase component for typography scale and font families. */
const TypographyScale = () => (
  <Container>
    <Header>
      <Title>Typographic System</Title>
      <Subtitle>
        Minimalist typographic hierarchy combining compressed grotesque display headings with elegant Renaissance serif narrative prose.
      </Subtitle>
    </Header>

    <Section>
      <SectionTitle>Typeface Trio</SectionTitle>
      <FontCards>
        <FontCard>
          <SampleChar $font={typography.font.header}>Aa</SampleChar>
          <FontName>Oswald (Display & Navigation)</FontName>
          <FontRole>
            Condensed sans-serif inspired by classic Alternate Gothic styles. Used for uppercase hero statements, route headers, navigation links, and timeline milestones.
          </FontRole>
        </FontCard>
        <FontCard>
          <SampleChar $font={typography.font.body}>Qq</SampleChar>
          <FontName>Quattrocento (Editorial Prose)</FontName>
          <FontRole>
            High-contrast classical Renaissance serif with noble proportions and warm stroke modulation. Used for all reflective longform reading, introduction copy, and project narratives.
          </FontRole>
        </FontCard>
        <FontCard>
          <SampleChar $font={typography.font.small}>Ss</SampleChar>
          <FontName>Source Sans Pro (Functional UI)</FontName>
          <FontRole>
            Clean, legible humanist grotesque designed specifically for user interfaces. Used for metadata tags, technical specifications, press dates, and subtle utility links.
          </FontRole>
        </FontCard>
      </FontCards>
    </Section>

    <Section>
      <SectionTitle>Scale Hierarchy</SectionTitle>
      <ScaleTable>
        <RowHeader>
          <div>Token</div>
          <div>Scale (rem / px)</div>
          <div>Line Height</div>
          <div>Specimen</div>
        </RowHeader>
        {scaleItems.map((item) => (
          <Row key={item.token}>
            <TokenName>{item.token}</TokenName>
            <SizeSpec>
              {item.rem} ({item.px})
            </SizeSpec>
            <LineHeightSpec>{typography.lineHeight.base}</LineHeightSpec>
            <SampleText $size={item.size} $font={item.font}>
              {item.sample}
            </SampleText>
          </Row>
        ))}
      </ScaleTable>
    </Section>

    <Section>
      <SectionTitle>Font Weights</SectionTitle>
      <ScaleTable>
        <RowHeader>
          <div>Token</div>
          <div>Numeric Value</div>
          <div>Role / Usage</div>
          <div>Specimen</div>
        </RowHeader>
        <Row>
          <TokenName>typography.weight.thin</TokenName>
          <SizeSpec>100</SizeSpec>
          <LineHeightSpec>Hero intro copy</LineHeightSpec>
          <SampleText $font={typography.font.intro} $weight={typography.weight.thin}>
            Refined editorial narrative
          </SampleText>
        </Row>
        <Row>
          <TokenName>typography.weight.regular</TokenName>
          <SizeSpec>400</SizeSpec>
          <LineHeightSpec>Standard body text</LineHeightSpec>
          <SampleText $font={typography.font.body} $weight={typography.weight.regular}>
            The quick brown fox jumps over the lazy dog
          </SampleText>
        </Row>
        <Row>
          <TokenName>typography.weight.semibold</TokenName>
          <SizeSpec>600</SizeSpec>
          <LineHeightSpec>Action links, cards</LineHeightSpec>
          <SampleText $font={typography.font.link} $weight={typography.weight.semibold}>
            LEARN MORE &gt;
          </SampleText>
        </Row>
        <Row>
          <TokenName>typography.weight.bold</TokenName>
          <SizeSpec>700</SizeSpec>
          <LineHeightSpec>Navigation links</LineHeightSpec>
          <SampleText $font={typography.font.nav} $weight={typography.weight.bold}>
            PORTFOLIO ABOUT PRESS
          </SampleText>
        </Row>
      </ScaleTable>
    </Section>
  </Container>
);

export { TypographyScale };
