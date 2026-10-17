import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, Layers, Sparkles } from "lucide-react";
import styles from "./DeliveryProcessPipeline.module.scss";

const phaseIcons = {
  1: Layers,
  2: Sparkles,
  3: Cpu,
  4: ShieldCheck,
};

const phaseHighlights = {
  1: {
    focus: "Architecture & Data Schemas",
    bullets: [
      "Technical Architecture Blueprint",
      "API Contracts & State Models",
    ],
  },
  2: {
    focus: "Design Tokens & Motion Specs",
    bullets: [
      "Production Figma Component System",
      "Micro-interaction & Touch Specs",
    ],
  },
  3: {
    focus: "Hardened Core Engineering",
    bullets: [
      "Clean, Typed React / Native Code",
      "Automated CI/CD & Test Suites",
    ],
  },
  4: {
    focus: "Zero-Downtime Deployment",
    bullets: [
      "Core Web Vitals & Security Audit",
      "Real-time Telemetry & Error SLA",
    ],
  },
};

export default function DeliveryProcessPipeline({ steps = [] }) {
  return (
    <div className={styles.pipelineWrapper}>
      {/* COMPACT SECTION HEADER ROW */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h2 className={styles.sectionHeading}>Delivery Model</h2>
        </div>

        {/* EXPLORE PROCESS LINK */}
        <Link to="/process" className={styles.viewAllBtn}>
          <span>Full Framework & SLA</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* 4-PHASE TIMELINE GRID */}
      <div className={styles.timelineGrid}>
        {steps.map((stepItem, index) => {
          const Icon = phaseIcons[stepItem.step] || Layers;
          const meta = phaseHighlights[stepItem.step] || {};

          return (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className={styles.timelineCardWrapper}
            >
              <article className={styles.timelineCard}>
                {/* CARD TOP BAR */}
                <div className={styles.cardHeader}>
                  <div className={styles.stepBadgeGroup}>
                    <div className={styles.iconCircle}>
                      <Icon size={14} />
                    </div>
                    <span className={styles.stepNumber}>0{stepItem.step}</span>
                  </div>

                  <span className={styles.durationPill}>
                    ⏱ {stepItem.duration}
                  </span>
                </div>

                {/* PHASE TITLE & CONCEPT */}
                <h3 className={styles.phaseTitle}>{stepItem.phase}</h3>
                <span className={styles.phaseFocus}>{meta.focus}</span>

                {/* CURATED KEY MILESTONES */}
                <div className={styles.milestonesBox}>
                  <span className={styles.milestonesLabel}>Key Milestones</span>
                  <div className={styles.milestonesList}>
                    {meta.bullets?.map((bullet, i) => (
                      <div key={i} className={styles.milestoneItem}>
                        <CheckCircle2 size={12} className={styles.checkIcon} />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD ACTION CTA */}
                <div className={styles.cardFooter}>
                  <Link to="/process" className={styles.phaseCtaLink}>
                    <span>Phase Specs & SLA</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
