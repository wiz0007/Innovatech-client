import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import BespokeCinematicBackdrop from "./BespokeCinematicBackdrop";
import gsap from "../../utils/gsapConfig";
import styles from "./VideoHero.module.scss";

const VideoHero = ({
  headline = "ROGUEAI",
  subtitle = "Digital systems and product engineering",
  description = "We design, architect, and ship high-throughput web apps, fluid mobile platforms, and reliable AI workflows for startups and enterprises demanding uncompromised performance.",
  primaryCtaText = "Start an Engagement",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Explore Selected Work",
  secondaryCtaLink = "/work",
  imageSrc = "/assets/home-bg.jpg"
}) => {
  const containerRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const actionsRef = useRef(null);

  // Exact GSAP Choreographed Scroll Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Initial state: subtitle and description hidden
      gsap.set(subtitleRef.current, { opacity: 0, y: 60, scale: 0.92 });
      gsap.set(descRef.current, { opacity: 0, y: 40 });
      gsap.set(actionsRef.current, { opacity: 0, y: 30 });

      // Step 1: ROGUEAI letters move far apart (left and right), zoom out/up and fade
      tl.to(titleLeftRef.current, {
        x: "-14vw",
        y: -100,
        scale: 1.35,
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.45
      }, 0)
      .to(titleRightRef.current, {
        x: "14vw",
        y: -100,
        scale: 1.35,
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.45
      }, 0)

      // Step 2: "Digital systems and product engineering" comes into center stage
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.45
      }, 0.25)

      // Step 3: Subtitle description and CTA buttons reveal smoothly
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.35
      }, 0.45)
      .to(actionsRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.35
      }, 0.55);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const mid = Math.ceil(headline.length / 2);
  const leftPart = headline.slice(0, mid);
  const rightPart = headline.slice(mid);

  return (
    <section ref={containerRef} className={styles.videoHeroSection}>
      {/* Bespoke 4K Cinematic AI Neural Core Backdrop */}
      <BespokeCinematicBackdrop
        imageSrc={imageSrc}
        alt="RogueAI Neural Computing Core"
      />

      {/* Hero Content Stage */}
      <div className={styles.contentContainer}>
        {/* Split Headline for Left-Right Spread Animation */}
        <div className={styles.titleWrapper}>
          <span ref={titleLeftRef} className={styles.titleLeft}>
            {leftPart}
          </span>
          <span ref={titleRightRef} className={styles.titleRight}>
            {rightPart}
          </span>
        </div>

        {/* Emergent Editorial Subtitle */}
        <h2 ref={subtitleRef} className={styles.heroSubtitle}>
          {subtitle}
        </h2>

        {/* Narrative Description */}
        <p ref={descRef} className={styles.heroDesc}>
          {description}
        </p>

        {/* Action Buttons */}
        <div ref={actionsRef} className={styles.heroActions}>
          <MagneticButton>
            <Link to={primaryCtaLink} className={styles.primaryBtn}>
              <span>{primaryCtaText}</span>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link to={secondaryCtaLink} className={styles.secondaryBtn}>
              <span>{secondaryCtaText}</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
