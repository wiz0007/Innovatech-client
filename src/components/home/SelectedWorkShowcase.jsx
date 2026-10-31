import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import styles from "./SelectedWorkShowcase.module.scss";

const projectHighlights = {
  "my-kart": {
    badge: "⚡ 99 Lighthouse Score • Instant Cart",
    metric: "99/100",
    metricLabel: "Lighthouse Performance",
    platform: "Web Application",
  },
  "book-reading": {
    badge: "📱 60fps Native Gestures • Offline Sync",
    metric: "60 FPS",
    metricLabel: "Native Gesture Loop",
    platform: "Mobile iOS / Android",
  },
  "movie-app": {
    badge: "🎬 Zero-Latency Streaming • Instant Modals",
    metric: "<100ms",
    metricLabel: "Trailer Cache Latency",
    platform: "Streaming UI Engine",
  },
};

export default function SelectedWorkShowcase({ projects = [] }) {
  return (
    <div className={styles.showcaseWrapper}>
      {/* CLEAN HEADER ROW */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h2 className={styles.sectionHeading}>Selected Work</h2>
        </div>

        {/* ALL PROJECTS LINK */}
        <Link to="/work" className={styles.viewAllBtn}>
          <span>All Projects</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* 3-COLUMN DEVICE DECK */}
      <div className={styles.deckGrid}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={styles.deckItemWrapper}
          >
            <DeviceCard project={project} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DeviceCard({ project }) {
  const meta = projectHighlights[project.id] || {};

  return (
    <article className={styles.deviceCard}>
      {/* HARDWARE DEVICE BEZEL TOP */}
      <div className={styles.deviceScreenBezel}>
        <div className={styles.bezelBar}>
          <div className={styles.bezelDots}>
            <span className={`${styles.bDot} ${styles.dotRed}`} />
            <span className={`${styles.bDot} ${styles.dotYellow}`} />
            <span className={`${styles.bDot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.bezelUrl}>
            {project.category.toLowerCase()}.rogueai.systems/{project.id}
          </span>
        </div>

        {/* DEVICE DISPLAY SCREEN (HIGH-FIDELITY MOCKUP WITH SHIMMER) */}
        <div className={styles.deviceDisplay}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.deviceImg}
            loading="lazy"
          />

          {/* ELEGANT SPECULAR GLASS REFLECTION SHEEN */}
          <div className={styles.glassSheen} />

          {/* PLATFORM BADGE */}
          <div className={styles.deviceBadges}>
            <span className={styles.platformBadge}>{project.category}</span>
          </div>
        </div>
      </div>

      {/* CARD DETAILS */}
      <div className={styles.deviceDetails}>
        <div className={styles.deviceMetaRow}>
          <span>{project.role}</span>
          <span>{project.year}</span>
        </div>

        <h3 className={styles.deviceTitle}>{project.title}</h3>
        <p className={styles.deviceSubtitle}>{project.subtitle}</p>

        <div className={styles.deviceIdeaBox}>
          <span className={styles.deviceIdeaBadge}>
            {meta.badge || "Tested in Production"}
          </span>
        </div>

        <div className={styles.deviceTagsRow}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.deviceTag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.deviceActions}>
          <Link to="/work" className={styles.deviceCaseLink}>
            <span>Case Study</span>
            <ArrowUpRight size={13} />
          </Link>

          <div className={styles.deviceSubActions}>
            {project.link && !project.link.includes("github.com") && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.deviceDemoLink}
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
                className={styles.deviceGitLink}
                aria-label="GitHub Repository"
                title="View GitHub Repository"
              >
                <FaGithub size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
