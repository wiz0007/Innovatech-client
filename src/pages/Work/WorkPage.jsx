import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaTimes, FaCheckCircle, FaBolt } from "react-icons/fa";
import { Sparkles, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageHero from "../../components/common/PageHero";
import CTASection from "../../components/common/CTASection";
import TiltCard from "../../components/common/TiltCard";
import ProjectVideoCard from "../../components/common/ProjectVideoCard";
import MagneticButton from "../../components/common/MagneticButton";
import projectsData, { categories } from "../../content/projectsData";
import styles from "./WorkPage.module.scss";

const WorkPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.workPage}>
      <SEO
        title="Work & Case Studies"
        description="Explore RogueAI's portfolio of production web applications, mobile platforms, and UI/UX systems."
      />

      <PageHero
        headline="PROJECTS"
        subtitle="Selected case studies and engineering proof"
        description="A curated gallery of recent web platforms, mobile ecosystems, and UI architectures shipped into production."
        imageSrc="/assets/work-bg.webp"
      />

      {/* FILTER BAR & GALLERY */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          {/* Category Filter Pills */}
          <div className={styles.filtersWrapper}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterPill} ${activeCategory === cat ? styles.activeFilter : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <motion.div layout className={styles.projectsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  className={styles.projectCardMotion}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectVideoCard
                    project={project}
                    onSelect={setSelectedProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* DETAILED PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
            >
              <button
                className={styles.closeModalBtn}
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className={styles.modalHeroMedia}>
                <img src={selectedProject.image} alt={selectedProject.title} />
                <span className={styles.modalCategoryBadge}>{selectedProject.category}</span>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalMetaRow}>
                  <span>{selectedProject.role}</span>
                  <span>{selectedProject.year}</span>
                </div>

                <h2 id="modal-project-title" className={styles.modalTitle}>
                  {selectedProject.title}
                </h2>
                <p className={styles.modalSubtitle}>{selectedProject.subtitle}</p>

                {/* Case Study Breakdown */}
                <div className={styles.caseStudyGrid}>
                  <div className={styles.caseStudyBlock}>
                    <div className={styles.blockHeader}>
                      <FaBolt className={styles.challengeIcon} />
                      <h3>The Challenge</h3>
                    </div>
                    <p>{selectedProject.challenge}</p>
                  </div>

                  <div className={styles.caseStudyBlock}>
                    <div className={styles.blockHeader}>
                      <CheckCircle2 size={18} className={styles.approachIcon} />
                      <h3>Our Approach</h3>
                    </div>
                    <p>{selectedProject.approach}</p>
                  </div>

                  <div className={`${styles.caseStudyBlock} ${styles.outcomeBlock}`}>
                    <div className={styles.blockHeader}>
                      <span className={styles.outcomeIcon}>🎯</span>
                      <h3>The Outcome</h3>
                    </div>
                    <p>{selectedProject.outcome}</p>
                  </div>
                </div>

                {/* Tech Stack & Links */}
                <div className={styles.modalFooter}>
                  <div className={styles.modalTags}>
                    {selectedProject.tags.map((t) => (
                      <span key={t} className={styles.modalTag}>{t}</span>
                    ))}
                  </div>

                  <div className={styles.modalActionLinks}>
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalLiveBtn}
                      >
                        <span>Launch Live App</span>
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalGithubBtn}
                      >
                        <FaGithub />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONVERSION CTA */}
      <CTASection
        title="Ready to build your next flagship product?"
        description="From consumer mobile apps to high-load web architectures, our team ships with velocity."
        buttonText="Kick Off Your Project"
      />
    </div>
  );
};

export default WorkPage;
