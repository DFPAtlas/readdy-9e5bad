import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-screen items-center justify-center bg-background-50 px-4">
          <div className="w-full max-w-md rounded-xl border border-[#ff2e88]/20 bg-background-100/50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff2e88]/10">
              <i className="ri-error-warning-line text-xl text-[#ff2e88]" />
            </div>
            <h1 className="mb-2 text-lg text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Something went wrong
            </h1>
            <p className="mb-4 text-xs text-foreground-400">
              The page encountered an error. Try refreshing or go back home.
            </p>
            <p className="mb-4 rounded bg-background-50 p-2 text-left text-[10px] font-mono text-foreground-500">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-block whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="ml-2 inline-block whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200/40"
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}