import { Fragment } from "react";
import { useContent } from "@/hooks";
import {
  AnimatedOnScroll,
  Spacer,
  Column,
  AdditionalInfo,
  HideDesktop,
} from "@/components";
import AboutCard from "./AboutCard";
import AboutRow from "./AboutRow";
import AboutTimeline from "./AboutTimeline";
import { Loading } from "@/components";
import { ErrorDisplay } from "@/components/ErrorDisplay";

/** Employment record returned by the `work` content collection. */
type WorkType = {
  years?: string;
  company: string;
  title: string;
};

/** Loads and displays professional experience in reverse chronological order. */
const Work = () => {
  const { data, isLoading, error } = useContent<{ work: WorkType[] }>("work");

  if (error) return <ErrorDisplay>{error.toString()}</ErrorDisplay>;
  if (isLoading || !data) return <Loading />;

  // Reverse a copy so presentation order does not mutate cached query data.
  const reversed = data.work ? [...data.work].reverse() : [];

  return (
    <>
      <Spacer />
      <AnimatedOnScroll animationIn="fadeIn">
        <AdditionalInfo as="h2">Professional Timeline</AdditionalInfo>
      </AnimatedOnScroll>
      <Spacer />
      <AboutTimeline>
        {reversed.map((company: WorkType, idx: number) => {
          const displayLayout = idx % 2 === 0 ? "left" : "right";

          return (
            <Fragment key={`work-${idx}`}>
              <AboutRow displayLayout={displayLayout}>
                <Column $tablet={1} $desktop={1} $largeDesktop={1} />
                <Column $tablet={5} $desktop={5} $largeDesktop={5}>
                  <AnimatedOnScroll animationIn="fadeInUpMedium">
                    <AboutCard
                      displayLayout={displayLayout}
                      title={company.company}
                      text={company.title}
                    />
                  </AnimatedOnScroll>
                </Column>
                <Column $tablet={5} $desktop={5} $largeDesktop={5} />
                <Column $tablet={1} $desktop={1} $largeDesktop={1} />
              </AboutRow>
              <HideDesktop>
                <Spacer />
              </HideDesktop>
            </Fragment>
          );
        })}
      </AboutTimeline>
    </>
  );
};

export default Work;
