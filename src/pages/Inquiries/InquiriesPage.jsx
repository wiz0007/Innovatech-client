import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Sparkles, Send, Layers, Clock, Cpu, ShieldCheck } from "lucide-react";
import PageHero from "../../components/common/PageHero";
import SEO from "../../components/common/SEO";
import TiltCard from "../../components/common/TiltCard";
import MagneticButton from "../../components/common/MagneticButton";
import styles from "./InquiriesPage.module.scss";

const platformsList = [
  { id: "web", label: "Web Applications", desc: "React 19, Next.js, High-Throughput APIs" },
  { id: "mobile", label: "Mobile Apps (iOS & Android)", desc: "React Native, Flutter, 60FPS Native UI" },
  { id: "ai", label: "AI & LLM Systems", desc: "Autonomous Agents, RAG, Semantic Search" },
  { id: "cloud", label: "Cloud & Microservices", desc: "Node.js, PostgreSQL, Docker, Redis" }
];

const timelineList = [
  { id: "mvp", label: "Rapid MVP Sprint", duration: "3 - 4 Weeks", desc: "Fast launch to validate core hypothesis" },
  { id: "v1", label: "Production V1 Release", duration: "6 - 8 Weeks", desc: "Full-featured production-ready system" },
  { id: "enterprise", label: "Enterprise Scale", duration: "10 - 12+ Weeks", desc: "High-scale, multi-tenant resilient system" }
];

const capabilitiesList = [
  "Auth & Role-Based Access Control",
  "Real-Time Reactive WebSockets",
  "Custom Vector RAG & LLM Workflows",
  "Global Payment Gateway Integration",
  "High-Scale Database & Caching",
  "Automated CI/CD & Cloud Infrastructure"
];

