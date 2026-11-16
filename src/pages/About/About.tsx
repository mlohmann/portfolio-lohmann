import { ContentWrapper, HideDesktop, Loading, Spacer } from "@/components";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import Bio from "./Bio";
import Clients from "./Clients";
import Intro from "./Intro";
import Skills from "./Skills";
import Work from "./Work";
import { useContent } from "@/hooks";
import { sizes } from "@/style";
import Seo from "@/seo";

/** Composes the professional profile, timeline, skills, and clients sections. */
const About = () => {
  // Start all collections together, then mount sections from the populated cache.
  const work = useContent("work");
  const skills = useContent("skills");
  const clients = useContent("clients");
  const bio = useContent("bio");
  const pending = [work, skills, clients, bio].some((query) => query.isLoading);
  const failed = [work, skills, clients, bio].find((query) => query.error)?.error;

  return (
    <>
      <Seo
        title="About"
        description="Learn about Matt Lohmann's experience, clients, skills, and work as a Senior Frontend Engineer."
        path="/about"
      />
      <ContentWrapper
        style={
          pending ? { minHeight: `calc(100vh + ${sizes.footer}px)` } : undefined
        }
      >
        <HideDesktop>
          <Spacer size="xl" />
        </HideDesktop>
        <Intro />
        <Spacer />
        {pending ? (
          <Loading />
        ) : failed ? (
          <ErrorDisplay>{failed.toString()}</ErrorDisplay>
        ) : (
          <>
            <Work />
            <Spacer size="xl" />
            <Skills />
            <Spacer size="xl" />
            <Clients />
            <Spacer size="xl" />
            <Bio />
            <Spacer size="xxl" />
          </>
        )}
      </ContentWrapper>
    </>
  );
};

export default About;
