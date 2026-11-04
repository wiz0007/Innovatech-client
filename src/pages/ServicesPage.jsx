import React, { Suspense, lazy } from "react";
import SEO from "../components/common/SEO";
import ServicesCelestialHero from "../components/services/ServicesCelestialHero";
import styles from "./ServicesPage.module.scss";

// Lazy-load below-the-fold showcase and CTA
const ServicesFadeShowcase = lazy(() => import("../components/services/ServicesFadeShowcase"));
const CTASection = lazy(() => import("../components/common/CTASection"));

const SectionFallback = () => <div style={{ minHeight: "240px" }} aria-hidden="true" />;

const ServicesPage = () => {
  return (
    <div className={styles.servicesPage}>
      <SEO
        title="Services & Capabilities"
        description="Explore RogueAI's digital product engineering capabilities across Web Applications, Mobile Ecosystems, AI Solutions, Custom Software, and Modernization."
      />

      {/* MONUMENTAL IMMERSIVE CELESTIAL SERVICES HERO (Eager LCP) */}
      <ServicesCelestialHero />

      {/* SCROLL-PINNED FADE-IN / FADE-OUT SERVICES SHOWCASE (5 ARCHITECTURAL SERVICES) */}
      <div className={styles.showcaseSection}>
        <Suspense fallback={<SectionFallback />}>
          <ServicesFadeShowcase />
        </Suspense>
      </div>

      {/* TAILORED SERVICES CONVERSION CTA */}
      <Suspense fallback={<SectionFallback />}>
        <CTASection
          badge="Engineered for Scalability"
          title="Have a complex platform or technical challenge?"
          subtitle="From greenfield enterprise architecture to low-latency AI and system modernization, we deploy directly into your stack."
          contactLabel="Architecture Discovery"
          contactDesc="Direct 30-minute technical roadmap session with lead systems architects. Zero sales friction."
          contactBtnText="Schedule Technical Discovery"
          contactLink="/contact"
          exploreLabel="Verified Performance"
          exploreDesc="Inspect benchmarked production cases across web, mobile, and machine intelligence platforms."
          exploreBtnText="Explore Client Work"
          exploreLink="/work"
        />
      </Suspense>
    </div>
  );
};

export default ServicesPage;
