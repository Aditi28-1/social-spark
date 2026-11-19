import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected error occurred.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F7FA] flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-3xl bg-white border border-[#15152B]/12 p-8 text-center shadow-sm">
            <p className="font-mono text-xs text-[#FF7A30]">Application Notice</p>
            <h1 className="font-display font-bold text-2xl text-[#15152B] mt-2">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-[#15152B]/75 leading-relaxed">
              We hit an unexpected issue while loading this view. Please reload the page to try
              again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center justify-center rounded-xl spark-gradient-bg px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              Reload SocialSpark
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
