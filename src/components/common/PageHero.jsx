import React, { useRef, useEffect } from "react";
import BespokeCinematicBackdrop from "./BespokeCinematicBackdrop";
import gsap from "../../utils/gsapConfig";
import styles from "./PageHero.module.scss";

const PageHero = ({
  headline,
  title,
  subtitle,
  description,
  imageSrc = "/assets/services-bg.webp",
  children
}) => {
  const containerRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const childrenRef = useRef(null);

  const mainHeadline = headline || title || "";

  // Choreographed GSAP Pinned Letter-Split Scroll Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      gsap.set(subtitleRef.current, { opacity: 0, y: 50, scale: 0.94 });
      if (descRef.current) gsap.set(descRef.current, { opacity: 0, y: 35 });
      if (childrenRef.current) gsap.set(childrenRef.current, { opacity: 0, y: 25 });

      // Step 1: Letters split left and right, zoom out/up and fade
      tl.to(titleLeftRef.current, {
        x: "-12vw",
        y: -80,
        scale: 1.3,
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.45
      }, 0)
      .to(titleRightRef.current, {
        x: "12vw",
        y: -80,
        scale: 1.3,
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.45
      }, 0)

      // Step 2: Emergent subtitle comes into position
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.45
      }, 0.25);

      // Step 3: Description and actions reveal
      if (descRef.current) {
        tl.to(descRef.current, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.35
        }, 0.45);
      }

      if (childrenRef.current) {
        tl.to(childrenRef.current, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.35
        }, 0.55);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const mid = Math.ceil(mainHeadline.length / 2);
  const leftPart = mainHeadline.slice(0, mid);
  const rightPart = mainHeadline.slice(mid);

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Bespoke 4K WebP Optimized Backdrop */}
      <BespokeCinematicBackdrop
        imageSrc={imageSrc}
        alt={`${mainHeadline} Engineering Backdrop`}
        isLCP={true}
      />

      <div className={styles.container}>
        {/* Split Headline for Left-Right Spread Animation */}
        <div className={styles.titleWrapper}>
          <span ref={titleLeftRef} className={styles.titleLeft}>
            {leftPart}
          </span>
          <span ref={titleRightRef} className={styles.titleRight}>
            {rightPart}
          </span>
        </div>

        {subtitle && (
          <h2 ref={subtitleRef} className={styles.subtitle}>
            {subtitle}
          </h2>
        )}

        {description && (
          <p ref={descRef} className={styles.description}>
            {description}
          </p>
        )}

        {children && (
          <div ref={childrenRef} className={styles.childrenWrapper}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
