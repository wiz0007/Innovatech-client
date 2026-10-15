import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import cinematicBackdrop from "../../assets/rogueai-cinematic-backdrop.webp";
import interactingRibbon from "../../assets/rogueai-interacting-ribbon.png";
import styles from "./EngineeringGridHero.module.scss";

/**
 * Scroll-pinned hero: the document continues receiving wheel/touch input, while
 * the visual stage stays fixed and the two rendered objects move through a
 * choreographed interaction. Once the scene reaches its end, normal scrolling
 * resumes into the next page section.
 */
export default function EngineeringGridHero({ variant = "home" }) {
  const isServices = variant === "services";
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Slow, eased keyframes create an intentional visual beat across the pinned scene.
  const backScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.02, 1.1, 1.2]);
  const backX = useTransform(scrollYProgress, [0, 0.5, 1], [18, -4, -42]);
  const backY = useTransform(scrollYProgress, [0, 0.5, 1], [8, -9, -28]);
  const ribbonX = useTransform(scrollYProgress, [0, 0.2, 0.56, 0.82, 1], [230, 150, 0, -95, -190]);
  const ribbonY = useTransform(scrollYProgress, [0, 0.2, 0.56, 0.82, 1], [70, 36, 0, -26, -66]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 0.2, 0.56, 0.82, 1], [-19, -12, 0, 9, 18]);
  const ribbonScale = useTransform(scrollYProgress, [0, 0.2, 0.56, 0.82, 1], [0.76, 0.86, 1, 1.08, 1.18]);
  const ribbonOpacity = useTransform(scrollYProgress, [0, 0.16, 0.3, 0.82, 1], [0.18, 0.55, 0.96, 0.9, 0.35]);
  const coreGlow = useTransform(scrollYProgress, [0, 0.35, 0.56, 0.72, 1], [0.15, 0.32, 0.62, 0.3, 0.1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const content = isServices
    ? {
        eyebrow: "PRODUCT ENGINEERING",
        title: <>Built around<br />the <span>real problem.</span></>,
        description: "Web, mobile and AI systems designed to do useful work.",
        primary: "Discuss a project",
        primaryTo: "/contact",
        secondary: "Our process",
        secondaryTo: "/process",
        noteLabel: "OUR APPROACH",
        noteTitle: <>Designed to work<br />as <span>one system.</span></>,
        noteCopy: "From architecture to launch.",
        noteLink: "How we work",
        noteTo: "/process",
        index: "02 / 03",
      }
    : {
        eyebrow: "DIGITAL PRODUCT ENGINEERING",
        title: <>Ideas into<br /><span>engineered</span><br />products.</>,
        description: "Web, mobile and AI systems built for the real world.",
        primary: "Explore our work",
        primaryTo: "/work",
        secondary: "Our services",
        secondaryTo: "/services",
        noteLabel: "OUR FOCUS",
        noteTitle: <>Useful by design.<br /><span>Built to last.</span></>,
        noteCopy: "From first concept to real-world launch.",
        noteLink: "Our approach",
        noteTo: "/process",
        index: "01 / 03",
      };

  return (
    <section
      ref={sceneRef}
      className={`${styles.scene} ${reduceMotion ? styles.reduceMotionScene : ""} ${isServices ? styles.servicesVariant : styles.homeVariant}`}
      aria-labelledby="engineering-hero-title"
    >
      <div className={styles.stage}>
        <div className={styles.atmosphere} aria-hidden="true" />
        <div className={styles.heroGrid}>
          <div className={styles.introPanel}>
            <p className={styles.eyebrow}><span />{content.eyebrow}</p>
            <h1 id="engineering-hero-title">{content.title}</h1>
            <p className={styles.description}>{content.description}</p>
            <div className={styles.actions}>
              <Link to={content.primaryTo} className={styles.primaryAction}>
                {content.primary}<ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link to={content.secondaryTo} className={styles.secondaryAction}>
                {content.secondary}<ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.introFoot} aria-hidden="true">
              <span>{content.index}</span><span>ENGINEERED FOR USE</span>
            </div>
          </div>

          <div className={styles.visual} aria-label="Cinematic layered engineering sculpture that responds to scrolling">
            <motion.img
              className={styles.visualBackdrop}
              src={cinematicBackdrop}
              alt=""
              aria-hidden="true"
              draggable="false"
              style={reduceMotion ? undefined : { x: backX, y: backY, scale: backScale }}
            />
            <motion.div
              className={styles.coreGlow}
              aria-hidden="true"
              style={reduceMotion ? undefined : { opacity: coreGlow, scale: backScale }}
            />
            <motion.img
              className={styles.visualRibbon}
              src={interactingRibbon}
              alt=""
              aria-hidden="true"
              draggable="false"
              style={reduceMotion ? undefined : {
                x: ribbonX,
                y: ribbonY,
                rotate: ribbonRotate,
                scale: ribbonScale,
                opacity: ribbonOpacity,
              }}
            />
            <div className={styles.visualGrade} aria-hidden="true" />
            <div className={styles.visualCaption} aria-hidden="true">
              <span>FORM / FUNCTION</span><span>SCROLL TO EXPLORE</span>
            </div>
          </div>

          <aside className={styles.editorialNote}>
            <span className={styles.noteLabel}>{content.noteLabel}</span>
            <h2>{content.noteTitle}</h2>
            <p>{content.noteCopy}</p>
            <Link to={content.noteTo} className={styles.noteLink}>
              {content.noteLink}<ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </aside>
        </div>

        <div className={styles.sceneProgress} aria-hidden="true">
          <span>{content.index}</span>
          <div className={styles.progressTrack}><motion.div style={{ width: reduceMotion ? "100%" : progressWidth }} /></div>
          <span>SCROLL TO CONTINUE</span>
        </div>
      </div>
    </section>
  );
}
