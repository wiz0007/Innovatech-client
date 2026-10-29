import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Server,
  Wrench,
  ArrowRight, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  Layers,
  Terminal
} from "lucide-react";
import gsap, { ScrollTrigger } from "../../utils/gsapConfig";
import styles from "./ServicesFadeShowcase.module.scss";

const FADE_SERVICES = [
  {
    id: "web-apps",
    title: "Web Applications",
    pillTitle: "Web Applications",
    tagline: "High-throughput React & cloud architectures built for conversion.",
    summary: "From high-conversion e-commerce storefronts and SaaS platforms to data-dense real-time analytics dashboards, we build web applications that scale effortlessly under heavy load.",
    icon: Globe,
    metrics: [
      { value: "99/100", label: "Lighthouse Performance" },
      { value: "<100ms", label: "P99 Edge Latency" },
      { value: "99.8%", label: "Cache Hit Rate" }
    ],
    featureTiles: [
      {
        title: "Sub-Second Rendering",
        desc: "Instant hydration and optimal Largest Contentful Paint across all devices."
      },
      {
        title: "Real-Time Pipeline",
        desc: "Optimistic state updates, WebSockets, and resilient event-driven architectures."
      },
      {
        title: "SSR & Dynamic SSG",
        desc: "Edge-rendered routing pipelines deployed across distributed cloud regions."
      },
      {
        title: "Hardened Quality",
        desc: "Automated telemetry, end-to-end test suites, and zero-downtime CI/CD."
      }
    ],
    deliverables: [
      "Full-Stack Web App",
      "Admin Dashboard",
      "Edge API Architecture",
      "Core Web Vitals Audit",
      "System Documentation"
    ],
    techStack: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind / SCSS"
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    pillTitle: "Mobile Applications",
    tagline: "Fluid 60fps native ecosystems for iOS and Android.",
    summary: "Cross-platform and native mobile architectures engineered for speed, offline reliability, haptic precision, and intuitive touch interaction.",
    icon: Smartphone,
    metrics: [
      { value: "60 FPS", label: "Native Gesture Loop" },
      { value: "0ms", label: "Local SQLite Cache" },
      { value: "100%", label: "App Store Compliance" }
    ],
    featureTiles: [
      {
        title: "Resilient Local Sync",
        desc: "Background sync, offline-first SQLite caching, and zero data loss on drop."
      },
      {
        title: "60FPS Touch Loop",
        desc: "Fluid biometrics, native haptics, and frictionless interactive gestures."
      },
      {
        title: "Targeted Push Engine",
        desc: "Low-latency message dispatch with segmented audience triggers."
      },
      {
        title: "Release Engineering",
        desc: "Automated Fastlane pipelines and strict Apple / Google guideline adherence."
      }
    ],
    deliverables: [
      "iOS & Android Builds",
      "Design System UI Kit",
      "Offline SQLite Sync",
      "App Store Readiness",
      "Telemetry SDK"
    ],
    techStack: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Expo EAS",
      "GraphQL"
    ]
  },
  {
    id: "ai-solutions",
    title: "AI Solutions & Systems",
    pillTitle: "AI Solutions",
    tagline: "Production-grade machine intelligence and low-latency agents.",
    summary: "We turn state-of-the-art models into reliable, cost-efficient, and low-latency product features with custom RAG pipelines and autonomous agents.",
    icon: Cpu,
    metrics: [
      { value: "<180ms", label: "Vector Search Retrieval" },
      { value: "+45%", label: "Token Efficiency Gain" },
      { value: "99.99%", label: "Agent Pipeline Uptime" }
    ],
    featureTiles: [
      {
        title: "Sub-200ms Retrieval",
        desc: "Custom vector indexing with contextual chunking and reranking engines."
      },
      {
        title: "Autonomous Tool-Calling",
        desc: "Self-healing agent workflows with deterministic fallback validation."
      },
      {
        title: "Token & Cost Efficiency",
        desc: "Semantic prompt caching, model routing, and strict budget monitoring."
      },
      {
        title: "Enterprise Guardrails",
        desc: "PII masking, hallucinations mitigation, and strict audit observability."
      }
    ],
    deliverables: [
      "Custom AI Pipeline",
      "Vector DB Architecture",
      "RAG Indexing Engine",
      "Autonomous Agent Suite",
      "Latency & Cost Monitor"
    ],
    techStack: [
      "OpenAI API",
      "Anthropic Claude",
      "LangChain",
      "LlamaIndex",
      "Pinecone",
      "FastAPI"
    ]
  },
  {
    id: "software-solutions",
    title: "Custom Software Solutions",
    pillTitle: "Custom Software",
    tagline: "Mission-critical backend architectures, distributed cloud engines & microservices.",
    summary: "We architect scalable enterprise backends, distributed microservices, event streams, and bespoke operational software designed for high concurrency and zero-downtime reliability.",
    icon: Server,
    metrics: [
      { value: "99.999%", label: "System Availability SLA" },
      { value: "100k+", label: "Concurrent Transactions/Sec" },
      { value: "Zero", label: "Downtime Deployments" }
    ],
    featureTiles: [
      {
        title: "Distributed Topology",
        desc: "Decoupled domain-driven services, gRPC pipelines, and resilient event brokers."
      },
      {
        title: "High-Throughput Storage",
        desc: "Read-heavy caching, ACID sharding, and real-time streaming databases."
      },
      {
        title: "Container Orchestration",
        desc: "Kubernetes, automated autoscaling, and multi-region infrastructure as code."
      },
      {
        title: "Zero-Trust Architecture",
        desc: "mTLS, end-to-end encryption, automated compliance, and role-based ACLs."
      }
    ],
    deliverables: [
      "Distributed Backend",
      "Cloud Architecture",
      "Database Topology",
      "CI/CD Pipeline",
      "SLA Observability"
    ],
    techStack: [
      "Go / Golang",
      "Node.js",
      "Python",
      "Kubernetes",
      "PostgreSQL",
      "Kafka / RabbitMQ"
    ]
  },
  {
    id: "modernization-debugging",
    title: "Software Modernization & Debugging",
    pillTitle: "Modernization & Debugging",
    tagline: "Root-cause diagnostics, legacy refactoring, and next-era cloud migration.",
    summary: "We dissect obsolete or fragile codebases, eliminate technical debt, isolate memory leaks, remediate security vulnerabilities, and re-engineer legacy systems to modern cloud standards without breaking production.",
    icon: Wrench,
    metrics: [
      { value: "-75%", label: "Technical Debt Reduction" },
      { value: "4x", label: "Runtime Speedup & Throughput" },
      { value: "Zero", label: "Regression Bugs During Migration" }
    ],
    featureTiles: [
      {
        title: "Deep Root-Cause Profiling",
        desc: "Memory leak detection, CPU bottleneck identification, and database query profiling."
      },
      {
        title: "Clean Architecture Upgrade",
        desc: "Decoupling monolithic antipatterns into clean, modular, and maintainable layers."
      },
      {
        title: "Next-Era Stack Migration",
        desc: "Modernizing outdated frameworks and libraries to modern cloud-native standards."
      },
      {
        title: "Regression Hardening",
        desc: "Comprehensive automated integration suites and fault-injection testing."
      }
    ],
    deliverables: [
      "Technical Debt Audit",
      "Root-Cause Fix Roadmap",
      "Refactored Codebase",
      "Automated Test Harness",
      "Modernization Blueprint"
    ],
    techStack: [
      "Profiling Tooling",
      "Modern TypeScript",
      "Next-Gen Frameworks",
      "Containerization",
      "APM Telemetry",
      "Datadog / Sentry"
    ]
  }
];

