import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <section className={styles.contact} id="contact">
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
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
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className={styles.inputGroup}>
          <input type="text" required />
          <label>Your Name</label>
        </div>

        <div className={styles.inputGroup}>
          <input type="email" required />
          <label>Email Address</label>
        </div>

        <div className={styles.inputGroup}>
          <textarea rows="4" required></textarea>
          <label>Message</label>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message 🚀
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
