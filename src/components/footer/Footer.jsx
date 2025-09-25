import React from "react";
import { motion } from "framer-motion";
import styles from "./Footer.module.scss";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import logo from "../../assets/CompanyLogo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Branding */}
        <motion.div
          className={styles.brand}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={logo} alt="Logo" />
          <h3>InnovaTech</h3>
          <p>Building modern digital experiences with impact 🚀</p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className={styles.links}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className={styles.socials}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4>Follow Us</h4>
          <div className={styles.icons}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className={styles.bottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p>© {new Date().getFullYear()} InnovaTech. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
