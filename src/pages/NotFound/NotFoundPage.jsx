import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowRight } from "react-icons/fa";
import SEO from "../../components/common/SEO";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <SEO
        title="404 - Page Not Found"
        description="The requested route does not exist on RogueAI."
      />

      <div className={styles.container}>
        <div className={styles.statusBadge}>404 / Error</div>
        <h1 className={styles.title}>System Route Unreachable</h1>
        <p className={styles.description}>
          The endpoint you are attempting to access has either moved or does not exist in our active routing table.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>
            <FaHome />
            <span>Return to Overview</span>
          </Link>
          <Link to="/work" className={styles.workBtn}>
            <span>Explore Case Studies</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
