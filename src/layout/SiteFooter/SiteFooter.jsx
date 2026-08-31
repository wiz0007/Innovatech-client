import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowUp } from "react-icons/fa";
import { footerLinks } from "../../content/navigationData";
import siteConfig from "../../content/siteConfig";
import styles from "./SiteFooter.module.scss";

const SiteFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Grid */}
        <div className={styles.topGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.brandLogo} aria-label="RogueAI Home">
              <div className={styles.logoMark}>
                <img src="/rogue-mark.svg" alt="RogueAI Logo" />
              </div>
              <span className={styles.brandName}>{siteConfig.name}</span>
            </Link>
            <p className={styles.brandTagline}>{siteConfig.description}</p>
            
            {/* Live Signal Indicator */}
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>{siteConfig?.contact?.availability || "Available for Project Engagements"}</span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              {(footerLinks?.navigation || footerLinks?.company || []).map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Capabilities</h4>
            <ul className={styles.linkList}>
              {(footerLinks?.capabilities || footerLinks?.services || []).map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Headquarters</h4>
            <p className={styles.contactItem}>{siteConfig?.contact?.location || siteConfig?.location || "Bengaluru, India"}</p>
            <a href={`mailto:${siteConfig?.contact?.email || siteConfig?.email}`} className={styles.contactLink}>
              {siteConfig?.contact?.email || siteConfig?.email}
            </a>
            <a href={`tel:${(siteConfig?.contact?.phone || siteConfig?.phone || "").replace(/\s+/g, '')}`} className={styles.contactLink}>
              {siteConfig?.contact?.phone || siteConfig?.phone}
            </a>

            {/* Socials */}
            <div className={styles.socials}>
              {siteConfig?.socials?.github && (
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {siteConfig?.socials?.linkedin && (
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
              {siteConfig?.socials?.twitter && (
                <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
              )}
              {siteConfig?.socials?.instagram && (
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {siteConfig.name} Systems. All rights reserved. Engineered with precision.
          </p>

          <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to top">
            <span>Back to top</span>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
