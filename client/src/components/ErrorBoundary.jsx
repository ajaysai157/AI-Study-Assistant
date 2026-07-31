import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "./ui/Button";

function ErrorFallback({ error, resetError }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
        <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">Something went wrong</h2>
      <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={resetError} className="mt-6">
        <RefreshCw size={16} />
        Try Again
      </Button>
    </div>
  );
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} resetError={() => this.handleReset()} />;
    }
    return this.props.children;
  }
}
