import React, { Suspense, lazy } from "react";
import SEO from "../components/common/SEO";
import ProjectsCelestialHero from "../components/work/ProjectsCelestialHero";
import projectsData, { categories } from "../content/projectsData";
import styles from "./WorkPage.module.scss";

// Lazy-load interactive 3D circular drawer and conversion section
const CircularProjectsDrawer = lazy(() => import("../components/work/CircularProjectsDrawer"));
const WorkConversionSection = lazy(() => import("../components/work/WorkConversionSection"));

const SectionFallback = () => <div style={{ minHeight: "260px" }} aria-hidden="true" />;

const WorkPage = () => {
  return (
    <div className={styles.workPage}>
      <SEO
        title="Work & Case Studies"
        description="Explore RogueAI's portfolio of production web applications, mobile platforms, and UI/UX systems."
      />

      {/* MONUMENTAL IMMERSIVE CELESTIAL HERO (Eager LCP) */}
      <ProjectsCelestialHero />

      {/* 3D CIRCULAR REVOLVING DRAWER SHOWCASE */}
      <section id="projects-gallery" className={styles.gallerySection}>
        <Suspense fallback={<SectionFallback />}>
          <CircularProjectsDrawer
            projects={projectsData}
            categories={categories}
          />
        </Suspense>
      </section>

      {/* BESPOKE WORK CONVERSION SECTION (3 LIVE SELECTABLE CONCEPTS) */}
      <Suspense fallback={<SectionFallback />}>
        <WorkConversionSection />
      </Suspense>
    </div>
  );
};

export default WorkPage;
