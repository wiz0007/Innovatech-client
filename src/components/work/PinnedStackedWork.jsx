import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaCheckCircle, FaTimes } from "react-icons/fa";
import styles from "./PinnedStackedWork.module.scss";

const PinnedStackedWork = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={styles.stackedWorkWrapper}>
      <div className={styles.projectsList}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            {/* Visual Media Column */}
            <div className={styles.imageCol}>
              <div className={styles.imageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={380}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.categoryBadge}>{project.category}</span>
              </div>
            </div>

            {/* Project Content Column */}
            <div className={styles.contentCol}>
              <div className={styles.topMeta}>
                <span className={styles.year}>{project.year}</span>
                <span className={styles.role}>{project.role}</span>
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.subtitle}>{project.subtitle}</p>

              {/* Challenge & Outcome Overview */}
              <div className={styles.briefOverview}>
                <div className={styles.briefItem}>
                  <span className={styles.briefLabel}>Challenge:</span>
                  <p>{project.challenge}</p>
                </div>
                <div className={styles.briefItem}>
                  <span className={styles.briefLabel}>Outcome:</span>
                  <p>{project.outcome}</p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className={styles.tagsRow}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={styles.actionsRow}>
                <button
                  type="button"
                  className={styles.detailsBtn}
                  onClick={() => setSelectedProject(project)}
                >
                  Inspect Case Study
                </button>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                    aria-label={`Open ${project.title} live demo`}
                  >
                    <span>Live Demo</span>
                    <FaExternalLinkAlt />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.codeLink}
                    aria-label={`View ${project.title} source code`}
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Case Study Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className={styles.modalHeader}>
              <span className={styles.modalCategory}>{selectedProject.category} • {selectedProject.year}</span>
              <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
              <p className={styles.modalSubtitle}>{selectedProject.subtitle}</p>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper}>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>

              <div className={styles.breakdownGrid}>
                <div className={styles.breakdownBlock}>
                  <h4 className={styles.blockTitle}>The Problem & Constraints</h4>
                  <p>{selectedProject.challenge}</p>
                </div>

                <div className={styles.breakdownBlock}>
                  <h4 className={styles.blockTitle}>Architectural Approach</h4>
                  <p>{selectedProject.approach}</p>
                </div>

                <div className={styles.breakdownBlock}>
                  <h4 className={styles.blockTitle}>Production Outcome</h4>
                  <div className={styles.outcomeContent}>
                    <FaCheckCircle className={styles.checkIcon} />
                    <p>{selectedProject.outcome}</p>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.modalTags}>
                  {selectedProject.tags.map((t, idx) => (
                    <span key={idx} className={styles.tag}>{t}</span>
                  ))}
                </div>

                <div className={styles.modalActions}>
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalLiveBtn}
                    >
                      <span>Launch Live Product</span>
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinnedStackedWork;
