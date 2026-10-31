import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Layers, ShieldCheck, Zap } from "lucide-react";
import styles from "./WorkConversionSection.module.scss";

const WorkConversionSection = () => {
  return (
    <section className={styles.conversionWrapper} aria-label="Production Software Engagement">
      {/* Background Horizon Lighting */}
      <div className={styles.horizonAmbientGlow} aria-hidden="true" />

      <div className={styles.contentStage}>
        {/* Header Block (Eyebrow & Title) */}
        <div className={styles.headerBlock}>
          <span className={styles.eyebrowTag}>PRODUCTION-GRADE SOFTWARE ENGAGEMENT</span>
          <h2 className={styles.sectionHeading}>
            Ready to Architect Your Next Flagship Product?
          </h2>
        </div>

        {/* 3-Column Immersive Background Architecture Pillars (Concise & Minimal Text) */}
        <div className={styles.pillarsGrid}>
          {/* Pillar 1 */}
          <div className={styles.pillarItem}>
            <div className={styles.pillarTopRow}>
              <div className={styles.iconBadge}>
                <Zap size={18} />
              </div>
              <span className={styles.metricCallout}>48h Spec</span>
            </div>
            <h3 className={styles.pillarTitle}>Rapid Architecture</h3>
            <p className={styles.pillarDesc}>
              System blueprint, tech stack audit, and fixed-milestone roadmap.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className={styles.pillarItem}>
            <div className={styles.pillarTopRow}>
              <div className={styles.iconBadge}>
                <Layers size={18} />
              </div>
              <span className={styles.metricCallout}>60FPS / &lt;100ms</span>
            </div>
            <h3 className={styles.pillarTitle}>Production Velocity</h3>
            <p className={styles.pillarDesc}>
              Reactive component systems, sub-second latency, and 99+ Lighthouse.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className={styles.pillarItem}>
            <div className={styles.pillarTopRow}>
              <div className={styles.iconBadge}>
                <ShieldCheck size={18} />
              </div>
              <span className={styles.metricCallout}>100% Client IP</span>
            </div>
            <h3 className={styles.pillarTitle}>Full Code Ownership</h3>
            <p className={styles.pillarDesc}>
              Documented git repositories, CI/CD pipelines, and zero vendor lock-in.
            </p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className={styles.actionsRow}>
          <Link to="/contact" className={styles.primarySilverBtn}>
            <span>Start an Engagement</span>
            <ArrowRight size={15} />
          </Link>
          <Link to="/services" className={styles.secondaryGlassBtn}>
            <span>Explore Capabilities</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkConversionSection;
