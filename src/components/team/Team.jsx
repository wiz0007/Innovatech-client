import React from "react";
import { motion } from "framer-motion";
import styles from "./Team.module.scss";
import members from "../../assets/team/team"; // Array of member objects

// Example member object: { name, role, photo, twitter, linkedin }

const Team = () => {
  return (
    <section className={styles.team} id="team">
      <h2>Meet <span>Our Team</span></h2>
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
            <div className={styles.imageWrapper}>
              <img src={member.photo} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className={styles.socials}>
              {member.twitter && <a href={member.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>}
              {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>}
              {member.github && <a href={member.github} target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
