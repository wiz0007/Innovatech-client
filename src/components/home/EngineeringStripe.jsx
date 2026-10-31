import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import teamMembers from "../../content/teamData";
import styles from "./EngineeringStripe.module.scss";

const EngineeringStripe = () => {
  return (
    <section className={styles.stripeWrapper} aria-label="Engineering Standards">
      <div className={styles.container}>
        <motion.div
          className={styles.stripeCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          {/* Left: Engineering Principle Statement */}
          <div className={styles.statementCol}>
            <div className={styles.eyebrow}>
              <ShieldCheck size={14} className={styles.eyebrowIcon} />
              <span>DIRECT PRINCIPAL OWNERSHIP</span>
            </div>

            <h2 className={styles.statementText}>
              Engineered by senior architects with zero junior delegation.
            </h2>
          </div>

          {/* Right: Team Avatar Cluster & Discovery CTA */}
          <div className={styles.actionCol}>
            <Link
              to="/about#leadership"
              className={styles.avatarStack}
              aria-label="Meet the architects on about page"
            >
              {teamMembers.map((member) => (
                <div key={member.id} className={styles.avatarThumb} title={member.name}>
                  <img src={member.photo} alt={member.name} />
                </div>
              ))}
            </Link>

            <Link
              to="/about#leadership"
              className={styles.aboutLink}
              aria-label="Meet the architects on about page"
            >
              <span>Meet the Architects</span>
              <ArrowUpRight size={16} className={styles.arrowIcon} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringStripe;
