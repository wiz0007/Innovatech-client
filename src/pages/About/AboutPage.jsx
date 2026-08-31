import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";
import { Code2, Smartphone, Sparkles, Terminal, Rocket, CheckCircle2 } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageHero from "../../components/common/PageHero";
import SectionHeader from "../../components/common/SectionHeader";
import CTASection from "../../components/common/CTASection";
import TiltCard from "../../components/common/TiltCard";
import teamMembers from "../../content/teamData";
import aboutImg from "../../assets/About.png";
import styles from "./AboutPage.module.scss";

const values = [
  {
    icon: <Code2 size={24} />,
    title: "Craftsmanship & Type Safety",
    desc: "We write clean, modular, and typed code that other engineering teams love reading and maintaining."
  },
  {
    icon: <Terminal size={24} />,
    title: "Spatial & Fluid Interfaces",
    desc: "We treat interfaces as living instruments: responsive geometry, thoughtful touch targets, and natural micro-motion."
  },
  {
    icon: <Rocket size={24} />,
    title: "High Velocity, Zero Compromise",
    desc: "We move with startup speed without skipping architectural reviews, automated tests, or accessibility benchmarks."
  }
];

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <SEO
        title="About RogueAI & Team"
        description="Learn about RogueAI's mission, engineering standards, and the specialized leadership team building next-generation digital products."
      />

      <PageHero
        headline="ABOUT"
        subtitle="Studio narrative and engineering leadership"
        description="A collective of product architects, mobile engineers, and systems designers dedicated to software that feels crisp and enduring."
        imageSrc="/assets/about-bg.jpg"
      />

      {/* STORY & MISSION */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyCopy}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.storyEyebrow}>Our Narrative</span>
              <h2 className={styles.storyTitle}>Built on the belief that code should be an asset, not a bottleneck.</h2>
              <p className={styles.storyText}>
                At RogueAI, we reject the false dichotomy between speed and quality. Founded by engineers and product designers, we partner with visionary teams to turn ambitious product visions into production-grade reality.
              </p>
              <p className={styles.storyText}>
                Whether developing an e-commerce platform with sub-second checkout, a high-throughput mobile application, or a customized AI pipeline, we sweat the subtle details: state isolation, layout shifts, frame rates, and edge-case reliability.
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>100%</span>
                  <span className={styles.statLbl}>Verified Codebases</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>4.9/5</span>
                  <span className={styles.statLbl}>Client Rating</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>60 FPS</span>
                  <span className={styles.statLbl}>Fluid Interaction</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.storyMedia}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard className={styles.imageTiltWrapper} maxTilt={6}>
                <div className={styles.imageCard}>
                  <img src={aboutImg} alt="RogueAI Architecture & Design" loading="lazy" />
                  <div className={styles.imageOverlayBadge}>
                    <span>RogueAI Core / Systems & Design</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES & CULTURE */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Our Engineering DNA"
            title="What Sets RogueAI Apart"
            subtitle="The foundational engineering values that guide our day-to-day decisions."
            centered
          />

          <div className={styles.valuesGrid}>
            {values.map((v, index) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className={styles.valueTiltWrapper} maxTilt={6}>
                  <div className={styles.valueCard}>
                    <div className={styles.valueIconWrapper}>{v.icon}</div>
                    <h3 className={styles.valueTitle}>{v.title}</h3>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="The Leadership Team"
            title="Meet the Minds Behind the Architecture"
            subtitle="Specialists across full-stack engineering, mobile development, product management, and interface design."
            centered
          />

          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className={styles.memberTiltWrapper} maxTilt={6}>
                  <div className={styles.memberCard}>
                    <div className={styles.photoContainer}>
                      <img src={member.photo} alt={member.name} loading="lazy" />
                    </div>

                    <div className={styles.memberInfo}>
                      <h3 className={styles.memberName}>{member.name}</h3>
                      <p className={styles.memberRole}>{member.role}</p>
                      <p className={styles.memberBio}>{member.bio}</p>

                      <div className={styles.skillsWrapper}>
                        {member.skills.map((s, i) => (
                          <span key={i} className={styles.skillTag}>{s}</span>
                        ))}
                      </div>

                      <div className={styles.socialsRow}>
                        {member.socials.github && (
                          <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}>
                            <FaGithub />
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                            <FaLinkedin />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`}>
                            <FaTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CONVERSION CTA */}
      <CTASection
        title="Want to build something impactful with RogueAI?"
        description="We are currently booking technical discovery sessions for upcoming quarters."
        buttonText="Get in Touch"
      />
    </div>
  );
};

export default AboutPage;
