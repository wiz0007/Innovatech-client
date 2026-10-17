import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import styles from "./CTASection.module.scss";

const CTASection = ({
  badge = "Available for Q4/Q1 Engagements",
  title = "Ready to engineer something exceptional?",
  subtitle = "Direct architectural consultation and rapid sprint delivery for mission-critical software.",
  contactLabel = "Direct Consultation",
  contactDesc = "30-minute technical discovery directly with lead architects. Fixed milestone delivery.",
  contactBtnText = "Start an Engagement",
  contactLink = "/contact",
  exploreLabel = "Verified Work",
  exploreDesc = "Deep-dive into production systems, performance benchmarks, and live platforms.",
  exploreBtnText = "Explore Pages",
  exploreLink = "/work"
}) => {
  return (
    <section className={styles.ctaWrapper}>
      {/* Atmospheric Horizon Glow Melting Seamlessly into the Canvas */}
      <div className={styles.horizonGlow} />

      {/* CORNER ROTATING CIRCULAR TEXT BADGE (Positioned at Section Level) */}
      <div className={styles.cornerBadgeWrapper}>
        <Link
          to={contactLink}
          className={styles.rotatingBadgeLink}
          aria-label="Start an Engagement with RogueAI"
        >
          <svg viewBox="0 0 160 160" className={styles.rotatingSvg}>
            <defs>
              <path
                id="ctaCirclePath"
                d="M 80, 80 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
              />
            </defs>
            <text className={styles.circleText}>
              <textPath href="#ctaCirclePath" startOffset="0%">
                • START AN ENGAGEMENT • DIRECT ARCHITECT ACCESS •
              </textPath>
            </text>
          </svg>
          <div className={styles.centerPill}>
            <ArrowUpRight size={18} className={styles.centerArrow} />
          </div>
        </Link>
      </div>

      <div className={styles.stageContainer}>
        {/* TOP HIERARCHY: BADGE, MAIN HEADING & SUB-HEADING */}
        <motion.div
          className={styles.headerBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            <span>{badge}</span>
          </div>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        {/* IMMERSIVE BORDERLESS DUAL TRACKS (MELTED INTO THE BACKGROUND) */}
        <motion.div
          className={styles.tracksGrid}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* TRACK 1: CONTACT / ENGAGEMENT */}
          <div className={styles.trackColumn}>
            <div className={styles.trackMeta}>
              <div className={styles.trackHeader}>
                <span className={styles.trackDotPrimary} />
                <span className={styles.trackLabel}>{contactLabel}</span>
              </div>
              <p className={styles.trackDesc}>{contactDesc}</p>
            </div>

            <div className={styles.trackAction}>
              <Link to={contactLink} className={styles.primaryBtn}>
                <span>{contactBtnText}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* SPECULAR VERTICAL DIVIDER */}
          <div className={styles.verticalDivider} />

          {/* TRACK 2: EXPLORE PAGES / PORTFOLIO */}
          <div className={styles.trackColumn}>
            <div className={styles.trackMeta}>
              <div className={styles.trackHeader}>
                <span className={styles.trackDotSecondary} />
                <span className={styles.trackLabel}>{exploreLabel}</span>
              </div>
              <p className={styles.trackDesc}>{exploreDesc}</p>
            </div>

            <div className={styles.trackAction}>
              <Link to={exploreLink} className={styles.secondaryBtn}>
                <span>{exploreBtnText}</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CONCISE BOTTOM TRUST FOOTER MELTING INTO THE FOOTER */}
        <motion.div
          className={styles.microTrustBar}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>
            <CheckCircle2 size={12} className={styles.trustIcon} /> Day-1 Code Ownership
          </span>
          <span className={styles.divider}>·</span>
          <span>
            <CheckCircle2 size={12} className={styles.trustIcon} /> 99.99% Architecture SLA
          </span>
          <span className={styles.divider}>·</span>
          <span>
            <CheckCircle2 size={12} className={styles.trustIcon} /> Zero Junior Handoffs
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
