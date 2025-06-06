import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('SmartVisualizer Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full bg-dark-surface rounded-xl border border-dark-border">
          <div className="text-center p-6">
            <ExclamationTriangleIcon className="h-12 w-12 text-warning-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Visualization Error</h3>
            <p className="text-gray-400 text-sm mb-4">
              {this.state.error?.message || 'An error occurred while rendering the visualization'}
            </p>
            <Button
              size="sm"
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;