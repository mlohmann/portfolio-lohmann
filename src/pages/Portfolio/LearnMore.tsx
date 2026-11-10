import { LinkType } from "@/types";
import { DisplaySizeType } from "@/style/sizes";
import LearnMoreWrapper from "./LearnMoreWrapper";
import LearnMoveLink from "./LearnMoveLink";
import ArrowRight from "./ArrowRight";

/** Link a portfolio preview to its project detail route. */
const LearnMore = ({ url, size }: LinkType & DisplaySizeType) => {
  // Preview callers may pass a full project path; only its final segment is the id.
  const projectId = url.split("/").filter(Boolean).pop();

  return (
    <LearnMoreWrapper>
      <LearnMoveLink
        size={size}
        from="/"
        to={`/portfolio/project/${projectId ?? ""}`}
        tabIndex={0}
      >
        Learn More
      </LearnMoveLink>
      <ArrowRight />
    </LearnMoreWrapper>
  );
};

export default LearnMore;
