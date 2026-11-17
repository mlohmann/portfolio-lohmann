import styled from "styled-components";
import { colors, sizes, typography } from "@/style";

interface ColorItem {
  name: string;
  token: string;
  value: string;
  description: string;
  contrast: string;
  textColor?: string;
  border?: boolean;
}

const tokens: { category: string; items: ColorItem[] }[] = [
  {
    category: "Brand & Core Palette",
    items: [
      {
        name: "Imperial Red",
        token: "colors.highlight / colors.tertiary",
        value: "#e63746",
        description: "Primary brand accent, interactive links, animated underlines, and focus rings.",
        contrast: "5.0:1 on #000000 (WCAG AA Normal / AAA Large)",
        textColor: "#ffffff",
      },
      {
        name: "Pure Black",
        token: "colors.black / colors.backgroundPrimary",
        value: "#000000",
        description: "Foundational page canvas, primary background surface.",
        contrast: "21.0:1 with Pure White",
        textColor: "#ffffff",
        border: true,
      },
      {
        name: "Pure White",
        token: "colors.white / colors.textPrimary",
        value: "#ffffff",
        description: "Primary typography, high-contrast headings, icons, and card surfaces.",
        contrast: "21.0:1 with Pure Black (WCAG AAA)",
        textColor: "#000000",
      },
      {
        name: "Faded White",
        token: "colors.fadedWhite",
        value: "rgba(255, 255, 255, 0.5)",
        description: "Secondary typography, dates, subtitle text, and muted metadata.",
        contrast: "5.3:1 on #000000 (WCAG AA)",
        textColor: "#000000",
      },
      {
        name: "Almost Black",
        token: "colors.almostBlack",
        value: "#222222",
        description: "Subtle dark card elevation and interactive controls.",
        contrast: "1.3:1 on #000000",
        textColor: "#ffffff",
      },
    ],
  },
  {
    category: "Semantic UI & Feedback",
    items: [
      {
        name: "Action Background",
        token: "colors.actionBackground",
        value: "#cf2636",
        description: "Solid high-contrast anchor fill for primary action and retry buttons.",
        contrast: "5.27:1 with #ffffff text (WCAG AA)",
        textColor: "#ffffff",
      },
      {
        name: "Footer Background",
        token: "colors.footerBackground",
        value: "#cf2636",
        description: "Dedicated solid anchor surface for site footer.",
        contrast: "5.27:1 with #ffffff text (WCAG AA)",
        textColor: "#ffffff",
      },
      {
        name: "Error Background",
        token: "colors.errorBackground",
        value: "rgba(207, 38, 54, 0.1)",
        description: "Tinted background for inline error containers and retry banners.",
        contrast: "Subtle tint on dark canvas",
        textColor: "#ffffff",
      },
      {
        name: "Menu Scrim",
        token: "colors.menuScrim",
        value: "rgba(0, 0, 0, 0.85)",
        description: "Full-viewport backdrop dimming layer during drawer open state.",
        contrast: "85% opacity overlay",
        textColor: "#ffffff",
      },
      {
        name: "Subtle Border",
        token: "colors.subtleBorder",
        value: "rgba(255, 255, 255, 0.25)",
        description: "Divider lines, mobile menu separators, and layout outlines.",
        contrast: "25% alpha white rule",
        textColor: "#ffffff",
      },
      {
        name: "Loading Cube",
        token: "colors.loading",
        value: "#333333",
        description: "Folding-cube spinner geometry and indeterminate loading indicators.",
        contrast: "Subdued neutral accent",
        textColor: "#ffffff",
      },
      {
        name: "Timeline Marker",
        token: "colors.timelineMarker",
        value: "#808080",
        description: "Subtle neutral marker for timeline nodes on About route.",
        contrast: "Accessible milestone indicator",
        textColor: "#ffffff",
      },
    ],
  },
];

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${sizes.spacing.md}px;
`;

const Card = styled.div`
  background: ${colors.almostBlack};
  border: 1px solid ${colors.subtleBorder};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Swatch = styled.div<{ $bg: string; $textColor?: string; $border?: boolean }>`
  height: 96px;
  background: ${({ $bg }) => $bg};
  color: ${({ $textColor }) => $textColor || "#fff"};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: ${sizes.spacing.xs}px ${sizes.spacing.sm}px;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: bold;
  ${({ $border }) => $border && `border-bottom: 1px solid ${colors.subtleBorder};`}
`;

const CardBody = styled.div`
  padding: ${sizes.spacing.sm}px;
  display: flex;
  flex-direction: column;
  gap: ${sizes.spacing.xs}px;
  flex: 1;
`;

const ColorName = styled.h3`
  font-family: ${typography.font.header};
  font-size: ${typography.sizing.h6};
  text-transform: uppercase;
  margin: 0;
`;

const TokenCode = styled.code`
  font-family: monospace;
  font-size: 0.8rem;
  color: ${colors.highlight};
`;

const ValueCode = styled.code`
  font-family: monospace;
  font-size: 0.75rem;
  color: ${colors.fadedWhite};
`;

const Description = styled.p`
  font-size: 0.85rem;
  line-height: 1.4;
  color: ${colors.white};
  margin-top: 4px;
`;

const ContrastBadge = styled.span`
  margin-top: auto;
  font-size: 0.75rem;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  color: ${colors.fadedWhite};
  display: inline-block;
`;

/** Living Storybook showcase component for design token colors. */
const ColorTokens = () => (
  <Container>
    <Header>
      <Title>Color System & Tokens</Title>
      <Subtitle>
        Minimalist high-contrast palette rooted in pure black, pure white, and vibrant Imperial Red.
      </Subtitle>
    </Header>

    {tokens.map((group) => (
      <Section key={group.category}>
        <SectionTitle>{group.category}</SectionTitle>
        <Grid>
          {group.items.map((item) => (
            <Card key={item.token}>
              <Swatch $bg={item.value} $textColor={item.textColor} $border={item.border}>
                {item.value}
              </Swatch>
              <CardBody>
                <ColorName>{item.name}</ColorName>
                <TokenCode>{item.token}</TokenCode>
                <ValueCode>{item.value}</ValueCode>
                <Description>{item.description}</Description>
                <ContrastBadge>{item.contrast}</ContrastBadge>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Section>
    ))}
  </Container>
);

export { ColorTokens };
