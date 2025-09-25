import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.scss";
import HeroImage from "../../assets/Herosection.png";

const shapes = ["triangle", "square", "hexagon"];

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      {/* Floating Shapes Background */}
      <div className={styles.floatingShapes}>
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 40 + 20;
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const left = Math.random() * 100 + "%";
          const duration = 8 + Math.random() * 6;
          return (
            <motion.div
              key={i}
              className={`${styles.shape} ${styles[shape]}`}
              style={{ width: size, height: size, left }}
              animate={{ y: ["0%", "120%"] }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 3,
              }}
            />
          );
        })}
      </div>

      <div className={styles.content}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We Build <span>Web & Mobile Apps</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Transforming your ideas into powerful digital experiences with
          cutting-edge design and development.
        </motion.p>

        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="#contact" className={styles.primaryBtn}>
            Get Started
          </a>
          <a href="#portfolio" className={styles.secondaryBtn}>
            View Portfolio
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.imageWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <img src={HeroImage} alt="Hero Illustration" />
      </motion.div>
    </section>
  );
};

export default Hero;
