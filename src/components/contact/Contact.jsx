import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./Contact.module.scss";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  if (inView) controls.start("visible");

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <motion.section
      className={styles.contact}
      id="contact"
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
      }}
    >
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -40 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2>
          Let’s <span>Work Together</span>
        </h2>
        <p>
          Have an idea for your next big project? We’d love to help you turn it
          into reality. Get in touch and let’s build something amazing!
        </p>
        <ul>
          <li>
            📧 <a href="mailto:ayush8171wiz@gmail.com">ayush8171wiz@gmail.com</a>
          </li>
          <li><a href="tel://+6199942413">📞 +91 91490 84611</a></li>
          <li>📍 Bengaluru, India</li>
        </ul>
      </motion.div>

      <motion.form
        className={styles.form}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } },
        }}
      >
        {["Your Name", "Email Address", "Message"].map((label, i) => (
          <motion.div
            className={styles.inputGroup}
            key={label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
            {label !== "Message" ? (
              <>
                <input type={label === "Email Address" ? "email" : "text"} required />
                <label>{label}</label>
              </>
            ) : (
              <>
                <textarea rows="4" required></textarea>
                <label>{label}</label>
              </>
            )}
          </motion.div>
        ))}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, type: "spring" } }}
        >
          Send Message 🚀
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default Contact;
