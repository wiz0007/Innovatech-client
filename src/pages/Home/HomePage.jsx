import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaCheckCircle, FaStar, FaBolt, FaLayerGroup, FaCode, FaMobileAlt, FaRobot } from "react-icons/fa";
import { Sparkles, Terminal, Cpu, Smartphone, Globe, ArrowUpRight, CheckCircle2 } from "lucide-react";
import SEO from "../../components/common/SEO";
import SectionHeader from "../../components/common/SectionHeader";
import CTASection from "../../components/common/CTASection";
import VideoHero from "../../components/common/VideoHero";
import TiltCard from "../../components/common/TiltCard";
import CapabilityCard from "../../components/common/CapabilityCard";
import ProjectVideoCard from "../../components/common/ProjectVideoCard";
import MagneticButton from "../../components/common/MagneticButton";
import siteConfig from "../../content/siteConfig";
import servicesData from "../../content/servicesData";
import projectsData from "../../content/projectsData";
import processSteps from "../../content/processData";
import teamMembers from "../../content/teamData";
import testimonialsData from "../../content/testimonialsData";
import gsap from "../../utils/gsapConfig";
import styles from "./HomePage.module.scss";

const serviceIconMap = {
  "web-apps": <Globe className={styles.serviceIconSvg} size={28} />,
  "mobile-apps": <Smartphone className={styles.serviceIconSvg} size={28} />,
  "ai-solutions": <Cpu className={styles.serviceIconSvg} size={28} />,
};

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const homeRef = useRef(null);

  const featuredProjects = projectsData.filter(
    (p) => p.featured || p.id === "my-kart" || p.id === "book-reading" || p.id === "movie-app"
  );

  return (
    <div ref={homeRef} className={styles.homeContainer}>
      <SEO
        title="Next-Gen Web, Mobile & AI Product Engineering"
        description="RogueAI engineers high-performance web applications, fluid mobile ecosystems, and practical AI integrations for ambitious companies."
      />

      {/* CINEMATIC HERO WITH LOCAL REAL VIDEO & CHOREOGRAPHED SCROLL SEQUENCE */}
      <VideoHero
        headline="ROGUEAI"
        subtitle="Digital systems and product engineering"
        description="We design, architect, and ship high-throughput web apps, fluid mobile platforms, and reliable AI workflows for startups and enterprises demanding uncompromised performance."
        primaryCtaText="Start an Engagement"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Selected Work"
        secondaryCtaLink="/work"
      />

      {/* CORE CAPABILITIES / SERVICES SECTION */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <SectionHeader
            eyebrow="Capabilities"
            title="Full-Lifecycle Digital Product Architecture"
            subtitle="From zero-to-one product engineering to complex AI-assisted workflows, our systems are built for velocity, security, and effortless scale."
            align="left"
          />

          <div className={styles.servicesGrid}>
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <CapabilityCard service={service} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK SHOWCASE */}
      <section className={styles.workSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.workHeaderRow}>
            <SectionHeader
              eyebrow="Selected Proof of Work"
              title="Tested in Production. Engineered for Impact."
              subtitle="Explore how we solve complex state, mobile UX, and performance bottlenecks across our recent product builds."
            />
            <MagneticButton>
              <Link to="/work" className={styles.viewAllBtn}>
                <span>All Projects</span>
                <FaArrowRight />
              </Link>
            </MagneticButton>
          </div>

          <div className={styles.projectGrid}>
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <ProjectVideoCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-PHASE DELIVERY PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.sectionContainer}>
          <SectionHeader
            eyebrow="Delivery Model"
            title="Predictable Cadence. Uncompromising Standards."
            subtitle="Our structured 4-phase framework keeps technical decisions transparent and launch deadlines dependable."
            centered
          />

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <TiltCard className={styles.processTiltCard} maxTilt={6}>
                  <div className={styles.processCard}>
                    <div className={styles.processStepNumber}>{step.step}</div>
                    <h3 className={styles.processPhaseTitle}>{step.phase}</h3>
                    <p className={styles.processTagline}>{step.tagline}</p>
                    <p className={styles.processDesc}>{step.description}</p>
                    <div className={styles.deliverablesList}>
                      <span className={styles.deliverablesHeader}>Deliverables:</span>
                      {step.deliverables.slice(0, 2).map((d, i) => (
                        <div key={i} className={styles.deliverableItem}>
                          • {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className={styles.processActionCenter}>
            <MagneticButton>
              <Link to="/process" className={styles.secondaryProcessBtn}>
                <span>Explore Complete Process & Reliability Guidelines</span>
                <FaArrowRight />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <SectionHeader
            eyebrow="Client Validation"
            title="Trusted by Fast-Moving Teams"
            subtitle="Direct feedback from founders and engineering leaders who build their flagship products with RogueAI."
            centered
          />

          <div className={styles.testimonialsWrapper}>
            <div className={styles.testimonialGrid}>
              {testimonialsData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`${styles.testimonialCard} ${
                    activeTestimonial === index ? styles.activeTestimonial : ""
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={styles.ratingStars}>
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} className={styles.starIcon} />
                    ))}
                    <span className={styles.testimonialTag}>{item.tag}</span>
                  </div>
                  <p className={styles.testimonialText}>"{item.content}"</p>
                  <div className={styles.testimonialAuthor}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={styles.authorAvatar}
                      loading="lazy"
                    />
                    <div>
                      <h4 className={styles.authorName}>{item.name}</h4>
                      <p className={styles.authorRole}>
                        {item.role}, <strong>{item.company}</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW SECTION */}
      <section className={styles.teamSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.teamHeaderRow}>
            <SectionHeader
              eyebrow="Engineering Leadership"
              title="The Architects Behind the Code"
              subtitle="Meet the specialized engineers and designers shaping RogueAI's digital ecosystems."
            />
            <MagneticButton>
              <Link to="/about" className={styles.viewAllBtn}>
                <span>Full Team & Story</span>
                <FaArrowRight />
              </Link>
            </MagneticButton>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className={styles.teamTiltCard} maxTilt={6}>
                  <div className={styles.teamCard}>
                    <div className={styles.teamPhotoWrapper}>
                      <img src={member.photo} alt={member.name} loading="lazy" />
                    </div>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    <p className={styles.memberBio}>{member.bio}</p>
                    <div className={styles.memberSkills}>
                      {member.skills.slice(0, 2).map((skill, i) => (
                        <span key={i} className={styles.skillBadge}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVERSION CTA */}
      <CTASection />
    </div>
  );
};

export default HomePage;
