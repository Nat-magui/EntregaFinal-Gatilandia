import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error){ return { hasError: true, error }; }
  componentDidCatch(error, info){ console.error("ErrorBoundary:", error, info); }
  render(){
    if (this.state.hasError) {
      return (
        <main style={{ padding: 16 }}>
          <h2>Ups… algo salió mal</h2>
          <p className="muted">{String(this.state.error?.message || "Error desconocido")}</p>
        </main>
      );
    }
    return this.props.children;
  }
}
