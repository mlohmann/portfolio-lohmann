import { AnimatedOnScroll } from "@/components";
import { Paragraph, Spacer } from "@/components";
import { IntroTitle } from "./AboutTypography";

/** Static introduction heading and summary for the About page. */
const Intro = () => (
  <AnimatedOnScroll animationIn="fadeIn">
    <div>
      <IntroTitle tabIndex={-1}>Welcome To My Site!</IntroTitle>
      <Spacer />
      <Paragraph>
        I&apos;m a Senior Frontend Engineer specializing in the web
      </Paragraph>
    </div>
  </AnimatedOnScroll>
);

export default Intro;
