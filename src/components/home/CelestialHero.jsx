import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./CelestialHero.module.scss";

const ROTATING_SUBHEADINGS = [
  "Everything in One Place",
  "Architected for Pure Velocity",
  "Intelligence Built for Production",
  "Engineered to Scale Effortlessly",
];

const CelestialHero = () => {
  const [subheadingIdx, setSubheadingIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubheadingIdx((prev) => (prev + 1) % ROTATING_SUBHEADINGS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="RogueAI Brand Hero">
      {/* 1. Deep Space Atmospheric Radiant Glow (Silver/Slate Luxury Theme) */}
      <div className={styles.ambientBacklight} aria-hidden="true" />

      {/* 2. Monumental Celestial Portal Arc (Liquid Silver & Platinum Chrome theme, cradling ROGUEAI) */}
      <div className={styles.arcContainer} aria-hidden="true">
        <svg
          className={styles.portalArcSvg}
          viewBox="0 0 1400 800"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Silver & Platinum Volumetric Outer Halo */}
            <linearGradient id="silverDeepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.45" />
              <stop offset="15%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.45" />
            </linearGradient>

            {/* Radiant Silver Mid Halo Gradient */}
            <linearGradient id="silverMidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.75" />
              <stop offset="20%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.75" />
            </linearGradient>

            {/* Intense White-Hot Core Gradient */}
            <linearGradient id="silverCoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
            </linearGradient>

            {/* Top Left Organic Silver Flare */}
            <radialGradient id="silverFlareLeft" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            {/* Top Right Organic Silver Flare */}
            <radialGradient id="silverFlareRight" cx="65%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            {/* Multi-tier Gaussian Blur Filters */}
            <filter id="silverSupernovaBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>

            <filter id="silverBloomBlur" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="25" />
            </filter>

            <filter id="silverCoreBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>

            <filter id="silverFilamentBlur" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Layer 1: Volumetric Silver Outer Halo */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#silverDeepGrad)"
            strokeWidth="140"
            strokeLinecap="round"
            filter="url(#silverSupernovaBlur)"
            opacity="0.88"
          />

          {/* Layer 2: Radiant Silver & Chrome Mid Bloom */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#silverMidGrad)"
            strokeWidth="60"
            strokeLinecap="round"
            filter="url(#silverBloomBlur)"
            opacity="0.94"
          />

          {/* Layer 3: Blazing Core Beam */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#silverCoreGrad)"
            strokeWidth="22"
            strokeLinecap="round"
            filter="url(#silverCoreBlur)"
            opacity="0.98"
          />

          {/* Layer 4: Diffused Incandescent Filament */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#silverFilamentBlur)"
            opacity="0.96"
          />

          {/* Top Left Organic Flare */}
          <ellipse cx="120" cy="-20" rx="240" ry="260" fill="url(#silverFlareLeft)" />

          {/* Top Right Organic Flare */}
          <ellipse cx="1280" cy="-20" rx="240" ry="260" fill="url(#silverFlareRight)" />
        </svg>
      </div>

      {/* 3. Subtle Silver & Cool Gray Perspective Floor Grid */}
      <div className={styles.perspectiveFloorGrid} aria-hidden="true" />

      {/* 4. Bottom Seamless Fade Melter */}
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
          <span>R</span>
          <span>O</span>
          <span>G</span>
          <span>U</span>
          <span>E</span>
          <span>A</span>
          <span>I</span>
        </motion.h1>

        {/* Dynamic Switching Subheadings (3-4 Phrases of Balanced Length) */}
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
          {/* Left: Product Engineering & Explore Projects CTA */}
          <div className={styles.descriptionColLeft}>
            <p className={styles.descriptionText}>
              Zero-to-one product architecture & high-throughput scaling.
            </p>
            <button onClick={scrollToWork} className={styles.primarySilverCta}>
              <span>Explore Projects ↓</span>
            </button>
          </div>

          {/* Right: Dedicated Partnership & Start An Engagement CTA */}
          <div className={styles.descriptionColRight}>
            <p className={styles.descriptionText}>
              Senior engineering partnership for mission-critical systems.
            </p>
            <Link to="/contact" className={styles.secondarySmokedCta}>
              <span>Start An Engagement</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Subtext Footer (Cool Steel Gray Monospace) */}
        <div className={styles.subtextMeta}>
          <span>Production-Grade AI // Zero-Latency Digital Deployments</span>
        </div>
      </div>
    </section>
  );
};

export default CelestialHero;
