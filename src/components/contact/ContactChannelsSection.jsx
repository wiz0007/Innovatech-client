import React, { useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import siteConfig from "../../content/siteConfig";
import styles from "./ContactChannelsSection.module.scss";

const ContactChannelsSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const primaryEmail = siteConfig?.contact?.email || siteConfig?.email || "ayush8171wiz@gmail.com";
  const primaryPhone = siteConfig?.contact?.phone || siteConfig?.phone || "+91 91490 84611";
  const primaryLocation = siteConfig?.contact?.location || siteConfig?.location || "Kashipur, Uttarakhand, India";
  const studioAvailability = siteConfig?.contact?.availability || "Available for Q4/Q1 Project Engagements";

  const copyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="channels-section" className={styles.channelsSection} aria-label="Direct Studio Communication Channels">
      <div className={styles.container}>
        <div className={styles.horizonLayout}>
          {/* Header Bar */}
          <div className={styles.horizonHeaderBar}>
            <div>
              <span className={styles.horizonEyebrow}>Direct Studio Access</span>
              <h2 className={styles.horizonTitle}>Engineering Channels</h2>
            </div>
            <div className={styles.statusPill}>
              <span className={styles.statusPulse} />
              <span>{studioAvailability}</span>
            </div>
          </div>

          {/* Large Typographic Action Bands */}
          <div className={styles.horizonBands}>
            {/* Row 1: Email Band */}
            <div className={styles.horizonRow}>
              <div className={styles.horizonRowMeta}>
                <span className={styles.horizonMetaTag}>PRIMARY DISPATCH</span>
                <span className={styles.horizonMetaSub}>Sub-24h Feasibility Review</span>
              </div>
              <a href={`mailto:${primaryEmail}`} className={styles.horizonRowValue}>
                {primaryEmail}
              </a>
              <div className={styles.horizonRowActions}>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={styles.horizonActionBtn}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
                <a
                  href={`mailto:${primaryEmail}`}
                  className={styles.horizonActionBtn}
                  title="Compose email"
                  aria-label="Compose email"
                >
                  <span>Write Mail</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Row 2: Phone Band */}
            <div className={styles.horizonRow}>
              <div className={styles.horizonRowMeta}>
                <span className={styles.horizonMetaTag}>DIRECT LINE</span>
                <span className={styles.horizonMetaSub}>Advisory & Urgent Inquiries</span>
              </div>
              <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className={styles.horizonRowValue}>
                {primaryPhone}
              </a>
              <div className={styles.horizonRowActions}>
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                  className={styles.horizonActionBtn}
                  title="Direct telephone call"
                  aria-label="Call studio"
                >
                  <span>Call Now</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Editorial 3-Column Footer Spec */}
          <div className={styles.horizonFooterSpec}>
            <div className={styles.specColumn}>
              <span className={styles.specLabel}>Studio Headquarters</span>
              <span className={styles.specValue}>{primaryLocation}</span>
              <span className={styles.specDetail}>Global timezone coverage (IST, EST, PST, CET)</span>
            </div>
            <div className={styles.specColumn}>
              <span className={styles.specLabel}>Response SLA</span>
              <span className={styles.specValue}>Under 24 Hours Guaranteed</span>
              <span className={styles.specDetail}>Direct reply from lead software architects</span>
            </div>
            <div className={styles.specColumn}>
              <span className={styles.specLabel}>Pre-Flight Guarantee</span>
              <span className={styles.specValue}>Complimentary Feasibility Audit</span>
              <span className={styles.specDetail}>Database schema and cloud compute evaluation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactChannelsSection;
