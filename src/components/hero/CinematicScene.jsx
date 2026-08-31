import React, { useRef, useEffect, useState } from "react";
import styles from "./CinematicScene.module.scss";

const CinematicScene = () => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reduced motion preference check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [videoLoaded]);

  return (
    <div className={styles.sceneContainer} aria-hidden="true">
      {/* Background Poster for instant first paint */}
      <div
        className={`${styles.posterImage} ${videoLoaded ? styles.posterHidden : ""}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&auto=format&fit=crop&q=80')",
        }}
      />

      {/* Real-Life Cinematic Engineering Video */}
      <video
        ref={videoRef}
        className={styles.videoElement}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-typing-code-on-a-laptop-4554/1080p.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41551-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic Dark Vignette Overlay for High Typography Contrast */}
      <div className={styles.darkVignette} />

      {/* Subtle Grid / Scanline Texture */}
      <div className={styles.gridTexture} />
    </div>
  );
};

export default CinematicScene;
