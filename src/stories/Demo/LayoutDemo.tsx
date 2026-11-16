import styled from "styled-components";

import { Row, Column, ContentWrapper } from "@/components/layout";
import { H4, Spacer } from "@/components";
import { colors } from "@/style";

const DemoRow = styled(Row)`
  background: ${colors.subtleBorder};
`;

const DemoColumn = styled(Column)`
  text-align: center;
  background: ${colors.highlight};
  color: ${colors.white};
`;

const SectionHeading = styled(H4)`
  color: ${colors.highlight};
`;

/** Storybook sample of responsive grid spans, including legacy nested-span strings. */
const LayoutDemo = () => (
  <ContentWrapper>
    <Spacer />
    <SectionHeading>Single Columns</SectionHeading>
    <Spacer />
    <DemoRow>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={1} $desktop={1} $tablet={1}>
        Column
      </DemoColumn>
    </DemoRow>
    <Spacer />
    <SectionHeading>Two Column</SectionHeading>
    <Spacer />
    <DemoRow>
      <DemoColumn $largeDesktop={2} $desktop={2} $tablet={2}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={2} $desktop={2} $tablet={2}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={2} $desktop={2} $tablet={2}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={2} $desktop={2} $tablet={2}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={2} $desktop={2} $tablet={2}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={2} $desktop={2} $tablet={2}>
        Column
      </DemoColumn>
    </DemoRow>
    <Spacer />
    <SectionHeading>Three Column</SectionHeading>
    <Spacer />
    <DemoRow>
      <DemoColumn $largeDesktop={3} $desktop={3} $tablet={3}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={3} $desktop={3} $tablet={3}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={3} $desktop={3} $tablet={3}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={3} $desktop={3} $tablet={3}>
        Column
      </DemoColumn>
    </DemoRow>
    <Spacer />
    <SectionHeading>Four Column</SectionHeading>
    <Spacer />
    <DemoRow>
      <DemoColumn $largeDesktop={4} $desktop={4} $tablet={4}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={4} $desktop={4} $tablet={4}>
        Column
      </DemoColumn>
      <DemoColumn $largeDesktop={4} $desktop={4} $tablet={4}>
        Column
      </DemoColumn>
    </DemoRow>
    <Spacer />
    <SectionHeading>Of Columns</SectionHeading>
    <Spacer />
    <DemoRow>
      <DemoColumn $largeDesktop={4}>
        <DemoRow>
          <DemoColumn $largeDesktop="2-4">Column 2 of 4</DemoColumn>
          <DemoColumn $largeDesktop="2-4">Column 2 of 4</DemoColumn>
        </DemoRow>
      </DemoColumn>
      <DemoColumn $largeDesktop={4}>
        <DemoRow>
          <DemoColumn $largeDesktop="1-4">Column 1 of 4</DemoColumn>
          <DemoColumn $largeDesktop="3-4">Column 3 of 4</DemoColumn>
        </DemoRow>
      </DemoColumn>
      <DemoColumn $largeDesktop={4}>
        <DemoRow>
          <DemoColumn $largeDesktop="1-4">Column 1 of 4</DemoColumn>
          <DemoColumn $largeDesktop="1-4">Column 1 of 4</DemoColumn>
          <DemoColumn $largeDesktop="1-4">Column 1 of 4</DemoColumn>
          <DemoColumn $largeDesktop="1-4">Column 1 of 4</DemoColumn>
        </DemoRow>
      </DemoColumn>
    </DemoRow>
    <Spacer size="xxl" />
  </ContentWrapper>
);

export { LayoutDemo };
