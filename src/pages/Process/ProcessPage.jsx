import React from "react";
import { motion } from "framer-motion";
import SEO from "../../components/common/SEO";
import ProcessCelestialHero from "../../components/common/ProcessCelestialHero";
import ProcessStagesPipeline from "../../components/common/ProcessStagesPipeline";
import SectionHeader from "../../components/common/SectionHeader";
import CTASection from "../../components/common/CTASection";
import TiltCard from "../../components/common/TiltCard";
import processSteps, { engineeringPrinciples } from "../../content/processData";
import styles from "./ProcessPage.module.scss";

const qualityStandards = [
  {
    title: "Sub-Second Initial Load",
    metric: "< 800ms",
    unit: "FCP / P95",
    sla: "Lighthouse 99+",
    desc: "Optimized bundle splitting, tree-shaking, WebP/AVIF asset compression, and edge CDN distribution for near-instant paint."
  },
  {
    title: "Strict Type & Lint Safety",
    metric: "0",
    unit: "Errors / Strict",
    sla: "Strict TS & ESLint",
    desc: "Every component, route, and state mutation is typed with contract-driven schemas. Zero 'any' types tolerated in main."
  },
  {
    title: "Automated Release Pipelines",
    metric: "100%",
    unit: "CI/CD Coverage",
    sla: "Zero-Downtime",
    desc: "Ephemeral staging previews per branch, automated unit & integration test suites, and rollback triggers."
  },
  {
    title: "Multi-Viewport Precision",
    metric: "320px",
    unit: "to 4K Ultrawide",
    sla: "WCAG AA Compliant",
    desc: "Rigorous testing across physical iOS Safari, Android Chrome, mobile foldables, touch screens, and desktop viewports."
  }
];

const ProcessPage = () => {
  return (
    <div className={styles.processPage}>
      <SEO
        title="Delivery Process & Reliability Standards"
        description="Learn about RogueAI's 4-phase agile engineering method, quality checkpoints, and production delivery cadence."
      />

      {/* MONUMENTAL IMMERSIVE CELESTIAL PROCESS HERO */}
      <ProcessCelestialHero />

      {/* THE 4-STAGE ARCHITECTURAL DELIVERY PIPELINE */}
      <ProcessStagesPipeline steps={processSteps} />

      {/* ENGINEERING QUALITY STANDARDS */}
      <section className={styles.standardsSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Quality Gateways"
            title="Non-Negotiable Engineering Standards"
            subtitle="Every pull request and deployment is measured against strict performance, type safety, and accessibility benchmarks."
            centered
          />

          <div className={styles.standardsGrid}>
            {qualityStandards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <TiltCard className={styles.standardTiltWrapper} maxTilt={5}>
                  <div className={styles.standardCard}>
                    <div className={styles.standardTopRow}>
                      <div className={styles.metricGroup}>
                        <span className={styles.standardMetric}>{item.metric}</span>
                        <span className={styles.standardUnit}>{item.unit}</span>
                      </div>
                      <span className={styles.standardSlaBadge}>{item.sla}</span>
                    </div>

                    <h3 className={styles.standardTitle}>{item.title}</h3>
                    <p className={styles.standardDesc}>{item.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE ENGINEERING PRINCIPLES */}
      <section className={styles.principlesSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Culture & Architecture"
            title="Core Engineering Principles"
            subtitle="The mental models guiding every architectural decision, tradeoff, and line of code we write."
            centered
          />

          <div className={styles.principlesGrid}>
            {engineeringPrinciples.map((p, index) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className={styles.principleTiltWrapper} maxTilt={5}>
                  <div className={styles.principleCard}>
                    <div className={styles.principleTopRow}>
                      <span className={styles.tenetBadge}>CORE TENET</span>
                      <span className={styles.principleIndex}>{p.index}</span>
                    </div>

                    <h3 className={styles.principleTitle}>{p.title}</h3>
                    
                    {p.axiom && (
                      <blockquote className={styles.principleAxiom}>
                        "{p.axiom}"
                      </blockquote>
                    )}

                    <p className={styles.principleText}>{p.text}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TAILORED CONVERSION CTA */}
      <CTASection
        badge="BATTLE-TESTED DELIVERY CADENCE"
        title="Ready to run your next sprint with RogueAI?"
        subtitle="Direct architectural consultation and deterministic sprint delivery. Zero junior delegation, fixed milestones, and daily Git commits."
        contactLabel="Direct Architect Discovery"
        contactDesc="30-minute roadmap & scoping call with senior engineers. We review your architecture, timeline, and deliverables."
        contactBtnText="Schedule Technical Discovery"
        contactLink="/inquiries"
        exploreLabel="Production Benchmarks"
        exploreDesc="Inspect verified production case studies across web, mobile, and machine intelligence platforms."
        exploreBtnText="Inspect Client Work"
        exploreLink="/work"
      />
    </div>
  );
};

export default ProcessPage;
