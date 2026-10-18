import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowUp } from "react-icons/fa";
import { footerLinks } from "../../content/navigationData";
import siteConfig from "../../content/siteConfig";
import styles from "./SiteFooter.module.scss";

const SiteFooter = () => {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = footerLinks?.navigation || [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Process", path: "/process" },
    { name: "About", path: "/about" },
    { name: "Inquiries", path: "/inquiries" },
    { name: "Contact", path: "/contact" },
  ];

  const capItems = footerLinks?.capabilities || [
    { name: "Web Applications", path: "/services" },
    { name: "Mobile Ecosystems", path: "/services" },
    { name: "AI Integrations", path: "/services" },
    { name: "Architecture & Audits", path: "/services" },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* 1. Top Specular Hairline Divider */}
      <div className={styles.topShimmerLine} aria-hidden="true" />

      {/* 2. Clearly Visible Animated 3D Perspective Cyber Floor Grid */}
      <div className={styles.perspectiveFloorGrid} aria-hidden="true" />

      {/* 4. Deep Atmospheric Ambient Nebula Backlight */}
      <div className={styles.ambientBacklight} aria-hidden="true" />

      <div className={styles.footerContainer}>
        {/* Main 4-Column Compact Professional Grid */}
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

            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>
                {siteConfig?.contact?.availability || "Available for Q3/Q4 Project Engagements"}
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              {navItems.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Capabilities</h4>
            <ul className={styles.linkList}>
              {capItems.map((cap) => (
                <li key={cap.name}>
                  <Link to={cap.path} className={styles.footerLink}>
                    {cap.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters Column */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Headquarters</h4>
            <p className={styles.contactLocation}>
              {siteConfig?.contact?.location || siteConfig?.location || "Kashipur, Uttarakhand, India"}
            </p>
            <a
              href={`mailto:${siteConfig?.contact?.email || siteConfig?.email}`}
              className={styles.contactLink}
            >
              {siteConfig?.contact?.email || siteConfig?.email}
            </a>
            <a
              href={`tel:${(siteConfig?.contact?.phone || siteConfig?.phone || "").replace(/\s+/g, "")}`}
              className={styles.contactLink}
            >
              {siteConfig?.contact?.phone || siteConfig?.phone}
            </a>

            {/* Socials */}
            <div className={styles.socials}>
              {siteConfig?.socials?.github && (
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={styles.socialBtn}
                >
                  <FaGithub />
                </a>
              )}
              {siteConfig?.socials?.linkedin && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={styles.socialBtn}
                >
                  <FaLinkedin />
                </a>
              )}
              {siteConfig?.socials?.twitter && (
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className={styles.socialBtn}
                >
                  <FaTwitter />
                </a>
              )}
              {siteConfig?.socials?.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.socialBtn}
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Copyright & Back to Top */}
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
