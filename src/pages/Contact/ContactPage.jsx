import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaClock, FaShieldAlt } from "react-icons/fa";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageHero from "../../components/common/PageHero";
import TiltCard from "../../components/common/TiltCard";
import MagneticButton from "../../components/common/MagneticButton";
import siteConfig from "../../content/siteConfig";
import styles from "./ContactPage.module.scss";

const serviceOptions = [
  "Web Application Engineering",
  "Mobile App Development",
  "AI Integration & LLM Systems",
  "Architecture Audit & Refactor",
  "Other Product Exploration"
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: serviceOptions[0],
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    type: "idle", // 'idle' | 'loading' | 'success' | 'error'
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.type !== "idle") {
      setFormStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Sending your message to RogueAI..." });

    try {
      await axios.post(siteConfig.contact.apiEndpoint, {
        name: formData.name,
        email: formData.email,
        message: `[Service: ${formData.service}] ${formData.message}`,
      });

      setFormStatus({
        type: "success",
        message: "Thank you! Your message has been dispatched directly to our leadership team. We will reply within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        service: serviceOptions[0],
        message: "",
      });
    } catch (err) {
      console.error("Contact Form submission error:", err);
      setFormStatus({
        type: "error",
        message: "We encountered a temporary server error while transmitting your message. Please email us directly at " + siteConfig.contact.email,
      });
    }
  };

  return (
    <div className={styles.contactPage}>
      <SEO
        title="Contact & Technical Discovery"
        description="Get in touch with RogueAI to discuss your web application, mobile platform, or AI engineering needs."
      />

      <PageHero
        headline="CONTACT"
        subtitle="Contact details and form"
        description="Digital product engineering studio in Bengaluru — get in touch directly about bookings, system architecture or project scope."
        imageSrc="/assets/contact-bg.jpg"
      />

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Left Info Column */}
            <motion.div
              className={styles.infoCol}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard className={styles.infoTiltWrapper} maxTilt={4}>
                <div className={styles.infoBox}>
                  <div className={styles.statusBox}>
                    <span className={styles.statusPulse} />
                    <span>{siteConfig?.contact?.availability || "Available for Q3/Q4 Project Engagements"}</span>
                  </div>

                  <h2 className={styles.infoTitle}>Direct Communication Channels</h2>
                  <p className={styles.infoDesc}>
                    We prioritize transparent technical dialogue. You will communicate directly with practicing engineers and architects, not intermediaries.
                  </p>

                  <div className={styles.contactList}>
                    <div className={styles.contactItem}>
                      <div className={styles.itemIcon}><Mail size={18} /></div>
                      <div>
                        <span className={styles.itemLabel}>Email Address</span>
                        <a href={`mailto:${siteConfig?.contact?.email || siteConfig?.email}`} className={styles.itemVal}>
                          {siteConfig?.contact?.email || siteConfig?.email}
                        </a>
                      </div>
                    </div>

                    <div className={styles.contactItem}>
                      <div className={styles.itemIcon}><Phone size={18} /></div>
                      <div>
                        <span className={styles.itemLabel}>Direct Line</span>
                        <a href={`tel:${(siteConfig?.contact?.phone || siteConfig?.phone || "").replace(/\s+/g, '')}`} className={styles.itemVal}>
                          {siteConfig?.contact?.phone || siteConfig?.phone}
                        </a>
                      </div>
                    </div>

                    <div className={styles.contactItem}>
                      <div className={styles.itemIcon}><MapPin size={18} /></div>
                      <div>
                        <span className={styles.itemLabel}>Engineering Headquarters</span>
                        <span className={styles.itemVal}>{siteConfig?.contact?.location || siteConfig?.location || "Bengaluru, India"}</span>
                      </div>
                    </div>

                    <div className={styles.contactItem}>
                      <div className={styles.itemIcon}><Clock size={18} /></div>
                      <div>
                        <span className={styles.itemLabel}>Guaranteed Response Window</span>
                        <span className={styles.itemVal}>Under 24 Hours (Mon - Sat)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Right Form Column */}
            <motion.div
              className={styles.formCol}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Project Discovery Brief</h3>
                <p className={styles.formSubtitle}>
                  Tell us about your requirements and expected timeline.
                </p>

                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="service">Primary Area of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Project Scope & Technical Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your current tech stack, timelines, key challenges, or vision..."
                    required
                  />
                </div>

                {formStatus.message && (
                  <div className={`${styles.statusAlert} ${styles[formStatus.type]}`}>
                    {formStatus.type === "success" ? <CheckCircle2 size={16} /> : null}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <MagneticButton strength={0.25}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={formStatus.type === "loading"}
                  >
                    {formStatus.type === "loading" ? (
                      <span>Transmitting Brief...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
