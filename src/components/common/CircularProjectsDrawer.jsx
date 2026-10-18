import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import styles from "./CircularProjectsDrawer.module.scss";

const CircularProjectsDrawer = ({
  projects = [],
  categories = ["All", "Web", "Mobile", "UI/UX"],
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const timerRef = useRef(null);

  // Filter projects by active category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const total = filteredProjects.length;

  // Keep index within bounds on category filter change
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const nextCard = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // 1. Continuous 4-Second Auto-Rotate Timer (Optimal pace)
  useEffect(() => {
    if (total <= 1) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, activeIndex]);

  // 2. Keyboard Arrow Navigation (Left/Right or Up/Down)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextCard();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  // 3. Touch Gestures: Horizontal on Desktop/Tablet, Vertical on Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      const diffY = touchStartY.current - e.changedTouches[0].clientY;
      if (diffY > 35) nextCard();
      else if (diffY < -35) prevCard();
    } else {
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      if (diffX > 40) nextCard();
      else if (diffX < -40) prevCard();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // 4. Circular / Modular Relative Position Math
  const getRelativePosition = (index) => {
    if (total <= 1) return 0;
    let diff = index - activeIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className={styles.drawerSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="3D Circular Project Drawer"
    >
      {/* Category Filter Pills (Obsidian & Metallic Silver) */}
      <div className={styles.filterPillsRow}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`${styles.filterPill} ${isActive ? styles.activePill : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3D Circular Deck Stage (Horizontal on Desktop, Vertical on Mobile) */}
      <div className={styles.circularStage}>
        {/* Desktop Navigation Button: Left */}
        <button
          type="button"
          onClick={prevCard}
          className={`${styles.navArrowBtn} ${styles.prevBtn}`}
          aria-label="Previous Project"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Circular Revolving Card Deck */}
        <div className={styles.deckContainer}>
          {filteredProjects.map((project, index) => {
            const relPos = getRelativePosition(index);
            const isCenter = relPos === 0;
            const isLeft = relPos === -1; // Top card on mobile
            const isRight = relPos === 1; // Bottom card on mobile
            const isFarLeft = relPos === -2;
            const isFarRight = relPos === 2;
            const isHidden = Math.abs(relPos) > 2;

            if (isHidden) return null;

            let cardStateClass = styles.hiddenCard;
            if (isCenter) cardStateClass = styles.centerCard;
            else if (isLeft) cardStateClass = styles.leftCard;
            else if (isRight) cardStateClass = styles.rightCard;
            else if (isFarLeft) cardStateClass = styles.farLeftCard;
            else if (isFarRight) cardStateClass = styles.farRightCard;

            return (
              <div
                key={project.id}
                className={`${styles.projectDrawerCard} ${cardStateClass}`}
                onClick={() => {
                  if (isLeft || isFarLeft) prevCard();
                  if (isRight || isFarRight) nextCard();
                }}
                role={!isCenter ? "button" : undefined}
                tabIndex={!isCenter ? 0 : undefined}
                aria-label={!isCenter ? `Rotate to ${project.title}` : undefined}
              >
                {/* Metallic Top Header Lip & Grip */}
                <div className={styles.cardHeaderLip}>
                  <div className={styles.drawerHandleGrip} />
                </div>

                {/* Card Media Stage */}
                <div className={styles.cardMediaWrapper}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.cardPosterImg}
                    loading="lazy"
                  />
                  <div className={styles.scanlineOverlay} />
                  <span className={styles.categoryBadge}>{project.category}</span>
                </div>

                {/* Card Information Body */}
                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span className={styles.roleTag}>{project.role}</span>
                    <span className={styles.yearTag}>{project.year}</span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectSubtitle}>{project.subtitle}</p>

                  {/* Impact & Outcome (Active Center Card Only) */}
                  {isCenter && project.outcome && (
                    <div className={styles.outcomeBlock}>
                      <span className={styles.outcomeLabel}>OUTCOME</span>
                      <p className={styles.outcomeSnippet}>{project.outcome}</p>
                    </div>
                  )}

                  {/* Curated Tech Stack */}
                  <div className={styles.techPillsRow}>
                    {project.tags.slice(0, isCenter ? 5 : 3).map((tag) => (
                      <span key={tag} className={styles.techPill}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Row (Active Center Card Only) */}
                  {isCenter && (
                    <div className={styles.actionsBar}>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.liveAppBtn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Launch Live App</span>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.sourceCodeBtn}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View Source on GitHub"
                        >
                          <FaGithub size={15} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Navigation Button: Right */}
        <button
          type="button"
          onClick={nextCard}
          className={`${styles.navArrowBtn} ${styles.nextBtn}`}
          aria-label="Next Project"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Progress Track: Clean Minimalist Dots (4-Second Auto-Rotate) */}
      <div className={styles.progressDotsTrack}>
        <div className={styles.dotsRow}>
          {filteredProjects.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`${styles.dotItem} ${isActive ? styles.activeDot : ""}`}
                aria-label={`Jump to project ${i + 1}`}
              >
                <span className={styles.dotTrack}>
                  {isActive && (
                    <span
                      key={`dot-progress-${activeIndex}`}
                      className={styles.dotProgressBar}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircularProjectsDrawer;
