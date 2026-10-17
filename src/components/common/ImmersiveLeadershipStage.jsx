import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import teamMembers from "../../content/teamData";
import styles from "./ImmersiveLeadershipStage.module.scss";

const leadershipConfig = {
  "ayushmaan-mishra": {
    badge: "Founder & Lead Architect",
    tier: "flagship",
    skills: ["React 19 / Next.js", "Node Microservices", "RAG & AI Systems"]
  },
  "anurag-rawat": {
    badge: "COO & Operations",
    tier: "executive",
    skills: ["Agile Sprint Delivery", "Operations", "Process Ops"]
  },
  "nikhil-rawat": {
    badge: "Lead UI/UX Design",
    tier: "executive",
    skills: ["Design Systems", "Spatial Interfaces", "User Research"]
  },
  "tanuj-joshi": {
    badge: "Mobile Systems",
    tier: "specialist",
    skills: ["React Native", "Flutter", "iOS / Android Native"]
  }
};

export default function ImmersiveLeadershipStage() {
  return (
    <div className={styles.stageWrapper}>
      {/* SECTION HEADER ROW */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h2 className={styles.sectionHeading}>Engineering Leadership</h2>
        </div>

        <Link to="/about" className={styles.viewAllBtn}>
          <span>Full Team & Story</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* ALL CARDS IN HORIZONTAL LAYOUT */}
      <div className={styles.cardsRow}>
        {teamMembers.map((member, index) => {
          const config = leadershipConfig[member.id] || {
            badge: member.role,
            tier: "specialist",
            skills: member.skills.slice(0, 3)
          };
          const isFlagship = config.tier === "flagship";

          return (
            <motion.div
              key={member.id}
              className={`${styles.card} ${isFlagship ? styles.flagshipCard : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* PRIMARY FOCUS OF HIERARCHY: THE PHOTO ITSELF */}
              <div className={styles.photoContainer}>
                {isFlagship && <div className={styles.studioBacklight} />}

                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.photoImg}
                  loading="lazy"
                />

                <div className={styles.photoVignette} />
                <div className={styles.scanlineOverlay} />

                {/* INTERNAL HIERARCHY BADGE */}
                <span
                  className={`${styles.statusBadge} ${
                    isFlagship ? styles.flagshipBadge : ""
                  }`}
                >
                  <span
                    className={`${styles.pulseDot} ${
                      isFlagship ? styles.flagshipDot : ""
                    }`}
                  />
                  <span>{config.badge}</span>
                </span>
              </div>

              {/* DETAILS & HIERARCHY INSIDE THE CARD */}
              <div className={styles.cardDetails}>
                <div className={styles.identityGroup}>
                  <h3
                    className={`${styles.memberName} ${
                      isFlagship ? styles.flagshipName : ""
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>

                {/* SKILLS PILLS */}
                <div className={styles.skillsGroup}>
                  {config.skills.map((skill, i) => (
                    <span key={i} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* FOOTER ACTIONS */}
                <div className={styles.cardFooter}>
                  <div className={styles.socialsGroup}>
                    {member.socials?.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialBtn}
                        aria-label={`${member.name} GitHub`}
                      >
                        <FaGithub size={13} />
                      </a>
                    )}
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialBtn}
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <FaLinkedin size={13} />
                      </a>
                    )}
                  </div>

                  <Link to="/about" className={styles.profileLink}>
                    <span>Background</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
