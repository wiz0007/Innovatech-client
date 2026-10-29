import React from "react";
import { Clock, ShieldCheck, Cpu, Lock } from "lucide-react";
import styles from "./ContactTrustBar.module.scss";

const ContactTrustBar = () => {
  return (
    <section className={styles.trustBarSection} aria-label="Studio Architecture Standards">
      <div className={styles.container}>
        <div className={styles.trustBar}>
          <div className={styles.trustChip}>
            <Clock size={15} className={styles.trustIcon} />
            <span>Under 24h Architect SLA</span>
          </div>
          <div className={styles.trustChip}>
            <ShieldCheck size={15} className={styles.trustIcon} />
            <span>Direct Principal Engineer Access</span>
          </div>
          <div className={styles.trustChip}>
            <Cpu size={15} className={styles.trustIcon} />
            <span>Rigorous Full-Stack Scoping</span>
          </div>
          <div className={styles.trustChip}>
            <Lock size={15} className={styles.trustIcon} />
            <span>Strict NDA & IP Confidentiality</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTrustBar;
