import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SiteFooter from "./SiteFooter/SiteFooter";
import styles from "./SiteLayout.module.scss";

const SiteLayout = () => {
  return (
    <div className={styles.layoutWrapper}>
      {/* Persistent Background Atmospheric Gradients */}
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />
      <div className={styles.gridOverlay} />

      <Navbar />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
