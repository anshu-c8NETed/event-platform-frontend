import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <FaExclamationTriangle className="mx-auto text-6xl text-red-600 mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We're sorry, but something unexpected happened. Please try again.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 text-left">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">
                    Error Details:
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-semibold text-red-800 dark:text-red-400">
                        Stack Trace
                      </summary>
                      <pre className="mt-2 text-xs text-red-700 dark:text-red-300 overflow-auto max-h-64">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <FaHome className="mr-2" />
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;