import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorDisplay } from "@/components/ErrorDisplay";

/** Descendant content and an optional replacement for the default error display. */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Captured render failure retained until the boundary is remounted. */
interface State {
  hasError: boolean;
  error: Error | null;
}

/** Prevent a descendant render error from taking down the shared page shell. */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /** Switches to fallback rendering when a descendant throws during rendering. */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /** Log caught details in development while rendering a user-facing fallback. */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  /** Returns descendant content, the supplied fallback, or the shared error message. */
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDisplay>
          {this.state.error?.message ||
            "Something went wrong. Please try refreshing the page."}
        </ErrorDisplay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
