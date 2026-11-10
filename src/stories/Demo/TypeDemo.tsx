import styled from "styled-components";

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  FooterText,
  Small,
  Spacer,
  ListItem,
  AdditionalInfo,
} from "@/components";

const TypeWrapper = styled.div`
  color: hotpink;
  background-color: #333;
`;

const PageWrapper = styled.div`
  display: flex;
  margin: auto;
  max-width: 960px;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-between;
  margin-top: 200px;
  margin-bottom: 200px;
`;

/** Storybook sample of the shared semantic heading and body-text treatments. */
const TypeDemo = () => (
  <PageWrapper>
    <TypeWrapper>
      <H1>H1</H1>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <H2>H2</H2>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <H3>H3</H3>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <H4>H4</H4>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <H5>H5</H5>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <H6>H6</H6>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <Paragraph>Paragraph</Paragraph>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <Small>Small</Small>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <FooterText>FooterText</FooterText>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <ListItem>ListItem</ListItem>
    </TypeWrapper>
    <Spacer size="xl" />
    <TypeWrapper>
      <AdditionalInfo>AdditionalInfo</AdditionalInfo>
    </TypeWrapper>
  </PageWrapper>
);

export { TypeDemo };
