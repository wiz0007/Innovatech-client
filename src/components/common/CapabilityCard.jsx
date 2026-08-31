import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Globe, Smartphone, Cpu } from "lucide-react";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import styles from "./CapabilityCard.module.scss";

const serviceIconMap = {
  "web-apps": <Globe size={28} />,
  "mobile-apps": <Smartphone size={28} />,
  "ai-solutions": <Cpu size={28} />,
};

const CapabilityCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <TiltCard className={styles.tiltWrapper} maxTilt={6}>
      <div
        className={styles.card}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Ambient Video Layer */}
        {service.videoBg && (
          <div className={styles.cardVideoLayer}>
            <video
              ref={videoRef}
              src={service.videoBg}
              loop
              muted
              playsInline
              preload="none"
              className={`${styles.cardBgVideo} ${isHovered ? styles.cardVideoPlaying : ""}`}
            />
            <div className={styles.scanlineOverlay} />
            <div className={styles.darkGradient} />
          </div>
        )}

        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              {serviceIconMap[service.id] || <img src={service.icon} alt={service.title} />}
            </div>
            <span className={styles.categoryNum}>0{index + 1}</span>
          </div>

          <h3 className={styles.title}>{service.title}</h3>
          <p className={styles.tagline}>{service.tagline}</p>
          <p className={styles.description}>{service.description}</p>

          <ul className={styles.highlightsList}>
            {service.highlights.slice(0, 3).map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.cardFooter}>
            <div className={styles.techTags}>
              {service.techStack.slice(0, 3).map((tech, i) => (
                <span key={i} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
            <MagneticButton>
              <Link to="/services" className={styles.exploreLink}>
                <span>Explore</span>
                <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default CapabilityCard;
