import React, { Component, ReactNode } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    error: false,
  };

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
