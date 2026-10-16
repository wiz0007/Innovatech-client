import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaPlay, FaPause } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import styles from "./ProjectVideoCard.module.scss";

const projectHighlightMap = {
  "my-kart": "⚡ 99 Lighthouse Score • Instant Cart",
  "book-reading": "📱 60fps Native Gestures • Offline Sync",
  "movie-app": "🎬 Zero-Latency Streaming • Instant Modals",
};

const ProjectVideoCard = ({ project, onSelect, className = "", showcase = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <TiltCard className={`${styles.tiltWrapper} ${className}`} maxTilt={5}>
      <article
        className={`${styles.card} ${showcase ? styles.showcaseCard : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media Container with Image + Video Crossfade */}
        <div className={styles.mediaWrapper}>
          <img
            src={project.image}
            alt={project.title}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className={`${styles.posterImage} ${isHovered && project.videoPreview ? styles.posterHidden : ""}`}
          />

          {project.videoPreview && (
            <video
              ref={videoRef}
              src={project.videoPreview}
              loop
              muted
              playsInline
              preload="none"
              className={`${styles.previewVideo} ${isHovered ? styles.videoActive : ""}`}
            />
          )}

          <div className={styles.scanlineOverlay} />
          <span className={styles.categoryBadge}>{project.category}</span>

          {project.videoPreview && (
            <div className={`${styles.liveBadge} ${isHovered ? styles.liveBadgeActive : ""}`}>
              <span className={styles.liveDot} />
              <span>{isHovered ? "LIVE DEMO REEL" : "HOVER TO PREVIEW"}</span>
            </div>
          )}

          {onSelect && (
            <button
              className={styles.quickViewBtn}
              onClick={() => onSelect(project)}
              aria-label={`View ${project.title} case study`}
            >
              <span>Case Study</span>
              <ArrowUpRight size={15} />
            </button>
          )}
        </div>

        {/* Card Content Details */}
        <div className={styles.cardDetails}>
          <div className={styles.metaRow}>
            <span>{project.role}</span>
            <span>{project.year}</span>
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.subtitle}>{project.subtitle}</p>

          {showcase ? (
            <>
              {/* Showcase Idea Highlight */}
              <div className={styles.showcaseIdeaBox}>
                <span className={styles.ideaBadge}>
                  {projectHighlightMap[project.id] || project.outcome?.split(".")[0] || "Tested in Production"}
                </span>
              </div>

              {/* Curated Tech Stack Tags */}
              <div className={styles.tagsRow}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardActions}>
                <Link to="/work" className={styles.caseStudyLink}>
                  <span>Case Study</span>
                  <ArrowUpRight size={13} />
                </Link>

                <div className={styles.secondaryActions}>
                  {project.link && !project.link.includes("github.com") && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.demoLink}
                      title="Open Live Deployment"
                    >
                      <span>Live App</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.gitLink}
                      aria-label="GitHub Repository"
                    >
                      <FaGithub size={15} />
                    </a>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.outcomeBox}>
                <span className={styles.outcomeLabel}>Impact & Outcome</span>
                <p className={styles.outcomeText}>{project.outcome}</p>
              </div>

              <div className={styles.tagsRow}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardActions}>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.demoLink}
                  >
                    <span>Live App</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.gitLink}
                    aria-label="GitHub Repository"
                  >
                    <FaGithub size={16} />
                  </a>
                )}

                {onSelect && (
                  <button
                    className={styles.deepDiveBtn}
                    onClick={() => onSelect(project)}
                  >
                    Explore Details →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </TiltCard>
  );
};

export default ProjectVideoCard;
