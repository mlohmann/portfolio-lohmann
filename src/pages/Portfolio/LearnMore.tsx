import type { LinkType } from "@/types";
import type { DisplaySizeType } from "@/style/sizes";
import LearnMoreWrapper from "./LearnMoreWrapper";
import LearnMoreLink from "./LearnMoreLink";
import ArrowRight from "./ArrowRight";

/** Link a portfolio preview to its project detail route. */
const LearnMore = ({
  url,
  size,
  title,
}: LinkType & DisplaySizeType & { title?: string }) => {
  // Preview callers may pass a full project path; only its final segment is the id.
  const projectId = url.split("/").filter(Boolean).pop();

  return (
    <LearnMoreWrapper>
      <LearnMoreLink
        size={size}
        aria-label={title ? `Learn More about ${title}` : undefined}
        to={`/portfolio/project/${projectId ?? ""}`}
      >
        <span>Learn More</span>
        <ArrowRight aria-hidden="true" />
      </LearnMoreLink>
    </LearnMoreWrapper>
  );
};

export default LearnMore;