const InquiriesPage = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(["web"]);
  const [selectedTimeline, setSelectedTimeline] = useState("v1");
  const [selectedCapabilities, setSelectedCapabilities] = useState([
    "Auth & Role-Based Access Control",
    "High-Scale Database & Caching"
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$10k - $25k",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]
    );
  };

  const toggleCapability = (cap) => {
    setSelectedCapabilities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const formattedMessage = `
[TECHNICAL PROJECT INQUIRY]
Platforms: ${selectedPlatforms.join(", ")}
Timeline: ${selectedTimeline}
Capabilities: ${selectedCapabilities.join(", ")}
Budget Range: ${formData.budget}
Company: ${formData.company || "N/A"}

Project Notes:
${formData.notes || "No additional notes provided."}
    `.trim();

    try {
      const response = await fetch("https://innovatech-server.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Technical Inquiry from ${formData.name} (${selectedPlatforms.join(", ")})`,
          message: formattedMessage
        })
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Your project scope has been transmitted successfully. Our lead architect will review the brief and reach out within 24 hours."
        });
        setFormData({ name: "", email: "", company: "", budget: "$10k - $25k", notes: "" });
      } else {
        throw new Error("Server transmission error");
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network transmission error. Please email us directly at rogueai.workspace@gmail.com."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.inquiriesPage}>
      <SEO
        title="Project Inquiries & Scoping Estimator"
        description="Configure your digital product engineering requirements for an architectural scoping breakdown and engagement brief."
      />

      <PageHero
        headline="INQUIRIES"
        subtitle="Project scope and architecture estimator"
        description="Configure your digital product requirements below for an instant scoping breakdown and technical discovery brief."
        imageSrc="/assets/inquiries-bg.webp"
      />

      {/* Interactive Estimator & Configurator Section */}
      <section className={styles.scopingSection}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.scopingGrid}>
            {/* Left Configurator Column */}
            <div className={styles.configCol}>
              {/* 1. Target Platforms */}
              <div className={styles.configGroup}>
                <div className={styles.groupHeader}>
                  <span className={styles.stepNum}>01</span>
                  <h3 className={styles.groupTitle}>Select Core Platforms</h3>
                </div>
                <div className={styles.platformsGrid}>
                  {platformsList.map((p) => {
                    const isSelected = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`${styles.platformCard} ${isSelected ? styles.platformActive : ""}`}
                      >
                        <div className={styles.cardTop}>
                          <span className={styles.cardLabel}>{p.label}</span>
                          <div className={styles.checkCircle}>
                            {isSelected && <Check size={14} />}
                          </div>
                        </div>
                        <p className={styles.cardDesc}>{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Target Timeline */}
              <div className={styles.configGroup}>
                <div className={styles.groupHeader}>
                  <span className={styles.stepNum}>02</span>
                  <h3 className={styles.groupTitle}>Target Timeline & Cadence</h3>
                </div>
                <div className={styles.timelinesGrid}>
                  {timelineList.map((t) => {
                    const isSelected = selectedTimeline === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedTimeline(t.id)}
                        className={`${styles.timelineCard} ${isSelected ? styles.timelineActive : ""}`}
                      >
                        <span className={styles.timelineDuration}>{t.duration}</span>
                        <span className={styles.timelineLabel}>{t.label}</span>
                        <p className={styles.timelineDesc}>{t.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Specialized Capabilities */}
              <div className={styles.configGroup}>
                <div className={styles.groupHeader}>
                  <span className={styles.stepNum}>03</span>
                  <h3 className={styles.groupTitle}>Architecture & Features</h3>
                </div>
                <div className={styles.capsGrid}>
                  {capabilitiesList.map((cap) => {
                    const isSelected = selectedCapabilities.includes(cap);
                    return (
                      <button
                        type="button"
                        key={cap}
                        onClick={() => toggleCapability(cap)}
                        className={`${styles.capBtn} ${isSelected ? styles.capActive : ""}`}
                      >
                        <span className={styles.capDot} />
                        <span>{cap}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Client Contact Details */}
              <div className={styles.configGroup}>
                <div className={styles.groupHeader}>
                  <span className={styles.stepNum}>04</span>
                  <h3 className={styles.groupTitle}>Discovery Brief Details</h3>
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.inputField}>
                    <label htmlFor="name">Your Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Ayushmaan Singh"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="email">Work Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="company">Company / Project Link</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Corp / https://..."
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="budget">Target Budget Tier</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="Under $10k">Under $10k</option>
                      <option value="$10k - $25k">$10k - $25k</option>
                      <option value="$25k - $50k">$25k - $50k</option>
                      <option value="$50k+">$50k+ (Enterprise Architecture)</option>
                    </select>
                  </div>

                  <div className={`${styles.inputField} ${styles.fullWidth}`}>
                    <label htmlFor="notes">Project Scope & Technical Details</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      placeholder="Describe your current tech stack, target audience, key challenges, or specific milestones..."
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Sticky Card */}
            <div className={styles.summaryCol}>
              <TiltCard className={styles.tiltWrapper} maxTilt={4}>
                <div className={styles.summaryCard}>
                  <div className={styles.summaryHeader}>
                    <Sparkles className={styles.summarySparkle} size={20} />
                    <h4>Scope Discovery Summary</h4>
                  </div>

                  <div className={styles.summaryItems}>
                    <div className={styles.summaryRow}>
                      <span className={styles.rowLabel}>Platforms</span>
                      <span className={styles.rowVal}>{selectedPlatforms.length} Selected</span>
                    </div>

                    <div className={styles.summaryRow}>
                      <span className={styles.rowLabel}>Velocity</span>
                      <span className={styles.rowVal}>
                        {timelineList.find((t) => t.id === selectedTimeline)?.duration}
                      </span>
                    </div>

                    <div className={styles.summaryRow}>
                      <span className={styles.rowLabel}>Features</span>
                      <span className={styles.rowVal}>{selectedCapabilities.length} Modules</span>
                    </div>

                    <div className={styles.summaryRow}>
                      <span className={styles.rowLabel}>Budget Tier</span>
                      <span className={styles.rowVal}>{formData.budget}</span>
                    </div>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <ShieldCheck size={18} className={styles.shieldIcon} />
                    <span>Architectural review response guaranteed within 24 business hours.</span>
                  </div>

                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.submitBtn}
                    >
                      {isSubmitting ? (
                        <span>Transmitting Scope...</span>
                      ) : (
                        <>
                          <span>Submit Scoped Brief</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </MagneticButton>

                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`${styles.statusAlert} ${
                          submitStatus.type === "success" ? styles.successAlert : styles.errorAlert
                        }`}
                      >
                        {submitStatus.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TiltCard>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InquiriesPage;
