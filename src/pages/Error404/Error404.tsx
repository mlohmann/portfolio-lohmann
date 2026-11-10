import { ContentWrapper } from "@/components";
import { ProjectTitle } from "@/pages/Project/ProjectTypography";
import Seo from "@/seo";

/** Fallback page shown when the router cannot match the requested path. */
const Error404 = () => (
  <ContentWrapper>
    <Seo title="Page Not Found" path="/404" />
    <ProjectTitle tabIndex={-1}>Error404</ProjectTitle>
  </ContentWrapper>
);

export default Error404;
