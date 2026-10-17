import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles 
} from "lucide-react";
import gsap, { ScrollTrigger } from "../../utils/gsapConfig";
import MagneticButton from "./MagneticButton";
import styles from "./CircularCapabilitiesDrawer.module.scss";

const serviceIconMap = {
  "web-apps": <Globe size={22} />,
  "mobile-apps": <Smartphone size={22} />,
  "ai-solutions": <Cpu size={22} />,
};

const CircularCapabilitiesDrawer = ({ services = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const total = services.length;

  const rotateTo = useCallback((newIndex) => {
    if (newIndex === activeIndex) return;
    setActiveIndex((newIndex + total) % total);
  }, [activeIndex, total]);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Dual Responsive ScrollTrigger setup using matchMedia
  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container || total <= 1) return;

    const mm = gsap.matchMedia();

    // 1. LAPTOP / DESKTOP VIEW: 3-Element 3D Deck Carousel with rotation on scroll
    mm.add("(min-width: 769px)", () => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 75px",
        end: "+=1100",
        pin: container,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetIndex = Math.min(
            total - 1,
            Math.floor(progress * total)
          );
          setActiveIndex(targetIndex);
        },
      });
    });

    // 2. PHONE / MOBILE VIEW: Pinned in exact same center location with smooth fade-in / fade-out melting in background
    mm.add("(max-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 64px",
        end: "+=1200",
        pin: container,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setMobileProgress(progress);
          const targetIndex = Math.min(
            total - 1,
            Math.floor(progress * total)
          );
          setActiveIndex(targetIndex);
        },
      });
    });

    return () => mm.revert();
  }, [total]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - (touchStartY.current || 0);

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Helper to determine relative position for desktop 3D deck (-1: left, 0: center, 1: right)
  const getRelativePosition = (index) => {
    let diff = (index - activeIndex) % total;
    if (diff < -1) diff += total;
    if (diff > 1) diff -= total;
    return diff;
  };

  // Helper to calculate mobile fade in / fade out style melting in the background at exact same location
  const getMobileItemStyle = (index) => {
    let opacity = 0;
    let translateY = 12;
    let pointerEvents = "none";

    if (index === 0) {
      if (mobileProgress <= 0.22) {
        opacity = 1;
        translateY = 0;
        pointerEvents = "auto";
      } else if (mobileProgress < 0.36) {
        const factor = (mobileProgress - 0.22) / 0.14;
        opacity = 1 - factor;
        translateY = -14 * factor;
        pointerEvents = factor < 0.5 ? "auto" : "none";
      }
    } else if (index === 1) {
      if (mobileProgress >= 0.22 && mobileProgress < 0.36) {
        const factor = (mobileProgress - 0.22) / 0.14;
        opacity = factor;
        translateY = 14 * (1 - factor);
        pointerEvents = factor >= 0.5 ? "auto" : "none";
      } else if (mobileProgress >= 0.36 && mobileProgress <= 0.56) {
        opacity = 1;
        translateY = 0;
        pointerEvents = "auto";
      } else if (mobileProgress > 0.56 && mobileProgress < 0.70) {
        const factor = (mobileProgress - 0.56) / 0.14;
        opacity = 1 - factor;
        translateY = -14 * factor;
        pointerEvents = factor < 0.5 ? "auto" : "none";
      }
    } else if (index === 2) {
      if (mobileProgress >= 0.56 && mobileProgress < 0.70) {
        const factor = (mobileProgress - 0.56) / 0.14;
        opacity = factor;
        translateY = 14 * (1 - factor);
        pointerEvents = factor >= 0.5 ? "auto" : "none";
      } else if (mobileProgress >= 0.70) {
        opacity = 1;
        translateY = 0;
        pointerEvents = "auto";
      }
    }

    // Default to activeIndex when at progress 0
    if (mobileProgress === 0 && index === activeIndex) {
      opacity = 1;
      translateY = 0;
      pointerEvents = "auto";
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px)`,
      pointerEvents,
      transition: "opacity 0.22s ease-out, transform 0.22s ease-out",
    };
  };

  return (
    <div ref={triggerRef} className={styles.scrollWrapper}>
      <div ref={containerRef} className={styles.pinnedContainer}>
        {/* Pinned Capabilities Header - Always visible on screen during scroll */}
        <div className={styles.sectionHeaderRow}>
          <div className={styles.titleArea}>
            <h2 className={styles.capabilitiesHeading}>Capabilities</h2>
          </div>
          <Link to="/services" className={styles.capabilitiesHeaderCta}>
            <span className={styles.desktopCtaText}>Engineering Services</span>
            <span className={styles.mobileCtaText}>Services</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* =========================================================================
            LAPTOP / DESKTOP VIEW: 3-Element 3D Deck Carousel (Compact Auto-Fit)
            ========================================================================= */}
        <div className={styles.desktopCarouselStage}>
          {services.map((service, index) => {
            const relPos = getRelativePosition(index);
            const isCenter = relPos === 0;
            const isLeft = relPos === -1;
            const isRight = relPos === 1;

            let cardStateClass = styles.hiddenCard;
            if (isCenter) cardStateClass = styles.centerCard;
            else if (isLeft) cardStateClass = styles.leftCard;
            else if (isRight) cardStateClass = styles.rightCard;

            // Tailor tech pills cleanly so AI Solutions & Systems never overflows
            const displayedTech = service.id === "ai-solutions" 
              ? ["OpenAI API", "Anthropic Claude", "LangChain", "FastAPI"]
              : service.techStack.slice(0, 5);

            return (
              <div
                key={service.id}
                className={`${styles.drawerCard} ${cardStateClass}`}
                onClick={() => {
                  if (isLeft) prevCard();
                  if (isRight) nextCard();
                }}
                role={!isCenter ? "button" : undefined}
                tabIndex={!isCenter ? 0 : undefined}
                aria-label={!isCenter ? `Rotate to ${service.title}` : undefined}
                onKeyDown={(e) => {
                  if (!isCenter && (e.key === "Enter" || e.key === " ")) {
                    rotateTo(index);
                  }
                }}
              >
                {/* Metallic Top Header Lip */}
                <div className={styles.cardHeaderLip}>
                  <div className={styles.drawerHandleGrip} />
                </div>

                <div className={styles.cardInner}>
                  {/* Top Row: Icon + Status */}
                  <div className={styles.topRow}>
                    <div className={styles.iconSquare}>
                      {serviceIconMap[service.id] || <Sparkles size={20} />}
                    </div>
                    <span className={styles.statusDot}>
                      <span className={styles.dot} />
                      ACTIVE
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardTagline}>{service.tagline}</p>

                  {/* Highlights (2 concise bullets) */}
                  <ul className={styles.highlightsList}>
                    {service.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        <CheckCircle2 size={14} className={styles.checkIcon} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className={styles.techPills}>
                    {displayedTech.map((tech, tIdx) => (
                      <span key={tIdx} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className={styles.cardFooter}>
                    <MagneticButton>
                      <Link to="/work" className={styles.silverActionBtn}>
                        <span>Explore Architecture</span>
                        <ArrowUpRight size={15} />
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            PHONE / MOBILE VIEW: Immersive background (NO container box),
            centered in viewport with smooth fade-in & fade-out on scroll
            ========================================================================= */}
        <div 
          className={styles.mobileFadeStage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.mobileEmergeContainer}>
            {services.map((service, index) => {
              const itemStyle = getMobileItemStyle(index);
              const displayedTech = service.techStack.slice(0, 5);

              return (
                <div
                  key={service.id}
                  className={styles.mobileEmergeItem}
                  style={itemStyle}
                >
                  {/* Atmospheric radial ambient glow melting in background */}
                  <div className={styles.mobileItemGlow} aria-hidden="true" />

                  {/* Top Row: Clean Icon Badge + Active Status */}
                  <div className={styles.mobileTopRow}>
                    <div className={styles.mobileIconBadge}>
                      {serviceIconMap[service.id] || <Sparkles size={20} />}
                    </div>
                    <span className={styles.mobileStatusBadge}>
                      <span className={styles.mobileActiveDot} />
                      ACTIVE
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className={styles.mobileItemTitle}>{service.title}</h3>
                  <p className={styles.mobileItemTagline}>{service.tagline}</p>

                  {/* Production Highlights - 2 concise bullets */}
                  <ul className={styles.mobileHighlightsList}>
                    {service.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <li key={hIdx} className={styles.mobileHighlightItem}>
                        <CheckCircle2 size={14} className={styles.mobileCheckIcon} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className={styles.mobileTechPills}>
                    {displayedTech.map((tech, tIdx) => (
                      <span key={tIdx} className={styles.mobileTechPill}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Centered CTA Button */}
                  <div className={styles.mobileCtaRow}>
                    <Link to="/work" className={styles.mobileSilverCtaBtn}>
                      <span>Explore Architecture</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCapabilitiesDrawer;
