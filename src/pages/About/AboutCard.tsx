import { H5, Spacer } from "@/components";
import { AboutCardParagraph } from "./AboutTypography";
import type { LayoutType } from "@/types";
import AboutDot from "./AboutDot";
import AboutCardWrapper from "./AboutCardWrapper";

type AboutCardProps = LayoutType & {
  /** Organization, role, or location shown as the entry heading. */
  title: string;
  /** Supporting description beneath the heading. */
  text: string;
};

/** Display one timeline entry and orient its marker for the selected layout. */
const AboutCard = ({ title, text, displayLayout }: AboutCardProps) => (
  <>
    <AboutCardWrapper displayLayout={displayLayout}>
      <H5 as="h3">{title}</H5>
      <Spacer size="sm" />
      <AboutCardParagraph>{text}</AboutCardParagraph>
    </AboutCardWrapper>
    <AboutDot displayLayout={displayLayout} />
  </>
);

export default AboutCard;
