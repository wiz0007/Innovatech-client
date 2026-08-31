import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Sparkles, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import styles from "./CTASection.module.scss";

const CTASection = ({
  title = "Ready to engineer something exceptional?",
  description = "Let’s discuss your product vision, system architecture, and launch timeline. We turn ideas into market-defining digital reality.",
  buttonText = "Start an Engagement",
  buttonLink = "/contact",
  videoBg = "https://assets.mixkit.co/videos/preview/mixkit-glowing-lines-in-a-network-loop-42861-large.mp4"
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className={styles.ctaWrapper}>
      <motion.div
        className={styles.ctaCard}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        {/* Ambient Video Background Layer */}
        {videoBg && (
          <div className={styles.videoLayer}>
            <video
              ref={videoRef}
              src={videoBg}
              autoPlay
              loop
              muted
              playsInline
              className={styles.ambientVideo}
            />
            <div className={styles.scanlineOverlay} />
            <div className={styles.darkVignette} />
          </div>
        )}

        <div className={styles.glow} />
        
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgePulse} />
            <span>Next-Gen Product Engineering</span>
          </div>
          
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.actions}>
            <MagneticButton>
              <Link to={buttonLink} className={styles.primaryBtn}>
                <span>{buttonText}</span>
                <FaArrowRight />
              </Link>
            </MagneticButton>
            
            <MagneticButton>
              <Link to="/work" className={styles.secondaryBtn}>
                <span>View Case Studies</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
