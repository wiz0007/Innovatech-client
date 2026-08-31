import React from "react";
import { FaCheck } from "react-icons/fa";
import { processSteps, engineeringPrinciples } from "../../content/processData";
import styles from "./PinnedProcessTimeline.module.scss";

const PinnedProcessTimeline = () => {
  return (
    <div className={styles.timelineWrapper}>
      {/* 4-Step Process Roadmap */}
      <div className={styles.stepsContainer}>
        {processSteps.map((step) => (
          <div key={step.step} className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>0{step.step}</span>
              <span className={styles.stepDuration}>{step.duration}</span>
            </div>

            <h3 className={styles.phaseTitle}>{step.phase}</h3>
            <p className={styles.tagline}>{step.tagline}</p>
            <p className={styles.description}>{step.description}</p>

            <div className={styles.deliverables}>
              <h4 className={styles.deliverablesTitle}>Phase Deliverables:</h4>
              <ul className={styles.deliverablesList}>
                {step.deliverables.map((item, idx) => (
                  <li key={idx}>
                    <FaCheck className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Principles Grid */}
      <div className={styles.principlesSection}>
        <span className={styles.principlesTag}>[ ENGINEERING STANDARDS ]</span>
        <h3 className={styles.principlesHeading}>Non-Negotiable Architecture Standards</h3>
        <div className={styles.principlesGrid}>
          {engineeringPrinciples.map((principle, idx) => (
            <div key={idx} className={styles.principleCard}>
              <span className={styles.principleNum}>#{idx + 1}</span>
              <h4 className={styles.principleTitle}>{principle.title}</h4>
              <p className={styles.principleText}>{principle.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinnedProcessTimeline;
