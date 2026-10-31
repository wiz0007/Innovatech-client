import React, { useRef } from "react";
import SEO from "../components/common/SEO";
import CelestialHero from "../components/home/CelestialHero";
import CircularCapabilitiesDrawer from "../components/home/CircularCapabilitiesDrawer";
import SelectedWorkShowcase from "../components/home/SelectedWorkShowcase";
import DeliveryProcessPipeline from "../components/home/DeliveryProcessPipeline";
import EngineeringStripe from "../components/home/EngineeringStripe";
import CTASection from "../components/common/CTASection";
import servicesData from "../content/servicesData";
import projectsData from "../content/projectsData";
import processSteps from "../content/processData";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const homeRef = useRef(null);

  const featuredProjects = projectsData.filter(
    (p) => p.featured || p.id === "my-kart" || p.id === "book-reading" || p.id === "movie-app"
  );

  return (
    <div ref={homeRef} className={styles.homeContainer}>
      <SEO
        title="Next-Gen Web, Mobile & AI Product Engineering"
        description="RogueAI engineers high-performance web applications, fluid mobile ecosystems, and practical AI integrations for ambitious companies."
      />

      {/* CELESTIAL PORTAL BRAND HERO */}
      <CelestialHero />

      {/* CAPABILITIES SECTION - 3D CAROUSEL (LAPTOP) & PINNED SCROLL FADE (MOBILE) */}
      <section id="services-section" className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <CircularCapabilitiesDrawer services={servicesData} />
        </div>
      </section>

      {/* SELECTED WORK SHOWCASE (WITH SPOTLIGHT STAGE, EDITORIAL ROWS & DEVICE DECK) */}
      <section id="work-section" className={styles.workSection}>
        <div className={styles.sectionContainer}>
          <SelectedWorkShowcase projects={featuredProjects} />
        </div>
      </section>

      {/* 4-PHASE DELIVERY PROCESS */}
      <section id="process-section" className={styles.processSection}>
        <div className={styles.sectionContainer}>
          <DeliveryProcessPipeline steps={processSteps} />
        </div>
      </section>

      {/* ENGINEERING STANDARDS & LEADERSHIP TEASER STRIPE */}
      <EngineeringStripe />

      {/* CONVERSION CTA */}
      <CTASection />
    </div>
  );
};

export default HomePage;
