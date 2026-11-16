import { Column, ListItem, Spacer } from "@/components";
import { AnimatedOnScroll } from "@/components";
import type { SkillType } from "./Skills";

/** Maps one skill record to an animated grid cell. */
const Skill = (s: SkillType) => (
  <Column $desktop="6-12" $largeDesktop="3-9" key={s.skill}>
    <AnimatedOnScroll animationIn="fadeInUpMedium">
      <ListItem>{s.skill}</ListItem>
      <Spacer />
    </AnimatedOnScroll>
  </Column>
);

export default Skill;
