import React, { useRef, useEffect } from "react";
import styles from "./BespokeCinematicBackdrop.module.scss";

const BespokeCinematicBackdrop = ({
  imageSrc = "/assets/home-bg.jpg",
  alt = "RogueAI Engineering Backdrop"
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX - innerWidth / 2) / (innerWidth / 2) * -14;
      const moveY = (e.clientY - innerHeight / 2) / (innerHeight / 2) * -10;
      imageRef.current.style.transform = `scale(1.08) translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={styles.backdropContainer}>
      <img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        className={styles.backdropImage}
        loading="eager"
      />
      {/* Scanline Film Matrix Layer */}
      <div className={styles.scanlineOverlay} />
      {/* Ambient Vignette & Contrast Depth */}
      <div className={styles.vignetteOverlay} />
      {/* Radiant Cyber Tint */}
      <div className={styles.colorGradeLayer} />
    </div>
  );
};

export default BespokeCinematicBackdrop;
