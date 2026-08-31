import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.scss";

const MotionDiv = motion.div;
const MotionHeader = motion.header;

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MotionDiv className={styles.scrollBar} style={{ scaleX: scrollProgress / 100 }} />

      <MotionHeader
        className={styles.navbar}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className={styles.logo} href="#home" aria-label="RogueAI Home">
          <span className={styles.logoMark}>
            <img src="/rogue-mark.svg" alt="RogueAI" />
          </span>
          <span>RogueAI</span>
        </a>

        <nav className={styles.links} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </nav>
      </MotionHeader>
    </>
  );
};

export default Navbar;
