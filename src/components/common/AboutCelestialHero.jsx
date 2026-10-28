import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./AboutCelestialHero.module.scss";

const ROTATING_SUBHEADINGS = [
  "Engineering Leadership & Systems Craftsmanship",
  "Autonomous Product Squads & Senior Architects",
  "Building Software That Feels Crisp & Enduring",
  "Zero Junior Handoffs & 100% Code Ownership",
];

const AboutCelestialHero = () => {
  const [subheadingIdx, setSubheadingIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubheadingIdx((prev) => (prev + 1) % ROTATING_SUBHEADINGS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const scrollToNarrative = () => {
    const el = document.getElementById("about-narrative");
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
    <section className={styles.heroSection} aria-label="Monumental Celestial About Hero">
      {/* 1. Deep Space Atmospheric Radiant Glow (Silver/Slate Luxury Theme) */}
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
            <linearGradient id="abtSilverDeepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.45" />
              <stop offset="15%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="abtSilverMidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.75" />
              <stop offset="20%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="abtSilverCoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
            </linearGradient>

            <radialGradient id="abtSilverFlareLeft" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="abtSilverFlareRight" cx="65%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            <filter id="abtSupernovaBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <filter id="abtBloomBlur" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
            <filter id="abtCoreBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="abtFilamentBlur" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Layer 1: Volumetric Silver Outer Halo */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#abtSilverDeepGrad)"
            strokeWidth="140"
            strokeLinecap="round"
            filter="url(#abtSupernovaBlur)"
            opacity="0.88"
          />

          {/* Layer 2: Radiant Silver & Chrome Mid Bloom */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#abtSilverMidGrad)"
            strokeWidth="60"
            strokeLinecap="round"
            filter="url(#abtBloomBlur)"
            opacity="0.94"
          />

          {/* Layer 3: Blazing Core Beam */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#abtSilverCoreGrad)"
            strokeWidth="22"
            strokeLinecap="round"
            filter="url(#abtCoreBlur)"
            opacity="0.98"
          />

          {/* Layer 4: Diffused Incandescent Filament */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#abtFilamentBlur)"
            opacity="0.96"
          />

          <ellipse cx="120" cy="-20" rx="240" ry="260" fill="url(#abtSilverFlareLeft)" />
          <ellipse cx="1280" cy="-20" rx="240" ry="260" fill="url(#abtSilverFlareRight)" />
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
          <span>A</span>
          <span>B</span>
          <span>O</span>
          <span>U</span>
          <span>T</span>
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

        {/* Dual Minimal Descriptions & Action CTAs */}
        <div className={styles.dualDescriptionGrid}>
          {/* Component 1 (Left): Narrative & Story CTA */}
          <div className={styles.descriptionColLeft}>
            <p className={styles.descriptionText}>
              A collective of product architects, mobile engineers, and systems designers dedicated to software that feels crisp and enduring.
            </p>
            <button onClick={scrollToNarrative} className={styles.primarySilverCta}>
              <span>Explore Studio Narrative ↓</span>
            </button>
          </div>

          {/* Component 2 (Right): Senior Leadership & Discovery CTA */}
          <div className={styles.descriptionColRight}>
            <p className={styles.descriptionText}>
              Direct senior leadership partnership with zero junior delegation and full transparent code ownership.
            </p>
            <Link to="/inquiries" className={styles.secondarySmokedCta}>
              <span>Schedule Technical Discovery</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Subtext Footer (Cool Steel Gray Monospace) */}
        <div className={styles.subtextMeta}>
          <span>Principal Engineers Only // Zero Junior Delegation // 100% Code Ownership</span>
        </div>
      </div>
    </section>
  );
};

export default AboutCelestialHero;
