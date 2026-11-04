import React, { Suspense, lazy } from "react";
import SEO from "../components/common/SEO";
import CelestialHero from "../components/home/CelestialHero";
import servicesData from "../content/servicesData";
import projectsData from "../content/projectsData";
import processSteps from "../content/processData";
import styles from "./HomePage.module.scss";

// Lazy-loaded below-the-fold features to protect entry payload
const CircularCapabilitiesDrawer = lazy(() => import("../components/home/CircularCapabilitiesDrawer"));
const SelectedWorkShowcase = lazy(() => import("../components/home/SelectedWorkShowcase"));
const DeliveryProcessPipeline = lazy(() => import("../components/home/DeliveryProcessPipeline"));
const EngineeringStripe = lazy(() => import("../components/home/EngineeringStripe"));
const CTASection = lazy(() => import("../components/common/CTASection"));

const SectionFallback = () => <div style={{ minHeight: "180px" }} aria-hidden="true" />;

const HomePage = () => {
  const featuredProjects = projectsData.filter(
    (p) => p.featured || p.id === "my-kart" || p.id === "book-reading" || p.id === "movie-app"
  );

  return (
    <div className={styles.homeContainer}>
      <SEO
        title="Next-Gen Web, Mobile & AI Product Engineering"
        description="RogueAI engineers high-performance web applications, fluid mobile ecosystems, and practical AI integrations for ambitious companies."
      />

      {/* CELESTIAL PORTAL BRAND HERO (Eagerly Loaded LCP Anchor) */}
      <CelestialHero />

      {/* CAPABILITIES SECTION - 3D CAROUSEL (LAPTOP) & PINNED SCROLL FADE (MOBILE) */}
      <section id="services-section" className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <Suspense fallback={<SectionFallback />}>
            <CircularCapabilitiesDrawer services={servicesData} />
          </Suspense>
        </div>
      </section>

      {/* SELECTED WORK SHOWCASE (WITH SPOTLIGHT STAGE, EDITORIAL ROWS & DEVICE DECK) */}
      <section id="work-section" className={styles.workSection}>
        <div className={styles.sectionContainer}>
          <Suspense fallback={<SectionFallback />}>
            <SelectedWorkShowcase projects={featuredProjects} />
          </Suspense>
        </div>
      </section>

      {/* 4-PHASE DELIVERY PROCESS */}
      <section id="process-section" className={styles.processSection}>
        <div className={styles.sectionContainer}>
          <Suspense fallback={<SectionFallback />}>
            <DeliveryProcessPipeline steps={processSteps} />
          </Suspense>
        </div>
      </section>

      {/* ENGINEERING STANDARDS & LEADERSHIP TEASER STRIPE */}
      <Suspense fallback={<SectionFallback />}>
        <EngineeringStripe />
      </Suspense>

      {/* CONVERSION CTA */}
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
    </div>
  );
};

export default HomePage;
