import { Column, ListItem, Spacer } from "@/components";
import { AnimatedOnScroll } from "@/components";

import { Skills } from "./Skills";

/** Maps one skill record and its array index to an animated grid cell. */
const Skill = (s: Skills, idx: number) => (
  <Column $desktop="6-12" $largeDesktop="3-9" key={"skill" + idx}>
    <AnimatedOnScroll animationIn="fadeInUpMedium">
      <ListItem>{s.skill}</ListItem>
      <Spacer />
    </AnimatedOnScroll>
  </Column>
);

export default Skill;
