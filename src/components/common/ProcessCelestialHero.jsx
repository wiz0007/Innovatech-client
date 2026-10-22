import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import styles from "./ProcessCelestialHero.module.scss";

const ROTATING_SUBHEADINGS = [
  "Agile Cadence & Quality Gateways",
  "Zero Technical Debt Delivery",
  "Deterministic Sprints & Daily Git Commits",
  "Architectural Rigor from Spec to Scale",
];

const ProcessCelestialHero = () => {
  const [subheadingIdx, setSubheadingIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubheadingIdx((prev) => (prev + 1) % ROTATING_SUBHEADINGS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const scrollToPhases = () => {
    const el = document.getElementById("process-stages");
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
    <section className={styles.heroSection} aria-label="Monumental Celestial Process Hero">
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
            <linearGradient id="procSilverDeepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.45" />
              <stop offset="15%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#64748b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="procSilverMidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.75" />
              <stop offset="20%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="procSilverCoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
            </linearGradient>

            <radialGradient id="procSilverFlareLeft" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="procSilverFlareRight" cx="65%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>

            <filter id="procSupernovaBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <filter id="procBloomBlur" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
            <filter id="procCoreBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="procFilamentBlur" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Layer 1: Volumetric Silver Outer Halo */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#procSilverDeepGrad)"
            strokeWidth="140"
            strokeLinecap="round"
            filter="url(#procSupernovaBlur)"
            opacity="0.88"
          />

          {/* Layer 2: Radiant Silver & Chrome Mid Bloom */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#procSilverMidGrad)"
            strokeWidth="60"
            strokeLinecap="round"
            filter="url(#procBloomBlur)"
            opacity="0.94"
          />

          {/* Layer 3: Blazing Core Beam */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="url(#procSilverCoreGrad)"
            strokeWidth="22"
            strokeLinecap="round"
            filter="url(#procCoreBlur)"
            opacity="0.98"
          />

          {/* Layer 4: Diffused Incandescent Filament */}
          <path
            d="M 120, -30 C 240, 680 1160, 680 1280, -30"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#procFilamentBlur)"
            opacity="0.96"
          />

          <ellipse cx="120" cy="-20" rx="240" ry="260" fill="url(#procSilverFlareLeft)" />
          <ellipse cx="1280" cy="-20" rx="240" ry="260" fill="url(#procSilverFlareRight)" />
        </svg>
      </div>

      {/* 3. Subtle Perspective Floor Grid */}
      <div className={styles.perspectiveFloorGrid} aria-hidden="true" />
      <div className={styles.bottomFadeMelter} aria-hidden="true" />

      {/* ================= FOREGROUND MONUMENTAL CONTENT ================= */}
      <div className={styles.centerContent}>
        {/* Subtle Status Pill */}
        <motion.div
          className={styles.eyebrowBadge}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Sparkles size={12} className={styles.sparkleIcon} />
          <span>BATTLE-TESTED DELIVERY CADENCE</span>
        </motion.div>

        {/* Monumental Liquid Silver & Chrome Brand Title */}
        <motion.h1
          className={styles.monumentalTitle}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>P</span>
          <span>R</span>
          <span>O</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
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

        {/* Executive Narrative */}
        <motion.p
          className={styles.narrativeParagraph}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          A battle-tested 4-phase agile engineering method engineered to eliminate technical ambiguity, 
          enforce uncompromising code quality, and guarantee on-schedule production deployment.
        </motion.p>

        {/* Action Controls */}
        <motion.div
          className={styles.actionCluster}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={scrollToPhases}
            className={styles.primaryActionBtn}
            aria-label="Explore 4-Stage Method"
          >
            <span>Explore 4-Stage Method</span>
            <ArrowDown size={14} className={styles.btnIcon} />
          </button>

          <Link
            to="/inquiries"
            className={styles.secondaryActionBtn}
            aria-label="Schedule Technical Discovery"
          >
            <span>Schedule Technical Discovery</span>
            <ArrowUpRight size={14} className={styles.btnIcon} />
          </Link>
        </motion.div>

        {/* Micro Confidence Metrics */}
        <motion.div
          className={styles.confidenceStrip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span>Fixed-Sprint Milestones</span>
          <span className={styles.dot}>·</span>
          <span>Zero Junior Handoffs</span>
          <span className={styles.dot}>·</span>
          <span>100% Code Ownership</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessCelestialHero;
