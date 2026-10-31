import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import styles from "./StudioTickerBanner.module.scss";

const TICKER_ITEMS = [
  {
    badge: "VERIFIED BUILD",
    title: "100% In-House Verified Codebases",
    detail: "Zero Junior Delegation",
    link: "/work",
  },
  {
    badge: "WEB COMMERCE",
    title: "MyKart Storefront",
    detail: "Sub-Second Checkout • 99 Lighthouse",
    link: "/work",
  },
  {
    badge: "MOBILE ENGINE",
    title: "Book Reading Native App",
    detail: "React Native • 60 FPS Gesture Engine",
    link: "/work",
  },
  {
    badge: "ARCHITECTURE",
    title: "Direct Principal Architect Partnership",
    detail: "100% Code Ownership",
    link: "/contact",
  },
  {
    badge: "STREAMING UI",
    title: "Cinema Stream & Discovery",
    detail: "Progressive Caching • REST API",
    link: "/work",
  },
  {
    badge: "SYSTEMS",
    title: "Modular Grid Design System",
    detail: "Scalable Component Composability",
    link: "/work",
  },
  {
    badge: "PERFORMANCE",
    title: "High-Conversion SaaS Platform",
    detail: "Conversion Strategy • Interactive UI",
    link: "/work",
  },
];

const StudioTickerBanner = () => {
  return (
    <div className={styles.tickerWrapper} aria-label="Live Studio Telemetry">
      <div className={styles.fixedLabel}>
        <span className={styles.livePulse} />
        <span className={styles.labelText}>STUDIO TELEMETRY</span>
      </div>

      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {/* First loop */}
          <div className={styles.marqueeGroup}>
            {TICKER_ITEMS.map((item, idx) => (
              <Link to={item.link} key={`loop1-${idx}`} className={styles.tickerCard}>
                <span className={styles.badge}>{item.badge}</span>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.divider}>//</span>
                <span className={styles.detail}>{item.detail}</span>
                <ArrowUpRight size={12} className={styles.arrow} />
              </Link>
            ))}
          </div>

          {/* Duplicate loop for infinite seamless scroll */}
          <div className={styles.marqueeGroup} aria-hidden="true">
            {TICKER_ITEMS.map((item, idx) => (
              <Link to={item.link} key={`loop2-${idx}`} className={styles.tickerCard}>
                <span className={styles.badge}>{item.badge}</span>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.divider}>//</span>
                <span className={styles.detail}>{item.detail}</span>
                <ArrowUpRight size={12} className={styles.arrow} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioTickerBanner;
