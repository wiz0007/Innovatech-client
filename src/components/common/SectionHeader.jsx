import React from "react";
import { motion } from "framer-motion";
import styles from "./SectionHeader.module.scss";

const SectionHeader = ({ eyebrow, title, subtitle, align = "left", centered = false, className = "", theme = "default" }) => {
  const isCentered = centered || align === "center";

  return (
    <motion.div
      className={`${styles.header} ${isCentered ? styles.centered : ""} ${theme === "silver" ? styles.silverTheme : ""} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {title && <h2 className={styles.title}>{title}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;
