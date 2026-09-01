import { useState, useEffect, useRef } from "react";

/**
 * useViewportLifecycle
 * High-performance runtime controller that manages media decode, rAF loops,
 * and animations based on viewport intersection, tab visibility, and reduced-motion preferences.
 *
 * @param {Object} options
 * @param {string} options.rootMargin - Intersection lookahead buffer (default: "300px")
 * @param {number} options.threshold - Visibility threshold (default: 0)
 * @param {boolean} options.pauseOffscreen - Whether to pause when out of viewport (default: true)
 */
export const useViewportLifecycle = ({
  rootMargin = "300px",
  threshold = 0,
  pauseOffscreen = true
} = {}) => {
  const containerRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTabActive, setIsTabActive] = useState(!document.hidden);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Tab Visibility Controller (visibilitychange)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 2. Prefers Reduced Motion Media Query
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  // 3. Viewport Intersection Observer (Lookahead buffer)
  useEffect(() => {
    if (!pauseOffscreen || !containerRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [rootMargin, threshold, pauseOffscreen]);

  // Derived execution signal
  const shouldAnimate = isInViewport && isTabActive && !prefersReducedMotion;
  const shouldPlayMedia = isInViewport && isTabActive;

  return {
    ref: containerRef,
    isInViewport,
    isTabActive,
    prefersReducedMotion,
    shouldAnimate,
    shouldPlayMedia
  };
};

export default useViewportLifecycle;
