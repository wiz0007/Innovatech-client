import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.scss";
import AboutImage from "../../assets/About.png";

const MotionDiv = motion.div;

const About = () => {
  return (
    <section className={styles.about} id="about">
      <MotionDiv
        className={styles.text}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>
          About <span>InnovaTech</span>
        </h2>
        <p>
          At InnovaTech, we craft cutting-edge web and mobile applications that
          combine sleek design with seamless performance. Every project we take
          on is engineered to deliver exceptional user experiences.
        </p>
        <p>
          From innovative startups to established enterprises, we transform ideas
          into powerful digital products that engage, inspire, and scale with
          your business.
        </p>
      </MotionDiv>

      <MotionDiv
        className={styles.imageWrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className={styles.imageBackground}></div>
        <img src={AboutImage} alt="About InnovaTech" />
      </MotionDiv>
    </section>
  );
};

export default About;


