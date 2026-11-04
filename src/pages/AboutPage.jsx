import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import AboutCelestialHero from "../components/about/AboutCelestialHero";
import StudioTickerBanner from "../components/about/StudioTickerBanner";
import SectionHeader from "../components/common/SectionHeader";
import TiltCard from "../components/common/TiltCard";
import aboutImg from "../assets/About.webp";
import styles from "./AboutPage.module.scss";

// Lazy-load lower narrative sections
const AboutValuesUCarousel = lazy(() => import("../components/about/AboutValuesUCarousel"));
const LeadershipShowcase = lazy(() => import("../components/about/LeadershipShowcase"));
const CTASection = lazy(() => import("../components/common/CTASection"));

const SectionFallback = () => <div style={{ minHeight: "180px" }} aria-hidden="true" />;

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <SEO
        title="About RogueAI & Team"
        description="Learn about RogueAI's mission, engineering standards, and the specialized leadership team building next-generation digital products."
      />

      {/* Above-the-fold Eager Hero */}
      <AboutCelestialHero />

      {/* LIVE STUDIO TELEMETRY & VERIFIED PROJECTS MARQUEE */}
      <StudioTickerBanner />

      {/* STORY & MISSION */}
      <section className={styles.storySection} id="about-narrative">
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyCopy}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.storyEyebrow}>Studio Philosophy</span>
              <h2 className={styles.storyTitle}>Code engineered as an enduring asset.</h2>
              <p className={styles.storyText}>
                Founded by product engineers and designers, RogueAI partners with visionary teams to build production-grade web, mobile, and AI software with deterministic architecture, strict code quality, and zero junior delegation.
              </p>

              <div className={styles.storyPills}>
                <span className={styles.storyPill}>Zero Junior Handoffs</span>
                <span className={styles.storyPill}>Deterministic Milestones</span>
                <span className={styles.storyPill}>100% Code Ownership</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.storyMedia}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard className={styles.imageTiltWrapper} maxTilt={6}>
                <div className={styles.imageCard}>
                  <img src={aboutImg} alt="RogueAI Architecture & Design" loading="lazy" decoding="async" />
                  <div className={styles.imageOverlayBadge}>
                    <span>RogueAI Core / Systems & Design</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES & CULTURE (COMPACT ROTATING U-CONVEYOR) */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <Suspense fallback={<SectionFallback />}>
            <AboutValuesUCarousel />
          </Suspense>
        </div>
      </section>

      {/* LEADERSHIP ARCHITECTURE SHOWCASE */}
      <section className={styles.teamSection} id="leadership">
        <div className={styles.container}>
          <SectionHeader
            title="Leadership"
            subtitle="The principal engineers and designers driving RogueAI."
            centered
            className={styles.teamSectionHeader}
          />

          <Suspense fallback={<SectionFallback />}>
            <LeadershipShowcase />
          </Suspense>
        </div>
      </section>

      {/* CONVERSION CTA */}
      <Suspense fallback={<SectionFallback />}>
        <CTASection
          title="Want to build something impactful with RogueAI?"
          description="We are currently booking technical discovery sessions for upcoming quarters."
          buttonText="Get in Touch"
        />
      </Suspense>
    </div>
  );
};

export default AboutPage;
