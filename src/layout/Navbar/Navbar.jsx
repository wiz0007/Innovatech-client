import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import siteConfig from "../../content/siteConfig";
import styles from "./Navbar.module.scss";

const mobileNavLinks = [
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/work" },
  { name: "Process", path: "/process" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`${styles.navbarWrapper} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
          {/* Left: Desktop Navigation Links */}
          <nav className={styles.leftNav} aria-label="Main Navigation">
            <NavLink
              to="/work"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
            >
              Projects
            </NavLink>

            <div
              className={styles.dropdownWrapper}
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <NavLink
                to="/services"
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
              >
                <span>Services</span>
                <FaChevronDown className={`${styles.chevron} ${servicesDropdown ? styles.chevronOpen : ""}`} />
              </NavLink>

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Link to="/services" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>Web Applications</span>
                      <span className={styles.itemDesc}>High-throughput reactive systems</span>
                    </Link>
                    <Link to="/services" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>Mobile Ecosystems</span>
                      <span className={styles.itemDesc}>Fluid 60FPS iOS & Android</span>
                    </Link>
                    <Link to="/services" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>AI Solutions</span>
                      <span className={styles.itemDesc}>Autonomous agents & LLMs</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/process"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
            >
              Process
            </NavLink>
          </nav>

          {/* Center: RogueAI Luxury Brandmark */}
          <div className={styles.centerBrand}>
            <Link to="/" className={styles.brandTitle} aria-label="RogueAI Home">
              RogueAI
            </Link>
          </div>

          {/* Right: About & Contact CTA (2 Links) */}
          <div className={styles.rightNav}>
            <NavLink
              to="/about"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
            >
              About
            </NavLink>

            <Link to="/contact" className={styles.contactBtn}>
              <span className={styles.statusDot} />
              <span>Contact</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Immersive Mobile Architecture Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className={styles.drawerOverlayContainer}>
            {/* Dark Frosted Glass Backdrop */}
            <motion.div
              className={styles.drawerBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sliding Obsidian Glass Sheet */}
            <motion.aside
              className={styles.drawerSheet}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              aria-label="Mobile Navigation"
            >
              {/* Internal Ambient Radial Lighting */}
              <div className={styles.drawerGlow} aria-hidden="true" />

              {/* Drawer Header */}
              <div className={styles.drawerHeader}>
                <div className={styles.drawerBrand}>
                  <div className={styles.drawerLogoMark}>
                    <img src="/rogue-mark.svg" alt="RogueAI Logo" />
                  </div>
                  <span className={styles.drawerBrandName}>RogueAI</span>
                </div>

                <button
                  className={styles.drawerCloseBtn}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Drawer Content Body: Clean, Compact, Elegant */}
              <div className={styles.drawerBody}>
                {/* Navigation Links (No serial numbers, no bloated descriptions) */}
                <nav className={styles.drawerNavList}>
                  {mobileNavLinks.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.035, duration: 0.22 }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `${styles.drawerNavLink} ${isActive ? styles.activeDrawerNavLink : ""}`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className={styles.navName}>{item.name}</span>
                        <FaArrowRight className={styles.navArrow} />
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Conversion & Direct Actions */}
                <div className={styles.drawerFooterArea}>
                  <Link
                    to="/contact"
                    className={styles.drawerPrimaryBtn}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Start an Engagement</span>
                    <FaArrowRight className={styles.ctaArrow} />
                  </Link>

                  {/* Compact Direct Contact */}
                  <div className={styles.drawerMeta}>
                    <a
                      href={`mailto:${siteConfig?.contact?.email || siteConfig?.email}`}
                      className={styles.drawerMetaLink}
                    >
                      {siteConfig?.contact?.email || siteConfig?.email}
                    </a>
                    <a
                      href={`tel:${(siteConfig?.contact?.phone || siteConfig?.phone || "").replace(/\s+/g, "")}`}
                      className={styles.drawerMetaLink}
                    >
                      {siteConfig?.contact?.phone || siteConfig?.phone}
                    </a>
                  </div>

                  {/* Clean Social Matrix */}
                  <div className={styles.drawerSocials}>
                    {siteConfig?.socials?.github && (
                      <a
                        href={siteConfig.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={styles.drawerSocialBtn}
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
                        className={styles.drawerSocialBtn}
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
                        className={styles.drawerSocialBtn}
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
                        className={styles.drawerSocialBtn}
                      >
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
