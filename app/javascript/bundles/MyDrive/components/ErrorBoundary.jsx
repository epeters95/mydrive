import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <span>There was an error in the client application:</span>
          <br/>
          <span>{this.state.error}</span>
        </div>
        );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;