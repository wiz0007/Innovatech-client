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

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
