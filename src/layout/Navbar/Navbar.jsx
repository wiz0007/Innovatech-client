import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { navLinks } from "../../content/navigationData";
import siteConfig from "../../content/siteConfig";
import styles from "./Navbar.module.scss";

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

  return (
    <>
      <header className={`${styles.navbarWrapper} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
          {/* Left: Navigation Links */}
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

            <NavLink
              to="/about"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
            >
              About
            </NavLink>
          </nav>

          {/* Center: Pure RogueAI Luxury Brandmark (NO "ENGINEERING" badge) */}
          <div className={styles.centerBrand}>
            <Link to="/" className={styles.brandTitle} aria-label="RogueAI Home">
              RogueAI
            </Link>
          </div>

          {/* Right: Inquiries & Contact CTA */}
          <div className={styles.rightNav}>
            <NavLink
              to="/inquiries"
              className={({ isActive }) => `${styles.inquiriesLink} ${isActive ? styles.activeInquiriesLink : ""}`}
            >
              Inquiries
            </NavLink>

            <Link to="/contact" className={styles.contactBtn}>
              <span className={styles.statusDot} />
              <span>Contact</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `${styles.mobileNavLink} ${isActive ? styles.activeMobileNavLink : ""}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <div className={styles.mobileCtaWrapper}>
                <Link to="/contact" className={styles.mobileCtaBtn}>
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
