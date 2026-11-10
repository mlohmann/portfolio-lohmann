import { ReactNode } from "react";
import styled from "styled-components";
import { colors, typography, sizes } from "@/style";

type Props = {
  children: ReactNode;
};

/** Error-message surface shared by route and content-loading failures. */
const StyledError = styled.div`
  color: ${colors.textHighlight};
  font-family: ${typography.font.body};
  font-size: ${typography.sizing.p};
  padding: ${sizes.spacing.sm}px;
  border-left: 3px solid ${colors.textHighlight};
  background: ${colors.errorBackground};
  margin: ${sizes.spacing.sm}px 0;

  ${sizes.query.mobile} {
    font-size: ${typography.sizing.small};
  }
`;

/**
 * Accessible container with alert semantics for readable route and content-loading error
 * messages.
 */
const ErrorDisplay = ({ children }: Props) => (
  <StyledError role="alert" aria-live="assertive" aria-atomic="true">
    {children}
  </StyledError>
);

export default ErrorDisplay;
