import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  Mail,
  Sparkles,
  ShieldCheck,
  Send,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import siteConfig from "../../content/siteConfig";
import styles from "./ContactScopingSection.module.scss";

const platformsList = [
  { id: "web", label: "Web Applications", desc: "React 19, Next.js, High-Throughput APIs" },
  { id: "mobile", label: "Mobile Apps (iOS & Android)", desc: "React Native, Flutter, 60FPS Native UI" },
  { id: "ai", label: "AI & LLM Systems", desc: "Autonomous Agents, RAG, Semantic Search" },
  { id: "cloud", label: "Cloud & Microservices", desc: "Node.js, PostgreSQL, Docker, Redis" },
];

const timelineList = [
  { id: "mvp", label: "Rapid MVP Sprint", duration: "3 - 4 Weeks", desc: "Fast launch to validate core hypothesis" },
  { id: "v1", label: "Production V1 Release", duration: "6 - 8 Weeks", desc: "Full-featured production-ready system" },
  { id: "enterprise", label: "Enterprise Scale", duration: "10 - 12+ Weeks", desc: "High-scale, multi-tenant resilient system" },
];

const capabilitiesList = [
  "Auth & Role-Based Access Control",
  "Real-Time Reactive WebSockets",
  "Custom Vector RAG & LLM Workflows",
  "Global Payment Gateway Integration",
  "High-Scale Database & Caching",
  "Automated CI/CD & Cloud Infrastructure",
];

