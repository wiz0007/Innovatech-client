import React, { useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import axios from "axios";
import styles from "./Contact.module.scss";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  if (inView) controls.start("visible");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://innovatech-server.onrender.com/api/contact", formData);
      alert("Message sent successfully 🚀");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    }
  };

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
      {/* Left Info Section */}
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
          <li>
            <a href="tel://+6199942413">📞 +91 91490 84611</a>
          </li>
          <li>📍 Bengaluru, India</li>
        </ul>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Name */}
        <motion.div
          className={styles.inputGroup}
          custom={0}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Your Name</label>
        </motion.div>

        {/* Email */}
        <motion.div
          className={styles.inputGroup}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </motion.div>

        {/* Message */}
        <motion.div
          className={styles.inputGroup}
          custom={2}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <label>Message</label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, type: "spring" },
          }}
        >
          Send Message 🚀
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default Contact;
