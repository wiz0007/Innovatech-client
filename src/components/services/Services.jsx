import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import styles from "./Services.module.scss";
import webIcon from "../../assets/webApp.png";
import mobileIcon from "../../assets/mobileApp.png";
import aiIcon from "../../assets/AISolu.png";

const services = [
  {
    title: "Web Applications",
    description: "Responsive and performant web apps tailored to your business needs.",
    details:
      "We build SEO-friendly, scalable, and secure web apps using React, Next.js, Node.js, and cloud technologies. Perfect for e-commerce, SaaS platforms, and business dashboards. Typical deliverables: MVP, production app, CI/CD, observability & monitoring.",
    icon: webIcon,
  },
  {
    title: "Mobile Applications",
    description: "High-quality mobile apps for iOS and Android platforms.",
    details:
      "Cross-platform apps built with React Native or Flutter, or native apps with Swift/Kotlin. We deliver push notifications, offline-first experiences, fast native performance, and smooth app-store deployment.",
    icon: mobileIcon,
  },
  {
    title: "AI Solutions",
    description: "Smart AI-powered solutions to automate and enhance business processes.",
    details:
      "From chatbots to predictive analytics and automation, we leverage ML models and MLOps to deliver pragmatic AI that integrates seamlessly with your stack and drives measurable ROI.",
    icon: aiIcon,
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 768 : false);

  // update on resize
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeService ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeService]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveService(null);
    };
    if (activeService) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeService]);

  // animations for service cards appearing on scroll
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, type: "spring", stiffness: 90 },
    }),
  };

  // modal variants — use `custom` to switch mobile vs desktop animation
  const modalVariants = {
    hidden: (custom) =>
      custom === "mobile" ? { y: "100%", opacity: 0 } : { scale: 0.9, opacity: 0, y: -10 },
    visible: (custom) =>
      custom === "mobile" ? { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
        : { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
    exit: (custom) =>
      custom === "mobile" ? { y: "100%", opacity: 0, transition: { ease: "easeInOut" } }
        : { scale: 0.95, opacity: 0, y: -10, transition: { ease: "easeInOut" } },
  };

  return (
    <section id="services" className={styles.servicesSection} ref={ref}>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      >
        Our Services
      </motion.h2>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className={styles.serviceCard}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
          >
            <img src={service.icon} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <motion.button
              type="button"
              onClick={() => setActiveService(service)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveService(null)}
            aria-hidden={activeService ? "false" : "true"}
          >
            <motion.div
              className={styles.modalContent}
              custom={isMobile ? "mobile" : "desktop"}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeService.title} details`}
            >
              <img src={activeService.icon} alt={activeService.title} />
              <h3>{activeService.title}</h3>
              <p>{activeService.details}</p>

              <div className={styles.modalActions}>
                <a href="#contact" onClick={() => setActiveService(null)} className={styles.contactBtn}>
                  Contact Us
                </a>
                <button className={styles.closeBtn} onClick={() => setActiveService(null)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
