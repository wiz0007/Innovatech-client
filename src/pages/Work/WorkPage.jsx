import React from "react";
import SEO from "../../components/common/SEO";
import ProjectsCelestialHero from "../../components/common/ProjectsCelestialHero";
import CircularProjectsDrawer from "../../components/common/CircularProjectsDrawer";
import WorkConversionSection from "../../components/common/WorkConversionSection";
import projectsData, { categories } from "../../content/projectsData";
import styles from "./WorkPage.module.scss";

const WorkPage = () => {
  return (
    <div className={styles.workPage}>
      <SEO
        title="Work & Case Studies"
        description="Explore RogueAI's portfolio of production web applications, mobile platforms, and UI/UX systems."
      />

      {/* MONUMENTAL IMMERSIVE CELESTIAL HERO */}
      <ProjectsCelestialHero />

      {/* 3D CIRCULAR REVOLVING DRAWER SHOWCASE */}
      <section id="projects-gallery" className={styles.gallerySection}>
        <CircularProjectsDrawer
          projects={projectsData}
          categories={categories}
        />
      </section>

      {/* BESPOKE WORK CONVERSION SECTION (3 LIVE SELECTABLE CONCEPTS) */}
      <WorkConversionSection />
    </div>
  );
};

export default WorkPage;