const ContactScopingSection = () => {
  const scopingSectionRef = useRef(null);
  const [currentStage, setCurrentStage] = useState(1);

  const [selectedPlatforms, setSelectedPlatforms] = useState(["web"]);
  const [selectedTimeline, setSelectedTimeline] = useState("v1");
  const [selectedCapabilities, setSelectedCapabilities] = useState([
    "Auth & Role-Based Access Control",
    "High-Scale Database & Caching",
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$10k - $25k",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [clientErrors, setClientErrors] = useState({});

  // Smooth scroll to top of scoping section ONLY on mobile viewports
  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768 && scopingSectionRef.current) {
      const yOffset = -80;
      const y = scopingSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const goToStage = (stage) => {
    setCurrentStage(stage);
    scrollToTop();
  };

  // Dynamic Progress Calculation
  const calculateProgress = () => {
    let score = 0;
    if (selectedPlatforms.length > 0) score += 30;
    if (selectedTimeline) score += 15;
    if (selectedCapabilities.length > 0) score += 15;
    if (formData.name.trim().length > 0) score += 20;
    if (formData.email.trim().length > 0) score += 20;
    return score;
  };

  const progress = calculateProgress();

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
    if (clientErrors[name]) {
      setClientErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (submitStatus) setSubmitStatus(null);
  };

  const handleProceedToReview = (e) => {
    if (e) e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim()) errors.email = true;

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});
    goToStage(4);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      goToStage(3);
      setClientErrors({
        name: !formData.name.trim(),
        email: !formData.email.trim(),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const formattedMessage = `
[TECHNICAL PROJECT SCOPING BRIEF]
Platforms: ${selectedPlatforms.join(", ")}
Velocity Cadence: ${selectedTimeline} (${timelineList.find((t) => t.id === selectedTimeline)?.duration || "Standard"})
Architecture Capabilities: ${selectedCapabilities.join(", ")}
Target Budget Range: ${formData.budget}
Company / Link: ${formData.company || "N/A"}

Project Notes & Requirements:
${formData.notes || "No additional technical notes provided."}
    `.trim();

    try {
      const response = await fetch(siteConfig.contact.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Scoping Brief from ${formData.name} (${selectedPlatforms.join(", ")})`,
          message: formattedMessage,
        }),
      });

      if (!response.ok) throw new Error("Server transmission error");

      setSubmitStatus({
        type: "success",
        message:
          "Your scoped technical brief has been transmitted directly to our engineering leadership. Our principal architects will review your architecture specifications and reply within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "$10k - $25k",
        notes: "",
      });
      goToStage(1);
    } catch {
      setSubmitStatus({
        type: "error",
        message: `Network transmission error. Please email us directly at ${siteConfig.contact.email} or call our direct line.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={scopingSectionRef} id="scoping-section" className={styles.scopingSection} aria-label="Interactive Project Scoping Suite">
      <div className={styles.container}>
        {/* Compact Section Header */}
        <div className={styles.headerBar}>
          <div>
            <span className={styles.eyebrowTag}>Project Scoping Suite</span>
            <h2 className={styles.sectionTitle}>Architecture Configurator</h2>
          </div>
          <div className={styles.statusPill}>
            <span className={styles.statusPulse} />
            <span>3-Stage Guided Pipeline</span>
          </div>
        </div>

        {/* Global Feedback Banner */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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

        {/* =========================================================================
            UNIFIED MASTER CONSOLE (Single Cohesive Box with Equal-Height Panes)
           ========================================================================= */}
        <div className={styles.masterConsole}>
          {/* Top Control Bar: Spans Full Width of Console on Desktop */}
          <div className={styles.consoleTopBar}>
            {/* Desktop Stepper Milestones */}
            <div className={styles.consoleStepperNav}>
              <button
                type="button"
                onClick={() => goToStage(1)}
                className={`${styles.stepNavBtn} ${currentStage === 1 ? styles.stepNavBtnActive : ""} ${
                  selectedPlatforms.length > 0 ? styles.stepNavBtnComplete : ""
                }`}
              >
                <div className={styles.stepIndicatorIcon}>
                  {selectedPlatforms.length > 0 && currentStage !== 1 ? (
                    <Check size={12} />
                  ) : (
                    <Layers size={13} />
                  )}
                </div>
                <div className={styles.stepNavText}>
                  <span className={styles.stepStageNum}>Stage One</span>
                  <span className={styles.stepStageLabel}>Platforms</span>
                </div>
              </button>

              <div className={styles.stepConnectorLine} />

              <button
                type="button"
                onClick={() => goToStage(2)}
                className={`${styles.stepNavBtn} ${currentStage === 2 ? styles.stepNavBtnActive : ""} ${
                  selectedCapabilities.length > 0 ? styles.stepNavBtnComplete : ""
                }`}
              >
                <div className={styles.stepIndicatorIcon}>
                  {selectedCapabilities.length > 0 && currentStage > 2 ? (
                    <Check size={12} />
                  ) : (
                    <Cpu size={13} />
                  )}
                </div>
                <div className={styles.stepNavText}>
                  <span className={styles.stepStageNum}>Stage Two</span>
                  <span className={styles.stepStageLabel}>Velocity & Stack</span>
                </div>
              </button>

              <div className={styles.stepConnectorLine} />

              <button
                type="button"
                onClick={() => goToStage(3)}
                className={`${styles.stepNavBtn} ${currentStage === 3 ? styles.stepNavBtnActive : ""} ${
                  formData.name && formData.email ? styles.stepNavBtnComplete : ""
                }`}
              >
                <div className={styles.stepIndicatorIcon}>
                  {formData.name && formData.email ? (
                    <Check size={12} />
                  ) : (
                    <Mail size={13} />
                  )}
                </div>
                <div className={styles.stepNavText}>
                  <span className={styles.stepStageNum}>Stage Three</span>
                  <span className={styles.stepStageLabel}>Client Brief</span>
                </div>
              </button>
            </div>

            {/* Vertical Divider Between Stepper and Progress Bar */}
            <div className={styles.topBarDivider} />

            {/* Desktop Scoping Completion Meter (Right Header) */}
            <div className={styles.consoleProgressMeter}>
              <div className={styles.meterMetaRow}>
                <span className={styles.meterLabel}>SCOPING COMPLETION</span>
                <span className={styles.meterPct}>{progress}%</span>
              </div>
              <div className={styles.meterTrack}>
                <motion.div
                  className={styles.meterFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Stepper Navigation Bar (Only Visible on Mobile/Tablet) */}
          <div className={styles.mobileStepperNav}>
            <div className={styles.mobileStepperTrack}>
              <div
                className={styles.mobileStepperFill}
                style={{
                  width:
                    currentStage === 1
                      ? "16%"
                      : currentStage === 2
                      ? "48%"
                      : currentStage === 3
                      ? "80%"
                      : "100%",
                }}
              />
              <button
                type="button"
                onClick={() => goToStage(1)}
                className={`${styles.mobileStepCircle} ${currentStage >= 1 ? styles.mobileStepCircleActive : ""}`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => goToStage(2)}
                className={`${styles.mobileStepCircle} ${currentStage >= 2 ? styles.mobileStepCircleActive : ""}`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => goToStage(3)}
                className={`${styles.mobileStepCircle} ${currentStage >= 3 ? styles.mobileStepCircleActive : ""}`}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => {
                  if (formData.name && formData.email) goToStage(4);
                  else goToStage(3);
                }}
                className={`${styles.mobileStepCircle} ${currentStage === 4 ? styles.mobileStepCircleActive : ""}`}
              >
                <Check size={11} />
              </button>
            </div>

            <div className={styles.mobileActiveStageHeader}>
              <span className={styles.mobileStageNum}>
                {currentStage === 1 && "STAGE 1 OF 3"}
                {currentStage === 2 && "STAGE 2 OF 3"}
                {currentStage === 3 && "STAGE 3 OF 3"}
                {currentStage === 4 && "FINAL SPECIFICATION REVIEW"}
              </span>
              <h3 className={styles.mobileStageTitle}>
                {currentStage === 1 && "Target Platforms"}
                {currentStage === 2 && "Velocity & Stack Modules"}
                {currentStage === 3 && "Client Coordinates"}
                {currentStage === 4 && "Review & Submit Brief"}
              </h3>
            </div>
          </div>

          {/* =====================================================================
              CONSOLE BODY GRID: Two Equal-Height Columns (Stretch Aligned)
             ===================================================================== */}
          <div className={styles.consoleBodyGrid}>
            {/* Left Column: Form Stage Pane */}
            <div className={styles.consoleFormPane}>
              <div className={styles.paneContentWrapper}>
                <AnimatePresence mode="wait">
                  {/* STAGE 1: PLATFORMS */}
                  {currentStage === 1 && (
                    <motion.div
                      key="stage-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className={styles.stageContent}
                    >
                      <div className={styles.stageHeadingBlock}>
                        <span className={styles.stageBadge}>STAGE ONE // ECOSYSTEMS</span>
                        <h3 className={styles.stageTitle}>Select Target Platforms</h3>
                        <p className={styles.stageSubtitle}>
                          Select all platforms and operational surfaces required for this engagement.
                        </p>
                      </div>

                      <div className={styles.platformsGrid}>
                        {platformsList.map((platform) => {
                          const isSelected = selectedPlatforms.includes(platform.id);
                          return (
                            <button
                              type="button"
                              key={platform.id}
                              onClick={() => togglePlatform(platform.id)}
                              className={`${styles.platformTile} ${isSelected ? styles.platformTileActive : ""}`}
                            >
                              <div className={styles.platformTileTop}>
                                <span className={styles.platformTileName}>{platform.label}</span>
                                <div className={styles.tileCheckBadge}>
                                  {isSelected && <Check size={12} />}
                                </div>
                              </div>
                              <span className={styles.platformTileDesc}>{platform.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 2: CADENCE & CAPABILITIES */}
                  {currentStage === 2 && (
                    <motion.div
                      key="stage-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className={styles.stageContent}
                    >
                      <div className={styles.stageHeadingBlock}>
                        <span className={styles.stageBadge}>STAGE TWO // CADENCE & ARCHITECTURE</span>
                        <h3 className={styles.stageTitle}>Velocity & Specialized Modules</h3>
                        <p className={styles.stageSubtitle}>
                          Choose your deployment velocity and toggle the critical engineering subsystems.
                        </p>
                      </div>

                      {/* Cadence Selector */}
                      <div className={styles.subSection}>
                        <span className={styles.subSectionTitle}>Engineering Cadence & Timeline</span>
                        <div className={styles.cadenceGrid}>
                          {timelineList.map((timeline) => {
                            const isSelected = selectedTimeline === timeline.id;
                            return (
                              <button
                                type="button"
                                key={timeline.id}
                                onClick={() => setSelectedTimeline(timeline.id)}
                                className={`${styles.cadenceTile} ${isSelected ? styles.cadenceTileActive : ""}`}
                              >
                                <span className={styles.cadenceDuration}>{timeline.duration}</span>
                                <span className={styles.cadenceLabel}>{timeline.label}</span>
                                <span className={styles.cadenceDesc}>{timeline.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Capabilities Selector */}
                      <div className={styles.subSection}>
                        <span className={styles.subSectionTitle}>Specialized Architecture Modules</span>
                        <div className={styles.capsGrid}>
                          {capabilitiesList.map((cap) => {
                            const isSelected = selectedCapabilities.includes(cap);
                            return (
                              <button
                                type="button"
                                key={cap}
                                onClick={() => toggleCapability(cap)}
                                className={`${styles.capChip} ${isSelected ? styles.capChipActive : ""}`}
                              >
                                <span className={styles.capDot} />
                                <span>{cap}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 3: CLIENT BRIEF */}
                  {currentStage === 3 && (
                    <motion.div
                      key="stage-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className={styles.stageContent}
                    >
                      <div className={styles.stageHeadingBlock}>
                        <span className={styles.stageBadge}>STAGE THREE // CLIENT DISPATCH</span>
                        <h3 className={styles.stageTitle}>Client Details & Requirements</h3>
                        <p className={styles.stageSubtitle}>
                          Provide project contact coordinates for direct review by lead software architects.
                        </p>
                      </div>

                      <div className={styles.briefInputsGrid}>
                        <div className={styles.fieldItem}>
                          <label htmlFor="pipeline-name" className={styles.fieldLabel}>
                            Your Name <span className={styles.requiredStar}>*</span>
                          </label>
                          <input
                            id="pipeline-name"
                            name="name"
                            type="text"
                            required
                            placeholder="Ayushmaan Singh"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`${styles.textInput} ${clientErrors.name ? styles.inputError : ""}`}
                          />
                          {clientErrors.name && (
                            <span className={styles.fieldErrorText}>Name is required</span>
                          )}
                        </div>

                        <div className={styles.fieldItem}>
                          <label htmlFor="pipeline-email" className={styles.fieldLabel}>
                            Work Email <span className={styles.requiredStar}>*</span>
                          </label>
                          <input
                            id="pipeline-email"
                            name="email"
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`${styles.textInput} ${clientErrors.email ? styles.inputError : ""}`}
                          />
                          {clientErrors.email && (
                            <span className={styles.fieldErrorText}>Work email is required</span>
                          )}
                        </div>

                        <div className={styles.fieldItem}>
                          <label htmlFor="pipeline-company" className={styles.fieldLabel}>Company / Product URL</label>
                          <input
                            id="pipeline-company"
                            name="company"
                            type="text"
                            placeholder="Acme Corp / https://..."
                            value={formData.company}
                            onChange={handleInputChange}
                            className={styles.textInput}
                          />
                        </div>

                        <div className={styles.fieldItem}>
                          <label htmlFor="pipeline-budget" className={styles.fieldLabel}>Target Budget Tier</label>
                          <select
                            id="pipeline-budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className={styles.selectInput}
                          >
                            <option value="Under $10k">Under $10k</option>
                            <option value="$10k - $25k">$10k - $25k</option>
                            <option value="$25k - $50k">$25k - $50k</option>
                            <option value="$50k+">$50k+ (Enterprise Architecture)</option>
                          </select>
                        </div>

                        <div className={`${styles.fieldItem} ${styles.fullRow}`}>
                          <label htmlFor="pipeline-notes" className={styles.fieldLabel}>Technical Requirements & Goals</label>
                          <textarea
                            id="pipeline-notes"
                            name="notes"
                            rows={3}
                            placeholder="Describe target user concurrency, existing technical stack, cloud infrastructure, or custom AI models..."
                            value={formData.notes}
                            onChange={handleInputChange}
                            className={styles.textAreaInput}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 4: MOBILE-ONLY REVIEW & DISPATCH */}
                  {currentStage === 4 && (
                    <motion.div
                      key="stage-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className={styles.stageContent}
                    >
                      <div className={styles.stageHeadingBlock}>
                        <span className={styles.stageBadge}>STAGE FOUR // FINAL SPECIFICATION REVIEW</span>
                        <h3 className={styles.stageTitle}>Review Configured Scope</h3>
                        <p className={styles.stageSubtitle}>
                          Confirm your architecture specifications before transmission to lead software architects.
                        </p>
                      </div>

                      <div className={styles.mobileReviewCard}>
                        <div className={styles.reviewItem}>
                          <span className={styles.reviewKey}>Configured Platforms</span>
                          <div className={styles.reviewPillsRow}>
                            {selectedPlatforms.map((p) => (
                              <span key={p} className={styles.reviewPill}>
                                {platformsList.find((item) => item.id === p)?.label || p}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.reviewItem}>
                          <span className={styles.reviewKey}>Velocity Horizon</span>
                          <span className={styles.reviewVal}>
                            {timelineList.find((t) => t.id === selectedTimeline)?.duration} —{" "}
                            {timelineList.find((t) => t.id === selectedTimeline)?.label}
                          </span>
                        </div>

                        <div className={styles.reviewItem}>
                          <span className={styles.reviewKey}>Architecture Modules</span>
                          <span className={styles.reviewVal}>
                            {selectedCapabilities.length} Core Subsystems Configured
                          </span>
                        </div>

                        <div className={styles.reviewItem}>
                          <span className={styles.reviewKey}>Target Budget Tier</span>
                          <span className={styles.reviewVal}>{formData.budget}</span>
                        </div>

                        <div className={styles.reviewItem}>
                          <span className={styles.reviewKey}>Client Identity</span>
                          <span className={styles.reviewVal}>
                            {formData.name} ({formData.email})
                          </span>
                        </div>

                        {formData.notes && (
                          <div className={styles.reviewItem}>
                            <span className={styles.reviewKey}>Technical Requirements</span>
                            <p className={styles.reviewNotesText}>{formData.notes}</p>
                          </div>
                        )}

                        <div className={styles.reviewGuarantee}>
                          <ShieldCheck size={16} className={styles.assuranceIcon} />
                          <span>Includes complimentary database topology, concurrency limits, and cloud cost audit. Guaranteed response within 24 hours.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Form Pane Navigation Footer (Pinned Uniformly to the Bottom) */}
              <div className={styles.paneFooterNav}>
                {currentStage === 1 && (
                  <>
                    <span className={styles.stageFooterNote}>
                      {selectedPlatforms.length} platform(s) selected
                    </span>
                    <button
                      type="button"
                      onClick={() => goToStage(2)}
                      className={styles.nextStageBtn}
                    >
                      <span>Continue to Velocity & Stack</span>
                      <ArrowRight size={15} />
                    </button>
                  </>
                )}

                {currentStage === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToStage(1)}
                      className={styles.backStageBtn}
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStage(3)}
                      className={styles.nextStageBtn}
                    >
                      <span>Continue to Client Brief</span>
                      <ArrowRight size={15} />
                    </button>
                  </>
                )}

                {currentStage === 3 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToStage(2)}
                      className={styles.backStageBtn}
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>

                    {/* Desktop Guidance Prompt (pointing to single submit on right) */}
                    <div className={styles.desktopSubmitPrompt}>
                      <Sparkles size={14} className={styles.promptSparkle} />
                      <span>Review your scope on the right to transmit</span>
                    </div>

                    {/* Mobile Proceed to Review Button */}
                    <button
                      type="button"
                      onClick={handleProceedToReview}
                      className={styles.mobileReviewBtn}
                    >
                      <span>Review Specification</span>
                      <ArrowRight size={15} />
                    </button>
                  </>
                )}

                {currentStage === 4 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToStage(3)}
                      className={styles.backStageBtn}
                    >
                      <ArrowLeft size={15} />
                      <span>Edit Brief</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={styles.submitBriefBtn}
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Scoped Brief</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Live Specification Pane (Equal Height, Stretch Aligned) */}
            <div className={styles.consoleSpecPane}>
              {/* Spec Pane Content */}
              <div className={styles.paneContentWrapper}>
                <div className={styles.specHeaderRow}>
                  <Sparkles size={14} className={styles.specSparkleIcon} />
                  <span className={styles.specTitle}>LIVE SCOPE SPECIFICATION</span>
                </div>

                <div className={styles.specItemsList}>
                  {/* Item 1: Platforms */}
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Configured Platforms</span>
                    <div className={styles.specPillsRow}>
                      {selectedPlatforms.map((p) => (
                        <span key={p} className={styles.specPill}>
                          {platformsList.find((item) => item.id === p)?.label || p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Item 2: Velocity */}
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Velocity Cadence</span>
                    <span className={styles.specVal}>
                      {timelineList.find((t) => t.id === selectedTimeline)?.duration} —{" "}
                      {timelineList.find((t) => t.id === selectedTimeline)?.label}
                    </span>
                  </div>

                  {/* Item 3: Modules */}
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Architecture Modules</span>
                    <span className={styles.specVal}>
                      {selectedCapabilities.length} Core Subsystems Configured
                    </span>
                  </div>

                  {/* Item 4: Budget */}
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Target Budget Tier</span>
                    <span className={styles.specVal}>{formData.budget}</span>
                  </div>

                  {/* Item 5: Client Identity */}
                  <div className={styles.specItem}>
                    <span className={styles.specKey}>Client Identity</span>
                    <span className={styles.specValMuted}>
                      {formData.name ? `${formData.name} (${formData.email || "Email Pending"})` : "Awaiting Client Coordinates"}
                    </span>
                  </div>
                </div>

                {/* Pre-Flight Guarantee Box */}
                <div className={styles.refGuaranteeBox}>
                  <ShieldCheck size={16} className={styles.refShieldIcon} />
                  <div>
                    <span className={styles.guaranteeTag}>PRE-FLIGHT GUARANTEE</span>
                    <p className={styles.guaranteeDesc}>
                      Includes complimentary database topology, concurrency limits, and infrastructure cost audit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Spec Pane Action Footer: Exact Same Horizontal Baseline as Left Footer */}
              <div className={styles.paneFooterNav}>
                {currentStage < 3 ? (
                  <button
                    type="button"
                    onClick={() => goToStage(currentStage + 1)}
                    className={styles.specNextBtn}
                  >
                    <span>Proceed to Next Stage</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={styles.specSubmitBtn}
                  >
                    {isSubmitting ? (
                      <span>Transmitting Brief...</span>
                    ) : (
                      <>
                        <span>Transmit Scoped Brief</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactScopingSection;
