import React, { useEffect } from "react";
import Lenis from "lenis";
import AllRoutes from "./routes/AllRoutes.jsx";
import ScrollToTop from "./routes/ScrollToTop.jsx";
import "./App.css";

function App() {
  useEffect(() => {
    // Disable browser default scroll restoration so it doesn't fight Lenis/router
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Detect user accessibility motion preferences
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize Lenis smooth scroll with power & accessibility awareness
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    window.__lenis = lenis;

    let animationFrameId;
    let isTabVisible = !document.hidden;

    function raf(time) {
      if (isTabVisible) {
        lenis.raf(time);
      }
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Pause frame execution and scroll listeners when tab is backgrounded
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="app">
      <ScrollToTop />
      <AllRoutes />
    </div>
  );
}

export default App;
