import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLaptopCode, FaMobileAlt, FaBrain, FaRocket } from "react-icons/fa";
import styles from "./PinnedArchitectureStory.module.scss";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    step: "01",
    title: "Web Platforms",
    badge: "SUB-SECOND FIRST PAINT",
    icon: <FaLaptopCode />,
    headline: "Scalable, Edge-Rendered React & Next.js Architecture",
    description: "We engineer high-throughput web systems featuring optimistic UI updates, multi-region database replication, and sub-second Core Web Vitals.",
    stats: [
      { label: "Lighthouse Performance", value: "98+" },
      { label: "Cold Start Latency", value: "<150ms" },
      { label: "Concurrent Scale", value: "100k+ req/s" }
    ],
    tech: ["React 19", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"]
  },
  {
    step: "02",
    title: "Mobile Platforms",
    badge: "60FPS NATIVE-GRADE",
    icon: <FaMobileAlt />,
    headline: "Fluid Cross-Platform iOS & Android Systems",
    description: "Crafting tactile mobile applications using React Native and Flutter with offline SQLite synchronization, native biometric security, and responsive haptics.",
    stats: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Offline Resilience", value: "100%" },
      { label: "Crash-Free Rate", value: "99.9%" }
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "SQLite", "Firebase"]
  },
  {
    step: "03",
    title: "AI & Machine Intelligence",
    badge: "PRAGMATIC PRODUCTION AI",
    icon: <FaBrain />,
    headline: "Custom RAG Pipelines & Autonomous Tool-Calling Agents",
    description: "Integrating production-grade LLM architectures, vector search indexes, and fallback model routing that reduce operational overhead without hallucinations.",
    stats: [
      { label: "RAG Retrieval Speed", value: "<200ms" },
      { label: "Token Efficiency", value: "45% Saved" },
      { label: "Deterministic Accuracy", value: "99.4%" }
    ],
    tech: ["OpenAI API", "Anthropic Claude", "LangChain", "Pinecone", "FastAPI", "PyTorch"]
  },
  {
    step: "04",
    title: "Scale & Delivery",
    badge: "ENTERPRISE RELIABILITY",
    icon: <FaRocket />,
    headline: "Zero-Technical-Debt Production Hardening",
    description: "Automated CI/CD release pipelines, distributed tracing, automated load testing, and comprehensive architecture documentation.",
    stats: [
      { label: "Deployment Downtime", value: "0 ms" },
      { label: "Test Coverage", value: ">90%" },
      { label: "Incident Recovery SLA", value: "<15 min" }
    ],
    tech: ["GitHub Actions", "Docker / K8s", "Datadog", "AWS / GCP", "Terraform", "Sentry"]
  }
];

const PinnedArchitectureStory = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: `+=${storySteps.length * 100}%`,
        pin: section,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const stepIndex = Math.min(
            storySteps.length - 1,
            Math.floor(progress * storySteps.length)
          );
          setActiveStep(stepIndex);
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const currentStory = storySteps[activeStep];

  return (
    <section ref={triggerRef} className={styles.triggerWrapper}>
      <div ref={sectionRef} className={styles.pinnedContainer}>
        <div className={styles.storyLayout}>
          {/* Left Column: Stage Progression Indicator */}
          <div className={styles.navCol}>
            <span className={styles.eyebrow}>[ ARCHITECTURAL CAPABILITY ]</span>
            <h2 className={styles.sectionTitle}>Full-Lifecycle Product Engineering</h2>
            <div className={styles.stepList}>
              {storySteps.map((step, idx) => (
                <button
                  key={step.step}
                  type="button"
                  className={`${styles.stepButton} ${idx === activeStep ? styles.activeStepButton : ""}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className={styles.stepNum}>{step.step}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Stage Content */}
          <div className={styles.contentCol}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>{currentStory.icon}</div>
                <div className={styles.headerMeta}>
                  <span className={styles.badge}>{currentStory.badge}</span>
                  <h3 className={styles.cardHeadline}>{currentStory.headline}</h3>
                </div>
              </div>

              <p className={styles.cardDesc}>{currentStory.description}</p>

              {/* Stats Row */}
              <div className={styles.statsGrid}>
                {currentStory.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statBox}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className={styles.techStack}>
                <span className={styles.techLabel}>Verified Tech Stack:</span>
                <div className={styles.tagRow}>
                  {currentStory.tech.map((t, idx) => (
                    <span key={idx} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedArchitectureStory;
