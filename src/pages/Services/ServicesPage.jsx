import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaLayerGroup, FaBolt, FaShieldAlt, FaArrowRight, FaCode, FaMobileAlt, FaRobot } from "react-icons/fa";
import { Globe, Smartphone, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageHero from "../../components/common/PageHero";
import SectionHeader from "../../components/common/SectionHeader";
import CTASection from "../../components/common/CTASection";
import TiltCard from "../../components/common/TiltCard";
import MagneticButton from "../../components/common/MagneticButton";
import servicesData from "../../content/servicesData";
import styles from "./ServicesPage.module.scss";

const serviceIcons = {
  "web-apps": <Globe size={18} />,
  "mobile-apps": <Smartphone size={18} />,
  "ai-solutions": <Cpu size={18} />,
};

const engagementModels = [
  {
    title: "Dedicated Product Squad",
    tagline: "Autonomous engineering squad integrated with your leadership.",
    description: "Ideal for funded startups and scaling engineering teams needing continuous product velocity, sprint execution, and full-stack expertise.",
    features: [
      "Dedicated Full-Stack & Mobile Engineers",
      "Bi-weekly sprint demos & progress tracking",
      "Direct Slack/Discord & GitHub collaboration",
      "Flexible scope adaptation with zero overhead"
    ]
  },
  {
    title: "Turnkey MVP Build",
    tagline: "Fixed-scope, rapid 4 to 8-week production delivery.",
    description: "Perfect for founders validating market hypotheses with a launch-ready, secure, and production-hardened web or mobile product.",
    features: [
      "Complete Discovery & Technical Architecture",
      "Production-ready Web, Mobile or AI MVP",
      "Automated CI/CD & Cloud Infrastructure",
      "30-day post-launch warranty & stabilization"
    ]
  },
  {
    title: "Architecture & Scale Audit",
    tagline: "Targeted code, performance, and security hardening.",
    description: "For teams experiencing latency bottlenecks, technical debt, scaling challenges, or preparing for high-traffic product launches.",
    features: [
      "Deep Core Web Vitals & bundle profiling",
      "Database query & API latency optimization",
      "Security & vulnerability remediation",
      "Concrete roadmap & refactor blueprint"
    ]
  }
];

const ServicesPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(servicesData[0].id);

  const activeService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  return (
    <div className={styles.servicesPage}>
      <SEO
        title="Services & Capabilities"
        description="Explore RogueAI's digital product engineering capabilities across Web Applications, Mobile Ecosystems, and AI Integrations."
      />

      <PageHero
        headline="SERVICES"
        subtitle="Capabilities and technical solutions"
        description="Full-lifecycle digital product engineering across high-throughput web applications, mobile platforms, and AI systems."
        imageSrc="/assets/services-bg.webp"
      >
        <MagneticButton>
          <Link to="/contact" className={styles.heroActionBtn}>
            <span>Inquire About an Engagement</span>
            <FaArrowRight />
          </Link>
        </MagneticButton>
      </PageHero>

      {/* DETAILED SERVICES BREAKDOWN */}
      <section className={styles.detailsSection}>
        <div className={styles.container}>
          {/* Service Selector Tabs */}
          <div className={styles.tabBar}>
            {servicesData.map((s) => (
              <button
                key={s.id}
                className={`${styles.tabBtn} ${selectedServiceId === s.id ? styles.activeTab : ""}`}
                onClick={() => setSelectedServiceId(s.id)}
              >
                <span className={styles.tabIcon}>{serviceIcons[s.id]}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Service Deep Dive Card */}
          <motion.div
            key={activeService.id}
            className={styles.activeServiceCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.headerIconWrapper}>
                <img src={activeService.icon} alt={activeService.title} />
              </div>
              <div>
                <h2 className={styles.activeTitle}>{activeService.title}</h2>
                <p className={styles.activeTagline}>{activeService.tagline}</p>
              </div>
            </div>

            <p className={styles.activeDetails}>{activeService.details}</p>

            <div className={styles.cardColumns}>
              {/* Highlights */}
              <div className={styles.infoCol}>
                <h3 className={styles.colHeading}>
                  <FaBolt className={styles.headingIcon} />
                  <span>Architecture Highlights</span>
                </h3>
                <ul className={styles.highlightList}>
                  {activeService.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables & Stack */}
              <div className={styles.infoCol}>
                <h3 className={styles.colHeading}>
                  <FaLayerGroup className={styles.headingIcon} />
                  <span>Standard Deliverables</span>
                </h3>
                <div className={styles.deliverablesGrid}>
                  {activeService.deliverables.map((d, i) => (
                    <div key={i} className={styles.deliverableBadge}>
                      {d}
                    </div>
                  ))}
                </div>

                <h3 className={`${styles.colHeading} ${styles.stackHeading}`}>
                  <FaShieldAlt className={styles.headingIcon} />
                  <span>Primary Tech Stack</span>
                </h3>
                <div className={styles.stackTags}>
                  {activeService.techStack.map((tech, i) => (
                    <span key={i} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.cardActionFooter}>
              <MagneticButton>
                <Link to="/contact" className={styles.startServiceBtn}>
                  <span>Initiate {activeService.title} Project</span>
                  <FaArrowRight />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className={styles.engagementSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Engagement Formats"
            title="Flexible Collaboration Models"
            subtitle="Tailored to your organizational stage, technical maturity, and project velocity requirements."
            centered
          />

          <div className={styles.engagementGrid}>
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className={styles.engagementTiltWrapper} maxTilt={6}>
                  <div className={styles.engagementCard}>
                    <h3 className={styles.modelTitle}>{model.title}</h3>
                    <p className={styles.modelTagline}>{model.tagline}</p>
                    <p className={styles.modelDesc}>{model.description}</p>
                    <ul className={styles.modelFeatures}>
                      {model.features.map((f, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className={styles.modelCheck} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVERSION CTA */}
      <CTASection
        title="Have a specific technical challenge in mind?"
        description="Whether you need a full platform build or an audit of your existing stack, we are ready to dive in."
        buttonText="Discuss Your Architecture"
      />
    </div>
  );
};

export default ServicesPage;
