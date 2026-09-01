import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaLayerGroup } from "react-icons/fa";
import { CheckCircle2, Clock, ShieldAlert, Cpu, Zap, Activity } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageHero from "../../components/common/PageHero";
import SectionHeader from "../../components/common/SectionHeader";
import CTASection from "../../components/common/CTASection";
import TiltCard from "../../components/common/TiltCard";
import processSteps, { engineeringPrinciples } from "../../content/processData";
import styles from "./ProcessPage.module.scss";

const qualityStandards = [
  {
    title: "Sub-Second Initial Load",
    metric: "< 800ms FCP",
    desc: "Optimized bundle splitting, asset compression, and edge caching for instant paint."
  },
  {
    title: "Strict Type & Lint Safety",
    metric: "0 Errors / Strict",
    desc: "Every component is typed and statically verified before merging into release branches."
  },
  {
    title: "Automated Deployment Pipelines",
    metric: "100% CI/CD",
    desc: "Automated testing, preview deployments, and zero-downtime production rollouts."
  },
  {
    title: "Comprehensive Device Testing",
    metric: "320px to 4K",
    desc: "Verified on iOS Safari, Android Chrome, desktop browsers, and dark/light modes."
  }
];

const ProcessPage = () => {
  return (
    <div className={styles.processPage}>
      <SEO
        title="Delivery Process & Reliability Standards"
        description="Learn about RogueAI's 4-phase agile engineering method, quality checkpoints, and production delivery cadence."
      />

      <PageHero
        headline="PROCESS"
        subtitle="Agile cadence and quality gateways"
        description="A battle-tested 4-phase delivery system that eliminates technical ambiguity and ensures high engineering standards."
        imageSrc="/assets/process-bg.webp"
      />

      {/* 4 PHASES BREAKDOWN */}
      <section className={styles.phasesSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="The 4-Stage Method"
            title="From Initial Blueprint to Scale"
            subtitle="Each stage has defined criteria and verifiable deliverables before moving to the next."
          />

          <div className={styles.phasesTimeline}>
            {processSteps.map((step, index) => (
              <motion.article
                key={step.step}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <TiltCard className={styles.phaseTiltWrapper} maxTilt={6}>
                  <div className={styles.phaseCard}>
                    <div className={styles.phaseNumberBadge}>
                      <span>Phase {step.step}</span>
                      <div className={styles.durationBadge}>
                        <Clock size={13} />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    <h2 className={styles.phaseTitle}>{step.phase}</h2>
                    <p className={styles.phaseTagline}>{step.tagline}</p>
                    <p className={styles.phaseDesc}>{step.description}</p>

                    <div className={styles.deliverablesContainer}>
                      <h3 className={styles.deliverablesTitle}>
                        <FaLayerGroup />
                        <span>Stage Deliverables</span>
                      </h3>
                      <div className={styles.deliverablesGrid}>
                        {step.deliverables.map((d, i) => (
                          <div key={i} className={styles.deliverablePill}>
                            <CheckCircle2 size={15} className={styles.pillCheck} />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING QUALITY STANDARDS */}
      <section className={styles.standardsSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Quality Gateways"
            title="Non-Negotiable Engineering Standards"
            subtitle="Every line of code shipped by RogueAI complies with strict reliability benchmarks."
            centered
          />

          <div className={styles.standardsGrid}>
            {qualityStandards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className={styles.standardTiltWrapper} maxTilt={5}>
                  <div className={styles.standardCard}>
                    <div className={styles.standardMetric}>{item.metric}</div>
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
            eyebrow="Culture & Philosophy"
            title="Core Engineering Principles"
            subtitle="The mental models guiding every architectural tradeoff we make."
          />

          <div className={styles.principlesGrid}>
            {engineeringPrinciples.map((p, index) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <TiltCard className={styles.principleTiltWrapper} maxTilt={5}>
                  <div className={styles.principleCard}>
                    <span className={styles.principleIndex}>0{index + 1}</span>
                    <h3 className={styles.principleTitle}>{p.title}</h3>
                    <p className={styles.principleText}>{p.text}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVERSION CTA */}
      <CTASection
        title="Ready to run your next sprint with RogueAI?"
        description="Book a technical discovery call to review requirements, scope, and timeline."
        buttonText="Schedule Technical Discovery"
      />
    </div>
  );
};

export default ProcessPage;
