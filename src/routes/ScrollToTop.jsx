import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const isNewPage = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (hash) {
      let cancelled = false;

      const scrollToAnchor = () => {
        if (cancelled) return true;
        const targetElement = document.querySelector(hash);
        if (!targetElement) return false;

        if (window.__lenis) {
          window.__lenis.scrollTo(targetElement, {
            offset: -85,
            immediate: isNewPage,
            duration: isNewPage ? 0 : 0.9,
            force: true,
          });
        } else {
          targetElement.scrollIntoView({
            behavior: isNewPage ? "instant" : "smooth",
            block: "start",
          });
        }
        return true;
      };

      if (isNewPage) {
        // Reset scroll position instantly on new page transition
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true, force: true });
        }

        // On next animation frame once DOM is rendered, land directly on target
        const rafId = requestAnimationFrame(() => {
          if (!scrollToAnchor()) {
            const timer = setTimeout(scrollToAnchor, 60);
            return () => clearTimeout(timer);
          }
        });

        return () => {
          cancelled = true;
          cancelAnimationFrame(rafId);
        };
      } else {
        // Same-page anchor click: smoothly scroll to target
        scrollToAnchor();
        return () => {
          cancelled = true;
        };
      }
    }

    // Standard page navigation with no hash: reset to top
    if (isNewPage) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
      }
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
