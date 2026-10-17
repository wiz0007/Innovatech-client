import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If a hash exists (e.g. #services-section), scroll to that specific element
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetElement, { offset: -80, duration: 1 });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
    }

    // Force scroll position to the top of the new page
    const forceScrollToTop = () => {
      // 1. Reset Lenis smooth scroll engine
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
      }

      // 2. Reset standard browser window coordinates
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate execution upon route transition
    forceScrollToTop();

    // Secondary execution on next rAF cycle to override any pending smooth scroll momentum
    const rafId = requestAnimationFrame(forceScrollToTop);

    // Additional passes to handle asynchronous Suspense lazy-loaded page mounting
    const t1 = setTimeout(forceScrollToTop, 50);
    const t2 = setTimeout(forceScrollToTop, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
