import React from "react";
import { motion } from "framer-motion";
import styles from "./Team.module.scss";
import members from "../../assets/team/team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Team = () => {
  return (
    <section className={styles.team} id="team">
      <h2>
        Meet <span>Our Team</span>
      </h2>
      <div className={styles.cards}>
        {members.map((member, index) => (
          <motion.div
            className={styles.card}
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            viewport={{ once: true }}
          >
            {/* Member Image */}
            <div className={styles.imageWrapper}>
              <img src={member.photo} alt={member.name} />
            </div>

            {/* Member Info */}
            <h3>{member.name}</h3>
            <p>{member.role}</p>

            {/* Social Icons */}
            <div className={styles.socials}>
              {member.twitter && (
                <div className={`${styles.social} ${styles.twitter}`}>
                  <a href={member.twitter} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <span className={styles.tooltip}>Twitter</span>
                </div>
              )}
              {member.linkedin && (
                <div className={`${styles.social} ${styles.linkedin}`}>
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <span className={styles.tooltip}>LinkedIn</span>
                </div>
              )}
              {member.github && (
                <div className={`${styles.social} ${styles.github}`}>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <span className={styles.tooltip}>GitHub</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;