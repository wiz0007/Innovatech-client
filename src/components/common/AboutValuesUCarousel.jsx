import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Cpu, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./AboutValuesUCarousel.module.scss";

// 5 Curated Core Values (Odd number for a symmetrical hero center card)
const VALUES_DATA = [
  {
    id: "craftsmanship",
    icon: <Code2 size={20} />,
    title: "Craftsmanship & Type Safety",
    desc: "Clean, modular, and typed codebases engineered for zero technical debt and enduring maintainability."
  },
  {
    id: "spatial-interfaces",
    icon: <Terminal size={20} />,
    title: "Spatial & Fluid Interfaces",
    desc: "Responsive geometry, thoughtful touch targets, and 60FPS fluid motion that feels tactile and natural."
  },
  {
    id: "throughput",
    icon: <Cpu size={20} />,
    title: "High-Throughput Architecture",
    desc: "Sub-second checkout, indexed queries, and optimized cloud pipelines capable of sustained scale."
  },
  {
    id: "principal-eng",
    icon: <ShieldCheck size={20} />,
    title: "Direct Principal Engineering",
    desc: "100% senior architect ownership with zero junior handoffs, daily Git transparency, and direct communication."
  },
  {
    id: "ai-systems",
    icon: <Sparkles size={20} />,
    title: "Autonomous AI Systems",
    desc: "Production-grade agent architectures and low-latency inference pipelines seamlessly embedded into real products."
  }
];

// 5 Desktop Slots: Starts top-left of heading, curves under, ends top-right of heading
const DESKTOP_SLOTS = [
  { left: "1.5%", top: 0, zIndex: 1, scale: 0.92, opacity: 0.8 },      // Slot 0: Top Left of Heading
  { left: "17%", top: 110, zIndex: 3, scale: 0.96, opacity: 0.92 },    // Slot 1: Mid Left (descending)
  { left: "50%", top: 175, zIndex: 6, scale: 1.04, opacity: 1, isCenter: true }, // Slot 2: Center Bottom Apex
  { left: "57%", top: 110, zIndex: 3, scale: 0.96, opacity: 0.92 },    // Slot 3: Mid Right (ascending)
  { left: "72.5%", top: 0, zIndex: 1, scale: 0.92, opacity: 0.8 }     // Slot 4: Top Right of Heading
];

const AboutValuesUCarousel = () => {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = useCallback(() => {
    setOffset((prev) => (prev - 1 + VALUES_DATA.length) % VALUES_DATA.length);
  }, []);

  const handleNext = useCallback(() => {
    setOffset((prev) => (prev + 1) % VALUES_DATA.length);
  }, []);

  // Reliable Auto-rotation: Exactly every 4 seconds (4000ms)
  // Only pauses if hovered on a genuine cursor device (never freezes on mobile)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % VALUES_DATA.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
  };

  // Safe hover handlers that only pause on genuine desktop cursor devices
  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate Mobile Pyramid Stack coordinates (top-down pyramid / stepped echelon)
  const getMobilePyramidProps = (index) => {
    const rel = (index - (offset % VALUES_DATA.length) + VALUES_DATA.length) % VALUES_DATA.length;

    switch (rel) {
      case 0:
        // Apex Card (Active Front Center)
        return {
          x: 0,
          y: 0,
          scale: 1,
          zIndex: 10,
          opacity: 1,
          isApex: true
        };
      case 1:
        // Stepped Behind Right (Layer 1)
        return {
          x: 34,
          y: -10,
          scale: 0.92,
          zIndex: 8,
          opacity: 0.76,
          isApex: false
        };
      case 2:
        // Stepped Behind Right (Layer 2 - Furthest Right Back)
        return {
          x: 64,
          y: -18,
          scale: 0.85,
          zIndex: 6,
          opacity: 0.44,
          isApex: false
        };
      case 4:
        // Stepped Behind Left (Layer 1)
        return {
          x: -34,
          y: -10,
          scale: 0.92,
          zIndex: 8,
          opacity: 0.76,
          isApex: false
        };
      case 3:
        // Stepped Behind Left (Layer 2 - Furthest Left Back)
        return {
          x: -64,
          y: -18,
          scale: 0.85,
          zIndex: 6,
          opacity: 0.44,
          isApex: false
        };
      default:
        return { x: 0, y: 0, scale: 1, zIndex: 1, opacity: 1, isApex: false };
    }
  };

  return (
    <div
      className={styles.uCarouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Core Engineering Values Carousel"
    >
      {/* Ambient Seamless Celestial Radial Glow (Zero Dividing Lines) */}
      <div className={styles.uCurveBackdrop} aria-hidden="true" />

      {/* Centered Heading embraced inside the opening of the U */}
      <div className={styles.headingArea}>
        <h2 className={styles.sectionTitle}>What Sets RogueAI Apart</h2>
        <p className={styles.sectionSubtitle}>
          The foundational engineering values that guide our day-to-day decisions.
        </p>
      </div>

      {/* Desktop U-Cradle Overlapping Stage (All 5 cards visible in 3D arc) */}
      <div className={styles.desktopUStage}>
        {VALUES_DATA.map((item, index) => {
          // Calculate active slot (0 to 4) so rightmost continuously cycles to leftmost
          const slotIdx = (index + offset) % VALUES_DATA.length;
          const slot = DESKTOP_SLOTS[slotIdx];

          return (
            <motion.div
              key={item.id}
              className={`${styles.uCardItem} ${slot.isCenter ? styles.centerHeroCard : ""}`}
              animate={{
                left: slot.left,
                top: slot.top,
                scale: slot.scale,
                zIndex: slot.zIndex,
                opacity: slot.opacity,
                x: slot.isCenter ? "-50%" : "0%"
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 24,
                mass: 0.95
              }}
              onClick={() => {
                // Clicking a side card brings it to center
                const diff = (2 - slotIdx + VALUES_DATA.length) % VALUES_DATA.length;
                if (diff !== 0) {
                  setOffset((prev) => (prev + diff) % VALUES_DATA.length);
                }
              }}
            >
              <div className={styles.uCardInner}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIconWrapper}>{item.icon}</div>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile & Tablet Top-Down Stepped Pyramid Stage (Consistent Zero-Jerk Height) */}
      <div
        className={styles.mobileCardStage}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.pyramidDeckWrapper}>
          {VALUES_DATA.map((item, index) => {
            const pyramid = getMobilePyramidProps(index);

            return (
              <motion.div
                key={item.id}
                className={`${styles.mobilePyramidCard} ${pyramid.isApex ? styles.mobileApexCard : styles.mobileSteppedCard}`}
                animate={{
                  x: pyramid.x,
                  y: pyramid.y,
                  scale: pyramid.scale,
                  zIndex: pyramid.zIndex,
                  opacity: pyramid.opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 24,
                  mass: 0.92
                }}
                onClick={() => setOffset(index)}
                style={{ zIndex: pyramid.zIndex }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardIconWrapper}>{item.icon}</div>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 5 Sleek Progress Dots for Mobile View */}
        <div className={styles.indicatorRow} aria-hidden="true">
          {VALUES_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setOffset(i)}
              className={`${styles.indicatorDot} ${i === offset % VALUES_DATA.length ? styles.indicatorActive : ""}`}
              aria-label={`Jump to value ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Minimal Prev/Next Directional Controls (Fully Functional on Both Laptop & Mobile) */}
      <div className={styles.minimalNavRow}>
        <button
          onClick={handlePrev}
          className={styles.minimalNavBtn}
          aria-label="Previous value"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={handleNext}
          className={styles.minimalNavBtn}
          aria-label="Next value"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default AboutValuesUCarousel;
