import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Performance hygiene for ScrollTrigger (P1 in assessment)
  // - ignoreMobileResize: ignores micro-height shifts from mobile browser chrome hiding/showing
  // - limitCallbacks: throttles callbacks to match display refresh rate
  // - autoRefreshEvents: only refreshes on meaningful document events
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  });
}

export { gsap, ScrollTrigger };
export default gsap;