const CARD_RANGES = [
  { enterStart: 0.00, enterEnd: 0.00, exitStart: 0.14, exitEnd: 0.22 },
  { enterStart: 0.14, enterEnd: 0.22, exitStart: 0.34, exitEnd: 0.42 },
  { enterStart: 0.34, enterEnd: 0.42, exitStart: 0.54, exitEnd: 0.62 },
  { enterStart: 0.54, enterEnd: 0.62, exitStart: 0.74, exitEnd: 0.82 },
  { enterStart: 0.74, enterEnd: 0.82, exitStart: 1.00, exitEnd: 1.00 },
];

const getActiveIndex = (p) => {
  if (p < 0.18) return 0;
  if (p < 0.38) return 1;
  if (p < 0.58) return 2;
  if (p < 0.78) return 3;
  return 4;
};

const TARGET_PROGRESS = [0.05, 0.28, 0.48, 0.68, 0.90];

const getCardStyle = (index, p) => {
  const range = CARD_RANGES[index];
  if (!range) return { opacity: 0, visibility: "hidden", pointerEvents: "none" };

  let opacity = 0;
  let translateY = 18;
  let scale = 0.985;
  let blur = 6;
  let pointerEvents = "none";

  if (p < range.enterStart) {
    opacity = 0;
    translateY = 18;
    scale = 0.985;
    blur = 6;
    pointerEvents = "none";
  } else if (p < range.enterEnd) {
    const t = (p - range.enterStart) / (range.enterEnd - range.enterStart);
    opacity = Math.min(1, Math.max(0, t));
    translateY = 18 * (1 - t);
    scale = 0.985 + 0.015 * t;
    blur = 6 * (1 - t);
    pointerEvents = t >= 0.5 ? "auto" : "none";
  } else if (p <= range.exitStart) {
    opacity = 1;
    translateY = 0;
    scale = 1;
    blur = 0;
    pointerEvents = "auto";
  } else if (p < range.exitEnd) {
    const t = (p - range.exitStart) / (range.exitEnd - range.exitStart);
    opacity = Math.max(0, Math.min(1, 1 - t));
    translateY = -18 * t;
    scale = 1 - 0.015 * t;
    blur = 6 * t;
    pointerEvents = t < 0.5 ? "auto" : "none";
  } else {
    opacity = 0;
    translateY = -18;
    scale = 0.985;
    blur = 6;
    pointerEvents = "none";
  }

  // Pin boundaries
  if (index === 0 && p <= range.exitStart) {
    opacity = 1;
    translateY = 0;
    scale = 1;
    blur = 0;
    pointerEvents = "auto";
  }
  if (index === 4 && p >= range.enterEnd) {
    opacity = 1;
    translateY = 0;
    scale = 1;
    blur = 0;
    pointerEvents = "auto";
  }

  return {
    opacity,
    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`,
    filter: `blur(${blur.toFixed(1)}px)`,
    pointerEvents,
    visibility: opacity > 0.01 ? "visible" : "hidden",
  };
};

const ServicesFadeShowcase = () => {
  const triggerRef = useRef(null);
  const stageRef = useRef(null);
  const stRef = useRef(null);
  const touchStartX = useRef(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = FADE_SERVICES.length;

  useEffect(() => {
    const trigger = triggerRef.current;
    const stage = stageRef.current;
    if (!trigger || !stage) return;

    const lenis = window.__lenis;
    const updateST = () => ScrollTrigger.update();
    if (lenis) {
      lenis.on("scroll", updateST);
    }

    const mm = gsap.matchMedia();

    // 1. DESKTOP / LAPTOP: Pinned viewport across 5 services
    mm.add("(min-width: 769px)", () => {
      const st = ScrollTrigger.create({
        trigger: trigger,
        start: "top 72px",
        end: "+=3200",
        pin: stage,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setActiveIndex(getActiveIndex(p));
        },
      });
      stRef.current = st;
    });

    // 2. TABLET / MOBILE: Pinned viewport with calibrated scrub distance
    mm.add("(max-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: trigger,
        start: "top 64px",
        end: "+=2600",
        pin: stage,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setActiveIndex(getActiveIndex(p));
        },
      });
      stRef.current = st;
    });

    return () => {
      if (lenis) {
        lenis.off("scroll", updateST);
      }
      mm.revert();
    };
  }, []);

  const scrollToService = useCallback((targetIndex) => {
    const st = stRef.current;
    if (!st) return;

    const targetP = TARGET_PROGRESS[targetIndex] ?? 0.05;
    const targetScroll = st.start + (st.end - st.start) * targetP;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        scrollToService(Math.min(total - 1, activeIndex + 1));
      } else if (e.key === "ArrowLeft") {
        scrollToService(Math.max(0, activeIndex - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToService, total]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 45) {
      scrollToService(Math.min(total - 1, activeIndex + 1));
    } else if (diffX < -45) {
      scrollToService(Math.max(0, activeIndex - 1));
    }
    touchStartX.current = null;
  };

  return (
    <div 
      ref={triggerRef} 
      className={styles.fadeShowcaseTrigger}
      id="services-details"
      aria-label="Scroll Pinned Services Showcase"
    >
      <div 
        ref={stageRef} 
        className={styles.pinnedStage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.stageInner}>
          {/* 1. TOP TACTILE SELECTOR DOCK (VISIBLE ON DESKTOP; HIDDEN ON MOBILE) */}
          <div className={styles.topControlDeck}>
            <div className={styles.selectorPillsRow}>
              {FADE_SERVICES.map((s, index) => {
                const isActive = index === activeIndex;
                const PillIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToService(index)}
                    className={`${styles.servicePillBtn} ${isActive ? styles.activePillBtn : ""}`}
                    aria-pressed={isActive}
                  >
                    <PillIcon size={14} className={styles.pillIcon} />
                    <span className={styles.pillTitle}>{s.pillTitle || s.title}</span>

                    {isActive && (
                      <motion.div
                        layoutId="fadeActivePillIndicator"
                        className={styles.activePillGlow}
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. CINEMATIC GRID-STACKED FADE STAGE */}
          <div className={styles.cardsStackStage}>
            {FADE_SERVICES.map((service, index) => {
              const cardStyle = getCardStyle(index, progress);
              const IconComponent = service.icon;

              return (
                <div
                  key={service.id}
                  className={styles.fadeElementCard}
                  style={cardStyle}
                  aria-hidden={cardStyle.opacity === 0}
                >
                  {/* Header: Pure Icon + Title + Tagline (No border, No capsule flag) */}
                  <div className={styles.elementHeaderStrip}>
                    <div className={styles.headerTitleArea}>
                      <div className={styles.iconEmblem}>
                        <IconComponent size={22} />
                      </div>
                      <div className={styles.headerTitles}>
                        <h3 className={styles.elementTitle}>{service.title}</h3>
                        <p className={styles.elementTagline}>{service.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Summary (Desktop only, hidden on mobile) */}
                  <p className={styles.elementSummary}>{service.summary}</p>

                  {/* A. TELEMETRY STATS: PURE TYPOGRAPHY (NO BOXES, NO BORDERS, NO TOP BADGES) */}
                  <div className={styles.metricsRow}>
                    {service.metrics.map((m, idx) => (
                      <div key={idx} className={styles.metricItem}>
                        <span className={styles.metricValue}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* B. ARCHITECTURAL HIGHLIGHTS: CLEAN TYPOGRAPHY (NO BOXES, NO BORDERS, NO TAG CAPSULES) */}
                  <div className={styles.pillarsSection}>
                    <div className={styles.sectionHeaderLine}>
                      <Zap size={13} className={styles.sectionIcon} />
                      <span className={styles.sectionTitleText}>Engineering Highlights</span>
                    </div>

                    <div className={styles.featureTilesGrid}>
                      {service.featureTiles.map((tile, idx) => (
                        <div key={idx} className={styles.featureTile}>
                          <h4 className={styles.tileTitle}>{tile.title}</h4>
                          <p className={styles.tileDesc}>{tile.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* C. DELIVERABLES & TECH STACK: CLEAN FLEX (NO BOXES, NO BORDERS, NO CAPSULES) */}
                  <div className={styles.specsDualRow}>
                    {/* Deliverables */}
                    <div className={styles.specSection}>
                      <div className={styles.specSectionHeader}>
                        <ShieldCheck size={13} className={styles.specIcon} />
                        <span>Production Deliverables</span>
                      </div>
                      <div className={styles.tokensCluster}>
                        {service.deliverables.map((deliv, idx) => (
                          <span key={idx} className={styles.deliverableToken}>
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Vetted Tech Stack */}
                    <div className={styles.specSection}>
                      <div className={styles.specSectionHeader}>
                        <Layers size={13} className={styles.specIcon} />
                        <span>Vetted Tech Stack</span>
                      </div>
                      <div className={styles.tokensCluster}>
                        {service.techStack.map((tech) => (
                          <span key={tech} className={styles.techPill}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* D. ACTION BAR */}
                  <div className={styles.elementActionBar}>
                    <div className={styles.actionLeftNotice}>
                      <Terminal size={13} />
                      <span>Zero ambiguity sprint roadmap and daily git commits.</span>
                    </div>

                    <div className={styles.actionButtonsGroup}>
                      <Link to="/contact" className={styles.primaryActionBtn}>
                        <span>Schedule Technical Discovery</span>
                        <ArrowRight size={13} />
                      </Link>
                      <Link to="/work" className={styles.secondaryActionBtn}>
                        <span>View Verified Work</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesFadeShowcase;
