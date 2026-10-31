import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./ServicesCelestialHero.module.scss";

const ROTATING_SUBHEADINGS = [
  "Full-Lifecycle Product Architecture",
  "Sub-Second Web & Cloud Engines",
  "Fluid 60FPS Reactive Mobile Systems",
  "Applied AI & High-Throughput Pipelines",
];

const ServicesCelestialHero = () => {
  const [subheadingIdx, setSubheadingIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubheadingIdx((prev) => (prev + 1) % ROTATING_SUBHEADINGS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById("services-details");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Monumental Celestial Services Hero">
      {/* 1. Deep Space Atmospheric Radiant Glow */}
      <div className={styles.ambientBacklight} aria-hidden="true" />

      {/* 2. Monumental Celestial Portal Arc */}
      <div className={styles.arcContainer} aria-hidden="true">
        <svg
          className={styles.portalArcSvg}
          viewBox="0 0 1400 800"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="servSilverDeepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.45" />
              <stop offset="15%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="servSilverMidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.75" />
              <stop offset="20%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="servSilverCoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
            </linearGradient>

            <radialGradient id="servSilverFlareLeft" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="servSilverFlareRight" cx="65%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            <filter id="servSupernovaBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <filter id="servBloomBlur" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
            <filter id="servCoreBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="servFilamentBlur" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Layer 1: Volumetric Silver Outer Halo */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#servSilverDeepGrad)"
            strokeWidth="140"
            strokeLinecap="round"
            filter="url(#servSupernovaBlur)"
            opacity="0.88"
          />

          {/* Layer 2: Radiant Silver & Chrome Mid Bloom */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#servSilverMidGrad)"
            strokeWidth="60"
            strokeLinecap="round"
            filter="url(#servBloomBlur)"
            opacity="0.94"
          />

          {/* Layer 3: Blazing Core Beam */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#servSilverCoreGrad)"
            strokeWidth="22"
            strokeLinecap="round"
            filter="url(#servCoreBlur)"
            opacity="0.98"
          />

          {/* Layer 4: Diffused Incandescent Filament */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#servFilamentBlur)"
            opacity="0.96"
          />

          <ellipse cx="120" cy="-20" rx="240" ry="260" fill="url(#servSilverFlareLeft)" />
          <ellipse cx="1280" cy="-20" rx="240" ry="260" fill="url(#servSilverFlareRight)" />
        </svg>
      </div>

      {/* 3. Subtle Perspective Floor Grid */}
      <div className={styles.perspectiveFloorGrid} aria-hidden="true" />
      <div className={styles.bottomFadeMelter} aria-hidden="true" />

      {/* ================= FOREGROUND MONUMENTAL CONTENT ================= */}
      <div className={styles.centerContent}>
        {/* Monumental Liquid Silver & Chrome Brand Title */}
        <motion.h1
          className={styles.monumentalTitle}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>S</span>
          <span>E</span>
          <span>R</span>
          <span>V</span>
          <span>I</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
        </motion.h1>

        {/* Dynamic Switching Subheadings */}
        <div className={styles.subheadingStage}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={ROTATING_SUBHEADINGS[subheadingIdx]}
              className={styles.rotatingHeadline}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {ROTATING_SUBHEADINGS[subheadingIdx]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Dual Minimal Descriptions & Action CTAs (Symmetrical, Centered, No Containers) */}
        <div className={styles.dualDescriptionGrid}>
          {/* Left: Product Architecture & Explore Capabilities CTA */}
          <div className={styles.descriptionColLeft}>
            <p className={styles.descriptionText}>
              Full-stack engineering from prototype to enterprise-scale deployment.
            </p>
            <button onClick={scrollToServices} className={styles.primarySilverCta}>
              <span>Explore Capabilities ↓</span>
            </button>
          </div>

          {/* Right: Dedicated Squads & Scope Engagement CTA */}
          <div className={styles.descriptionColRight}>
            <p className={styles.descriptionText}>
              Autonomous squads integrated with your leadership for rapid velocity.
            </p>
            <Link to="/contact" className={styles.secondarySmokedCta}>
              <span>Scope Your Project</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Subtext Footer */}
        <div className={styles.subtextMeta}>
          <span>Web Applications // Fluid Mobile Ecosystems // Applied AI Systems</span>
        </div>
      </div>
    </section>
  );
};

export default ServicesCelestialHero;
