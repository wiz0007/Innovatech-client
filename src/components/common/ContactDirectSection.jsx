import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck, Clock, AlertCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import MagneticButton from "./MagneticButton";
import siteConfig from "../../content/siteConfig";
import styles from "./ContactDirectSection.module.scss";

const TECHNICAL_DOMAINS = [
  "Full-Stack Web Systems",
  "Native Mobile Applications",
  "AI & Autonomous Agent Workflows",
  "Cloud & Microservice Architecture",
  "Database & Performance Tuning",
  "Executive Advisory & Architecture Audit",
];

const ContactDirectSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: TECHNICAL_DOMAINS[0],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const formattedMessage = `
[DIRECT ARCHITECTURE INQUIRY]
From: ${formData.name} (${formData.email})
Domain: ${formData.domain}

Inquiry Details:
${formData.message}
    `.trim();

    try {
      const response = await fetch(siteConfig.contact.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Direct Engineering Inquiry: ${formData.domain} (${formData.name})`,
          message: formattedMessage,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Inquiry dispatched directly to lead architects. You will receive an engineering response within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          domain: TECHNICAL_DOMAINS[0],
          message: "",
        });
      } else {
        throw new Error("Dispatch failed");
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Direct transmission failed. Please reach out directly to ayush8171wiz@gmail.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="direct-section" className={styles.directSection} aria-label="Direct Engineering Inquiry">
      <div className={styles.container}>
        <SectionHeader
          eyebrow="Direct Dispatch"
          title="Fast-Track Architecture Inquiry"
          subtitle="Bypass the scoping matrix and connect directly with our principal engineering leads for rapid advisory, custom RFQs, or production reviews."
          centered
        />

        <div className={styles.formWrapper}>
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`${styles.statusBanner} ${
                  submitStatus.type === "success" ? styles.bannerSuccess : styles.bannerError
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className={styles.directForm}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="direct-name" className={styles.fieldLabel}>
                  Full Name <span className={styles.requiredMark}>*</span>
                </label>
                <input
                  id="direct-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Vance"
                  className={styles.textInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="direct-email" className={styles.fieldLabel}>
                  Work Email <span className={styles.requiredMark}>*</span>
                </label>
                <input
                  id="direct-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="alex@company.io"
                  className={styles.textInput}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="direct-domain" className={styles.fieldLabel}>
                Architecture Focus / Domain
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="direct-domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  className={styles.domainSelect}
                >
                  {TECHNICAL_DOMAINS.map((dom) => (
                    <option key={dom} value={dom}>
                      {dom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="direct-message" className={styles.fieldLabel}>
                Technical Requirements / Project Summary <span className={styles.requiredMark}>*</span>
              </label>
              <textarea
                id="direct-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Briefly describe your product goals, technical stack, target launch window, and any specific engineering challenges..."
                className={styles.textArea}
                required
              />
            </div>

            <div className={styles.formFooter}>
              <div className={styles.guaranteeBadges}>
                <div className={styles.guaranteeItem}>
                  <Clock size={14} className={styles.guaranteeIcon} />
                  <span>Sub-24h Direct Engineering Turnaround</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <ShieldCheck size={14} className={styles.guaranteeIcon} />
                  <span>Strict NDA & Mutual IP Protection</span>
                </div>
              </div>

              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactDirectSection;
