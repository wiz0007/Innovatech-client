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
      color: "#62f2ff",
      fontSize: "0.88rem",
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}
  >
    <span>Loading System Route...</span>
  </div>
);

const AllRoutes = () => {
  return (
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
  );
};

export default AllRoutes;
