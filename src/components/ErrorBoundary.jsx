import { Component } from "react";
import Icon from "@mdi/react";
import { mdiAlertCircle, mdiReload } from "@mdi/js";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReload = () => {
    // Reset error state and reload the component
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload the entire page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="bg-bg flex min-h-screen items-center justify-center p-4">
          <div className="border-dash w-full max-w-md rounded-2xl border-2 border-dashed p-8 text-center text-white">
            <Icon
              path={mdiAlertCircle}
              size={3}
              className="text-red mx-auto mb-6"
            />
            <h1 className="mb-4 text-2xl font-bold">
              Oops! Something went wrong
            </h1>
            <p className="text-gray mb-6 text-sm">
              {this.props.fallbackMessage ||
                "We encountered an unexpected error. Please try reloading the page."}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="bg-accent hover:bg-secondary hover:text-accent flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-mono font-bold text-black transition-all duration-500 hover:shadow-[0_0_10px_#AE9B84]"
              >
                <Icon path={mdiReload} size={0.8} />
                Reload Page
              </button>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-gray mt-4 text-left text-xs">
                  <summary className="cursor-pointer font-mono hover:text-white">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-2 rounded bg-black/30 p-2 break-words whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
