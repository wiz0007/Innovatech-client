import React, { useRef, useEffect } from "react";
import useViewportLifecycle from "../../hooks/useViewportLifecycle";
import styles from "./BespokeCinematicBackdrop.module.scss";

const BespokeCinematicBackdrop = ({
  imageSrc = "/assets/home-bg.webp",
  alt = "RogueAI Engineering Backdrop",
  isLCP = true
}) => {
  const { ref: containerRef, shouldAnimate } = useViewportLifecycle({
    rootMargin: "350px"
  });
  const imageRef = useRef(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    let rafId;
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const moveX = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * -14;
        const moveY = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * -10;
        if (imageRef.current) {
          imageRef.current.style.transform = `scale(1.08) translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [shouldAnimate]);

  // Normalize imageSrc to webp if requested with jpg/png fallback
  const webpSrc = imageSrc.replace(/\.(jpg|png)$/i, ".webp");

  return (
    <div ref={containerRef} className={styles.backdropContainer}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          ref={imageRef}
          src={imageSrc}
          alt={alt}
          width={1920}
          height={1080}
          loading={isLCP ? "eager" : "lazy"}
          fetchPriority={isLCP ? "high" : "auto"}
          decoding={isLCP ? "sync" : "async"}
          className={`${styles.backdropImage} ${!shouldAnimate ? styles.paused : ""}`}
        />
      </picture>
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
