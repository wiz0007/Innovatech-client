import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import teamMembers from "../../content/teamData";
import styles from "./LeadershipShowcase.module.scss";

const LeadershipShowcase = () => {
  const [turntableAngle, setTurntableAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Active front-facing architect index based on cylinder rotation angle
  const turntableIdx = (Math.round(-turntableAngle / 90) % 4 + 4) % 4;
  const currentTurntable = teamMembers[turntableIdx];

  // Screen resize detection for mobile/desktop layout
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const rotateTurntableLeft = useCallback(() => {
    setTurntableAngle((prev) => prev + 90);
  }, []);

  const rotateTurntableRight = useCallback(() => {
    setTurntableAngle((prev) => prev - 90);
  }, []);

  const handleCardClick = (idx) => {
    const currentNorm = (Math.round(-turntableAngle / 90) % 4 + 4) % 4;
    let diff = idx - currentNorm;
    if (diff > 2) diff -= 4;
    if (diff < -2) diff += 4;
    setTurntableAngle((prev) => prev - diff * 90);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        rotateTurntableLeft();
      } else if (e.key === "ArrowRight") {
        rotateTurntableRight();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotateTurntableLeft, rotateTurntableRight]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      rotateTurntableRight();
    } else if (diff < -45) {
      rotateTurntableLeft();
    }
  };

  return (
    <div className={styles.showcaseRoot}>
      {!isMobile ? (
        /* ================= DESKTOP 3D TURNTABLE (90° INWARD TILTED CYLINDER) ================= */
        <div className={styles.turntableStage}>
          {/* 3D Scene Viewport */}
          <div className={styles.turntableScene}>
            <div
              className={styles.turntableCylinder}
              style={{ transform: `rotateY(${turntableAngle}deg)` }}
            >
              {teamMembers.map((member, idx) => {
                const baseDeg = idx * 90;
                const isFront = idx === turntableIdx;

                return (
                  <div
                    key={member.id}
                    className={`${styles.cylinderCard} ${isFront ? styles.frontActiveCard : styles.flankCard}`}
                    style={{ transform: `rotateY(${baseDeg}deg) translateZ(320px)` }}
                    onClick={() => handleCardClick(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${member.name}`}
                    onKeyDown={(e) => e.key === "Enter" && handleCardClick(idx)}
                  >
                    <div className={styles.cylinderCardInner}>
                      <div className={styles.cylinderAvatarBox}>
                        <img src={member.photo} alt={member.name} className={styles.cylinderImg} />
                        <div className={styles.cylinderImgShade} />
                      </div>

                      <div className={styles.cylinderInfo}>
                        <div className={styles.nameRoleRow}>
                          <h4 className={styles.cylinderName}>{member.name}</h4>
                          <span className={styles.cylinderRole}>{member.role.split("/")[0]}</span>
                        </div>

                        <div className={styles.cylinderSkillsWrap}>
                          {member.skills.slice(0, 3).map((s, sIdx) => (
                            <span key={sIdx} className={styles.cylinderSkillChip}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Perspective 3D Ambient Floor Ring */}
            <div className={styles.perspectiveFloor} aria-hidden="true" />
          </div>

          {/* Lower Inspection & Rotation Paddle Dock */}
          <div className={styles.turntableLowerControls}>
            <button
              onClick={rotateTurntableLeft}
              className={styles.turntablePaddleBtn}
              aria-label="Previous Architect"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.turntableActiveCardInfo}>
              <div className={styles.activeFocusRow}>
                <span className={styles.focusName}>{currentTurntable.name}</span>
                <span className={styles.focusRole}>{currentTurntable.role}</span>

                <div className={styles.focusSocials}>
                  {currentTurntable.socials.github && (
                    <a href={currentTurntable.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub />
                    </a>
                  )}
                  {currentTurntable.socials.linkedin && (
                    <a href={currentTurntable.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <FaLinkedin />
                    </a>
                  )}
                  {currentTurntable.socials.twitter && (
                    <a href={currentTurntable.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <FaTwitter />
                    </a>
                  )}
                </div>
              </div>
              <p className={styles.focusBio}>{currentTurntable.bio}</p>
            </div>

            <button
              onClick={rotateTurntableRight}
              className={styles.turntablePaddleBtn}
              aria-label="Next Architect"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        /* ================= MOBILE VIEWPORT (CONNECTED CARD & LEFT/RIGHT ARROWS) ================= */
        <div
          className={styles.mobileStageWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Navigation Arrow (Strictly on the Left) */}
          <button
            onClick={rotateTurntableLeft}
            className={styles.mobilePaddleLeft}
            aria-label="Previous Architect"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Unified Connected Mobile Card (Image Connected With Description) */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentTurntable.id}
              className={styles.mobileConnectedCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.mobilePhotoWrapper}>
                <img src={currentTurntable.photo} alt={currentTurntable.name} className={styles.mobilePhoto} />
                <div className={styles.mobilePhotoGradient} />
              </div>

              <div className={styles.mobileCardBody}>
                <div className={styles.mobileHeaderRow}>
                  <div>
                    <h3 className={styles.mobileName}>{currentTurntable.name}</h3>
                    <span className={styles.mobileRole}>{currentTurntable.role}</span>
                  </div>

                  <div className={styles.mobileSocials}>
                    {currentTurntable.socials.github && (
                      <a href={currentTurntable.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                      </a>
                    )}
                    {currentTurntable.socials.linkedin && (
                      <a href={currentTurntable.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                    )}
                    {currentTurntable.socials.twitter && (
                      <a href={currentTurntable.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.mobileBio}>{currentTurntable.bio}</p>

                <div className={styles.mobileSkillsList}>
                  {currentTurntable.skills.map((skill, sIdx) => (
                    <span key={sIdx} className={styles.mobileSkillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Navigation Arrow (Strictly on the Right) */}
          <button
            onClick={rotateTurntableRight}
            className={styles.mobilePaddleRight}
            aria-label="Next Architect"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadershipShowcase;
