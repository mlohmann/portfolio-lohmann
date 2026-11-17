import { Fragment } from "react";

import { useContent } from "@/hooks";
import {
  AnimatedOnScroll,
  Spacer,
  Column,
  AdditionalInfo,
  HideDesktop,
  Loading,
} from "@/components";
import AboutCard from "./AboutCard";
import AboutRow from "./AboutRow";
import AboutTimeline from "./AboutTimeline";
import { ErrorDisplay } from "@/components/ErrorDisplay";

/** Personal timeline record returned by the `bio` content collection. */
type BioType = {
  years?: string;
  location: string;
  text: string;
};

/** Loads and displays the personal timeline in reverse chronological order. */
const Bio = () => {
  const { data, isLoading, error } = useContent<{ bio: BioType[] }>("bio");

  if (error) return <ErrorDisplay>{error.toString()}</ErrorDisplay>;
  if (isLoading || !data) return <Loading />;

  // Reverse a copy so presentation order does not mutate cached query data.
  const reversed = data.bio ? [...data.bio].reverse() : [];

  return (
    <>
      <Spacer />
      <AnimatedOnScroll animationIn="fadeIn">
        <AdditionalInfo as="h2">Personal Timeline</AdditionalInfo>
      </AnimatedOnScroll>
      <Spacer />
      <AboutTimeline>
        {reversed.map((item: BioType, idx: number) => {
          const displayLayout = idx % 2 === 0 ? "left" : "right";

          return (
            <Fragment key={`${item.location}-${item.years ?? idx}`}>
              <AboutRow displayLayout={displayLayout}>
                <Column $desktop={1} $largeDesktop={1} />
                <Column $desktop={5} $largeDesktop={5}>
                  <AnimatedOnScroll animationIn="fadeInUpMedium">
                    <AboutCard
                      displayLayout={displayLayout}
                      title={item.location}
                      text={item.text}
                    />
                  </AnimatedOnScroll>
                </Column>
                <Column $desktop={5} $largeDesktop={5} />
                <Column $desktop={1} $largeDesktop={1} />
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

export default Bio;
