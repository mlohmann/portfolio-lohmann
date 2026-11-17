import { AnimatedOnScroll } from "@/components";
import { useContent } from "@/hooks";
import { Row, Column, Spacer, Loading, AdditionalInfo } from "@/components";
import SkillsWrapper from "./SkillsWrapper";
import Skill from "./Skill";
import { ErrorDisplay } from "@/components/ErrorDisplay";

type SkillType = {
  /** Human-readable skill label. */
  skill: string;
  /** Proficiency metadata retained for the content model. */
  level: string;
};

/** Load and render the skills collection in the About page. */
const Skills = () => {
  const { data, isLoading, error } = useContent<{ skills: SkillType[] }>(
    "skills",
  );

  if (error) return <ErrorDisplay>{error.toString()}</ErrorDisplay>;
  if (isLoading || !data) return <Loading />;

  return (
    <Row>
      <Column $largeDesktop={2}>
        <AnimatedOnScroll animationIn="fadeIn">
          <AdditionalInfo as="h2">Skills</AdditionalInfo>
          <Spacer />
        </AnimatedOnScroll>
      </Column>
      <Column $largeDesktop={9}>
        <SkillsWrapper>{data.skills.map(Skill)}</SkillsWrapper>
      </Column>
      <Column $largeDesktop={1} />
    </Row>
  );
};

export default Skills;

export type { SkillType };
