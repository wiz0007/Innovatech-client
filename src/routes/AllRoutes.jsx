import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";

// Route-level code-splitting
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const ServicesPage = lazy(() => import("../pages/Services/ServicesPage"));
const WorkPage = lazy(() => import("../pages/Work/WorkPage"));
const ProcessPage = lazy(() => import("../pages/Process/ProcessPage"));
const AboutPage = lazy(() => import("../pages/About/AboutPage"));
const InquiriesPage = lazy(() => import("../pages/Inquiries/InquiriesPage"));
const ContactPage = lazy(() => import("../pages/Contact/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFoundPage"));

const RouteFallback = () => (
  <div
    style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#e2e8f0",
      fontSize: "0.88rem",
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}
  >
    <span>Loading System Route...</span>
  </div>
);

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("System Route Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
            color: "#ffffff",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Module System Initialization Interrupted
          </h2>
          <p style={{ color: "#a1a1aa", maxWidth: "480px", fontSize: "0.95rem" }}>
            The requested application module encountered an unexpected runtime state.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              padding: "0.65rem 1.6rem",
              background: "#ffffff",
              color: "#050507",
              border: "none",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Reload Route
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AllRoutes = () => {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </RouteErrorBoundary>
  );
};

export default AllRoutes;
